import type { MetadataRoute } from 'next';
import { isoDate, knowledgeArticles } from '@/app/data/knowledgeArticles';
import { siteConfig } from '@/site/site-config';

// Change a page's date only when its content really changes, so search engines can trust lastModified.
// Every page below changes in this release (canonical moves to www), so all take its go-live date.
// SET ON MERGE: change 2026-10-29 to the day this goes live.
const staticRoutes = [
  { path: '/', priority: 1, updated: '2026-10-29' },
  { path: '/about', priority: 0.9, updated: '2026-10-29' },
  { path: '/our-model', priority: 0.9, updated: '2026-10-29' },
  { path: '/intelligence', priority: 0.8, updated: '2026-10-29' },
  { path: '/case-studies', priority: 0.8, updated: '2026-10-29' },
  { path: '/knowledge-base', priority: 0.8, updated: '2026-10-29' },
  { path: '/faq', priority: 0.7, updated: '2026-10-29' },
  { path: '/privacy', priority: 0.4, updated: '2026-10-29' },
  { path: '/privacy-choices', priority: 0.4, updated: '2026-10-29' },
  { path: '/terms', priority: 0.4, updated: '2026-10-29' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: route.updated,
    changeFrequency: route.path === '/' ? 'weekly' : 'monthly',
    priority: route.priority,
  }));

  // Only written articles: "Coming Soon" placeholders stay out of the sitemap until they have content.
  const articleEntries: MetadataRoute.Sitemap = knowledgeArticles
    .filter((article) => article.hasContent)
    .map((article) => ({
      url: `${siteConfig.url}/knowledge-base/${article.slug}`,
      lastModified: isoDate(article.lastUpdated),
      changeFrequency: 'monthly',
      priority: article.featured ? 0.7 : 0.6,
    }));

  return [...staticEntries, ...articleEntries];
}
