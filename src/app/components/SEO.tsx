import { siteConfig } from '@/site/site-config';
interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

export function SEO({
  title = 'Epic Global Inc. | Wholesale Trade Partner That Buys Your Inventory',
  description = 'Epic Global Inc. is a wholesale trade partner and global marketplace operator. We buy your inventory upfront at wholesale, sell it on Amazon, Walmart and other marketplaces, and pay for the advertising, marketplace fees and fulfillment.',
  keywords = 'global commerce operator, ecommerce operator, marketplace expansion, amazon FBA, international ecommerce, wholesale trade partner, global retail, cross-border ecommerce, marketplace management, brand protection',
  canonicalUrl = `${siteConfig.url}/`,
  ogImage = `${siteConfig.url}/opengraph-image.png`,
  ogType = 'website',
  article,
}: SEOProps) {
  return null;
}
