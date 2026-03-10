import { notFound } from 'next/navigation';
import { KnowledgeArticle } from '@/app/pages/KnowledgeArticle';
import { knowledgeArticles } from '@/app/data/knowledgeArticles';
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
    title: article.title,
    description: article.summary,
    path: `/knowledge-base/${article.slug}`,
    keywords: article.tags,
    type: 'article',
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
