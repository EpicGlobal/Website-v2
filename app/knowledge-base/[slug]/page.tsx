import { notFound } from 'next/navigation';
import { KnowledgeArticle } from '@/app/pages/KnowledgeArticle';
import { ArticleMarkdown } from '@/app/components/reading/ArticleMarkdown';
import { articleBodies } from '@/app/data/articleBodies.generated';
import { articlesAsOf, isoDate, knowledgeArticles } from '@/app/data/knowledgeArticles';
import { createPageMetadata } from '@/site/site-config';

type KnowledgeArticlePageProps = {
  params: Promise<{ slug: string }>;
};

// Rebuild each article page at most once an hour, so an article with a future publishOn date appears on its day
// without a new deploy (keep in step with ARTICLE_REFRESH_SECONDS; Next needs a plain number here).
export const revalidate = 3600;

export function generateStaticParams() {
  return knowledgeArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const article = articlesAsOf().find((entry) => entry.slug === slug);

  if (!article) {
    return createPageMetadata({
      title: 'Article Not Found',
      description: 'The requested knowledge-base article could not be found.',
      path: `/knowledge-base/${slug}`,
    });
  }

  return createPageMetadata({
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.summary,
    path: `/knowledge-base/${article.slug}`,
    keywords: article.tags,
    type: 'article',
    // "Coming Soon" placeholders and scheduled articles stay out of search until they're live.
    noindex: !article.hasContent,
    // Same two dates as the article schema and the visible "Published · Updated" line.
    publishedTime: article.published ?? isoDate(article.lastUpdated),
    modifiedTime: isoDate(article.lastUpdated),
    image: { url: `/knowledge-base/${article.slug}/opengraph-image`, alt: `${article.title} | Epic Global Inc. Knowledge Base` },
  });
}

export default async function KnowledgeArticlePage({ params }: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const articles = articlesAsOf();
  const article = articles.find((entry) => entry.slug === slug);

  if (!article) {
    notFound();
  }

  // Scheduled articles render as "Coming Soon" until their day; their text is never sent early.
  const body = article.hasContent && articleBodies[slug] ? <ArticleMarkdown markdown={articleBodies[slug]} /> : null;
  return <KnowledgeArticle slug={slug} articles={articles} body={body} />;
}
