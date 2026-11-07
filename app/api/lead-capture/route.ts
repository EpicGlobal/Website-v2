import { isWebsitePreview } from '@/site/preview-mode';
import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 48 * 1024;
const INTAKE_PATH = '/api/v1/lead-intake';

function envText(name: string) {
  return String(process.env[name] ?? '').trim();
}

function stringList(value: string) {
  return [...new Set(value.split(',').map((item) => item.trim().toLowerCase()).filter(Boolean))];
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left, 'utf8');
  const b = Buffer.from(right, 'utf8');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function normalizedOrigin(value: string) {
  try {
    const parsed = new URL(value);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.origin.toLowerCase() : '';
  } catch {
    return '';
  }
}

function text(value: unknown, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function object(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function eventId(value: unknown) {
  const candidate = text(value, 200);
  return /^[A-Za-z0-9][A-Za-z0-9._:-]{7,199}$/.test(candidate) ? candidate : '';
}

function signRequest({
  secret,
  timestamp,
  submissionId,
  rawBody,
}: {
  secret: string;
  timestamp: string;
  submissionId: string;
  rawBody: Buffer;
}) {
  const prefix = Buffer.from(`${timestamp}\n${submissionId}\n${submissionId}\nPOST\n${INTAKE_PATH}\n`, 'utf8');
  return `v1=${crypto.createHmac('sha256', secret).update(Buffer.concat([prefix, rawBody])).digest('hex')}`;
}

function safeResponse(status: number, error: string, code: string) {
  return NextResponse.json({ error, code }, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
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

function edgeProof(request: NextRequest) {
  if (/^(1|true|yes)$/i.test(envText('COPPERLINE_LEAD_WAF_PROTECTED'))) {
    return { verified: true, reference: request.headers.get('x-amzn-trace-id') ?? 'amplify-waf-attested' };
  }
  const expected = envText('COPPERLINE_LEAD_EDGE_PROOF_SECRET');
  const headerName = envText('COPPERLINE_LEAD_EDGE_PROOF_HEADER').toLowerCase() || 'x-epic-edge-proof';
  const provided = request.headers.get(headerName) ?? '';
  if (expected.length >= 32 && safeEqual(expected, provided)) {
    return { verified: true, reference: request.headers.get('x-amzn-trace-id') ?? 'edge-attested' };
  }
  const localAllowed = process.env.NODE_ENV !== 'production'
    && /^(1|true|yes)$/i.test(envText('COPPERLINE_LEAD_ALLOW_LOCAL_PROOF'));
  return { verified: localAllowed, reference: localAllowed ? 'local-development' : '' };
}

export async function POST(request: NextRequest) {
  if (isWebsitePreview) return safeResponse(503, 'Submissions are disabled in the development preview.', 'preview_disabled');
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) return safeResponse(413, 'Submission is too large.', 'payload_too_large');
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return safeResponse(415, 'Submission must use JSON.', 'content_type_invalid');
  }

  const origin = normalizedOrigin(request.headers.get('origin') ?? '');
  const allowedOrigins = stringList(
    envText('COPPERLINE_LEAD_ALLOWED_ORIGINS') || envText('NEXT_PUBLIC_SITE_URL')
  ).map(normalizedOrigin).filter(Boolean);
  if (!origin || !allowedOrigins.includes(origin)) {
    return safeResponse(403, 'Submission origin is not allowed.', 'origin_not_allowed');
  }
  const fetchSite = (request.headers.get('sec-fetch-site') ?? '').toLowerCase();
  if (fetchSite && !['same-origin', 'same-site'].includes(fetchSite)) {
    return safeResponse(403, 'Submission must come from this website.', 'cross_site_rejected');
  }

  let incoming: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) {
      return safeResponse(413, 'Submission is too large.', 'payload_too_large');
    }
    incoming = object(JSON.parse(raw));
  } catch {
    return safeResponse(400, 'Submission is not valid JSON.', 'json_invalid');
  }
  if (text(incoming.websiteFax, 200)) {
    return safeResponse(202, 'Submission accepted.', 'accepted');
  }

  const sourceId = envText('COPPERLINE_LEAD_INTAKE_SOURCE_ID').toLowerCase();
  const secret = envText('COPPERLINE_LEAD_INTAKE_HMAC_SECRET');
  const destination = envText('COPPERLINE_LEAD_INTAKE_URL');
  const lawfulBasis = envText('COPPERLINE_LEAD_LAWFUL_BASIS').toLowerCase();
  if (!sourceId || secret.length < 32 || !destination || !/^[a-z][a-z0-9_-]{2,79}$/.test(lawfulBasis)) {
    return safeResponse(503, 'Lead capture is temporarily unavailable.', 'gateway_not_configured');
  }
  let destinationUrl: URL;
  try {
    destinationUrl = new URL(destination);
    if (destinationUrl.pathname !== INTAKE_PATH || (process.env.NODE_ENV === 'production' && destinationUrl.protocol !== 'https:')) {
      throw new Error('invalid destination');
    }
  } catch {
    return safeResponse(503, 'Lead capture is temporarily unavailable.', 'gateway_destination_invalid');
  }

  const formId = text(incoming.formId, 120).toLowerCase();
  const allowedForms = stringList(envText('COPPERLINE_LEAD_ALLOWED_FORMS') || 'contact,book-a-call,marketplace-assessment');
  const submissionId = eventId(incoming.eventId);
  if (!formId || !allowedForms.includes(formId) || !submissionId) {
    return safeResponse(400, 'Submission details are incomplete.', 'submission_identity_invalid');
  }

  const proof = edgeProof(request);
  if (!proof.verified) {
    return safeResponse(503, 'Lead capture protection is not ready.', 'edge_proof_unavailable');
  }

  const lead = object(incoming.lead);
  const consent = object(incoming.consent);
  const attribution = object(incoming.attribution);
  const context = object(incoming.context);
  const payload = {
    schemaVersion: 'lead.v1',
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
      privacyNoticeVersion: envText('COPPERLINE_LEAD_PRIVACY_NOTICE_VERSION') || 'website-privacy-2026-07',
      privacyAcknowledged: consent.privacyAcknowledged === true,
      marketing: consent.marketing === true ? 'granted' : 'denied',
      lawfulBasis,
      purposes: ['respond_to_inquiry'],
      captureMethod: 'website_form',
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
      provider: 'aws-waf',
      verified: true,
      decision: 'allow',
      verifiedAt: new Date().toISOString(),
      reference: proof.reference,
    },
  };
  const rawBody = Buffer.from(JSON.stringify(payload), 'utf8');
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = signRequest({ secret, timestamp, submissionId, rawBody });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(destinationUrl, {
      method: 'POST',
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': submissionId,
        'X-Copperline-Source': sourceId,
        'X-Copperline-Timestamp': timestamp,
        'X-Copperline-Event-Id': submissionId,
        'X-Copperline-Signature': signature,
      },
      body: rawBody,
    });
    const result = object(await response.json().catch(() => ({})));
    if (!response.ok || result.accepted !== true || !text(result.receiptId, 200)) {
      const status = response.status === 429 ? 429 : response.status >= 500 ? 503 : 400;
      return safeResponse(status, 'Lead capture is temporarily unavailable.', text(result.code, 120) || 'intake_rejected');
    }
    return NextResponse.json({
      accepted: true,
      receiptId: text(result.receiptId, 200),
      duplicate: result.duplicate === true,
    }, {
      status: 202,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return safeResponse(503, 'Lead capture is temporarily unavailable.', 'intake_unreachable');
  } finally {
    clearTimeout(timeout);
  }
}
