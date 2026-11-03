import { About } from '@/app/pages/About';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'About Epic Global Inc.',
  description:
    'Epic Global Inc. is a wholesale trade partner that runs marketplace growth like operations, not marketing: we buy the inventory and run system-driven execution across global marketplaces.',
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
