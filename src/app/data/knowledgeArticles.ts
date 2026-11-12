/*
 * Knowledge Base articles. Each article is one Markdown file in content/knowledge-base/ (how to write, review and
 * schedule one: content/knowledge-base/README.md). scripts/build-articles.mjs turns those files into
 * knowledgeArticles.generated.ts before every build, so this file only holds the shape of an article and the
 * publishing rules.
 *
 * Server-only data: the full list includes drafts and the publishing calendar. Browser components get articles
 * through publishedArticles() and toArticleCard(), never the full list.
 */
import { generatedArticles } from './knowledgeArticles.generated';

export type ArticleStatus = 'draft' | 'review' | 'approved' | 'live-unreviewed';

export interface ArticleReview {
  /** Reviewer's name, exactly as they agreed to be credited. */
  by: string;
  /** Their role at Epic, e.g. "Brand Manager". */
  role: string;
  /** YYYY-MM-DD they approved the final text. */
  on: string;
}

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
  /** YYYY-MM-DD. Until this day (Utah time) the article stays hidden: 404, no card, not in the sitemap or feeds. */
  publishOn?: string;
  tags: string[];
  featured?: boolean;
  downloadable?: boolean;
  downloadUrl?: string;
  /** Review status from the front matter; only approved and live-unreviewed articles are ever published. */
  status?: ArticleStatus;
  /** Who wrote it (front matter "author"); without it the byline says "the Epic team". */
  author?: string;
  /** The recorded approval. Present only on approved articles; the byline and schema show a reviewer only then. */
  review?: ArticleReview;
  /** Whether the article is written (and, from articlesAsOf, already published). */
  hasContent?: boolean;
  /** Slugs to show under Related Articles first (only published ones are shown). */
  related?: string[];
}

/** Every article in list order, as written (drafts and scheduled ones too). Server-only. */
export const knowledgeArticles: KnowledgeArticle[] = generatedArticles;

/** Today's date in Utah (Epic's office), as YYYY-MM-DD. */
export function utahToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Denver', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

/** Written, approved (or live before reviews began) and its publish date has arrived in Utah. */
export function isPublished(article: KnowledgeArticle, today: string = utahToday()): boolean {
  const publishable = article.status === 'approved' || article.status === 'live-unreviewed';
  return Boolean(article.hasContent) && publishable && (!article.publishOn || article.publishOn <= today);
}

/**
 * Every article with hasContent set to "published today", in list order. Server-only (it still includes
 * unpublished entries); filter with hasContent or use publishedArticles() before anything leaves the server.
 */
export function articlesAsOf(today: string = utahToday()): KnowledgeArticle[] {
  return knowledgeArticles.map((article) => ({ ...article, hasContent: isPublished(article, today) }));
}

/** Only the articles the public can see today, in list order. */
export function publishedArticles(today: string = utahToday()): KnowledgeArticle[] {
  return articlesAsOf(today).filter((article) => article.hasContent);
}

/** The published article with this slug, or undefined (scheduled, draft, in review, or no such article). */
export function getPublishedArticle(slug: string, today: string = utahToday()): KnowledgeArticle | undefined {
  return publishedArticles(today).find((article) => article.slug === slug);
}

/**
 * What a browser component may receive about a published article: the card and page fields only, never the
 * publishing calendar (publishOn) or the review status. Use for every article passed to a 'use client' component.
 */
export function toArticleCard(article: KnowledgeArticle): KnowledgeArticle {
  const { publishOn: _publishOn, status: _status, ...card } = article;
  return { ...card, hasContent: true };
}

/** Up to three published articles to show under an article: its "related" list first, then the same category. */
export function relatedArticles(article: KnowledgeArticle, today: string = utahToday()): KnowledgeArticle[] {
  const live = publishedArticles(today).filter((a) => a.slug !== article.slug);
  const listed = (article.related ?? []).map((slug) => live.find((a) => a.slug === slug)).filter((a): a is KnowledgeArticle => Boolean(a));
  const sameCategory = live.filter((a) => a.category === article.category && !listed.includes(a));
  return [...listed, ...sameCategory].slice(0, 3);
}

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

/** "January 22, 2026" -> "2026-01-22", for the sitemap and article schema (search engines expect ISO dates). */
export function isoDate(text: string): string {
  const match = /^([A-Za-z]+) (\d{1,2}), (\d{4})$/.exec(text.trim());
  const month = match ? months.indexOf(match[1].toLowerCase()) + 1 : 0;
  if (!match || !month) throw new Error(`Article date must look like "January 22, 2026": ${text}`);
  return `${match[3]}-${String(month).padStart(2, '0')}-${match[2].padStart(2, '0')}`;
}
