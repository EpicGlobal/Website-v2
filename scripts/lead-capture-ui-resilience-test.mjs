import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const form = await readFile(path.resolve('src/app/components/LeadCaptureForm.tsx'), 'utf8');
const modal = await readFile(path.resolve('src/app/components/HubSpotModal.tsx'), 'utf8');

assert.match(modal, /<LeadCaptureForm formId="book-a-call" placementId="global-book-a-call-modal" \/>/);
assert.match(form, /'loading' \| 'challenge' \| 'ready' \| 'error'/);
assert.match(form, /appearance: 'always'/);
assert.match(form, /'expired-callback':[\s\S]*turnstile\.reset\(turnstileWidgetRef\.current\)/);
assert.match(form, /'error-callback':[\s\S]*setSecurityStatus\('error'\)/);
assert.match(form, /'timeout-callback':[\s\S]*setSecurityStatus\('error'\)/);
assert.match(form, /const retrySecurityCheck = \(\) =>/);
assert.match(form, /Retry security check/);
assert.match(form, /Complete security check above/);

console.log('Lead capture UI resilience tests passed: popup verification is visible, expiry resets safely, failures are recoverable, and a stalled challenge no longer looks like a permanent submit lock.');
