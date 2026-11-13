import { KnowledgeBase, type KnowledgeBaseFilters } from '@/app/pages/KnowledgeBase';
import { publishedArticles, toArticleCard } from '@/app/data/knowledgeArticles';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Amazon and Walmart Seller Guides',
  description:
    'Operator-grade guides for Amazon, Walmart and international marketplaces: expansion, advertising, inventory management, brand protection and execution.',
  path: '/knowledge-base',
  keywords: [
    'marketplace knowledge base',
    'ecommerce playbooks',
    'brand protection guides',
  ],
});

type KnowledgeBasePageProps = {
  searchParams: Promise<{
    category?: string;
    pillar?: string;
    marketplace?: string;
  }>;
};

function readFilterValue(value: string | undefined) {
  return value ?? 'All';
}

export default async function KnowledgeBasePage({ searchParams }: KnowledgeBasePageProps) {
  const params = await searchParams;

  const initialFilters: KnowledgeBaseFilters = {
    category: readFilterValue(params.category),
    pillar: readFilterValue(params.pillar),
    marketplace: readFilterValue(params.marketplace),
  };

  // Published articles only, card fields only: drafts and the publishing calendar never reach the browser.
  return <KnowledgeBase initialFilters={initialFilters} articles={publishedArticles().map(toArticleCard)} />;
}
