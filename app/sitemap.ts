import type { MetadataRoute } from 'next';
import { knowledgeArticles } from '@/app/data/knowledgeArticles';
import { siteConfig } from '@/site/site-config';

const staticRoutes = [
  { path: '/', priority: 1 },
  { path: '/about', priority: 0.9 },
  { path: '/our-model', priority: 0.9 },
  { path: '/intelligence', priority: 0.8 },
  { path: '/case-studies', priority: 0.8 },
  { path: '/knowledge-base', priority: 0.8 },
  { path: '/faq', priority: 0.7 },
  { path: '/contact', priority: 0.7 },
  { path: '/privacy', priority: 0.4 },
  { path: '/terms', priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-03-09');

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.path === '/' ? 'weekly' : 'monthly',
    priority: route.priority,
  }));

  const articleEntries: MetadataRoute.Sitemap = knowledgeArticles.map((article) => ({
    url: `${siteConfig.url}/knowledge-base/${article.slug}`,
    lastModified: new Date(article.lastUpdated),
    changeFrequency: 'monthly',
    priority: article.featured ? 0.7 : 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
