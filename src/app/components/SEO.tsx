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
  title = 'Epic Global Inc. - Zero-Risk Global Commerce Operator',
  description = 'Epic Global Inc. is the world\'s first Zero-Risk Global Commerce Operator. We purchase inventory upfront, operate marketplace storefronts end to end, fund all advertising and logistics, and protect brand equity. Expand to 41 countries risk-free.',
  keywords = 'global commerce operator, ecommerce operator, marketplace expansion, amazon FBA, international ecommerce, zero risk ecommerce, global retail, cross-border ecommerce, marketplace management, brand protection',
  canonicalUrl = 'https://epicglobalinc.com/',
  ogImage = 'https://epicglobalinc.com/opengraph-image',
  ogType = 'website',
  article,
}: SEOProps) {
  return null;
}
