import { KnowledgeBase, type KnowledgeBaseFilters } from '@/app/pages/KnowledgeBase';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Knowledge Base',
  description:
    'Operator-grade guides on marketplace expansion, advertising operations, inventory management, brand protection, and ecommerce execution.',
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

  return <KnowledgeBase initialFilters={initialFilters} />;
}
