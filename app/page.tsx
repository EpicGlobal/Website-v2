import { Home } from '@/app/pages/Home';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Epic Global Inc. | Wholesale Trade Partner That Buys Your Inventory',
  description:
    "Epic Global buys your inventory upfront at wholesale, sells it on Amazon, Walmart and more in 42 countries, funds the ads and protects your brand.",
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
