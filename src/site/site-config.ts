import type { Metadata } from 'next';

// The site serves every page from www (the bare domain redirects there), so canonical tags and the sitemap use www too.
const defaultSiteUrl = 'https://www.epicglobalinc.com';

/**
 * The address used for canonical tags, the sitemap, robots.txt, feeds and schema. An env value of the bare domain
 * (https://epicglobalinc.com only redirects to www) is corrected to www, so canonicals never point at a redirect even
 * if the hosting setting is left as it is. Preview and local addresses are kept as given.
 */
export function normalizeSiteUrl(raw: string | undefined): string {
  const value = raw?.trim().replace(/\/+$/, '');
  if (!value) return defaultSiteUrl;
  try {
    const url = new URL(value);
    if (url.hostname === 'epicglobalinc.com' || url.hostname === 'www.epicglobalinc.com') return defaultSiteUrl;
    return url.origin;
  } catch {
    return defaultSiteUrl;
  }
}

const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

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
  alternateName: ['Epic Global', 'Epic Global Inc'],
  // Official profiles only. Add the Amazon storefront and new directory/review profiles as they're confirmed.
  organizationSameAs: [
    'https://www.linkedin.com/company/epic-global-inc',
    'https://www.walmart.com/seller/13412',
    'https://www.amazon.com/sp?seller=A36Z6L3RI4IXSS',
    'https://www.wikidata.org/wiki/Q141937180',
  ],
  foundingDate: '2014',
  headquarters: 'Lindon, Utah, United States',
  streetAddress: '333 S 520 W Ste 250',
  locality: 'Lindon',
  region: 'UT',
  postalCode: '84042',
  countryCode: 'US',
  // Main phone, written the same way as on the Google Business Profile (Google: name, address and phone must match).
  telephone: '+1-801-808-3001',
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
    'Epic Global Inc. is an Amazon-first wholesale trade partner and marketplace operator: we buy inventory at wholesale, pay for the ads and marketplace fees ourselves, and sell it on Amazon, Walmart, eBay, TikTok Shop, Temu, Shopify and other global marketplaces.',
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
  publishedTime,
  modifiedTime,
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
  /** YYYY-MM-DD the article first went live (article:published_time); must match the page's schema datePublished. */
  publishedTime?: string;
  /** YYYY-MM-DD of the last real edit (article:modified_time); must match the schema dateModified. */
  modifiedTime?: string;
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
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(type === 'article' && (modifiedTime ?? publishedTime) ? { modifiedTime: modifiedTime ?? publishedTime } : {}),
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
