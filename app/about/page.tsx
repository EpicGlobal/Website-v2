import { About } from '@/app/pages/About';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'About Epic Global Inc.',
  description:
    'Epic Global Inc. runs marketplace growth like operations, not marketing, with system-driven execution, global reach, and zero-risk inventory ownership.',
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
