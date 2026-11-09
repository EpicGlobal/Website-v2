import { CaseStudies } from '@/app/pages/CaseStudies';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Case Studies: Amazon Results from Real Brands',
  description:
    'Case studies from brands Epic Global Inc. buys from and sells for on Amazon: lower FBA fees, higher conversion, branded search won back, and 1P vs 3P net revenue per unit.',
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
