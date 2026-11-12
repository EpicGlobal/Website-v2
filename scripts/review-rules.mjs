/**
 * Shared rules for recording an article approval. Used offline by scripts/build-articles.mjs and online (with the
 * GitHub API) by scripts/verify-review-records.mjs.
 *
 * Every approved article records the approval in "reviewRecord":
 *   - a GitHub pull-request review on this repository (preferred). "reviewerGitHub" names the reviewer's account.
 *   - a Google Doc comment or a saved email (any other https link). A link alone can't be checked by a machine, so
 *     "recordConfirmation" must link a GitHub approval on this repository, by someone other than the pull request's
 *     author, whose review text contains the reviewRecord link: that person opened the record and confirms it.
 * Either way the GitHub review must be on a pull request that changes the article, and the article at the reviewed
 * commit must match the final article (only the workflow fields below may change after the review).
 */
import matter from 'gray-matter';
import yaml from 'js-yaml';

/** The repository approvals must come from (CI sets GITHUB_REPOSITORY). */
export const EXPECTED_REPO = (process.env.GITHUB_REPOSITORY || 'EpicGlobal/Website-v2').toLowerCase();

/** https://github.com/<owner>/<repo>/pull/<n>#pullrequestreview-<id> */
export const GITHUB_REVIEW_URL = /^https:\/\/github\.com\/([^/\s]+)\/([^/\s]+)\/pull\/(\d+)#pullrequestreview-(\d+)$/i;

/** Front-matter fields that may change after the review (recording it, scheduling, list position). */
export const WORKFLOW_FIELDS = ['status', 'reviewedBy', 'reviewerRole', 'reviewedOn', 'reviewRecord', 'reviewerGitHub', 'recordConfirmation', 'publishOn', 'order', 'featured'];

/** Front matter with dates kept as text (same reader as the article build). */
export const readFrontMatter = (text) => matter(text, { engines: { yaml: (source) => yaml.load(source, { schema: yaml.JSON_SCHEMA }) } });

/** The parts of an article a reviewer approves: every field except the workflow fields, and the body. */
export function approvedContent(fileText) {
  const { data, content } = readFrontMatter(fileText.replace(/\r\n/g, '\n'));
  const fields = Object.fromEntries(Object.keys(data).filter((k) => !WORKFLOW_FIELDS.includes(k)).sort().map((k) => [k, data[k]]));
  return JSON.stringify({ fields, body: content.trim() });
}

/** Parses a GitHub review link; null when it isn't one. */
export function parseReviewUrl(url) {
  const m = GITHUB_REVIEW_URL.exec(String(url ?? '').trim());
  return m ? { owner: m[1], repo: m[2], pull: Number(m[3]), id: Number(m[4]), sameRepo: `${m[1]}/${m[2]}`.toLowerCase() === EXPECTED_REPO } : null;
}

/** Offline problems with an approved article's record fields (no network). */
export function recordFieldProblems({ reviewRecord, reviewerGitHub, recordConfirmation }) {
  const problems = [];
  if (!reviewRecord) return problems;
  const review = parseReviewUrl(reviewRecord);
  if (review) {
    if (!review.sameRepo) problems.push(`"reviewRecord" must be a review on ${EXPECTED_REPO}, not ${review.owner}/${review.repo}`);
    if (!reviewerGitHub) problems.push('"reviewerGitHub" is required with a GitHub review: the account that approved');
    if (recordConfirmation) problems.push('"recordConfirmation" is only for Google Doc or email approvals; a GitHub review is its own record');
  } else if (/^https:\/\/github\.com\//i.test(reviewRecord)) {
    problems.push('"reviewRecord" on GitHub must link the review itself (…/pull/<n>#pullrequestreview-<id>)');
  } else {
    const confirmation = parseReviewUrl(recordConfirmation);
    if (!confirmation) problems.push('a Google Doc or email approval needs "recordConfirmation": a GitHub approval on the pull request whose review text contains the reviewRecord link');
    else if (!confirmation.sameRepo) problems.push(`"recordConfirmation" must be a review on ${EXPECTED_REPO}`);
  }
  return problems;
}
