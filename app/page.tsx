import { Home } from '@/app/pages/Home';
import { HOME_FAQ } from '@/app/components/home/SkimSections';
import { faqLearnMore } from '@/app/data/knowledgeArticles';
import { createPageMetadata } from '@/site/site-config';

export const metadata = createPageMetadata({
  title: 'Epic Global Inc. | Amazon Wholesale Trade Partner',
  description:
    "Epic Global buys inventory from established brands and sells it as a 3P seller on Amazon, Walmart and more in 42 countries. Moving from 1P? We fund the ads.",
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
  return <Home faqLinks={faqLearnMore(HOME_FAQ.map((f) => f.learnMore))} />;
}
