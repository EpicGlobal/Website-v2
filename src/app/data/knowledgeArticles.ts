/*
 * Knowledge Base articles. Each article is one Markdown file in content/knowledge-base/ (how to write one:
 * content/knowledge-base/README.md). scripts/build-articles.mjs turns those files into knowledgeArticles.generated.ts
 * before every build, so this file only holds the shape of an article and the publish-date rules.
 */
import { generatedArticles } from './knowledgeArticles.generated';

export interface KnowledgeArticle {
  slug: string;
  title: string;
  /** Shorter title for search results when the page title runs over 70 characters with " | Epic Global Inc." added. */
  seoTitle?: string;
  summary: string;
  /** Longer description for search results (150-160 characters) when the card summary is too short. */
  seoDescription?: string;
  category: string;
  pillar?: string;
  marketplace?: string[];
  region?: string[];
  objective?: string;
  type?: 'Answer Page' | 'Playbook' | 'Checklist' | 'Glossary' | 'Template' | 'Deep Dive';
  difficulty?: 'Intro' | 'Operator' | 'Advanced';
  /** The date readers see, like "January 22, 2026": the last edit, or the publish date if that's later. */
  lastUpdated: string;
  /** YYYY-MM-DD the article first went live (front matter "published", else publishOn, else the last edit). */
  published?: string;
  /** YYYY-MM-DD. Until this day (Utah time) the article stays hidden: no page, no card, not in the sitemap. */
  publishOn?: string;
  tags: string[];
  featured?: boolean;
  downloadable?: boolean;
  downloadUrl?: string;
  /** Whether the article is written (and, from articlesAsOf, already published). */
  hasContent?: boolean;
  /** Slugs to show under Related Articles first (only published ones are shown). */
  related?: string[];
}

/** Every article in list order, as written (ignores publish dates). Use articlesAsOf() for what the public sees. */
export const knowledgeArticles: KnowledgeArticle[] = generatedArticles;

/** Today's date in Utah (Epic's office), as YYYY-MM-DD. */
export function utahToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Denver', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

/** Written and its publish date has arrived. */
export function isPublished(article: KnowledgeArticle, today: string = utahToday()): boolean {
  return Boolean(article.hasContent) && (!article.publishOn || article.publishOn <= today);
}

/**
 * The articles as the public sees them on a given day: an article scheduled for later counts as not written yet
 * (hasContent false), so every page, card, feed and the sitemap hide it until its day.
 */
export function articlesAsOf(today: string = utahToday()): KnowledgeArticle[] {
  return knowledgeArticles.map((article) => ({ ...article, hasContent: isPublished(article, today) }));
}

/** How often pages that list articles rebuild themselves, so scheduled articles appear without a new deploy. */
export const ARTICLE_REFRESH_SECONDS = 3600;

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

/** "January 22, 2026" -> "2026-01-22", for the sitemap and article schema (search engines expect ISO dates). */
export function isoDate(text: string): string {
  const match = /^([A-Za-z]+) (\d{1,2}), (\d{4})$/.exec(text.trim());
  const month = match ? months.indexOf(match[1].toLowerCase()) + 1 : 0;
  if (!match || !month) throw new Error(`Article date must look like "January 22, 2026": ${text}`);
  return `${match[3]}-${String(month).padStart(2, '0')}-${match[2].padStart(2, '0')}`;
}
