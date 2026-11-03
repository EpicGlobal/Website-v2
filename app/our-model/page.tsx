import { WhatWeAre } from '@/app/pages/WhatWeAre';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Our Model',
  description:
    'Learn how Epic Global buys inventory upfront, operates marketplace storefronts end to end, pays for the advertising, marketplace fees and fulfillment, and protects brand equity.',
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
