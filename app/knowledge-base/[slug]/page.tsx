import { notFound } from 'next/navigation';
import { KnowledgeArticle } from '@/app/pages/KnowledgeArticle';
import { ArticleMarkdown } from '@/app/components/reading/ArticleMarkdown';
import { articleBodies } from '@/app/data/articleBodies.generated';
import { getPublishedArticle, isoDate, relatedArticles, toArticleCard } from '@/app/data/knowledgeArticles';
import { createPageMetadata } from '@/site/site-config';

type KnowledgeArticlePageProps = {
  params: Promise<{ slug: string }>;
};

// Rendered on each request (like /knowledge-base), so an approved article with a future publishOn date goes live
// at midnight Utah time on its day, with no deploy, no cache to expire and no wake-up job. Until then the address is
// a plain 404 with no title, summary or date. (Hourly ISR was tested and dropped: the first visit after the date got
// the old 404, and the rebuilt page kept the 404's title and noindex tag.)
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const article = getPublishedArticle(slug);

  if (!article) {
    return createPageMetadata({
      title: 'Article Not Found',
      description: 'The requested knowledge-base article could not be found.',
      path: '/knowledge-base',
      noindex: true,
    });
  }

  return createPageMetadata({
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.summary,
    path: `/knowledge-base/${article.slug}`,
    keywords: article.tags,
    type: 'article',
    // Same two dates as the article schema and the visible "Published · Updated" line.
    publishedTime: article.published ?? isoDate(article.lastUpdated),
    modifiedTime: isoDate(article.lastUpdated),
    image: { url: `/knowledge-base/${article.slug}/opengraph-image`, alt: `${article.title} | Epic Global Inc. Knowledge Base` },
  });
}

export default async function KnowledgeArticlePage({ params }: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const article = getPublishedArticle(slug);
  const markdown = article ? articleBodies[slug] : undefined;

  // Drafts, articles in review and scheduled articles (before their day, Utah time) don't exist publicly.
  if (!article || !markdown) {
    notFound();
  }

  // The browser component gets this article and its related cards only, without the publishing calendar.
  return (
    <KnowledgeArticle
      article={toArticleCard(article)}
      related={relatedArticles(article).map(toArticleCard)}
      body={<ArticleMarkdown markdown={markdown} />}
    />
  );
}
