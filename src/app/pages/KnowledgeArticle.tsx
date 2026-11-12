'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Download, Share2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { isoDate, type KnowledgeArticle as KnowledgeArticleType } from '@/app/data/knowledgeArticles';
import { StructuredData, articleAuthor, getBreadcrumbSchema, organizationRef, reviewedPage } from '@/app/components/StructuredData';
import { Byline } from '@/app/components/reading/Byline';
import { ArticleFeedback } from '@/app/components/reading/ArticleFeedback';
import { ReadingProgressRing } from '@/app/components/scroll/ScrollEffects';
import { CtaButton } from '@/app/components/CtaButton';
import { GatedDownloadButton } from '@/app/components/GatedDownloadButton';
import { ACCENT, BODY, CHAPTER, H1, H2, HEAD, INNER, LEAD, MUTED, PAGE_BG, RULE } from '@/app/components/story/tokens';
import { ArticleCard } from '@/app/components/reading/ArticleCard';
import { MEASURE, PILL } from '@/app/components/reading/reading';
import '@/app/components/reading/reading.css';
import { siteConfig } from '@/site/site-config';

/*
 * Knowledge Base article template (tier 3, reading page): calm, on the site's theme background, one reading column
 * of about 70 characters. The article text comes from its Markdown file (content/knowledge-base), rendered by
 * ArticleMarkdown on the server and passed in as `body`; reading.css themes it.
 */

const SECTION = 'px-4 sm:px-6 lg:px-8';

type KnowledgeArticleProps = {
  /** The published article (card fields only; the server never passes drafts or the publishing calendar). */
  article: KnowledgeArticleType;
  /** Up to three published articles for Related Articles. */
  related: KnowledgeArticleType[];
  /** The article text, rendered on the server. */
  body: ReactNode;
};

export function KnowledgeArticle({ article, related: relatedArticles, body }: KnowledgeArticleProps) {
  const updated = isoDate(article.lastUpdated);
  const published = article.published ?? updated;
  const publishedText = new Date(`${published}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  const articleUrl = `${siteConfig.url}/knowledge-base/${article.slug}`;
  const meta = [article.pillar, article.type, article.difficulty].filter((m): m is NonNullable<typeof m> => Boolean(m));

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.seoDescription ?? article.summary,
    datePublished: published,
    dateModified: updated,
    // A reviewer appears only when the approval is recorded in the article's front matter.
    mainEntityOfPage: reviewedPage(articleUrl, article.review),
    image: [`${articleUrl}/opengraph-image`],
    author: articleAuthor(article.author),
    publisher: organizationRef,
  };

  return (
    <div className={PAGE_BG}>
      <StructuredData data={articleSchema} />
      <ReadingProgressRing />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: `${siteConfig.url}/` },
          { name: 'Knowledge Base', url: `${siteConfig.url}/knowledge-base` },
          { name: article.title, url: articleUrl },
        ])}
      />

      {/* Header: where you are, what kind of article, the title and the one-line answer. */}
      <header className={`pt-32 pb-10 ${SECTION}`}>
        <div className={INNER}>
          <Link
            href="/knowledge-base"
            className={`inline-flex items-center gap-2 text-sm font-medium mb-8 underline-offset-4 decoration-1 hover:underline ${BODY}`}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Knowledge Base
          </Link>

          {/* Breadcrumb: the same three steps as the BreadcrumbList schema above. */}
          <nav aria-label="Breadcrumb" className={`text-sm mb-6 ${MUTED}`}>
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="underline-offset-4 decoration-1 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/knowledge-base" className="underline-offset-4 decoration-1 hover:underline">
                  Knowledge Base
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{article.title}</li>
            </ol>
          </nav>

          {/* Article Meta */}
          <p className="mb-5 text-sm font-semibold">
            <span className={`${PILL} ${ACCENT}`}>{article.category}</span>
            {meta.map((m) => (
              <span key={m} className={`font-normal ${MUTED}`}>
                <span aria-hidden="true"> · </span>
                {m}
              </span>
            ))}
          </p>

          {/* Title */}
          <h1 className={`${H1} max-w-4xl mb-6`}>{article.title}</h1>

          {/* Summary */}
          <p className={`${LEAD} ${MEASURE} mb-8`}>{article.summary}</p>

          {/* Article Info Bar */}
          <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 pb-8 border-b text-sm ${RULE} ${MUTED}`}>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {published === updated ? (
                <span>Published <time dateTime={published}>{publishedText}</time></span>
              ) : (
                <span>
                  Published <time dateTime={published}>{publishedText}</time> · Updated <time dateTime={updated}>{article.lastUpdated}</time>
                </span>
              )}
            </div>
            <Byline author={article.author} review={article.review} />
            {siteConfig.downloadsEnabled && article.downloadable && article.downloadUrl && (
              <GatedDownloadButton
                href={article.downloadUrl}
                fileName={article.title}
                fileType="template"
                className={`flex items-center gap-2 font-semibold underline-offset-4 decoration-1 hover:underline ${ACCENT}`}
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download Template</span>
              </GatedDownloadButton>
            )}
            <button className="flex items-center gap-2 underline-offset-4 decoration-1 hover:underline">
              <Share2 className="w-4 h-4" aria-hidden="true" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Article Content: one comfortable reading column (about 70 characters a line). */}
      <section className={`pt-4 pb-16 ${SECTION}`}>
        <div className={INNER}>
          <article className={`kb-prose ${MEASURE}`}>
            {body}
          </article>

          <div className={MEASURE}>
            {/* Tags */}
            {article.tags.length > 0 && (
              <div className={`mt-14 pt-8 border-t ${RULE}`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className={`w-4 h-4 mr-1 ${MUTED}`} aria-hidden="true" />
                  {article.tags.map((tag) => (
                    <span key={tag} className={`px-3 py-1 rounded-full border text-xs ${RULE} ${MUTED}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <ArticleFeedback slug={article.slug} />
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className={`py-16 ${SECTION}`}>
          <div className={`${INNER} border-t ${RULE} pt-14`}>
            <h2 className={`${H2} mb-8`}>Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.slug} article={relatedArticle} showType={false} showDate={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {siteConfig.bookACallEnabled ? (
        <section className={CHAPTER}>
          <div className={INNER}>
            <h2 className={`${H2} mb-4`}>Ready to see how this works for your brand?</h2>
            <p className={`text-lg leading-relaxed max-w-2xl mb-8 ${BODY}`}>
              Let&apos;s walk through your catalog, marketplace presence, and growth goals. Or email <a href={`mailto:${siteConfig.contactEmail}`} className="underline underline-offset-2 font-medium">{siteConfig.contactEmail}</a>.
            </p>
            <CtaButton variant="primary" size="lg" location="Knowledge Article Page - Bottom CTA" />
          </div>
        </section>
      ) : null}
    </div>
  );
}
