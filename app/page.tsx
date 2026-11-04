import { Home } from '@/app/pages/Home';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Wholesale Trade Partner for Amazon Brands',
  description:
    "Epic Global buys your inventory upfront at wholesale, sells it on Amazon, Walmart and more in about 40 countries, funds the ads and protects your brand.",
  path: '/',
  keywords: [
    'global commerce operator',
    'ecommerce operator',
    'marketplace expansion',
    'wholesale trade partner',
  ],
});

export default function HomePage() {
  return <Home />;
}
