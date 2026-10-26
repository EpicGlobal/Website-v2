import type { MetadataRoute } from 'next';
import { siteConfig } from '@/site/site-config';
import { isWebsitePreview } from '@/site/preview-mode';

export default function robots(): MetadataRoute.Robots {
  if (isWebsitePreview) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web', 'PerplexityBot', 'Applebot'],
        allow: '/',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
