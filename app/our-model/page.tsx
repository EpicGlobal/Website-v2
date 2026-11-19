import { WhatWeAre } from '@/app/pages/WhatWeAre';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  // Nov 19: matches the page's "How our wholesale model works" intent; the homepage owns "wholesale trade partner".
  title: 'How Our Amazon Wholesale Model Works',
  description:
    "Learn how Epic Global's wholesale model works. We buy inventory, fund advertising and fulfillment, and manage Amazon and international marketplace sales.",
  path: '/our-model',
  keywords: [
    'Amazon wholesale partnership model',
    'Amazon wholesale partner',
    'Amazon wholesale partner vs agency',
    'marketplace operations management',
    'Amazon for direct-selling brands',
  ],
});

export default function OurModelPage() {
  return <WhatWeAre />;
}
