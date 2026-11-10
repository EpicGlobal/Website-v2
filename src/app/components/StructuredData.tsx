import { siteConfig } from '@/site/site-config';

interface StructuredDataProps {
  data: unknown;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;
const founderId = `${siteConfig.url}/#founder`;
const serviceCatalogId = `${siteConfig.url}/#services`;

const serviceDefinitions = [
  {
    slug: 'inventory-purchasing',
    name: 'Inventory + Purchasing Model',
    serviceType: 'Wholesale inventory purchasing',
    description:
      'Epic Global buys inventory at agreed wholesale pricing, takes ownership, and operates the retail marketplace model directly.',
  },
  {
    slug: 'marketplace-operations',
    name: 'Marketplace Operations',
    serviceType: 'Marketplace management',
    description:
      'Daily execution across Amazon, Walmart, eBay, and other approved marketplaces including listings, catalog hygiene, and operating workflows.',
  },
  {
    slug: 'global-expansion',
    name: 'Global Expansion',
    serviceType: 'Cross-border marketplace expansion',
    description:
      'Repeatable launch systems for new countries, regional marketplaces, localization requirements, and compliance workflows.',
  },
  {
    slug: 'advertising-operations',
    name: 'Advertising Operations',
    serviceType: 'Marketplace advertising',
    description:
      'Campaign architecture, bid management, creative rotation, and performance accountability funded and operated by Epic Global.',
  },
  {
    slug: 'inventory-forecasting',
    name: 'Inventory Forecasting + Allocation',
    serviceType: 'Demand planning',
    description:
      'Demand planning, regional inventory allocation, replenishment logic, and inventory health monitoring.',
  },
  {
    slug: 'brand-protection',
    name: 'Brand Protection + Catalog Integrity',
    serviceType: 'Brand protection',
    description:
      'Unauthorized seller monitoring, IP enforcement coordination, catalog integrity controls, and marketplace policy monitoring.',
  },
  {
    slug: 'reporting',
    name: 'Data + Reporting Layer',
    serviceType: 'Marketplace analytics',
    description:
      'Unified dashboards, SKU-level attribution, regional performance reporting, and operating visibility for marketplace execution.',
  },
  {
    slug: 'systems-automation',
    name: 'Systems + Automation',
    serviceType: 'Commerce automation',
    description:
      'Systems integration, workflow automation, bulk operations, and repeatable operating infrastructure across marketplaces.',
  },
] as const;

const organizationReference = {
  '@type': 'Organization',
  '@id': organizationId,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: { '@type': 'ImageObject', url: `${siteConfig.url}${siteConfig.logo}` },
};

export const websiteReference = {
  '@type': 'WebSite',
  '@id': websiteId,
  name: siteConfig.name,
  url: siteConfig.url,
};

/** Organization reference for author/publisher on articles. */
export const organizationRef = organizationReference;

/** Glen as the reviewer of a page (matches the visible Byline). */
export const founderRef = {
  '@type': 'Person',
  '@id': founderId,
  name: siteConfig.founderName,
  jobTitle: 'Founder & CEO',
  url: `${siteConfig.url}/about#founder`,
};

/** The WebPage around an article or case study: the Epic team wrote it, Glen reviewed it. */
export function reviewedPage(url: string, lastReviewed?: string) {
  return { '@type': 'WebPage', '@id': url, reviewedBy: founderRef, ...(lastReviewed ? { lastReviewed } : {}) };
}

export const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': founderId,
  name: siteConfig.founderName,
  jobTitle: 'Founder & CEO',
  description: "Glen Jensen is the founder and CEO of Epic Global Inc., an Amazon-first wholesale trade partner. He founded Epic on a simple principle: brands deserve a better way to succeed in ecommerce. Instead of an agency, Epic buys brands' inventory with its own capital and runs their marketplaces.",
  url: siteConfig.founderLinkedIn,
  sameAs: [siteConfig.founderLinkedIn],
  worksFor: organizationReference,
};

export const serviceSchemas = serviceDefinitions.map((service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteConfig.url}/#service-${service.slug}`,
  name: service.name,
  serviceType: service.serviceType,
  description: service.description,
  provider: organizationReference,
  areaServed: siteConfig.areaServed,
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Brands selling on ecommerce marketplaces',
  },
  url: `${siteConfig.url}/our-model`,
}));

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': organizationId,
  name: siteConfig.name,
  legalName: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}${siteConfig.logo}`,
  image: `${siteConfig.url}${siteConfig.logo}`,
  description: siteConfig.description,
  foundingDate: siteConfig.foundingDate,
  foundingLocation: {
    '@type': 'Place',
    name: siteConfig.headquarters,
  },
  alternateName: siteConfig.alternateName,
  sameAs: siteConfig.organizationSameAs,
  founder: {
    '@id': founderId,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.streetAddress,
    addressLocality: siteConfig.locality,
    addressRegion: siteConfig.region,
    postalCode: siteConfig.postalCode,
    addressCountry: siteConfig.countryCode,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      email: siteConfig.contactEmail,
      areaServed: siteConfig.areaServed,
      availableLanguage: ['English'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'Legal',
      email: siteConfig.legalEmail,
      availableLanguage: ['English'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'Privacy',
      email: siteConfig.privacyEmail,
      availableLanguage: ['English'],
    },
  ],
  areaServed: siteConfig.areaServed,
  knowsAbout: siteConfig.knowsAbout,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    '@id': serviceCatalogId,
    name: 'Marketplace Operating Services',
    itemListElement: serviceSchemas.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        '@id': service['@id'],
        name: service.name,
        url: service.url,
      },
    })),
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteId,
  name: siteConfig.name,
  // Google's site-name fallbacks, so results say "Epic Global" (not the bare domain or another Epic).
  alternateName: [...siteConfig.alternateName, 'epicglobalinc.com'],
  url: siteConfig.url,
  description: 'Amazon-first wholesale trade partner: buys brand inventory at wholesale and sells it on Amazon, plus Walmart and international marketplaces',
  publisher: organizationReference,
};

type WebPageSchemaInput =
  | {
      name: string;
      url: string;
      description: string;
      [key: string]: unknown;
    }
  | string;

export function getWebPageSchema(
  pageNameOrData: WebPageSchemaInput,
  url?: string,
  description?: string,
) {
  const pageData =
    typeof pageNameOrData === 'string'
      ? { name: pageNameOrData, url: url ?? '', description: description ?? '' }
      : pageNameOrData;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    ...pageData,
    about: organizationReference,
    isPartOf: websiteReference,
    publisher: organizationReference,
  };
}

export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${siteConfig.url}/contact#webpage`,
  name: `Contact ${siteConfig.name}`,
  url: `${siteConfig.url}/contact`,
  description:
    'Contact Epic Global Inc. to discuss marketplace operations, expansion goals, partnerships, and general questions.',
  mainEntity: organizationReference,
  isPartOf: {
    '@id': websiteId,
  },
  publisher: organizationReference,
};

export function getFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>,
  pageUrl = `${siteConfig.url}/faq`,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    url: pageUrl,
    about: organizationReference,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getCaseStudySchema(
  title: string,
  description: string,
  datePublished: string | undefined,
  url: string,
  image?: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    ...(datePublished ? { datePublished } : {}),
    ...(image ? { image: [image] } : {}),
    mainEntityOfPage: reviewedPage(url, datePublished),
    author: organizationReference,
    publisher: {
      '@type': 'Organization',
      '@id': organizationId,
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}${siteConfig.logo}`,
      },
    },
    url,
  };
}
