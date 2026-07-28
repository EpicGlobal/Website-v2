const MAX_BODY_BYTES = 48 * 1024;
const INTAKE_PATH = "/api/v1/lead-intake";
const TURNSTILE_SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_TEST_SECRETS = new Set([
  "1x0000000000000000000000000000000AA",
  "2x0000000000000000000000000000000AA",
  "3x0000000000000000000000000000000AA",
]);

type EnvReader = (name: string) => string | undefined;
type Fetcher = typeof fetch;

interface GatewayDependencies {
  env: EnvReader;
  fetch: Fetcher;
  now?: () => number;
  randomUUID?: () => string;
}

interface TurnstileResult {
  success?: boolean;
  hostname?: string;
  action?: string;
  cdata?: string;
  "error-codes"?: string[];
}

function envText(env: EnvReader, name: string) {
  return String(env(name) ?? "").trim();
}

function enabled(value: string) {
  return /^(1|true|yes)$/i.test(value);
}

function stringList(value: string) {
  return [...new Set(value.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean))];
}

function normalizedOrigin(value: string) {
  try {
    const parsed = new URL(value);
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.origin.toLowerCase() : "";
  } catch {
    return "";
  }
}

function hostnameFromOrigin(origin: string) {
  try {
    return new URL(origin).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function text(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function object(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function eventId(value: unknown) {
  const candidate = text(value, 200);
  return /^[A-Za-z0-9][A-Za-z0-9._:-]{7,199}$/.test(candidate) ? candidate : "";
}

function touch(value: unknown) {
  const source = object(value);
  return {
    url: text(source.url, 2048),
    referrer: text(source.referrer, 2048),
    utmSource: text(source.utmSource, 256),
    utmMedium: text(source.utmMedium, 256),
    utmCampaign: text(source.utmCampaign, 256),
    utmTerm: text(source.utmTerm, 256),
    utmContent: text(source.utmContent, 256),
    gclid: text(source.gclid, 256),
    fbclid: text(source.fbclid, 256),
    msclkid: text(source.msclkid, 256),
    capturedAt: text(source.capturedAt, 64),
  };
}

function corsHeaders(origin: string) {
  const headers: Record<string, string> = {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "Vary": "Origin",
    "X-Content-Type-Options": "nosniff",
  };
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

function json(origin: string, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(origin),
  });
}

function safeError(origin: string, status: number, message: string, code: string) {
  return json(origin, status, { error: message, code });
}

function basicLeadIsValid(value: Record<string, unknown>) {
  const email = text(value.email, 320);
  const website = text(value.website, 2048);
  let websiteValid = false;
  try {
    const parsed = new URL(website);
    websiteValid = ["http:", "https:"].includes(parsed.protocol) && Boolean(parsed.hostname);
  } catch {
    websiteValid = false;
  }
  return Boolean(
    text(value.firstName, 120)
    && text(value.lastName, 120)
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    && text(value.company, 240)
    && websiteValid
  );
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function signRequest(secret: string, timestamp: string, submissionId: string, rawBody: Uint8Array) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const prefix = new TextEncoder().encode(
    `${timestamp}\n${submissionId}\n${submissionId}\nPOST\n${INTAKE_PATH}\n`,
  );
  const data = new Uint8Array(prefix.length + rawBody.length);
  data.set(prefix);
  data.set(rawBody, prefix.length);
  const signature = await crypto.subtle.sign("HMAC", key, data);
  const hex = [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `v1=${hex}`;
}

async function fetchWithTimeout(
  fetcher: Fetcher,
  input: string | URL,
  init: RequestInit,
  timeoutMs: number,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetcher(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function verifyTurnstile({
  env,
  fetcher,
  token,
  remoteIp,
  expectedHostnames,
  expectedAction,
  randomUUID,
}: {
  env: EnvReader;
  fetcher: Fetcher;
  token: string;
  remoteIp: string;
  expectedHostnames: string[];
  expectedAction: string;
  randomUUID: () => string;
}) {
  const secret = envText(env, "TURNSTILE_SECRET_KEY");
  if (!secret) return { valid: false, code: "turnstile_not_configured", result: {} as TurnstileResult };

  const usingTestSecret = TURNSTILE_TEST_SECRETS.has(secret);
  const allowTestKeys = enabled(envText(env, "TURNSTILE_ALLOW_TEST_KEYS"));
  const sourceId = envText(env, "COPPERLINE_LEAD_INTAKE_SOURCE_ID").toLowerCase();
  if (usingTestSecret && (!allowTestKeys || !sourceId.includes("staging"))) {
    return { valid: false, code: "turnstile_test_key_forbidden", result: {} as TurnstileResult };
  }
  if (!usingTestSecret && secret.length < 20) {
    return { valid: false, code: "turnstile_not_configured", result: {} as TurnstileResult };
  }

  const idempotencyKey = randomUUID();
  let result: TurnstileResult = {};
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetchWithTimeout(fetcher, TURNSTILE_SITEVERIFY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret,
          response: token,
          remoteip: remoteIp || undefined,
          idempotency_key: idempotencyKey,
        }),
      }, 5_000);
      result = object(await response.json().catch(() => ({}))) as TurnstileResult;
      if (response.ok || attempt === 1) break;
    } catch {
      if (attempt === 1) return { valid: false, code: "turnstile_unreachable", result };
    }
  }

  if (result.success !== true) return { valid: false, code: "turnstile_rejected", result };
  if (!usingTestSecret && !expectedHostnames.includes(text(result.hostname, 253).toLowerCase())) {
    return { valid: false, code: "turnstile_hostname_mismatch", result };
  }
  if (!usingTestSecret && text(result.action, 32) !== expectedAction) {
    return { valid: false, code: "turnstile_action_mismatch", result };
  }
  return { valid: true, code: "verified", result };
}

export function createLeadCaptureHandler({
  env,
  fetch: fetcher,
  now = Date.now,
  randomUUID = () => crypto.randomUUID(),
}: GatewayDependencies) {
  return async (request: Request) => {
    const requestOrigin = normalizedOrigin(request.headers.get("origin") ?? "");
    const allowedOrigins = stringList(envText(env, "COPPERLINE_LEAD_ALLOWED_ORIGINS"))
      .map(normalizedOrigin)
      .filter(Boolean);
    const origin = allowedOrigins.includes(requestOrigin) ? requestOrigin : "";

    if (request.method === "OPTIONS") {
      if (!origin) return safeError("", 403, "Submission origin is not allowed.", "origin_not_allowed");
      return new Response(null, {
        status: 204,
        headers: {
          ...corsHeaders(origin),
          "Access-Control-Allow-Headers": "content-type",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Max-Age": "600",
        },
      });
    }
    if (request.method !== "POST") return safeError(origin, 405, "Method not allowed.", "method_not_allowed");
    if (!origin) return safeError("", 403, "Submission origin is not allowed.", "origin_not_allowed");

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) return safeError(origin, 413, "Submission is too large.", "payload_too_large");
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return safeError(origin, 415, "Submission must use JSON.", "content_type_invalid");
    }

    let incoming: Record<string, unknown>;
    try {
      const raw = await request.text();
      if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
        return safeError(origin, 413, "Submission is too large.", "payload_too_large");
      }
      incoming = object(JSON.parse(raw));
    } catch {
      return safeError(origin, 400, "Submission is not valid JSON.", "json_invalid");
    }

    const submissionId = eventId(incoming.eventId);
    if (text(incoming.websiteFax, 200)) {
      const discardedReference = (await sha256(submissionId || randomUUID())).slice(0, 24);
      return json(origin, 202, {
        accepted: true,
        receiptId: `lead_receipt_${discardedReference}`,
        duplicate: false,
      });
    }

    const formId = text(incoming.formId, 120).toLowerCase();
    const allowedForms = stringList(envText(env, "COPPERLINE_LEAD_ALLOWED_FORMS") || "contact,book-a-call,marketplace-assessment");
    const lead = object(incoming.lead);
    const consent = object(incoming.consent);
    if (!formId || !allowedForms.includes(formId) || !submissionId) {
      return safeError(origin, 400, "Submission details are incomplete.", "submission_identity_invalid");
    }
    if (!basicLeadIsValid(lead) || consent.privacyAcknowledged !== true) {
      return safeError(origin, 422, "Required lead or privacy fields are incomplete.", "submission_invalid");
    }

    const token = text(incoming.turnstileToken, 2048);
    if (!token) return safeError(origin, 403, "Please complete the security check.", "turnstile_required");
    const expectedAction = envText(env, "TURNSTILE_EXPECTED_ACTION") || "lead_capture";
    const expectedHostnames = stringList(envText(env, "TURNSTILE_ALLOWED_HOSTNAMES"))
      .concat(allowedOrigins.map(hostnameFromOrigin))
      .filter(Boolean);
    const remoteIp = text(
      request.headers.get("cf-connecting-ip")
      || request.headers.get("x-forwarded-for")?.split(",")[0]
      || "",
      64,
    );
    const turnstile = await verifyTurnstile({
      env,
      fetcher,
      token,
      remoteIp,
      expectedHostnames: [...new Set(expectedHostnames)],
      expectedAction,
      randomUUID,
    });
    if (!turnstile.valid) {
      const configurationError = turnstile.code.includes("not_configured") || turnstile.code.includes("forbidden");
      return safeError(
        origin,
        configurationError ? 503 : 403,
        configurationError ? "Lead capture protection is temporarily unavailable." : "The security check could not be verified. Please try again.",
        turnstile.code,
      );
    }

    const sourceId = envText(env, "COPPERLINE_LEAD_INTAKE_SOURCE_ID").toLowerCase();
    const secret = envText(env, "COPPERLINE_LEAD_INTAKE_HMAC_SECRET");
    const destination = envText(env, "COPPERLINE_LEAD_INTAKE_URL");
    const lawfulBasis = envText(env, "COPPERLINE_LEAD_LAWFUL_BASIS").toLowerCase();
    if (!sourceId || secret.length < 32 || !destination || !/^[a-z][a-z0-9_-]{2,79}$/.test(lawfulBasis)) {
      return safeError(origin, 503, "Lead capture is temporarily unavailable.", "gateway_not_configured");
    }
    let destinationUrl: URL;
    try {
      destinationUrl = new URL(destination);
      const allowHttp = enabled(envText(env, "COPPERLINE_LEAD_ALLOW_LOCAL_HTTP"))
        && ["127.0.0.1", "localhost"].includes(destinationUrl.hostname);
      if (destinationUrl.pathname !== INTAKE_PATH || (destinationUrl.protocol !== "https:" && !allowHttp)) {
        throw new Error("invalid destination");
      }
    } catch {
      return safeError(origin, 503, "Lead capture is temporarily unavailable.", "gateway_destination_invalid");
    }

    const attribution = object(incoming.attribution);
    const context = object(incoming.context);
    const verifiedAt = new Date(now()).toISOString();
    const proofReference = `turnstile:${(await sha256(token)).slice(0, 32)}`;
    const payload = {
      schemaVersion: "lead.v1",
      formId,
      submittedAt: text(incoming.submittedAt, 64),
      lead: {
        firstName: text(lead.firstName, 120),
        lastName: text(lead.lastName, 120),
        email: text(lead.email, 320),
        company: text(lead.company, 240),
        website: text(lead.website, 2048),
        phone: text(lead.phone, 80),
        amazonStorefront: text(lead.amazonStorefront, 2048),
      },
      consent: {
        privacyNoticeVersion: envText(env, "COPPERLINE_LEAD_PRIVACY_NOTICE_VERSION") || "website-privacy-2026-07",
        privacyAcknowledged: true,
        marketing: consent.marketing === true ? "granted" : "denied",
        lawfulBasis,
        purposes: ["respond_to_inquiry"],
        captureMethod: "website_form",
        locale: text(context.locale, 32),
        capturedAt: text(consent.capturedAt, 64) || text(incoming.submittedAt, 64),
      },
      attribution: {
        visitorId: text(attribution.visitorId, 200),
        sessionId: text(attribution.sessionId, 200),
        firstTouch: touch(attribution.firstTouch),
        lastTouch: touch(attribution.lastTouch),
      },
      context: {
        origin,
        placementId: text(context.placementId, 120),
        locale: text(context.locale, 32),
      },
      proof: {
        provider: "cloudflare-turnstile",
        verified: true,
        decision: "allow",
        verifiedAt,
        reference: proofReference,
      },
    };
    const rawText = JSON.stringify(payload);
    const rawBody = new TextEncoder().encode(rawText);
    const timestamp = String(Math.floor(now() / 1000));
    const signature = await signRequest(secret, timestamp, submissionId, rawBody);

    try {
      const response = await fetchWithTimeout(fetcher, destinationUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": submissionId,
          "X-Copperline-Source": sourceId,
          "X-Copperline-Timestamp": timestamp,
          "X-Copperline-Event-Id": submissionId,
          "X-Copperline-Signature": signature,
        },
        body: rawText,
      }, 8_000);
      const result = object(await response.json().catch(() => ({})));
      if (!response.ok || result.accepted !== true || !text(result.receiptId, 200)) {
        const status = response.status === 429 ? 429 : response.status >= 500 ? 503 : 400;
        return safeError(origin, status, "Lead capture is temporarily unavailable.", text(result.code, 120) || "intake_rejected");
      }
      return json(origin, 202, {
        accepted: true,
        receiptId: text(result.receiptId, 200),
        duplicate: result.duplicate === true,
      });
    } catch {
      return safeError(origin, 503, "Lead capture is temporarily unavailable.", "intake_unreachable");
    }
  };
}
