import { WhatWeAre } from '@/app/pages/WhatWeAre';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Our Wholesale Trade Partner Model',
  description:
    "How Epic Global works as your 3P seller: we buy inventory outright, run Amazon (1P vs 3P), Walmart and global stores, and pay for ads, fees and fulfillment.",
  path: '/our-model',
  keywords: [
    'wholesale trade partner model',
    '1P vs 3P',
    'Amazon 3P seller',
    'inventory purchase model',
    'marketplace operator model',
  ],
});

export default function OurModelPage() {
  return <WhatWeAre />;
}
