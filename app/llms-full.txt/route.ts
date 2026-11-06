import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FAQS } from '@/app/data/faqs';
import { knowledgeArticles } from '@/app/data/knowledgeArticles';
import { siteConfig } from '@/site/site-config';

/**
 * /llms-full.txt: one plain-text file an AI assistant can read to understand Epic in a single request.
 * It is public/llms.txt, then the full FAQ and the list of published Knowledge Base articles. Built once at deploy
 * time from the same data the pages use, so it can't drift from the site.
 */
export const dynamic = 'force-static';

export function GET() {
  const base = readFileSync(join(process.cwd(), 'public', 'llms.txt'), 'utf8').trimEnd();
  const faq = FAQS.map((f) => `### ${f.question}\n${f.answer}`).join('\n\n');
  const articles = knowledgeArticles
    .filter((a) => a.hasContent)
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
