import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { createLeadCaptureHandler } from './gateway.js';

const secrets = new SecretsManagerClient({});
let cachedSecrets = null;
let cacheExpiresAt = 0;

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function parsedSecret(value) {
  const source = text(value);
  if (!source) return {};
  try {
    const parsed = JSON.parse(source);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return { value: source };
  }
}

async function secretValue(secretId) {
  if (!secretId) throw new Error('lead gateway secret is not configured');
  const result = await secrets.send(new GetSecretValueCommand({ SecretId: secretId }));
  if (result.SecretString) return parsedSecret(result.SecretString);
  if (result.SecretBinary) {
    return parsedSecret(Buffer.from(result.SecretBinary).toString('utf8'));
  }
  throw new Error('lead gateway secret is empty');
}

async function runtimeSecrets() {
  if (cachedSecrets && Date.now() < cacheExpiresAt) return cachedSecrets;
  const [gateway, turnstile] = await Promise.all([
    secretValue(process.env.GATEWAY_SECRET_ARN),
    secretValue(process.env.TURNSTILE_SECRET_ARN),
  ]);
  const next = {
    COPPERLINE_LEAD_INTAKE_SOURCE_ID: text(gateway.COPPERLINE_LEAD_INTAKE_SOURCE_ID),
    COPPERLINE_LEAD_INTAKE_HMAC_SECRET: text(gateway.COPPERLINE_LEAD_INTAKE_HMAC_SECRET),
    TURNSTILE_SECRET_KEY: text(turnstile.TURNSTILE_SECRET_KEY || turnstile.value),
  };
  if (!next.COPPERLINE_LEAD_INTAKE_SOURCE_ID || next.COPPERLINE_LEAD_INTAKE_HMAC_SECRET.length < 32 || !next.TURNSTILE_SECRET_KEY) {
    throw new Error('lead gateway credentials are incomplete');
  }
  cachedSecrets = next;
  cacheExpiresAt = Date.now() + 5 * 60 * 1000;
  return next;
}

function headerValue(headers, name) {
  const expected = name.toLowerCase();
  for (const [key, value] of Object.entries(headers || {})) {
    if (key.toLowerCase() === expected) return text(value);
  }
  return '';
}

function allowedOrigin(origin) {
  const allowed = text(process.env.COPPERLINE_LEAD_ALLOWED_ORIGINS)
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  try {
    return allowed.includes(new URL(origin).origin.toLowerCase()) ? new URL(origin).origin.toLowerCase() : '';
  } catch {
    return '';
  }
}

function unavailable(origin) {
  const headers = {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin',
    'X-Content-Type-Options': 'nosniff',
  };
  if (origin) headers['Access-Control-Allow-Origin'] = origin;
  return {
    statusCode: 503,
    headers,
    body: JSON.stringify({
      error: 'Lead capture is temporarily unavailable.',
      code: 'gateway_credentials_unavailable',
    }),
  };
}

function earlyResponse(origin, statusCode, body, extraHeaders = {}) {
  const headers = {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin',
    'X-Content-Type-Options': 'nosniff',
    ...extraHeaders,
  };
  if (origin) headers['Access-Control-Allow-Origin'] = origin;
  return {
    statusCode,
    headers,
    body: body === null ? '' : JSON.stringify(body),
    isBase64Encoded: false,
  };
}

export async function handler(event) {
  const incomingHeaders = event?.headers || {};
  const origin = allowedOrigin(headerValue(incomingHeaders, 'origin'));
  const method = text(event?.httpMethod).toUpperCase() || 'GET';
  if (!origin) {
    return earlyResponse('', 403, { error: 'Submission origin is not allowed.', code: 'origin_not_allowed' });
  }
  if (method === 'OPTIONS') {
    return earlyResponse(origin, 204, null, {
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Max-Age': '600',
    });
  }
  if (method !== 'POST') {
    return earlyResponse(origin, 405, { error: 'Method not allowed.', code: 'method_not_allowed' });
  }
  let credentials;
  try {
    credentials = await runtimeSecrets();
  } catch {
    return unavailable(origin);
  }

  const headers = new Headers();
  for (const [name, value] of Object.entries(incomingHeaders)) {
    if (value !== undefined && value !== null) headers.set(name, String(value));
  }
  const sourceIp = text(event?.requestContext?.identity?.sourceIp);
  if (sourceIp) headers.set('CF-Connecting-IP', sourceIp);
  const rawBody = event?.isBase64Encoded
    ? Buffer.from(text(event.body), 'base64').toString('utf8')
    : text(event?.body);
  const request = new Request('https://lead-gateway.invalid/lead-capture', {
    method,
    headers,
    body: rawBody,
  });
  const gateway = createLeadCaptureHandler({
    env: (name) => credentials[name] ?? process.env[name],
    fetch,
  });
  const response = await gateway(request);
  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body: await response.text(),
    isBase64Encoded: false,
  };
}
