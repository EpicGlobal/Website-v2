/**
 * Knowledge Base articles: content/knowledge-base/<slug>.md  ->  src/app/data/*.generated.ts
 *
 * Runs before every build and dev start (npm "prebuild" / "predev"), so adding or editing an article is just
 * editing its Markdown file. It checks every file and stops the build with a clear message if something is wrong
 * (missing field, impossible date, dates in the wrong order, duplicate title, unknown block, broken internal link,
 * a review claim without a record, or text that breaks the content rules in scripts/content-rules.mjs).
 *
 *   node scripts/build-articles.mjs          write the generated files
 *   node scripts/build-articles.mjs --check  only check (no writes)
 *
 * How to write, review and schedule an article: see content/knowledge-base/README.md.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
// js-yaml comes with gray-matter (pinned in package-lock). Its JSON schema reads dates as plain text, so an
// impossible date like 2026-02-30 reaches the date check instead of silently becoming March 2.
import yaml from 'js-yaml';
import { scanContent } from './content-rules.mjs';
import { recordFieldProblems } from './review-rules.mjs';

const readFrontMatter = (text) => matter(text, { engines: { yaml: (source) => yaml.load(source, { schema: yaml.JSON_SCHEMA }) } });

const ROOT = process.cwd();
const DIR = path.join(ROOT, 'content', 'knowledge-base');
const OUT_META = path.join(ROOT, 'src', 'app', 'data', 'knowledgeArticles.generated.ts');
const OUT_BODY = path.join(ROOT, 'src', 'app', 'data', 'articleBodies.generated.ts');
const LLMS_IN = path.join(ROOT, 'content', 'llms.txt');
const OUT_LLMS = path.join(ROOT, 'src', 'app', 'data', 'llms.generated.ts');
const CHECK_ONLY = process.argv.includes('--check');

const TYPES = ['Answer Page', 'Playbook', 'Checklist', 'Glossary', 'Template', 'Deep Dive'];
const LEVELS = ['Intro', 'Operator', 'Advanced'];
const BLOCKS = ['card', 'callout', 'warning', 'grid', 'checks', 'warnings', 'links', 'step', 'term', 'tagline', 'accent', 'small'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Review status. Only "approved" and "live-unreviewed" articles can ever be published.
 *   draft            being written; never published
 *   review           sent to a reviewer; never published
 *   approved         a named reviewer approved it, with the date and a link to the approval (PR review, doc, email)
 *   live-unreviewed  went live before the review workflow started (WORKFLOW_START); shows no reviewer
 */
const STATUSES = ['draft', 'review', 'approved', 'live-unreviewed'];
const PUBLISHABLE = ['approved', 'live-unreviewed'];
/** The day the review workflow started. Only articles first published on or before it may be "live-unreviewed". */
const WORKFLOW_START = '2026-11-12';

const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);

/** Today's date in Utah (America/Denver), as YYYY-MM-DD. */
const utahToday = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Denver', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

