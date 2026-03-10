import { CaseStudies } from '@/app/pages/CaseStudies';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Case Studies',
  description:
    'Real marketplace execution results from Epic Global Inc. across Amazon profitability, catalog optimization, expansion, and brand protection.',
  path: '/case-studies',
  keywords: [
    'marketplace case studies',
    'amazon success stories',
    'global expansion case studies',
  ],
});

export default function CaseStudiesPage() {
  return <CaseStudies />;
}
