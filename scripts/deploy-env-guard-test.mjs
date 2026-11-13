/** Checks scripts/check-deploy-env.mjs and normalizeSiteUrl() against each branch and flag combination. */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';

const run = (env) => {
  const clean = Object.fromEntries(Object.entries(process.env).filter(([k]) => !['AWS_BRANCH', 'DEPLOY_GUARD_BRANCH', 'NEXT_PUBLIC_WEBSITE_PREVIEW', 'NEXT_PUBLIC_SITE_URL'].includes(k)));
  return spawnSync(process.execPath, ['scripts/check-deploy-env.mjs'], { env: { ...clean, ...env }, encoding: 'utf8' }).status;
};
const preview = 'codex/website-brexton-preview-20261026';

assert.equal(run({}), 0, 'no branch: report only');
assert.equal(run({ AWS_BRANCH: 'main' }), 0, 'production without the preview flag');
assert.equal(run({ AWS_BRANCH: 'main', NEXT_PUBLIC_SITE_URL: 'https://epicglobalinc.com' }), 0, 'bare domain is corrected in code');
assert.equal(run({ AWS_BRANCH: 'main', NEXT_PUBLIC_SITE_URL: 'https://www.epicglobalinc.com' }), 0);
assert.equal(run({ AWS_BRANCH: 'main', NEXT_PUBLIC_WEBSITE_PREVIEW: 'true' }), 1, 'production must not inherit the preview flag');
assert.equal(run({ AWS_BRANCH: 'main', NEXT_PUBLIC_SITE_URL: 'https://main.d123.amplifyapp.com' }), 1, 'production canonical on another host');
assert.equal(run({ AWS_BRANCH: preview, NEXT_PUBLIC_WEBSITE_PREVIEW: 'true' }), 0, 'preview with the flag');
assert.equal(run({ AWS_BRANCH: preview }), 1, 'preview without the flag would be indexable');
assert.equal(run({ AWS_BRANCH: preview, NEXT_PUBLIC_WEBSITE_PREVIEW: 'TRUE' }), 1, 'only exactly "true" counts');
assert.equal(run({ AWS_BRANCH: 'feature/x', NEXT_PUBLIC_WEBSITE_PREVIEW: 'false' }), 1, 'every non-main branch is a preview');

// normalizeSiteUrl: the bare domain becomes www; preview and local addresses are kept.
const source = await readFile('src/site/site-config.ts', 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const exports = {};
vm.runInNewContext(js, { exports, require: () => ({}), process: { env: {} }, URL });
const { normalizeSiteUrl } = exports;
assert.equal(normalizeSiteUrl(undefined), 'https://www.epicglobalinc.com');
assert.equal(normalizeSiteUrl('https://epicglobalinc.com/'), 'https://www.epicglobalinc.com');
assert.equal(normalizeSiteUrl('http://epicglobalinc.com'), 'https://www.epicglobalinc.com');
assert.equal(normalizeSiteUrl('https://www.epicglobalinc.com'), 'https://www.epicglobalinc.com');
assert.equal(normalizeSiteUrl('http://127.0.0.1:3000/'), 'http://127.0.0.1:3000');
assert.equal(normalizeSiteUrl('not a url'), 'https://www.epicglobalinc.com');

console.log('Deploy guard tests passed: production refuses the preview flag and foreign canonical hosts, every other branch must be noindex, and the bare domain becomes www.');
