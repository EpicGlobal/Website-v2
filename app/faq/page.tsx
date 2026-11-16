import { FAQ } from '@/app/pages/FAQ';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Wholesale Trade Partner FAQ',
  description:
    "Answers about Epic Global's wholesale model: 1P vs 3P on Amazon, our warehouse, unauthorized sellers, timelines and the 14 marketplaces we sell on.",
  path: '/faq',
  keywords: ['faq', 'marketplace operator faq', 'wholesale trade partner faq', 'Amazon 1P vs 3P'],
});

export default function FAQPage() {
  return <FAQ />;
}
