/**
 * IndexNow: tells Bing (and the other IndexNow search engines) the moment pages go live or change, so new
 * articles are crawled in hours instead of days. ChatGPT's web search leans on Bing's index. Free, no account.
 *
 * The key is public by design: search engines check that https://www.epicglobalinc.com/<key>.txt holds it,
 * which proves the site asked. It is not a secret.
 *
 *   node scripts/indexnow.mjs              show what would be sent (articles live or edited yesterday or today)
 *   node scripts/indexnow.mjs --all        show every address in the live sitemap
 *   node scripts/indexnow.mjs --send       actually notify (the daily GitHub job on main does this)
 *
 * Before sending it checks that the key file is live and drops any address that doesn't answer 200, so a
 * scheduled or draft article is never announced. Runs only for the production host.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { readFrontMatter } from './review-rules.mjs';

export const INDEXNOW_KEY = '18cad46ab7b3c20d24dad66da8cf96d1';
export const HOST = 'www.epicglobalinc.com';
const ORIGIN = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const PUBLISHABLE = ['approved', 'live-unreviewed'];

/** A date as YYYY-MM-DD in Utah time. */
export const utahDay = (date = new Date()) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Denver', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);

const dayText = (value) => (value === undefined || value === null ? '' : String(value).trim());

/**
 * Article addresses to announce: published articles that went live (publishOn) or were edited (updated) on one
 * of the given days. Same publish rule as the site: a publishable status, a body, and its day has come.
 */
export function changedArticleUrls(articles, days, today = days[days.length - 1]) {
  const urls = [];
  for (const { slug, text } of articles) {
    const { data, content } = readFrontMatter(text);
    const publishOn = dayText(data.publishOn);
    const live = PUBLISHABLE.includes(data.status) && content.trim() !== '' && (!publishOn || publishOn <= today);
    if (live && (days.includes(publishOn) || days.includes(dayText(data.updated)))) urls.push(`${ORIGIN}/knowledge-base/${slug}`);
  }
  return urls.length ? [`${ORIGIN}/knowledge-base`, ...urls] : [];
}

/** The JSON body IndexNow expects. */
export const payload = (urlList) => ({ host: HOST, key: INDEXNOW_KEY, keyLocation: `${ORIGIN}/${INDEXNOW_KEY}.txt`, urlList });

function readArticles() {
  const dir = path.join(process.cwd(), 'content', 'knowledge-base');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => ({ slug: f.replace(/\.md$/, ''), text: fs.readFileSync(path.join(dir, f), 'utf8') }));
}

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap answered ${res.status}`);
  return [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()).filter((u) => u.startsWith(`${ORIGIN}/`));
}

async function main() {
  const args = process.argv.slice(2);
  const send = args.includes('--send');
  const today = utahDay();
  const yesterday = utahDay(new Date(Date.now() - 24 * 60 * 60 * 1000));
  let urls = args.includes('--all') ? await sitemapUrls() : changedArticleUrls(readArticles(), [yesterday, today], today);
  if (!urls.length) return console.log(`IndexNow: no articles went live or changed on ${yesterday} or ${today}. Nothing to send.`);

  if (!send) {
    console.log(`IndexNow (preview only, add --send to notify):\n${JSON.stringify(payload(urls), null, 2)}`);
    return;
  }
  const key = await fetch(payload(urls).keyLocation).then((r) => (r.ok ? r.text() : ''), () => '');
  if (key.trim() !== INDEXNOW_KEY) {
    console.error(`IndexNow: the key file ${payload(urls).keyLocation} isn't live yet; nothing sent.`);
    process.exit(1);
  }
  const live = [];
  for (const url of urls) {
    const status = await fetch(url, { method: 'HEAD', redirect: 'manual' }).then((r) => r.status, () => 0);
    if (status === 200) live.push(url);
    else console.log(`  skipped ${url} (answered ${status || 'no response'})`);
  }
  urls = live;
  if (!urls.length) return console.log('IndexNow: no live addresses to send.');
  const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(payload(urls)) });
  if (res.status !== 200 && res.status !== 202) {
    console.error(`IndexNow answered ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  console.log(`IndexNow: sent ${urls.length} address(es) (answer ${res.status}):\n  ${urls.join('\n  ')}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
