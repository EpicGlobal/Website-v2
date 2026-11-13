import { Intelligence } from '@/app/pages/Intelligence';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Marketplace AI for Demand and Brand Protection',
  description:
    "Epic Global's intelligence layer covers predictive demand, autonomous channel optimization, and brand protection for marketplace commerce.",
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
