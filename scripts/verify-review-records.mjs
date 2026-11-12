/**
 * Checks that every approved article's approval is real, where a machine can check it.
 *
 * A front-matter field saying "approved" is not proof. Each approved article links its approval in reviewRecord:
 *   - a GitHub pull-request review (https://github.com/<owner>/<repo>/pull/<n>#pullrequestreview-<id>): with a
 *     GITHUB_TOKEN (CI has one), this script confirms the review exists, its state is APPROVED, it was not left by
 *     the pull request's own author, and, if the article sets reviewerGitHub, that the reviewer is that account;
 *   - anything else (a Google Doc comment, a saved email): listed as "recorded, check by hand".
 *
 *   node scripts/verify-review-records.mjs            check (GitHub reviews skipped without GITHUB_TOKEN)
 *   node scripts/verify-review-records.mjs --strict   also fail when a GitHub review can't be checked
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const DIR = path.join(process.cwd(), 'content', 'knowledge-base');
const token = process.env.GITHUB_TOKEN;
const strict = process.argv.includes('--strict');
const problems = [];
const notes = [];

const approved = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith('.md') && f !== 'README.md')
  .map((f) => ({ file: f, data: matter(fs.readFileSync(path.join(DIR, f), 'utf8')).data }))
  .filter(({ data }) => data.status === 'approved');

async function github(url) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'website-review-check' } });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`);
  return res.json();
}

for (const { file, data } of approved) {
  const record = String(data.reviewRecord ?? '');
  const m = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)#pullrequestreview-(\d+)$/.exec(record);
  if (!m) {
    notes.push(`${file}: approval recorded outside GitHub (${record}); check by hand`);
    continue;
  }
  if (!token) {
    (strict ? problems : notes).push(`${file}: GitHub review not checked (no GITHUB_TOKEN)`);
    continue;
  }
  const [, owner, repo, pull, id] = m;
  try {
    const pr = await github(`https://api.github.com/repos/${owner}/${repo}/pulls/${pull}`);
    const review = await github(`https://api.github.com/repos/${owner}/${repo}/pulls/${pull}/reviews/${id}`);
    if (review.state !== 'APPROVED') problems.push(`${file}: review ${id} on PR #${pull} is ${review.state}, not APPROVED`);
    if (review.user?.login === pr.user?.login) problems.push(`${file}: review ${id} was left by the pull request's own author`);
    if (data.reviewerGitHub && review.user?.login?.toLowerCase() !== String(data.reviewerGitHub).toLowerCase()) {
      problems.push(`${file}: review ${id} is by ${review.user?.login}, but reviewerGitHub is ${data.reviewerGitHub}`);
    }
    if (!problems.some((p) => p.startsWith(file))) notes.push(`${file}: approved on PR #${pull} by ${review.user?.login}`);
  } catch (error) {
    problems.push(`${file}: couldn't check the GitHub review (${error.message})`);
  }
}

for (const note of notes) console.log(`  ${note}`);
if (problems.length) {
  console.error(`\nReview records: ${problems.length} problem(s):\n  - ${problems.join('\n  - ')}\n`);
  process.exit(1);
}
console.log(`Review records: ${approved.length} approved article(s) checked.`);
