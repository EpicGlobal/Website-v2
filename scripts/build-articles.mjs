/**
 * Knowledge Base articles: content/knowledge-base/<slug>.md  ->  src/app/data/*.generated.ts
 *
 * Runs before every build and dev start (npm "prebuild" / "predev"), so adding or editing an article is just
 * editing its Markdown file. It checks every file and stops the build with a clear message if something is wrong
 * (missing field, bad date, unknown block, link to an article that doesn't exist).
 *
 *   node scripts/build-articles.mjs          write the generated files
 *   node scripts/build-articles.mjs --check  only check (no writes)
 *
 * How to write an article: see content/knowledge-base/README.md.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

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

const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);

/** YAML turns 2026-11-05 into a Date; keep dates as YYYY-MM-DD text. */
function day(value, file, field, required) {
  if (value === undefined || value === null || value === '') {
    if (required) fail(file, `"${field}" is required (YYYY-MM-DD)`);
    return undefined;
  }
  const text = value instanceof Date ? value.toISOString().slice(0, 10) : String(value).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text) || Number.isNaN(Date.parse(`${text}T00:00:00Z`))) {
    fail(file, `"${field}" must be a date like 2026-11-16, got "${text}"`);
    return undefined;
  }
  return text;
}

const longDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md') && f !== 'README.md').sort();
const articles = [];
const bodies = {};

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail(file, 'file name must be lowercase words joined by hyphens, like my-new-article.md');
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'));
  for (const field of ['title', 'summary', 'category', 'type', 'difficulty', 'tags', 'order']) {
    if (data[field] === undefined || data[field] === null || data[field] === '') fail(file, `"${field}" is required`);
  }
  if (data.type && !TYPES.includes(data.type)) fail(file, `"type" must be one of: ${TYPES.join(', ')}`);
  if (data.difficulty && !LEVELS.includes(data.difficulty)) fail(file, `"difficulty" must be one of: ${LEVELS.join(', ')}`);
  if (data.tags && !Array.isArray(data.tags)) fail(file, '"tags" must be a list, like [ads, amazon]');

  const updated = day(data.updated, file, 'updated', true);
  const publishOn = day(data.publishOn, file, 'publishOn', false);
  const publishedOn = day(data.published, file, 'published', false);
  const body = content.trim();

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

  // The date readers see: the publish date if it's later than the last edit.
  // First published: the "published" date if given, else the scheduled publish day, else the last edit.
  const first = publishedOn ?? publishOn ?? updated;
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
    hasContent: body.length > 0,
    ...(data.related ? { related: data.related } : {}),
    order: Number(data.order),
  });
  if (body) bodies[slug] = body;
}

const slugs = new Set(articles.map((a) => a.slug));
for (const a of articles) {
  for (const r of a.related ?? []) if (!slugs.has(r)) fail(`${a.slug}.md`, `related article "${r}" doesn't exist`);
  for (const m of (bodies[a.slug] ?? '').matchAll(/\]\(\/knowledge-base\/([a-z0-9-]+)/g)) {
    if (!slugs.has(m[1])) fail(`${a.slug}.md`, `links to /knowledge-base/${m[1]}, which doesn't exist`);
  }
}
const orders = articles.map((a) => a.order);
if (new Set(orders).size !== orders.length) errors.push('Two articles have the same "order" number; give each a different one.');

if (errors.length) {
  console.error(`\nKnowledge Base: ${errors.length} problem(s) in content/knowledge-base:\n  - ${errors.join('\n  - ')}\n`);
  process.exit(1);
}

articles.sort((a, b) => a.order - b.order);
const header = '// GENERATED by scripts/build-articles.mjs from content/knowledge-base/*.md. Do not edit; edit the .md files.\n';
const metaTs = `${header}import type { KnowledgeArticle } from './knowledgeArticles';\n\nexport const generatedArticles: KnowledgeArticle[] = ${JSON.stringify(
  articles.map(({ order, ...rest }) => rest),
  null,
  2,
)};\n`;
const bodyTs = `${header}// Article text, read only on the server (never sent to the browser as data).\nexport const articleBodies: Record<string, string> = ${JSON.stringify(bodies, null, 2)};\n`;

// content/llms.txt, served at /llms.txt with articles that aren't published yet left out (see src/app/data/llmsText.ts).
const llmsSource = fs.readFileSync(LLMS_IN, 'utf8').replace(/\r\n/g, '\n');
const llmsTs = `${header.replace('content/knowledge-base/*.md', 'content/llms.txt').replace('edit the .md files', 'edit content/llms.txt')}export const llmsTemplate = ${JSON.stringify(llmsSource)};\n`;

if (CHECK_ONLY) {
  const same = fs.existsSync(OUT_META) && fs.readFileSync(OUT_META, 'utf8') === metaTs && fs.existsSync(OUT_BODY) && fs.readFileSync(OUT_BODY, 'utf8') === bodyTs && fs.existsSync(OUT_LLMS) && fs.readFileSync(OUT_LLMS, 'utf8') === llmsTs;
  console.log(`Knowledge Base: ${articles.length} articles OK${same ? '' : ' (generated files are out of date; run node scripts/build-articles.mjs)'}`);
  process.exit(same ? 0 : 1);
}
fs.writeFileSync(OUT_META, metaTs);
fs.writeFileSync(OUT_BODY, bodyTs);
fs.writeFileSync(OUT_LLMS, llmsTs);
const scheduled = articles.filter((a) => a.publishOn).length;
console.log(`Knowledge Base: ${articles.length} articles (${Object.keys(bodies).length} written, ${scheduled} with a publish date)`);
