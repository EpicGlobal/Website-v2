/**
 * Knowledge Base RSS feed: title, summary, link and first-publish date for every published article, newest first.
 * Made on each request, so an approved article scheduled for later joins the feed at midnight Utah time on its day.
 */
import { isoDate, publishedArticles } from '@/app/data/knowledgeArticles';
import { siteConfig } from '@/site/site-config';

export const dynamic = 'force-dynamic';

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const rssDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString();

export function GET() {
  // pubDate is when the article first went live (the same date as the schema's datePublished), so an edit doesn't
  // make an old article look new in feed readers. lastBuildDate is the newest edit.
  const articles = publishedArticles()
    .map((a) => ({ ...a, updated: isoDate(a.lastUpdated), first: a.published ?? isoDate(a.lastUpdated) }))
    .sort((a, b) => (a.first < b.first ? 1 : a.first > b.first ? -1 : a.title.localeCompare(b.title)));
  const newestEdit = articles.map((a) => a.updated).sort().pop();

  const feedUrl = `${siteConfig.url}/knowledge-base/rss.xml`;
  const items = articles
    .map((a) => {
      const url = `${siteConfig.url}/knowledge-base/${a.slug}`;
      return [
        '    <item>',
        `      <title>${escape(a.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escape(a.seoDescription ?? a.summary)}</description>`,
        `      <category>${escape(a.category)}</category>`,
        `      <pubDate>${rssDate(a.first)}</pubDate>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${siteConfig.name} Knowledge Base`)}</title>
    <link>${siteConfig.url}/knowledge-base</link>
    <description>Playbooks, checklists, templates and definitions for running Amazon, Walmart and other marketplaces, from Epic Global Inc., a wholesale trade partner.</description>
    <language>en-us</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${newestEdit ? rssDate(newestEdit) : new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