/** Dates stay YYYY-MM-DD text (see readFrontMatter); reject days that don't exist (2026-02-30). */
function day(value, file, field, required) {
  if (value === undefined || value === null || value === '') {
    if (required) fail(file, `"${field}" is required (YYYY-MM-DD)`);
    return undefined;
  }
  const raw = value instanceof Date ? value.toISOString().slice(0, 10) : String(value).trim();
  const parsed = new Date(`${raw}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== raw) {
    fail(file, `"${field}" must be a real date like 2026-11-16, got "${raw}"`);
    return undefined;
  }
  if (raw < '2020-01-01' || raw > '2030-12-31') fail(file, `"${field}" (${raw}) looks wrong; check the year`);
  return raw;
}

const text = (value) => (value === undefined || value === null ? '' : String(value).trim());

const longDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

/** Every page address the site has (every app page.tsx without [dynamic] parts, published case studies, feeds). */
function siteRoutes() {
  const routes = new Set();
  const walk = (dir, prefix) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (entry.name.startsWith('[') || entry.name.startsWith('_') || entry.name === 'api') continue;
        const segment = entry.name.startsWith('(') ? '' : `/${entry.name}`;
        walk(path.join(dir, entry.name), prefix + segment);
      } else if (entry.name === 'page.tsx') routes.add(prefix || '/');
    }
  };
  walk(path.join(ROOT, 'app'), '');
  const studies = fs.readFileSync(path.join(ROOT, 'src', 'app', 'data', 'caseStudies.ts'), 'utf8');
  for (const m of studies.matchAll(/slug: '([a-z0-9-]+)',\s*\r?\n\s*status: 'published'/g)) routes.add(`/case-studies/${m[1]}`);
  for (const file of ['llms.txt', 'llms-full.txt', 'knowledge-base/rss.xml', 'sitemap.xml', 'robots.txt']) routes.add(`/${file}`);
  return routes;
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md') && f !== 'README.md').sort();
const articles = [];
const bodies = {};
const today = utahToday();

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail(file, 'file name must be lowercase words joined by hyphens, like my-new-article.md');
  const { data, content } = readFrontMatter(fs.readFileSync(path.join(DIR, file), 'utf8'));
  for (const field of ['title', 'summary', 'category', 'type', 'difficulty', 'tags', 'order', 'status']) {
    if (data[field] === undefined || data[field] === null || data[field] === '') fail(file, `"${field}" is required`);
  }
  if (data.type && !TYPES.includes(data.type)) fail(file, `"type" must be one of: ${TYPES.join(', ')}`);
  if (data.difficulty && !LEVELS.includes(data.difficulty)) fail(file, `"difficulty" must be one of: ${LEVELS.join(', ')}`);
  if (data.tags && !Array.isArray(data.tags)) fail(file, '"tags" must be a list, like [ads, amazon]');
  if (data.related && !Array.isArray(data.related)) fail(file, '"related" must be a list of article file names');
  if (data.order !== undefined && data.order !== null && !Number.isInteger(Number(data.order))) fail(file, '"order" must be a whole number');

  const updated = day(data.updated, file, 'updated', true);
  const publishOn = day(data.publishOn, file, 'publishOn', false);
  const publishedOn = day(data.published, file, 'published', false);
  const reviewedOn = day(data.reviewedOn, file, 'reviewedOn', false);
  const body = content.trim();

  // Dates in the right order.
  if (publishedOn && publishOn && publishedOn > publishOn) fail(file, `"published" (${publishedOn}) is after "publishOn" (${publishOn})`);
  if (updated && publishedOn && updated < publishedOn) fail(file, `"updated" (${updated}) is before "published" (${publishedOn}); "updated" is the last edit, so it can't be earlier`);

  // Review status and the review record.
  const status = text(data.status);
  const author = text(data.author);
  const reviewedBy = text(data.reviewedBy);
  const reviewerRole = text(data.reviewerRole);
  const reviewRecord = text(data.reviewRecord);
  const first = publishedOn ?? publishOn ?? updated;
  if (status && !STATUSES.includes(status)) fail(file, `"status" must be one of: ${STATUSES.join(', ')}`);
  const reviewFields = { reviewedBy, reviewerRole, reviewedOn: text(data.reviewedOn), reviewRecord };
  if (status === 'approved') {
    for (const [field, value] of Object.entries({ author, ...reviewFields })) {
      if (!value) fail(file, `"status: approved" needs "${field}" (who wrote it, who approved it, their role, the date and a link to the approval)`);
    }
    if (reviewRecord && !/^https:\/\/\S+$/.test(reviewRecord)) fail(file, '"reviewRecord" must be a https:// link to the approval (GitHub PR review, Google Doc, or saved email)');
    else for (const problem of recordFieldProblems({ reviewRecord, reviewerGitHub: text(data.reviewerGitHub), recordConfirmation: text(data.recordConfirmation) })) fail(file, problem);
    if (reviewedOn && reviewedOn > today) fail(file, `"reviewedOn" (${reviewedOn}) is in the future; record a review only after it happens`);
    if (reviewedOn && publishOn && reviewedOn > publishOn) fail(file, `"reviewedOn" (${reviewedOn}) is after "publishOn" (${publishOn}); it must be approved before it goes live`);
    if (reviewedOn && updated && reviewedOn < updated) fail(file, `"reviewedOn" (${reviewedOn}) is before the last edit "updated" (${updated}); the reviewer must approve the final text`);
  } else {
    for (const [field, value] of Object.entries({ ...reviewFields, reviewerGitHub: text(data.reviewerGitHub), recordConfirmation: text(data.recordConfirmation) })) {
      if (value) fail(file, `"${field}" is set but "status" is "${status}"; review details belong only on an approved article`);
    }
  }
  if (status === 'live-unreviewed' && first && first > WORKFLOW_START) {
    fail(file, `"live-unreviewed" is only for articles that went live by ${WORKFLOW_START}; new articles need "status: approved" with a recorded review`);
  }
  if (status === 'live-unreviewed' && publishOn && publishOn > WORKFLOW_START) fail(file, '"live-unreviewed" articles cannot be scheduled; get the article approved instead');
  if (PUBLISHABLE.includes(status) && !body) fail(file, `"status: ${status}" but nothing is written below the details`);

  // Blocks and HTML.
  for (const m of body.matchAll(/(?:^|\s|\[|\()(:{1,})([a-z]+)[[{\n]/gm)) {
    if (!BLOCKS.includes(m[2])) fail(file, `unknown block ":${m[2]}" (allowed: ${BLOCKS.join(', ')})`);
  }
  // A block inside another block needs fewer colons than the one around it (::::card around :::checks).
  const open = [];
  body.split(/\r?\n/).forEach((line, i) => {
    const start = /^(:{3,})[a-z]/.exec(line);
    const end = /^(:{3,})\s*$/.exec(line);
    if (start) {
      if (open.length && start[1].length >= open[open.length - 1]) fail(file, `line ${i + 1}: a block inside another block needs fewer colons than the block around it (give the outer block one more colon at its start and end)`);
      open.push(start[1].length);
    } else if (end) {
      if (!open.length) fail(file, `line ${i + 1}: "${line.trim()}" closes a block that was never opened`);
      else if (end[1].length !== open.pop()) fail(file, `line ${i + 1}: closing "${line.trim()}" must use the same number of colons as the block it closes`);
    }
  });
  if (open.length) fail(file, 'a block is never closed (add a line with only colons)');
  if (/<[a-z][\s\S]*?>/i.test(body.replace(/`[^`]*`/g, ''))) fail(file, 'HTML tags are not allowed; use Markdown or the blocks in README.md');

  // Content rules (no named competitors, no internal figures).
  const publicText = [data.title, data.summary, data.seoTitle, data.seoDescription, body].filter(Boolean).join('\n');
  for (const problem of scanContent(publicText)) fail(file, problem);

  // The "updated" date readers see is never earlier than the day the article went live.
  const shown = [updated, publishOn, publishedOn].filter(Boolean).sort().pop();
  articles.push({
    slug,
    title: data.title,
    ...(data.seoTitle ? { seoTitle: data.seoTitle } : {}),
    summary: data.summary,
    ...(data.seoDescription ? { seoDescription: data.seoDescription } : {}),
    category: data.category,
    ...(data.pillar ? { pillar: data.pillar } : {}),
    ...(data.marketplace ? { marketplace: data.marketplace } : {}),
    ...(data.region ? { region: data.region } : {}),
    ...(data.objective ? { objective: data.objective } : {}),
    type: data.type,
    difficulty: data.difficulty,
    lastUpdated: shown ? longDate(shown) : '',
    ...(first ? { published: first } : {}),
    ...(publishOn ? { publishOn } : {}),
    tags: data.tags ?? [],
    ...(data.featured !== undefined ? { featured: Boolean(data.featured) } : {}),
    ...(data.downloadable !== undefined ? { downloadable: Boolean(data.downloadable) } : {}),
    ...(data.downloadUrl ? { downloadUrl: data.downloadUrl } : {}),
    status,
    ...(author ? { author } : {}),
    // Only an approved article carries its reviewer; the link to the approval stays in the Markdown file.
    ...(status === 'approved' && reviewedBy && reviewedOn ? { review: { by: reviewedBy, role: reviewerRole, on: reviewedOn } } : {}),
    hasContent: body.length > 0,
    ...(data.related ? { related: data.related } : {}),
    order: Number(data.order),
  });
  if (body) bodies[slug] = body;
}

// Across articles: unique order and titles, related articles and internal links that exist.
const slugs = new Set(articles.map((a) => a.slug));
const routes = siteRoutes();
const seen = new Map();
for (const a of articles) {
  for (const [kind, value] of [['title', a.title], ['seoTitle', a.seoTitle ?? a.title]]) {
    const key = `${kind}:${String(value).trim().toLowerCase()}`;
    if (seen.has(key) && seen.get(key) !== a.slug) fail(`${a.slug}.md`, `same ${kind} as ${seen.get(key)}.md ("${value}")`);
    else seen.set(key, a.slug);
  }
  for (const r of a.related ?? []) if (!slugs.has(r)) fail(`${a.slug}.md`, `related article "${r}" doesn't exist`);
  for (const m of (bodies[a.slug] ?? '').matchAll(/\]\((\/[^)\s]*)\)/g)) {
    const target = m[1].replace(/[#?].*$/, '').replace(/(.)\/+$/, '$1');
    const kb = /^\/knowledge-base\/([a-z0-9-]+)$/.exec(target);
    if (kb ? !slugs.has(kb[1]) : !routes.has(target)) fail(`${a.slug}.md`, `links to ${m[1]}, which isn't a page on the site`);
  }
}
const orders = articles.map((a) => a.order);
if (new Set(orders).size !== orders.length) errors.push('Two articles have the same "order" number; give each a different one.');

// content/llms.txt follows the same content rules.
const llmsSource = fs.readFileSync(LLMS_IN, 'utf8').replace(/\r\n/g, '\n');
for (const problem of scanContent(llmsSource)) fail('content/llms.txt', problem);

if (errors.length) {
  console.error(`\nKnowledge Base: ${errors.length} problem(s) in content/knowledge-base:\n  - ${errors.join('\n  - ')}\n`);
  process.exit(1);
}

articles.sort((a, b) => a.order - b.order);
const header = '// GENERATED by scripts/build-articles.mjs from content/knowledge-base/*.md. Do not edit; edit the .md files.\n';
const metaTs = `${header}// Server-only: pages pass browser components only the published fields they need.\nimport type { KnowledgeArticle } from './knowledgeArticles';\n\nexport const generatedArticles: KnowledgeArticle[] = ${JSON.stringify(
  articles.map(({ order, ...rest }) => rest),
  null,
  2,
)};\n`;
const bodyTs = `${header}// Article text, read only on the server (never sent to the browser as data).\nexport const articleBodies: Record<string, string> = ${JSON.stringify(bodies, null, 2)};\n`;

// content/llms.txt, served at /llms.txt with articles that aren't published yet left out (see src/app/data/llmsText.ts).
const llmsTs = `${header.replace('content/knowledge-base/*.md', 'content/llms.txt').replace('edit the .md files', 'edit content/llms.txt')}export const llmsTemplate = ${JSON.stringify(llmsSource)};\n`;

const count = (s) => articles.filter((a) => a.status === s).length;
const summary = `${articles.length} articles (${count('approved')} approved, ${count('live-unreviewed')} live before reviews, ${count('review')} in review, ${count('draft')} drafts)`;

if (CHECK_ONLY) {
  const same = fs.existsSync(OUT_META) && fs.readFileSync(OUT_META, 'utf8') === metaTs && fs.existsSync(OUT_BODY) && fs.readFileSync(OUT_BODY, 'utf8') === bodyTs && fs.existsSync(OUT_LLMS) && fs.readFileSync(OUT_LLMS, 'utf8') === llmsTs;
  console.log(`Knowledge Base: ${summary} OK${same ? '' : ' (generated files are out of date; run node scripts/build-articles.mjs)'}`);
  process.exit(same ? 0 : 1);
}
fs.writeFileSync(OUT_META, metaTs);
fs.writeFileSync(OUT_BODY, bodyTs);
fs.writeFileSync(OUT_LLMS, llmsTs);
console.log(`Knowledge Base: ${summary}`);
