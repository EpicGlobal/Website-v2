import type { Metadata } from 'next';

// The site serves every page from www (the bare domain redirects there), so canonical tags and the sitemap use www too.
const defaultSiteUrl = 'https://www.epicglobalinc.com';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || defaultSiteUrl;

export const siteConfig = {
  name: 'Epic Global Inc.',
  shortName: 'Epic Global',
  bookACallEnabled: process.env.NEXT_PUBLIC_BOOK_A_CALL_ENABLED === 'true',
  // Case study and template downloads (they ask visitors to sign in first). Hidden for now while the team decides
  // whether to keep the sign-in (To-do b23). Set to true to bring the download buttons back.
  downloadsEnabled: false,
  url: siteUrl,
  logo: '/logo.png',
  founderName: 'Glen Jensen',
  founderLinkedIn: 'https://www.linkedin.com/in/glen-jensen-54a27/',
  alternateName: ['Epic Global'],
  // Official profiles only. Add the Amazon storefront and new directory/review profiles as they're confirmed.
  organizationSameAs: [
    'https://www.linkedin.com/company/epic-global-inc',
    'https://www.walmart.com/seller/13412',
    'https://www.amazon.com/sp?seller=A36Z6L3RI4IXSS',
    'https://www.wikidata.org/wiki/Q141937180',
  ],
  foundingDate: '2015',
  headquarters: 'Lindon, Utah, United States',
  streetAddress: '333 S 520 W Ste 250',
  locality: 'Lindon',
  region: 'UT',
  postalCode: '84042',
  countryCode: 'US',
  primaryCtaHref: '/campaigns/marketplace-assessment#assessment-form',
  contactEmail: 'info@epicglobalinc.com',
  legalEmail: 'info@epicglobalinc.com',
  privacyEmail: 'privacy@epicglobalinc.com',
  areaServed: [
    'United States',
    'Canada',
    'United Kingdom',
    'European Union',
    'Australia',
    'New Zealand',
    'Middle East',
    'Asia Pacific',
  ],
  knowsAbout: [
    'Marketplace operations',
    'Cross-border ecommerce',
    'Wholesale inventory purchasing',
    'Marketplace advertising',
    'Brand protection',
    'Catalog management',
    'Demand planning',
    'Marketplace automation',
  ],
  description:
    'Epic Global Inc. is an Amazon-first wholesale trade partner: we buy inventory at wholesale and sell it on Amazon, plus Walmart and global marketplaces.',
  ogImage: '/opengraph-image.png',
  twitterImage: '/twitter-image.png',
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  type = 'website',
  noindex = false,
  image,
  articleDate,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
  /** Keep the page out of search results (placeholders, account pages). */
  noindex?: boolean;
  /** Page-specific link-preview image (for example a Knowledge Base article card). */
  image?: { url: string; alt: string };
  /** ISO date (YYYY-MM-DD) for article:published_time and article:modified_time. */
  articleDate?: string;
}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const hasSiteName = title.includes(siteConfig.name);
  const isRootPath = path === '/';
  const fullTitle = hasSiteName ? title : `${title} | ${siteConfig.name}`;
  const metadataTitle = hasSiteName ? { absolute: title } : title;

  return {
    title: isRootPath ? { absolute: fullTitle } : metadataTitle,
    description,
    keywords,
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    alternates: {
      canonical: url,
      // Knowledge Base feed, so feed readers and AI tools can find new articles from any page.
      types: { 'application/rss+xml': [{ url: '/knowledge-base/rss.xml', title: `${siteConfig.name} Knowledge Base` }] },
    },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: 'en_US',
      ...(type === 'article' && articleDate ? { publishedTime: articleDate, modifiedTime: articleDate } : {}),
      images: [
        {
          url: image?.url ?? siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: image?.alt ?? siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image?.url ?? siteConfig.twitterImage],
    },
  };
}
