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
        // AI search and assistant crawlers, named so it's clear they're welcome.
        // anthropic-ai and Claude-Web are retired names; ClaudeBot, Claude-SearchBot and Claude-User replace them.
        userAgent: [
          'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
          'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
          'PerplexityBot', 'Perplexity-User',
          'Google-Extended', 'Applebot', 'Applebot-Extended', 'CCBot',
          // Bing (Copilot and ChatGPT search use Bing's index), Meta AI, Amazon (Alexa, Rufus), DuckDuckGo's AI answers,
          // Mistral's Le Chat. xAI publishes no crawler page; GrokBot, xAI-Grok and Grok-DeepSearch are the names
          // bot directories report (Nov 2026).
          'Bingbot', 'meta-externalagent', 'Amazonbot', 'DuckAssistBot', 'MistralAI-User',
          'GrokBot', 'xAI-Grok', 'Grok-DeepSearch',
        ],
        allow: '/',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
