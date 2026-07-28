import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';

const argumentsMap = new Map(process.argv.slice(2).map((argument) => {
  const split = argument.indexOf('=');
  return split === -1 ? [argument, ''] : [argument.slice(0, split), argument.slice(split + 1)];
}));
const endpoint = String(argumentsMap.get('--endpoint') || '').trim();
const origin = String(argumentsMap.get('--origin') || 'http://127.0.0.1:3000').trim();
const count = Math.max(1, Math.min(50, Number(argumentsMap.get('--count') || 20)));
const confirmation = String(argumentsMap.get('--confirm') || '');
const liveProjection = argumentsMap.has('--live-projection');
const providedRunId = String(argumentsMap.get('--run-id') || '').trim().toLowerCase();
if (providedRunId && !/^[a-f0-9]{16}$/.test(providedRunId)) {
  throw new Error('--run-id must contain exactly 16 lowercase hexadecimal characters.');
}
const requiredConfirmation = liveProjection
  ? 'RUN_LIVE_LEAD_STAGING_PROJECTION'
  : 'RUN_CAPTURE_ONLY_LEAD_STAGING';
if (confirmation !== requiredConfirmation) {
  throw new Error(`This test creates durable staging receipts${liveProjection ? ' and isolated staging CRM records' : ''}. Pass --confirm=${requiredConfirmation}.`);
}
if (liveProjection && count < 20) {
  throw new Error('Live staging projection validation requires at least 20 controlled submissions.');
}
const endpointUrl = new URL(endpoint);
if (endpointUrl.protocol !== 'https:' || !endpointUrl.pathname.includes('/staging/lead-capture')) {
  throw new Error('The staging test refuses to use a non-HTTPS or non-staging endpoint.');
}

const runId = providedRunId || crypto.randomUUID().replaceAll('-', '').slice(0, 16);
const forms = ['contact', 'book-a-call', 'marketplace-assessment'];
const submissions = Array.from({ length: count }, (_, index) => {
  const submittedAt = new Date(Date.now() + index).toISOString();
  const sharedIdentity = index < 2;
  return {
    eventId: `lead-controlled-${runId}-${String(index + 1).padStart(2, '0')}`,
    submittedAt,
    formId: forms[index % forms.length],
    turnstileToken: 'XXXX.DUMMY.TOKEN.XXXX',
    websiteFax: '',
    tenantId: 'browser-must-not-control-tenant',
    routeOwner: 'browser-must-not-control-owner',
    lead: {
      firstName: 'Synthetic',
      lastName: `Lead ${index + 1}`,
      email: sharedIdentity ? `lead-${runId}-shared@example.com` : `lead-${runId}-${index + 1}@example.com`,
      company: sharedIdentity ? `Synthetic Shared Test Company ${runId}` : `Synthetic Test Company ${runId} ${index + 1}`,
      website: 'https://example.com',
      phone: '',
      amazonStorefront: '',
    },
    consent: {
      privacyAcknowledged: true,
      marketing: index % 2 === 0,
      capturedAt: submittedAt,
    },
    attribution: {
      visitorId: `synthetic-visitor-${runId}`,
      sessionId: `synthetic-session-${runId}`,
      firstTouch: {
        url: `${origin}/contact?utm_source=controlled-staging`,
        referrer: '',
        utmSource: 'controlled-staging',
        utmMedium: 'synthetic',
        utmCampaign: 'lead-cutover-validation',
        utmTerm: '',
        utmContent: '',
        gclid: '',
        fbclid: '',
        msclkid: '',
        capturedAt: submittedAt,
      },
      lastTouch: {
        url: `${origin}/contact`,
        referrer: '',
        utmSource: 'controlled-staging',
        utmMedium: 'synthetic',
        utmCampaign: 'lead-cutover-validation',
        utmTerm: '',
        utmContent: '',
        gclid: '',
        fbclid: '',
        msclkid: '',
        capturedAt: submittedAt,
      },
    },
    context: { placementId: `${forms[index % forms.length]}-placement`, locale: 'en-US' },
  };
});

async function send(body, requestOrigin = origin) {
  const started = performance.now();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: requestOrigin },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));
  return { status: response.status, result, latencyMs: performance.now() - started };
}

const firstPass = [];
for (const submission of submissions) {
  const response = await send(submission);
  assert.equal(response.status, 202, 'Every valid first-pass request must be accepted');
  assert.equal(response.result.accepted, true);
  assert.equal(response.result.duplicate, false);
  assert.equal(typeof response.result.receiptId, 'string');
  firstPass.push(response);
}

const replayPass = [];
for (const submission of submissions) {
  const response = await send(submission);
  assert.equal(response.status, 202, 'Every exact retry must be accepted idempotently');
  assert.equal(response.result.accepted, true);
  assert.equal(response.result.duplicate, true);
  replayPass.push(response);
}

const preflight = await fetch(endpoint, {
  method: 'OPTIONS',
  headers: { Origin: origin, 'Access-Control-Request-Method': 'POST' },
});
assert.equal(preflight.status, 204);

const crossOrigin = await send(submissions[0], 'https://attacker.example');
assert.equal(crossOrigin.status, 403);

const missingProof = await send({ ...submissions[0], eventId: `${submissions[0].eventId}-missing-proof`, turnstileToken: '' });
assert.equal(missingProof.status, 403);

const invalidPrivacy = await send({
  ...submissions[0],
  eventId: `${submissions[0].eventId}-invalid-privacy`,
  consent: { ...submissions[0].consent, privacyAcknowledged: false },
});
assert.equal(invalidPrivacy.status, 422);

const honeypot = await send({
  ...submissions[0],
  eventId: `${submissions[0].eventId}-honeypot`,
  websiteFax: 'filled-by-automation',
});
assert.equal(honeypot.status, 202);
assert.equal(honeypot.result.accepted, true);

const latencies = firstPass.map((entry) => entry.latencyMs).sort((left, right) => left - right);
const p95 = latencies[Math.max(0, Math.ceil(latencies.length * 0.95) - 1)];
assert(p95 < 2_000, `Durable acceptance p95 must be under two seconds, received ${p95.toFixed(1)}ms`);
assert.equal(new Set(firstPass.map((entry) => entry.result.receiptId)).size, count);

console.log(JSON.stringify({
  valid: true,
  expectedMode: liveProjection ? 'live' : 'capture_only',
  runId,
  runPrefix: `lead-controlled-${runId}-`,
  requested: count,
  firstPassAccepted: firstPass.length,
  uniqueReceipts: new Set(firstPass.map((entry) => entry.result.receiptId)).size,
  exactRetriesReportedDuplicate: replayPass.filter((entry) => entry.result.duplicate === true).length,
  sameEmailDistinctEvents: count >= 2 ? 2 : 0,
  p95DurableAcceptMs: Number(p95.toFixed(1)),
  negativeCases: {
    allowedPreflight: preflight.status,
    crossOriginRejected: crossOrigin.status,
    missingProofRejected: missingProof.status,
    invalidPrivacyRejected: invalidPrivacy.status,
    honeypotIndistinguishableAcceptance: honeypot.status,
  },
  containsRealLeadData: false,
}, null, 2));
