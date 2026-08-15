import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';

const secret = 'gateway-test-secret-with-at-least-thirty-two-bytes';

async function availablePort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => server.once('error', reject).listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  await new Promise((resolve) => server.close(resolve));
  return port;
}

const sitePort = await availablePort();
const intakePort = await availablePort();
const siteOrigin = `http://127.0.0.1:${sitePort}`;
let intakeCalls = 0;
let lastPayload = null;

const intakeServer = http.createServer((request, response) => {
  const chunks = [];
  request.on('data', (chunk) => chunks.push(chunk));
  request.on('end', () => {
    intakeCalls += 1;
    const rawBody = Buffer.concat(chunks);
    const timestamp = String(request.headers['x-copperline-timestamp'] || '');
    const eventId = String(request.headers['x-copperline-event-id'] || '');
    const idempotencyKey = String(request.headers['idempotency-key'] || '');
    const expected = `v1=${crypto.createHmac('sha256', secret).update(Buffer.concat([
      Buffer.from(`${timestamp}\n${eventId}\n${idempotencyKey}\nPOST\n/api/v1/lead-intake\n`, 'utf8'),
      rawBody,
    ])).digest('hex')}`;
    assert.equal(request.url, '/api/v1/lead-intake');
    assert.equal(request.headers['x-copperline-source'], 'epic-website');
    assert.equal(idempotencyKey, eventId);
    assert.equal(request.headers['x-copperline-signature'], expected);
    lastPayload = JSON.parse(rawBody.toString('utf8'));
    response.writeHead(202, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
      accepted: true,
      duplicate: intakeCalls > 1,
      receiptId: 'lead_receipt_gateway_test',
    }));
  });
});
await new Promise((resolve, reject) => intakeServer.once('error', reject).listen(intakePort, '127.0.0.1', resolve));

const nextBinary = path.resolve('node_modules/next/dist/bin/next');
let serverOutput = '';
const site = spawn(process.execPath, [nextBinary, 'dev', '-H', '127.0.0.1', '-p', String(sitePort)], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    NEXT_PUBLIC_LEAD_CAPTURE_PROVIDER: 'hubspot',
    NEXT_PUBLIC_SITE_URL: siteOrigin,
    COPPERLINE_LEAD_INTAKE_URL: `http://127.0.0.1:${intakePort}/api/v1/lead-intake`,
    COPPERLINE_LEAD_INTAKE_SOURCE_ID: 'epic-website',
    COPPERLINE_LEAD_INTAKE_HMAC_SECRET: secret,
    COPPERLINE_LEAD_ALLOWED_ORIGINS: siteOrigin,
    COPPERLINE_LEAD_ALLOWED_FORMS: 'contact,book-a-call,marketplace-assessment',
    COPPERLINE_LEAD_PRIVACY_NOTICE_VERSION: 'privacy-test-v1',
    COPPERLINE_LEAD_LAWFUL_BASIS: 'legitimate_interests',
    COPPERLINE_LEAD_ALLOW_LOCAL_PROOF: 'true',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});
site.stdout.on('data', (value) => { serverOutput += value.toString(); });
site.stderr.on('data', (value) => { serverOutput += value.toString(); });

