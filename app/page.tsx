import { Home } from '@/app/pages/Home';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Epic Global Inc. | Wholesale Trade Partner That Buys Your Inventory',
  description:
    "Epic Global buys your inventory outright and sells it 3P on Amazon, Walmart and more in 42 countries: a 1P + 3P partner that funds ads and protects your brand.",
  path: '/',
  keywords: [
    'Amazon 1P vs 3P',
    'Amazon 3P seller',
    'global commerce operator',
    'ecommerce operator',
    'marketplace expansion',
    'wholesale trade partner',
  ],
});

export default function HomePage() {
  return <Home />;
}
