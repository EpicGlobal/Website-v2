/**
 * Regression tests for scripts/verify-review-records.mjs, against a fake GitHub (no network, no real approvals).
 * Each case is an approved article whose record is checked; only a genuine approval of the final text passes.
 */
import assert from 'node:assert/strict';
import { verifyApproval } from './verify-review-records.mjs';

const REPO = 'https://github.com/EpicGlobal/Website-v2';
const FILE = 'sample-article.md';
const PATH = `content/knowledge-base/${FILE}`;
const DOC = 'https://docs.google.com/document/d/sample/edit?disco=AAAA';

const reviewedText = `---
title: "Sample Article"
summary: "A sample."
updated: 2026-11-01
author: "Sample Writer"
status: review
---

## Section

The approved text.
`;

/** The final file: the reviewed text plus the recorded approval and a schedule (workflow fields only). */
const finalText = (fields, body = 'The approved text.') => `---
title: "Sample Article"
summary: "A sample."
updated: 2026-11-01
status: approved
publishOn: 2026-11-20
author: "Sample Writer"
reviewedBy: "Sample Reviewer"
reviewerRole: "Brand Manager"
reviewedOn: 2026-11-02
${Object.entries(fields).map(([k, v]) => `${k}: "${v}"`).join('\n')}
---

## Section

${body}
`;

/** A fake GitHub: PR 7 by "brex-author" changes the article; reviews are listed by id. */
function fakeGitHub({ reviews, prFiles = [PATH], textAtCommit = reviewedText, dismissals = {} }) {
  return {
    dismissal: async (o, r, n, id) => dismissals[id] ?? null,
    pull: async () => ({ user: { login: 'brex-author' } }),
    review: async (o, r, n, id) => {
      if (!reviews[id]) throw new Error('GitHub API 404');
      return { commit_id: 'abc1234', ...reviews[id] };
    },
    files: async () => prFiles,
    fileAt: async () => textAtCommit,
  };
}
const person = (login) => ({ login, type: 'User' });
const ok = async (label, text, gh) => assert.deepEqual(await verifyApproval({ file: FILE, text }, gh), [], label);
const bad = async (label, text, gh, message) => {
  const problems = await verifyApproval({ file: FILE, text }, gh);
  assert.ok(problems.some((p) => message.test(p)), `${label}: expected ${message}, got:\n${problems.join('\n') || '(no problems)'}`);
};

const ghRecord = { reviewRecord: `${REPO}/pull/7#pullrequestreview-1`, reviewerGitHub: 'alec-reviewer' };
const docRecord = { reviewRecord: DOC, recordConfirmation: `${REPO}/pull/7#pullrequestreview-2` };
const approvedBy = (login, extra = {}) => ({ state: 'APPROVED', user: person(login), body: '', ...extra });

// GitHub approval.
await ok('genuine GitHub approval of the final text', finalText(ghRecord), fakeGitHub({ reviews: { 1: approvedBy('alec-reviewer') } }));
await ok('approval made stale by the commit that records it', finalText(ghRecord), fakeGitHub({ reviews: { 1: approvedBy('alec-reviewer', { state: 'DISMISSED' }) }, dismissals: { 1: { byCommit: 'def5678', message: null } } }));
await bad('approval dismissed by a person', finalText(ghRecord), fakeGitHub({ reviews: { 1: approvedBy('alec-reviewer', { state: 'DISMISSED' }) }, dismissals: { 1: { byCommit: null, message: 'Not approved after all' } } }), /dismissed \("Not approved after all"\)/);
await bad('dismissed with no record of why', finalText(ghRecord), fakeGitHub({ reviews: { 1: approvedBy('alec-reviewer', { state: 'DISMISSED' }) } }), /needs a new approval/);
await bad('stale approval, but the text changed', finalText(ghRecord, 'Edited after approval.'), fakeGitHub({ reviews: { 1: approvedBy('alec-reviewer', { state: 'DISMISSED' }) }, dismissals: { 1: { byCommit: 'def5678', message: null } } }), /changed after review 1/);
await bad('review id does not exist', finalText(ghRecord), fakeGitHub({ reviews: {} }), /couldn't check/);
await bad('review only commented', finalText(ghRecord), fakeGitHub({ reviews: { 1: { state: 'COMMENTED', user: person('alec-reviewer') } } }), /not APPROVED/);
await bad('approved by a bot', finalText({ ...ghRecord, reviewerGitHub: 'helper[bot]' }), fakeGitHub({ reviews: { 1: { state: 'APPROVED', user: { login: 'helper[bot]', type: 'Bot' } } } }), /bot/);
await bad('author approved their own PR', finalText({ ...ghRecord, reviewerGitHub: 'brex-author' }), fakeGitHub({ reviews: { 1: approvedBy('brex-author') } }), /own author/);
await bad('reviewer is not reviewerGitHub', finalText(ghRecord), fakeGitHub({ reviews: { 1: approvedBy('someone-else') } }), /reviewerGitHub is alec-reviewer/);
await bad('review on another repository', finalText({ ...ghRecord, reviewRecord: 'https://github.com/vercel/next.js/pull/7#pullrequestreview-1' }), fakeGitHub({ reviews: { 1: approvedBy('alec-reviewer') } }), /must be a review on epicglobal\/website-v2/);
await bad('PR does not change the article', finalText(ghRecord), fakeGitHub({ reviews: { 1: approvedBy('alec-reviewer') }, prFiles: ['README.md'] }), /doesn't change/);
await bad('body edited after approval', finalText(ghRecord, 'The approved text, plus a new claim.'), fakeGitHub({ reviews: { 1: approvedBy('alec-reviewer') } }), /changed after review 1/);
await bad('title edited after approval', finalText(ghRecord).replace('title: "Sample Article"', 'title: "New Title"'), fakeGitHub({ reviews: { 1: approvedBy('alec-reviewer') } }), /changed after/);
await bad('GitHub approval without reviewerGitHub', finalText({ reviewRecord: ghRecord.reviewRecord }), fakeGitHub({ reviews: { 1: approvedBy('alec-reviewer') } }), /reviewerGitHub" is required/);

// Google Doc or email approval, confirmed on GitHub.
await ok('genuine Doc approval, confirmed on GitHub', finalText(docRecord), fakeGitHub({ reviews: { 2: approvedBy('jorgen-reviewer', { body: `Opened ${DOC}: the reviewer approved this text.` }) } }));
await bad('Doc approval with no confirmation', finalText({ reviewRecord: DOC }), fakeGitHub({ reviews: {} }), /needs "recordConfirmation"/);
await bad('confirmation does not quote the record', finalText(docRecord), fakeGitHub({ reviews: { 2: approvedBy('jorgen-reviewer', { body: 'LGTM' }) } }), /doesn't contain the reviewRecord link/);
await bad('confirmation by the PR author', finalText(docRecord), fakeGitHub({ reviews: { 2: approvedBy('brex-author', { body: DOC }) } }), /own author/);
await bad('confirmation of an older version', finalText(docRecord, 'Changed after the confirmation.'), fakeGitHub({ reviews: { 2: approvedBy('jorgen-reviewer', { body: DOC }) } }), /changed after confirmation 2/);
await bad('confirmation on another repository', finalText({ ...docRecord, recordConfirmation: 'https://github.com/someone/else/pull/1#pullrequestreview-2' }), fakeGitHub({ reviews: {} }), /must be a review on/);

console.log('Review record tests passed: only a genuine approval of the final text passes (also when a later commit made it stale); made-up, bot, self, other-repo, wrong-reviewer, unconfirmed, hand-dismissed and outdated approvals fail.');