async function waitForSite() {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (site.exitCode !== null) throw new Error(`Next.js exited before startup:\n${serverOutput}`);
    try {
      const response = await fetch(`${siteOrigin}/campaigns/marketplace-assessment`);
      if (response.ok) return;
    } catch {
      // The development server is still compiling.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Next.js did not start in time:\n${serverOutput}`);
}

const submission = {
  eventId: 'lead-gateway-test-12345678',
  submittedAt: new Date().toISOString(),
  formId: 'contact',
  websiteFax: '',
  tenantId: 'attacker-chosen-tenant',
  routeOwner: 'Attacker Owner',
  lead: {
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    company: 'Analytical Engines',
    website: 'https://example.com',
    phone: '',
    amazonStorefront: '',
  },
  consent: {
    privacyAcknowledged: true,
    marketing: false,
    capturedAt: new Date().toISOString(),
  },
  attribution: {
    visitorId: 'visitor-test',
    sessionId: 'session-test',
    firstTouch: { url: `${siteOrigin}/contact?utm_source=google`, utmSource: 'google', capturedAt: new Date().toISOString() },
    lastTouch: { url: `${siteOrigin}/contact`, capturedAt: new Date().toISOString() },
  },
  context: { placementId: 'contact-page', locale: 'en-US', origin: 'https://attacker.example' },
  proof: { provider: 'attacker', verified: false },
};

try {
  await waitForSite();
  const accepted = await fetch(`${siteOrigin}/api/lead-capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: siteOrigin,
      'Sec-Fetch-Site': 'same-origin',
    },
    body: JSON.stringify(submission),
  });
  assert.equal(accepted.status, 202);
  assert.deepEqual(await accepted.json(), {
    accepted: true,
    receiptId: 'lead_receipt_gateway_test',
    duplicate: false,
  });
  assert.equal(intakeCalls, 1);
  assert.equal(lastPayload.context.origin, siteOrigin);
  assert.equal(lastPayload.tenantId, undefined, 'The browser must not choose a tenant.');
  assert.equal(lastPayload.routeOwner, undefined, 'The browser must not choose routing.');
  assert.equal(lastPayload.proof.provider, 'aws-waf');
  assert.equal(lastPayload.proof.verified, true);
  assert.equal(lastPayload.consent.marketing, 'denied');
  assert.equal(lastPayload.consent.privacyNoticeVersion, 'privacy-test-v1');
  assert.equal(lastPayload.consent.lawfulBasis, 'legitimate_interests');

  const duplicate = await fetch(`${siteOrigin}/api/lead-capture`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: siteOrigin, 'Sec-Fetch-Site': 'same-origin' },
    body: JSON.stringify(submission),
  });
  assert.equal(duplicate.status, 202);
  assert.equal((await duplicate.json()).duplicate, true);

  const crossSite = await fetch(`${siteOrigin}/api/lead-capture`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://attacker.example', 'Sec-Fetch-Site': 'cross-site' },
    body: JSON.stringify(submission),
  });
  assert.equal(crossSite.status, 403);
  assert.equal(intakeCalls, 2, 'Rejected cross-site requests must not reach Copperline.');

  const botTrap = await fetch(`${siteOrigin}/api/lead-capture`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: siteOrigin, 'Sec-Fetch-Site': 'same-origin' },
    body: JSON.stringify({ ...submission, websiteFax: 'filled-by-bot' }),
  });
  assert.equal(botTrap.status, 202);
  assert.equal(intakeCalls, 2, 'Honeypot submissions must be discarded before Copperline.');

  const hubspotSource = await readFile(path.resolve('src/app/components/HubSpotFormEmbed.tsx'), 'utf8');
  assert.equal((hubspotSource.match(/gtag_report_conversion/g) || []).length, 1, 'HubSpot conversion must fire only on accepted submission.');
  assert.doesNotMatch(hubspotSource, /trackFormInteraction[\s\S]{0,800}gtag_report_conversion/);

  const wafTemplate = await readFile(path.resolve('deploy/aws/lead-capture-waf.yml'), 'utf8');
  assert.match(wafTemplate, /AWSManagedRulesBotControlRuleSet/);
  assert.match(wafTemplate, /InspectionLevel:\s*TARGETED/);
  assert.match(wafTemplate, /Default:\s*Count/);
  assert.match(wafTemplate, /Name:\s*LeadCaptureBrowserChallenge[\s\S]*?Challenge:\s*\{\}/);
  assert.doesNotMatch(wafTemplate, /SampledRequestsEnabled:\s*true/);
  const layoutSource = await readFile(path.resolve('app/layout.tsx'), 'utf8');
  assert.match(layoutSource, /NEXT_PUBLIC_AWS_WAF_INTEGRATION_URL/);
  assert.match(layoutSource, /challenge\.js/);

  const dedicatedGatewayTemplate = await readFile(path.resolve('deploy/aws/lead-gateway.yml'), 'utf8');
  assert.match(
    dedicatedGatewayTemplate,
    /ManagedRulesCount:\s*!Equals \[!Ref ManagedRulesMode, Count\]/,
    'The public gateway must map Count to WAF count overrides and Enforce to managed-rule actions.',
  );
  assert.match(
    dedicatedGatewayTemplate,
    /ApiServerErrorAlarm:[\s\S]*?- Name: ApiName\s*\n\s*Value: !Sub \$\{AppName\}-\$\{EnvironmentName\}/,
    'The API Gateway alarm must use the emitted ApiName metric dimension, not the REST API ID.',
  );

  console.log('Local fallback gateway tests passed: origin enforcement, signed forwarding, trusted field derivation, stable idempotency, honeypot handling, exactly-once conversion placement, WAF mode correctness, and deployable gateway configuration. The dedicated AWS gateway is validated separately.');
} finally {
  site.kill('SIGTERM');
  await new Promise((resolve) => {
    if (site.exitCode !== null) return resolve();
    const timeout = setTimeout(resolve, 5_000);
    site.once('exit', () => {
      clearTimeout(timeout);
      resolve();
    });
  });
  await new Promise((resolve) => intakeServer.close(resolve));
}
