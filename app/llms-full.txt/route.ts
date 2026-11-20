import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FAQS } from '@/app/data/faqs';
import { publishedArticles } from '@/app/data/knowledgeArticles';
import { llmsText } from '@/app/data/llmsText';
import { siteConfig } from '@/site/site-config';

/**
 * /llms-full.txt: one plain-text file an AI assistant can read to understand Epic in a single request.
 * It is /llms.txt, then the full FAQ and the list of published Knowledge Base articles. Made from the same data the
 * pages use, so it can't drift from the site.
 */
// Made on each request, so scheduled articles are listed at midnight Utah time on their publish day.
export const dynamic = 'force-dynamic';

export function GET() {
  const base = llmsText().trimEnd();
  const faq = FAQS.map((f) => `### ${f.question}\n${f.answer}`).join('\n\n');
  const articles = publishedArticles()
    .map((a) => `- [${a.title}](${siteConfig.url}/knowledge-base/${a.slug}) (${a.category}, updated ${a.lastUpdated}): ${a.summary}`)
    .join('\n');
  const body = [
    base,
    '## Frequently asked questions (full answers, same as /faq)',
    faq,
    '## Knowledge Base articles',
    articles,
  ].join('\n\n') + '\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
