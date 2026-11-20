import { Intelligence } from '@/app/pages/Intelligence';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Amazon Marketplace Analytics & Reporting',
  description:
    "How Epic Global uses marketplace analytics, demand forecasting and reporting to run brands' Amazon and international marketplace sales, with shared dashboards and quarterly reviews.",
  path: '/intelligence',
  keywords: [
    'marketplace ai',
    'commerce intelligence',
    'predictive demand',
    'brand protection ai',
  ],
});

export default function IntelligencePage() {
  return <Intelligence />;
}
