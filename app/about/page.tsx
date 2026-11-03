import { About } from '@/app/pages/About';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'About Epic Global Inc.',
  description:
    "Epic Global Inc. is a wholesale trade partner: we buy brands' inventory and run marketplace growth as operations, not marketing, across global marketplaces.",
  path: '/about',
  keywords: [
    'about epic global',
    'marketplace operator',
    'global ecommerce operations',
  ],
});

export default function AboutPage() {
  return <About />;
}
