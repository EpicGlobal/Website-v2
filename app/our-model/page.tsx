import { WhatWeAre } from '@/app/pages/WhatWeAre';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Our Wholesale Trade Partner Model',
  description:
    'How Epic Global buys inventory upfront, runs Amazon, Walmart and international storefronts, pays for ads, fees and fulfillment, and protects brand equity.',
  path: '/our-model',
  keywords: [
    'wholesale trade partner model',
    'inventory purchase model',
    'marketplace operator model',
  ],
});

export default function OurModelPage() {
  return <WhatWeAre />;
}
