import { WhatWeAre } from '@/app/pages/WhatWeAre';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Our Model',
  description:
    'Learn how Epic Global buys inventory upfront, operates marketplace storefronts end to end, covers advertising and logistics, and protects brand equity.',
  path: '/our-model',
  keywords: [
    'zero risk commerce model',
    'inventory purchase model',
    'marketplace operator model',
  ],
});

export default function OurModelPage() {
  return <WhatWeAre />;
}
