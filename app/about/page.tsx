import { About } from '@/app/pages/About';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'About Epic Global Inc. | Wholesale Trade Partner',
  description:
    "Epic Global is a wholesale trade partner: we buy brands' inventory and run growth as operations, not marketing, on Amazon first, then Walmart and more.",
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
