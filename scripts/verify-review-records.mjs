/**
 * Checks that every approved article's approval is real and covers the final text, using the GitHub API.
 * A front-matter field saying "approved" is not proof; the rules are in scripts/review-rules.mjs.
 *
 * For the GitHub review that backs each approval (reviewRecord for a GitHub approval, recordConfirmation for a
 * Google Doc or email approval) this confirms that:
 *   - it is on this repository, its state is APPROVED, it was left by a person (not a bot) other than the pull
 *     request's author. A review GitHub dismissed automatically because a later commit arrived (main dismisses
 *     stale approvals, and recording the approval is itself a later commit) still counts, because the article
 *     check below proves the approved text didn't change. A review someone dismissed by hand never counts;
 *   - the pull request changes this article, and the article at the reviewed commit matches the final article
 *     (only workflow fields such as status, the review fields and publishOn may change afterwards);
 *   - GitHub approval: the reviewer is the "reviewerGitHub" account;
 *   - Google Doc or email approval: the review text contains the reviewRecord link (the confirmer opened it).
 *
 *   node scripts/verify-review-records.mjs            check (skips with a note when there's no GITHUB_TOKEN)
 *   node scripts/verify-review-records.mjs --strict   fail when an approval can't be checked (CI uses this)
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { approvedContent, parseReviewUrl, readFrontMatter, recordFieldProblems } from './review-rules.mjs';

const ARTICLE_DIR = 'content/knowledge-base';

/** GitHub REST client. Tests pass their own `api` with the same shape. */
export function githubApi(token) {
  const get = async (url) => {
    const res = await fetch(`https://api.github.com${url}`, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'website-review-check' } });
    if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`);
    return res.json();
  };
  return {
    pull: (o, r, n) => get(`/repos/${o}/${r}/pulls/${n}`),
    review: (o, r, n, id) => get(`/repos/${o}/${r}/pulls/${n}/reviews/${id}`),
    async files(o, r, n) {
      const names = [];
      for (let page = 1; page <= 30; page += 1) {
        const batch = await get(`/repos/${o}/${r}/pulls/${n}/files?per_page=100&page=${page}`);
        names.push(...batch.map((f) => f.filename));
        if (batch.length < 100) break;
      }
      return names;
    },
    /** How a review was dismissed: { byCommit, message } from the pull request's timeline, or null. */
    async dismissal(o, r, n, id) {
      for (let page = 1; page <= 30; page += 1) {
        const events = await get(`/repos/${o}/${r}/issues/${n}/timeline?per_page=100&page=${page}`);
        const hit = events.find((e) => e.event === 'review_dismissed' && e.dismissed_review?.review_id === id);
        if (hit) return { byCommit: hit.dismissed_review.dismissal_commit_id ?? null, message: hit.dismissed_review.dismissal_message ?? null };
        if (events.length < 100) return null;
      }
      return null;
    },
    async fileAt(o, r, filePath, ref) {
      const file = await get(`/repos/${o}/${r}/contents/${filePath.split('/').map(encodeURIComponent).join('/')}?ref=${ref}`);
      return Buffer.from(file.content, 'base64').toString('utf8');
    },
  };
}

/** Problems with one approved article's approval ([] when it checks out). */
export async function verifyApproval({ file, text }, api) {
  const { data } = readFrontMatter(text);
  const say = (msg) => `${file}: ${msg}`;
  const reviewRecord = String(data.reviewRecord ?? '').trim();
  const offline = recordFieldProblems({ reviewRecord, reviewerGitHub: data.reviewerGitHub, recordConfirmation: data.recordConfirmation });
  if (!reviewRecord) return [say('approved without a reviewRecord')];
  if (offline.length) return offline.map(say);

  const viaGitHub = Boolean(parseReviewUrl(reviewRecord));
  const link = viaGitHub ? reviewRecord : String(data.recordConfirmation).trim();
  const { owner, repo, pull, id } = parseReviewUrl(link);
  const label = viaGitHub ? `review ${id} on PR #${pull}` : `confirmation ${id} on PR #${pull}`;
  const problems = [];
  try {
    const [pr, review] = await Promise.all([api.pull(owner, repo, pull), api.review(owner, repo, pull, id)]);
    const login = review.user?.login ?? '';
    if (review.state === 'DISMISSED') {
      const how = api.dismissal ? await api.dismissal(owner, repo, pull, id) : null;
      if (!how?.byCommit || how.message) problems.push(`${label} was dismissed${how?.message ? ` ("${how.message}")` : ''}, not just made stale by a later commit; it needs a new approval`);
    } else if (review.state !== 'APPROVED') problems.push(`${label} is ${review.state}, not APPROVED`);
    if (review.user?.type === 'Bot' || /\[bot\]$/i.test(login)) problems.push(`${label} was left by a bot (${login})`);
    if (login.toLowerCase() === String(pr.user?.login ?? '').toLowerCase()) problems.push(`${label} was left by the pull request's own author (${login})`);
    if (viaGitHub && login.toLowerCase() !== String(data.reviewerGitHub).trim().toLowerCase()) problems.push(`${label} is by ${login}, but reviewerGitHub is ${data.reviewerGitHub}`);
    if (!viaGitHub && !String(review.body ?? '').includes(reviewRecord)) problems.push(`${label} doesn't contain the reviewRecord link; the confirmer must paste it into the review`);

    const articlePath = `${ARTICLE_DIR}/${file}`;
    if (!(await api.files(owner, repo, pull)).includes(articlePath)) problems.push(`PR #${pull} doesn't change ${articlePath}, so its review didn't cover this article`);
    else {
      let reviewed = null;
      try {
        reviewed = await api.fileAt(owner, repo, articlePath, review.commit_id);
      } catch {
        problems.push(`${articlePath} can't be read at the reviewed commit ${String(review.commit_id).slice(0, 7)}`);
      }
      if (reviewed !== null && approvedContent(reviewed) !== approvedContent(text)) {
        problems.push(`the article changed after ${label} (commit ${String(review.commit_id).slice(0, 7)}); the final text needs a new approval`);
      }
    }
  } catch (error) {
    problems.push(`couldn't check ${label} (${error.message})`);
  }
  return problems.map(say);
}

async function main() {
  const dir = path.join(process.cwd(), ARTICLE_DIR);
  const strict = process.argv.includes('--strict');
  const approved = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((file) => ({ file, text: fs.readFileSync(path.join(dir, file), 'utf8') }))
    .filter(({ text }) => readFrontMatter(text).data.status === 'approved');

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    const message = `Review records: ${approved.length} approved article(s) not checked (no GITHUB_TOKEN).`;
    if (strict && approved.length) {
      console.error(message);
      process.exit(1);
    }
    console.log(message);
    return;
  }
  const api = githubApi(token);
  const problems = (await Promise.all(approved.map((a) => verifyApproval(a, api)))).flat();
  if (problems.length) {
    console.error(`\nReview records: ${problems.length} problem(s):\n  - ${problems.join('\n  - ')}\n`);
    process.exit(1);
  }
  console.log(`Review records: ${approved.length} approved article(s) checked against GitHub; each approval covers the final text.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
