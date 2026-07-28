import { createLeadCaptureHandler } from "./gateway.ts";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function equal(actual: unknown, expected: unknown, message: string) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
  }
}

const secret = "gateway-test-secret-with-at-least-thirty-two-bytes";
const siteOrigin = "https://staging.epicglobalinc.com";
const intakeUrl = "http://127.0.0.1:43119/api/v1/lead-intake";

function submission(overrides: Record<string, unknown> = {}) {
  const submittedAt = "2026-07-27T18:00:00.000Z";
  return {
    eventId: "lead-edge-test-12345678",
    submittedAt,
    formId: "contact",
    websiteFax: "",
    turnstileToken: "test-turnstile-token",
    tenantId: "attacker-tenant",
    routeOwner: "Attacker Owner",
    lead: {
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      company: "Analytical Engines",
      website: "https://example.com",
      phone: "",
      amazonStorefront: "",
    },
    consent: {
      privacyAcknowledged: true,
      marketing: false,
      capturedAt: submittedAt,
    },
    attribution: {
      visitorId: "visitor-test",
      sessionId: "session-test",
      firstTouch: { url: `${siteOrigin}/contact?utm_source=google`, utmSource: "google", capturedAt: submittedAt },
      lastTouch: { url: `${siteOrigin}/contact`, capturedAt: submittedAt },
    },
    context: { placementId: "contact-page", locale: "en-US", origin: "https://attacker.example" },
    proof: { provider: "attacker", verified: false },
    ...overrides,
  };
}

function request(body: Record<string, unknown>, origin = siteOrigin, method = "POST") {
  return new Request("https://example-project.supabase.co/functions/v1/lead-capture", {
    method,
    headers: {
      "Content-Type": "application/json",
      "Origin": origin,
      "CF-Connecting-IP": "203.0.113.10",
    },
    body: method === "POST" ? JSON.stringify(body) : undefined,
  });
}

