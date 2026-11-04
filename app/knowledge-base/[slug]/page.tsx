import { notFound } from 'next/navigation';
import { KnowledgeArticle } from '@/app/pages/KnowledgeArticle';
import { isoDate, knowledgeArticles } from '@/app/data/knowledgeArticles';
import { createPageMetadata } from '@/site/site-config';

type KnowledgeArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return knowledgeArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const article = knowledgeArticles.find((entry) => entry.slug === slug);

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
    // "Coming Soon" placeholders stay out of search until the article is written.
    noindex: !article.hasContent,
    // The articles keep one date (last updated); it's used for both, the same as the article schema.
    articleDate: isoDate(article.lastUpdated),
    image: { url: `/knowledge-base/${article.slug}/opengraph-image`, alt: `${article.title} | Epic Global Inc. Knowledge Base` },
  });
}

export default async function KnowledgeArticlePage({ params }: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const article = knowledgeArticles.find((entry) => entry.slug === slug);

  if (!article) {
    notFound();
  }

  return <KnowledgeArticle slug={slug} />;
}
