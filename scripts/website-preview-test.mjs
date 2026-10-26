import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import http from 'node:http';
import net from 'node:net';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise stored consent in both modes, including already-present analytics globals.
const privacySource = await readFile('src/site/privacy-preferences.ts', 'utf8');
const compiled = ts.transpileModule(privacySource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
for (const preview of [false, true]) {
  let analyticsCalls = 0;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require: () => ({ isWebsitePreview: preview }),
    navigator: {},
    document: { cookie: '' },
    CustomEvent: class {},
    window: {
      localStorage: { getItem: () => 'granted', setItem: () => {} },
      location: { protocol: 'https:', hostname: 'preview.example' },
      dispatchEvent: () => {},
      gtag: () => { analyticsCalls += 1; },
      fbq: () => { analyticsCalls += 1; },
    },
  });
  assert.equal(exports.allowsNonEssentialTracking(), !preview);
  exports.writePrivacyPreference('granted');
  assert.equal(analyticsCalls, preview ? 0 : 2);
}

async function availablePort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => server.once('error', reject).listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  await new Promise((resolve) => server.close(resolve));
  return port;
}
const sitePort = await availablePort();
const origin = `http://127.0.0.1:${sitePort}`;
let intakeCalls = 0;
const intake = http.createServer((_request, response) => {
  intakeCalls += 1;
  response.writeHead(202).end('{}');
});
await new Promise((resolve) => intake.listen(0, '127.0.0.1', resolve));
const site = spawn(process.execPath, [path.resolve('node_modules/next/dist/bin/next'), 'dev', '-H', '127.0.0.1', '-p', String(sitePort)], {
  env: {
    ...process.env,
    NEXT_PUBLIC_WEBSITE_PREVIEW: 'true',
    NEXT_PUBLIC_SITE_URL: origin,
    NEXT_PUBLIC_LEAD_CAPTURE_PROVIDER: 'copperline',
    NEXT_PUBLIC_LEAD_GATEWAY_URL: `http://127.0.0.1:${intake.address().port}/lead-capture`,
    COPPERLINE_LEAD_INTAKE_URL: `http://127.0.0.1:${intake.address().port}/api/v1/lead-intake`,
    COPPERLINE_LEAD_INTAKE_SOURCE_ID: 'preview-fixture',
    COPPERLINE_LEAD_INTAKE_HMAC_SECRET: 'synthetic-preview-fixture-secret-at-least-thirty-two-bytes',
    COPPERLINE_LEAD_ALLOWED_ORIGINS: origin,
    COPPERLINE_LEAD_ALLOW_LOCAL_PROOF: 'true',
    NEXT_TELEMETRY_DISABLED: '1',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let output = '';
site.stdout.on('data', (value) => { output += value; });
site.stderr.on('data', (value) => { output += value; });
try {
  const deadline = Date.now() + 90_000;
  let ready = false;
  while (Date.now() < deadline) {
    if (site.exitCode !== null) throw new Error(`Preview exited before startup: ${output}`);
    try {
      if ((await fetch(`${origin}/robots.txt`)).ok) { ready = true; break; }
    } catch { /* Local server is starting. */ }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  assert.ok(ready, `Preview did not start: ${output}`);
  for (const body of ['{malformed', JSON.stringify({ formId: 'contact', email: 'fixture@example.invalid' })]) {
    const result = await fetch(`${origin}/api/lead-capture`, {
      method: 'POST', headers: { 'content-type': 'application/json', origin }, body,
    });
    assert.equal(result.status, 503);
    assert.equal((await result.json()).code, 'preview_disabled');
  }
  assert.equal(intakeCalls, 0, 'Preview must not forward even with a configured intake.');
  const robots = await (await fetch(`${origin}/robots.txt`)).text();
  assert.match(robots, /Disallow: \/\s/);
  assert.doesNotMatch(robots, /Sitemap:/);
  for (const route of ['/', '/sign-in', '/campaigns/marketplace-assessment']) {
    const page = await fetch(`${origin}${route}`);
    assert.equal(page.status, 200, route);
    assert.equal(page.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive');
    const policy = page.headers.get('content-security-policy');
    assert.match(policy, /connect-src 'self' https:\/\/unpkg.com;/);
    assert.match(policy, /frame-src 'none'/);
    const html = await page.text();
    assert.match(html, /Development preview/);
    assert.match(html, /noindex/);
    assert.doesNotMatch(html, /<script[^>]*src="https?:/);
    assert.doesNotMatch(html, /<iframe\b/);
  }
  const contact = await (await fetch(`${origin}/campaigns/marketplace-assessment`)).text();
  assert.ok(/<button[^>]*disabled[^>]*>Preview only/.test(contact), 'Rendered campaign form submit button must be disabled.');
  console.log('Preview safety passed: saved consent cannot enable tracking; submissions stop before parsing/forwarding; pages retain content with disabled forms, no external scripts/iframes, CSP, and no-index directives. All requests used local fixtures.');
} finally {
  site.kill('SIGTERM');
  await new Promise((resolve) => {
    if (site.exitCode !== null) return resolve();
    const timeout = setTimeout(resolve, 5_000);
    site.once('exit', () => { clearTimeout(timeout); resolve(); });
  });
  intake.closeAllConnections();
  await new Promise((resolve) => intake.close(resolve));
}
