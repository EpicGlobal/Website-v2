import type { MetadataRoute } from 'next';
import { articlesAsOf, isoDate } from '@/app/data/knowledgeArticles';
import { publishedCaseStudies } from '@/app/data/caseStudies';
import { siteConfig } from '@/site/site-config';

// Change a page's date only when its content really changes, so search engines can trust lastModified.
// Every page below changed in this release (www canonical, 42 countries, titles, schema), so all share its date.
// On go-live day, set RELEASE to that day once; after that, edit a page's own date only when that page changes.
const RELEASE = '2026-11-10';
const staticRoutes = [
  { path: '/', priority: 1, updated: RELEASE },
  { path: '/about', priority: 0.9, updated: RELEASE },
  { path: '/our-model', priority: 0.9, updated: RELEASE },
  { path: '/intelligence', priority: 0.8, updated: RELEASE },
  { path: '/case-studies', priority: 0.8, updated: RELEASE },
  { path: '/knowledge-base', priority: 0.8, updated: RELEASE },
  { path: '/faq', priority: 0.7, updated: RELEASE },
  { path: '/privacy', priority: 0.4, updated: RELEASE },
  { path: '/privacy-choices', priority: 0.4, updated: RELEASE },
  { path: '/terms', priority: 0.4, updated: RELEASE },
];

// Rebuilt hourly so scheduled articles join the sitemap on their publish day.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: route.updated,
    changeFrequency: route.path === '/' ? 'weekly' : 'monthly',
    priority: route.priority,
  }));

  // Only written articles: "Coming Soon" placeholders stay out of the sitemap until they have content.
  const articleEntries: MetadataRoute.Sitemap = articlesAsOf()
    .filter((article) => article.hasContent)
    .map((article) => ({
      url: `${siteConfig.url}/knowledge-base/${article.slug}`,
      lastModified: isoDate(article.lastUpdated),
      changeFrequency: 'monthly',
      priority: article.featured ? 0.7 : 0.6,
    }));

  // Published case studies only (drafts and studies in review stay out). No study date yet, so the release date.
  const caseStudyEntries: MetadataRoute.Sitemap = publishedCaseStudies.map((study) => ({
    url: `${siteConfig.url}/case-studies/${study.slug}`,
    lastModified: study.updated ?? study.published ?? RELEASE,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries, ...caseStudyEntries];
}
