import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Epic Global Inc.',
  shortName: 'Epic Global',
  url: 'https://epicglobalinc.com',
  logo: '/logo.png',
  founderName: 'Glen Jensen',
  founderLinkedIn: 'https://www.linkedin.com/in/glen-jensen-54a27/',
  organizationSameAs: ['https://www.linkedin.com/company/epic-global-inc'],
  foundingDate: '2014',
  headquarters: 'Lindon, Utah, United States',
  streetAddress: '333 S 520 W Ste 250',
  locality: 'Lindon',
  region: 'UT',
  postalCode: '84042',
  countryCode: 'US',
  contactPath: '/contact',
  contactEmail: 'info@epicglobalinc.com',
  legalEmail: 'info@epicglobalinc.com',
  privacyEmail: 'info@epicglobalinc.com',
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
    'Epic Global Inc. is a global marketplace operator that buys inventory at wholesale, manages marketplace sales channels, funds advertising, and protects brand equity across international ecommerce platforms.',
  ogImage: '/opengraph-image',
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
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
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: 'en_US',
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [siteConfig.ogImage],
    },
  };
}
