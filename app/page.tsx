import { Home } from '@/app/pages/Home';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Zero-Risk Global Commerce Operator',
  description:
    "The world's first Zero-Risk Global Commerce Operator. Epic Global purchases inventory upfront, operates marketplace storefronts, funds advertising, and protects your brand across 41 countries.",
  path: '/',
  keywords: [
    'global commerce operator',
    'ecommerce operator',
    'marketplace expansion',
    'zero risk ecommerce',
  ],
});

export default function HomePage() {
  return <Home />;
}
