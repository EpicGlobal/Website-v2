import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const deploy = await readFile(path.resolve('deploy/aws/deploy-lead-gateway-production.ps1'), 'utf8');
const validate = await readFile(path.resolve('deploy/aws/validate-lead-gateway-production.ps1'), 'utf8');

assert.match(deploy, /ExpectedAccountId = "897689477180"/);
assert.match(deploy, /Region = "us-east-2"/);
assert.match(deploy, /CopperlineLeadIntakeUrl = "https:\/\/crm\.epicglobalinc\.com\/api\/v1\/lead-intake"/);
assert.match(deploy, /DEPLOY_EPIC_LEAD_GATEWAY_PRODUCTION/);
assert.match(deploy, /if \(\$Apply -and \$Confirm -ne \$confirmation\)/);
assert.match(deploy, /Turnstile test site keys are forbidden for production/);
assert.match(deploy, /A real Cloudflare Turnstile production secret is required/);
assert.match(deploy, /Require-ExactSet \$originValues \$expectedOrigins/);
assert.match(deploy, /Require-ExactSet \$hostnameValues \$expectedHostnames/);
assert.match(deploy, /\$sourceStatus\.tenantId -ne \$ExpectedTenantId/);
assert.match(deploy, /\$sourceStatus\.mode -ne "live"/);
assert.match(deploy, /\$sourceStatus\.processingEnabled -ne \$true/);
assert.match(deploy, /\$sourceStatus\.createDeal -ne \$false/);
assert.match(deploy, /cloudflare-turnstile/);
assert.match(deploy, /"ManagedRulesMode=Enforce"/);
assert.match(deploy, /NEXT_PUBLIC_LEAD_CAPTURE_PROVIDER = "hubspot"/);

assert.match(validate, /ManagedRulesMode -eq "Enforce"/);
assert.match(validate, /SampledRequestsEnabled -eq \$false/);
assert.match(validate, /loggingLevel -ne "OFF"/);
assert.match(validate, /TURNSTILE_ALLOW_TEST_KEYS -eq "false"/);
assert.match(validate, /ReservedConcurrentExecutions -eq 10/);
assert.match(validate, /ActionsEnabled -eq \$true/);
assert.match(validate, /ApiName.*epic-website-lead-gateway-production/s);
assert.match(validate, /https:\/\/attacker\.example/);
assert.doesNotMatch(deploy, /NEXT_PUBLIC_LEAD_CAPTURE_PROVIDER = "copperline"/);

console.log('Production lead gateway guard tests passed: account and region pinning, explicit confirmation, real Turnstile keys, exact origins, live tenant-bound source preflight, enforced WAF, active alarms, PII-safe logging, and HubSpot-preserving deployment.');
