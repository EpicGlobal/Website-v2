import { llmsTemplate } from './llms.generated';
import { articlesAsOf } from './knowledgeArticles';

/**
 * /llms.txt as AI assistants see it today: content/llms.txt with every link to a Knowledge Base article that isn't
 * published yet removed (and any "### group" heading left with no articles under it). So a scheduled article is
 * listed on its publish day, the same day it joins the sitemap, and never before.
 */
export function llmsText(today?: string): string {
  const live = new Set(articlesAsOf(today).filter((a) => a.hasContent).map((a) => a.slug));
  const kept = llmsTemplate.split('\n').filter((line) => {
    const m = /\/knowledge-base\/([a-z0-9-]+)\)/.exec(line);
    return !m || live.has(m[1]);
  });
  // Drop "### Heading" lines whose group is now empty (next non-blank line is another heading or the end).
  const out = kept.filter((line, i) => {
    if (!line.startsWith('### ')) return true;
    const next = kept.slice(i + 1).find((l) => l.trim() !== '');
    return Boolean(next && next.startsWith('- '));
  });
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}
