/**
 * Runs scripts/build-articles.mjs against small sample articles in a temporary folder and checks that every
 * kind of mistake stops the build with the right message, and that a correctly approved article passes.
 */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const repo = process.cwd();
const script = path.join(repo, 'scripts', 'build-articles.mjs');
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Denver' }).format(new Date());

function fixtureRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'kb-check-'));
  fs.cpSync(path.join(repo, 'app'), path.join(root, 'app'), { recursive: true });
  fs.mkdirSync(path.join(root, 'src', 'app', 'data'), { recursive: true });
  fs.copyFileSync(path.join(repo, 'src', 'app', 'data', 'caseStudies.ts'), path.join(root, 'src', 'app', 'data', 'caseStudies.ts'));
  fs.mkdirSync(path.join(root, 'content', 'knowledge-base'), { recursive: true });
  fs.writeFileSync(path.join(root, 'content', 'llms.txt'), '# Epic\n');
  return root;
}

const base = {
  title: '"Sample Article"', summary: '"A sample."', category: '"Guides"', type: '"Answer Page"', difficulty: '"Intro"',
  updated: '2026-11-01', tags: '["sample"]', order: '1', status: 'approved', author: '"Sample Writer"',
  reviewedBy: '"Sample Reviewer"', reviewerRole: '"Brand Manager"', reviewedOn: '2026-11-02',
  reviewRecord: '"https://github.com/EpicGlobal/Website-v2/pull/1#pullrequestreview-1"',
};
const article = (fields, body = '## Section\n\nText with a [link](/our-model).') => {
  const data = { ...base, ...fields };
  const lines = Object.entries(data).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}: ${v}`);
  return `---\n${lines.join('\n')}\n---\n\n${body}\n`;
};

function check(files) {
  const root = fixtureRoot();
  for (const [name, text] of Object.entries(files)) fs.writeFileSync(path.join(root, 'content', 'knowledge-base', name), text);
  const result = spawnSync(process.execPath, [script], { cwd: root, encoding: 'utf8' });
  fs.rmSync(root, { recursive: true, force: true });
  return { ok: result.status === 0, output: `${result.stdout}${result.stderr}` };
}

const expectFail = (label, files, message) => {
  const { ok, output } = check(files);
  assert.ok(!ok, `${label}: should fail`);
  assert.match(output, message, `${label}: wrong message:\n${output}`);
};

// Passes: a correctly approved article, a scheduled approved article, a draft, a pre-workflow live article.
const good = check({
  'good.md': article({}),
  'scheduled.md': article({ title: '"Scheduled"', order: '2', publishOn: '2030-01-05' }),
  'draft.md': article({ title: '"Draft"', order: '3', status: 'draft', author: undefined, reviewedBy: undefined, reviewerRole: undefined, reviewedOn: undefined, reviewRecord: undefined }, ''),
  'old.md': article({ title: '"Old"', order: '4', status: 'live-unreviewed', published: '2026-01-23', updated: '2026-11-05', author: undefined, reviewedBy: undefined, reviewerRole: undefined, reviewedOn: undefined, reviewRecord: undefined }),
});
assert.ok(good.ok, `valid articles should pass:\n${good.output}`);

const plain = { status: 'review', author: undefined, reviewedBy: undefined, reviewerRole: undefined, reviewedOn: undefined, reviewRecord: undefined };
expectFail('impossible date', { 'a.md': article({ updated: '2026-02-30' }) }, /must be a real date/);
expectFail('published after publishOn', { 'a.md': article({ published: '2026-12-01', publishOn: '2026-11-20' }) }, /is after "publishOn"/);
expectFail('updated before published', { 'a.md': article({ published: '2026-11-10', updated: '2026-11-01', reviewedOn: '2026-11-11' }) }, /is before "published"/);
expectFail('duplicate title', { 'a.md': article({}), 'b.md': article({ order: '2' }) }, /same title as a\.md/);
expectFail('duplicate order', { 'a.md': article({}), 'b.md': article({ title: '"Other"' }) }, /same "order" number/);
expectFail('broken article link', { 'a.md': article({}, 'See [x](/knowledge-base/does-not-exist).') }, /which isn't a page on the site/);
expectFail('broken page link', { 'a.md': article({}, 'See [x](/no-such-page).') }, /which isn't a page on the site/);
expectFail('approved without a record', { 'a.md': article({ reviewRecord: undefined }) }, /needs "reviewRecord"/);
expectFail('approved without a reviewer', { 'a.md': article({ reviewedBy: undefined }) }, /needs "reviewedBy"/);
expectFail('record is not a link', { 'a.md': article({ reviewRecord: '"Glen said OK"' }) }, /must be a https:\/\/ link/);
expectFail('review in the future', { 'a.md': article({ reviewedOn: '2030-01-01', updated: '2026-11-01' }) }, /is in the future/);
expectFail('review after go-live', { 'a.md': article({ publishOn: today, reviewedOn: today, updated: '2026-11-01' }).replace(`reviewedOn: ${today}`, 'reviewedOn: 2030-01-01') }, /in the future|after "publishOn"/);
expectFail('review before the final edit', { 'a.md': article({ updated: '2026-11-05', reviewedOn: '2026-11-02' }) }, /before the last edit/);
expectFail('reviewer on an unapproved article', { 'a.md': article({ ...plain, reviewedBy: '"Someone"' }) }, /review details belong only on an approved article/);
expectFail('new article marked live-unreviewed', { 'a.md': article({ ...plain, status: 'live-unreviewed', updated: '2026-12-01' }) }, /only for articles that went live by/);
expectFail('unknown status', { 'a.md': article({ status: 'published' }) }, /"status" must be one of/);
expectFail('missing status', { 'a.md': article({ ...plain, status: undefined }) }, /"status" is required/);
expectFail('named competitor', { 'a.md': article({}, 'Unlike Pattern Group, we buy inventory.') }, /names a competitor/);
expectFail('payment terms', { 'a.md': article({}, 'We pay on net 60 terms.') }, /payment terms/);
expectFail('wholesale percentage', { 'a.md': article({}, 'We pay 40% of retail price.') }, /wholesale percentage/);
expectFail('HTML', { 'a.md': article({}, '<div>hi</div>') }, /HTML tags are not allowed/);

console.log('Article check tests passed: impossible dates, date order, duplicate titles, broken links, missing or fake review records, competitor names and internal figures all stop the build; valid approved, scheduled, draft and pre-workflow articles pass.');