Deno.test("edge lead gateway verifies Turnstile and signs trusted Copperline payload", async () => {
  const envValues: Record<string, string> = {
    COPPERLINE_LEAD_INTAKE_URL: intakeUrl,
    COPPERLINE_LEAD_INTAKE_SOURCE_ID: "epic-website-staging",
    COPPERLINE_LEAD_INTAKE_HMAC_SECRET: secret,
    COPPERLINE_LEAD_ALLOWED_ORIGINS: siteOrigin,
    COPPERLINE_LEAD_ALLOWED_FORMS: "contact,book-a-call,marketplace-assessment",
    COPPERLINE_LEAD_PRIVACY_NOTICE_VERSION: "privacy-test-v1",
    COPPERLINE_LEAD_LAWFUL_BASIS: "legitimate_interests",
    COPPERLINE_LEAD_ALLOW_LOCAL_HTTP: "true",
    TURNSTILE_SECRET_KEY: "1x0000000000000000000000000000000AA",
    TURNSTILE_ALLOW_TEST_KEYS: "true",
    TURNSTILE_EXPECTED_ACTION: "lead_capture",
  };
  let turnstileCalls = 0;
  let intakeCalls = 0;
  let receivedPayload: Record<string, unknown> = {};

  const mockFetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    if (url.includes("challenges.cloudflare.com/turnstile")) {
      turnstileCalls += 1;
      const verification = JSON.parse(String(init?.body || "{}"));
      equal(verification.response, "test-turnstile-token", "Turnstile token must be forwarded only to Siteverify");
      equal(verification.remoteip, "203.0.113.10", "Gateway should pass the edge-derived client IP");
      assert(typeof verification.idempotency_key === "string", "Siteverify request needs an idempotency key");
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    equal(url, intakeUrl, "Only the configured Copperline path may receive the signed payload");
    intakeCalls += 1;
    const headers = new Headers(init?.headers);
    const rawBody = String(init?.body || "");
    const eventId = headers.get("x-copperline-event-id") || "";
    const idempotencyKey = headers.get("idempotency-key") || "";
    const timestamp = headers.get("x-copperline-timestamp") || "";
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signed = new TextEncoder().encode(
      `${timestamp}\n${eventId}\n${idempotencyKey}\nPOST\n/api/v1/lead-intake\n${rawBody}`,
    );
    const digest = await crypto.subtle.sign("HMAC", key, signed);
    const expectedSignature = `v1=${[...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
    equal(headers.get("x-copperline-signature"), expectedSignature, "Copperline body must be signed exactly");
    equal(headers.get("x-copperline-source"), "epic-website-staging", "Source must come from server configuration");
    equal(idempotencyKey, eventId, "Event and idempotency identities must match");
    receivedPayload = JSON.parse(rawBody);
    return new Response(JSON.stringify({
      accepted: true,
      duplicate: intakeCalls > 1,
      receiptId: "lead_receipt_edge_test",
    }), { status: 202, headers: { "Content-Type": "application/json" } });
  }) as typeof fetch;

  const handler = createLeadCaptureHandler({
    env: (name) => envValues[name],
    fetch: mockFetch,
    now: () => Date.parse("2026-07-27T18:00:01.000Z"),
    randomUUID: () => "a0dce27b-47ce-4e3b-af66-50f7081717d4",
  });

  const accepted = await handler(request(submission()));
  equal(accepted.status, 202, "Valid submission should be durably accepted");
  const acceptedBody = await accepted.json();
  equal(acceptedBody.receiptId, "lead_receipt_edge_test", "Gateway should return Copperline receipt");
  equal(accepted.headers.get("access-control-allow-origin"), siteOrigin, "CORS must echo only the allowed origin");
  equal(turnstileCalls, 1, "Turnstile should be verified exactly once");
  equal(intakeCalls, 1, "Copperline should receive one request");
  equal(receivedPayload.tenantId, undefined, "Browser must not select tenant");
  equal(receivedPayload.routeOwner, undefined, "Browser must not select routing");
  const proof = receivedPayload.proof as Record<string, unknown>;
  equal(proof.provider, "cloudflare-turnstile", "Proof provider must be derived by gateway");
  equal(proof.verified, true, "Only verified Turnstile proof may be forwarded");
  assert(!JSON.stringify(receivedPayload).includes("test-turnstile-token"), "Raw Turnstile token must never enter Copperline evidence");
  const context = receivedPayload.context as Record<string, unknown>;
  equal(context.origin, siteOrigin, "Origin must come from the trusted request header");
  const consent = receivedPayload.consent as Record<string, unknown>;
  equal(consent.privacyNoticeVersion, "privacy-test-v1", "Privacy version must be server-controlled");
  equal(consent.marketing, "denied", "Unchecked marketing must remain denied");
  equal(consent.lawfulBasis, "legitimate_interests", "Lawful basis must be server-controlled");

  const duplicate = await handler(request(submission()));
  equal(duplicate.status, 202, "Retry should be accepted");
  equal((await duplicate.json()).duplicate, true, "Copperline duplicate result should pass through");

  const crossOrigin = await handler(request(submission(), "https://attacker.example"));
  equal(crossOrigin.status, 403, "Untrusted origins must be rejected");
  equal(crossOrigin.headers.get("access-control-allow-origin"), null, "Rejected origin must not receive CORS permission");
  equal(turnstileCalls, 2, "Cross-origin rejection must occur before Turnstile");
  equal(intakeCalls, 2, "Cross-origin rejection must occur before Copperline");

  const botTrap = await handler(request(submission({ websiteFax: "filled-by-bot" })));
  equal(botTrap.status, 202, "Honeypot should return an indistinguishable acceptance");
  equal(turnstileCalls, 2, "Honeypot must be discarded before Turnstile");
  equal(intakeCalls, 2, "Honeypot must be discarded before Copperline");

  const preflight = await handler(request({}, siteOrigin, "OPTIONS"));
  equal(preflight.status, 204, "Allowed browser preflight should succeed");
  equal(preflight.headers.get("access-control-allow-methods"), "POST, OPTIONS", "Preflight must expose only required methods");
});

Deno.test("Turnstile test secrets cannot protect a production source", async () => {
  const values: Record<string, string> = {
    COPPERLINE_LEAD_ALLOWED_ORIGINS: siteOrigin,
    COPPERLINE_LEAD_ALLOWED_FORMS: "contact",
    COPPERLINE_LEAD_INTAKE_SOURCE_ID: "epic-website",
    TURNSTILE_SECRET_KEY: "1x0000000000000000000000000000000AA",
    TURNSTILE_ALLOW_TEST_KEYS: "true",
  };
  let fetchCalls = 0;
  const handler = createLeadCaptureHandler({
    env: (name) => values[name],
    fetch: (async () => {
      fetchCalls += 1;
      return new Response("{}", { status: 500 });
    }) as typeof fetch,
  });
  const response = await handler(request(submission()));
  equal(response.status, 503, "Production source must refuse Turnstile test credentials");
  equal(fetchCalls, 0, "Forbidden test credentials must fail closed before any network call");
});
