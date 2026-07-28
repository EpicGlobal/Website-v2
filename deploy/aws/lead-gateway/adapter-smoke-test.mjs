import assert from 'node:assert/strict';

process.env.COPPERLINE_LEAD_ALLOWED_ORIGINS = 'https://staging.epicglobalinc.com';

const { handler } = await import('./handler.mjs');

const rejected = await handler({
  httpMethod: 'POST',
  headers: { origin: 'https://attacker.example' },
  body: '{}',
  requestContext: { identity: { sourceIp: '203.0.113.10' } },
});
assert.equal(rejected.statusCode, 403);
assert.equal(rejected.headers['Access-Control-Allow-Origin'], undefined);

const preflight = await handler({
  httpMethod: 'OPTIONS',
  headers: { origin: 'https://staging.epicglobalinc.com' },
  requestContext: { identity: { sourceIp: '203.0.113.10' } },
});
assert.equal(preflight.statusCode, 204);
assert.equal(preflight.headers['Access-Control-Allow-Origin'], 'https://staging.epicglobalinc.com');
assert.equal(preflight.headers['Access-Control-Allow-Methods'], 'POST, OPTIONS');

console.log('Lambda adapter smoke test passed: untrusted origins and CORS preflights are handled before credential access.');
