import Link from 'next/link';
import { Download } from 'lucide-react';
import { siteConfig } from '@/site/site-config';
import type { KnowledgeArticle } from '@/app/data/knowledgeArticles';
import { ACCENT, HEAD, MUTED } from '@/app/components/story/tokens';
import { CARD_LINK, PILL } from './reading';

/** One Knowledge Base article as a card: category, title, summary, date. Used on the index and under articles. */
export function ArticleCard({ article, showType = true, showDate = true }: { article: KnowledgeArticle; showType?: boolean; showDate?: boolean }) {
  const meta = [article.pillar, showType ? article.type : undefined].filter(Boolean);
  return (
    <Link href={`/knowledge-base/${article.slug}`} className={`${CARD_LINK} flex flex-col`}>
      <p className="mb-3 text-xs font-semibold">
        <span className={`${PILL} ${ACCENT}`}>{article.category}</span>
        {meta.map((m) => (
          <span key={m} className={`font-normal ${MUTED}`}>
            <span aria-hidden="true"> · </span>
            {m}
          </span>
        ))}
        {!article.hasContent ? <span className={`font-normal ${MUTED}`}> · Coming Soon</span> : null}
      </p>
      <h3 className={`text-lg font-semibold leading-snug mb-2 ${HEAD} group-hover:underline underline-offset-4 decoration-1`}>{article.title}</h3>
      <p className={`text-sm leading-relaxed line-clamp-2 ${MUTED}`}>
        {!article.hasContent ? 'Coming Soon - ' : ''}
        {article.summary}
      </p>
      {showDate ? (
        <div className={`mt-auto pt-4 flex items-center justify-between text-xs ${MUTED}`}>
          <span>Updated {article.lastUpdated}</span>
          {siteConfig.downloadsEnabled && article.downloadable ? <Download className={`w-4 h-4 ${ACCENT}`} aria-hidden="true" /> : null}
        </div>
      ) : null}
    </Link>
  );
}
