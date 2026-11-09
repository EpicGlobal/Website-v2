/**
 * Knowledge Base RSS feed: title, summary, link and date for every written article, newest first.
 * Built once at build time; updates itself whenever an article is added or its date changes.
 */
import { articlesAsOf, isoDate } from '@/app/data/knowledgeArticles';
import { siteConfig } from '@/site/site-config';

export const dynamic = 'force-static';
// Rebuilt hourly so scheduled articles join the feed on their publish day.
export const revalidate = 3600;

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export function GET() {
  const articles = articlesAsOf()
    .filter((a) => a.hasContent)
    .map((a) => ({ ...a, date: isoDate(a.lastUpdated) }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));

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
        `      <pubDate>${new Date(`${a.date}T12:00:00Z`).toUTCString()}</pubDate>`,
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
    <lastBuildDate>${articles[0] ? new Date(`${articles[0].date}T12:00:00Z`).toUTCString() : new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
