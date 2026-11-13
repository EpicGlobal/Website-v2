/**
 * Public-content guard (runs in CI and before every push to the preview branch):
 *   - no named competitors and no internal figures in public page text, FAQs, case studies or llms.txt
 *   - no dollar amounts in case studies (purchase prices are confidential)
 *   - nobody is shown as a reviewer unless an article records the review (no automatic founder byline)
 * Articles themselves are checked by scripts/build-articles.mjs with the same rules.
 */
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { dollarAmounts, scanContent } from './content-rules.mjs';

const read = (file) => readFile(path.resolve(file), 'utf8');
const pages = (await readdir('src/app/pages')).filter((f) => f.endsWith('.tsx')).map((f) => `src/app/pages/${f}`);
const under = async (dir, ext) =>
  (await readdir(dir, { recursive: true }))
    .map((f) => `${dir}/${f.split(path.sep).join('/')}`)
    .filter((f) => ext.test(f) && !f.includes('/components/ui/') && !f.endsWith('.generated.ts'));
// Everything that renders public text: pages, every component, route files and metadata, site settings, data
// (articles are checked by build-articles.mjs; their generated copies are skipped), llms.txt and public text files.
const publicFiles = [
  ...(await under('src/app', /\.(tsx?|md)$/)),
  ...(await under('app', /\.(tsx?)$/)),
  ...(await under('src/site', /\.tsx?$/)),
  ...(await under('public', /\.(txt|html|xml|json|webmanifest)$/)),
  'content/llms.txt',
];

const problems = [];
for (const file of publicFiles) {
  for (const problem of scanContent(await read(file))) problems.push(`${file}: ${problem}`);
}

const studies = await read('src/app/data/caseStudies.ts');
const prices = dollarAmounts(studies);
if (prices.length) problems.push(`src/app/data/caseStudies.ts: dollar amounts ${prices.join(', ')}; purchase prices are confidential, use approved percentages`);
for (const m of studies.matchAll(/basis: '(\w+)'/g)) {
  if (!['measured', 'estimate', 'offer'].includes(m[1])) problems.push(`caseStudies.ts: unknown metric basis "${m[1]}"`);
}

const byline = await read('src/app/components/reading/Byline.tsx');
const schema = await read('src/app/components/StructuredData.tsx');
if (/founderName|founderRef|Glen/.test(byline)) problems.push('Byline.tsx names the founder; reviewers come only from a recorded review');
if (/reviewedBy:\s*founder/.test(schema)) problems.push('StructuredData.tsx sets the founder as reviewer');
for (const file of [...pages, 'src/app/data/caseStudies.ts']) {
  if (/Reviewed by (Glen|\{siteConfig\.founderName)/.test(await read(file))) problems.push(`${file}: hard-coded "Reviewed by" credit`);
}

assert.deepEqual(problems, [], `\n  - ${problems.join('\n  - ')}`);
console.log(`Public content checks passed: ${publicFiles.length} files have no named competitors or internal figures, case studies show no prices, and no reviewer is credited without a recorded review.`);
