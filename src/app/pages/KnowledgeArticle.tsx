'use client';

import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Download, Share2 } from 'lucide-react';
import { knowledgeArticles } from '@/app/data/knowledgeArticles';
import { StructuredData } from '@/app/components/StructuredData';
import { SEO } from '@/app/components/SEO';
import { CtaButton } from '@/app/components/CtaButton';

// Import article content components
import { getArticleContent } from '@/app/data/articleContent';

type KnowledgeArticleProps = {
  slug: string;
};

export function KnowledgeArticle({ slug }: KnowledgeArticleProps) {
  const article = knowledgeArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen text-white pt-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            href="/knowledge-base"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Knowledge Base
          </Link>
        </div>
      </div>
    );
  }

  const ArticleContent = getArticleContent(article.slug);
  const relatedArticles = knowledgeArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  // Generate FAQ schema if article has FAQ section
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished: article.lastUpdated,
    author: {
      '@type': 'Organization',
      name: 'Epic Global Inc.',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Epic Global Inc.',
    },
  };

  return (
    <div className="min-h-screen text-white">
      <SEO 
        title={`${article.title} | Epic Global Inc.`}
        description={article.summary}
        canonicalUrl={`https://epicglobalinc.com/knowledge-base/${article.slug}`}
        keywords={`${article.category}, ${article.pillar}, marketplace guide, ecommerce strategy`}
        ogType="article"
        article={{
          publishedTime: article.lastUpdated,
          modifiedTime: article.lastUpdated,
          author: 'Epic Global Inc.',
          section: article.category,
          tags: [article.pillar, article.category].filter((tag): tag is string => Boolean(tag))
        }}
      />
      <StructuredData data={faqSchema} />

      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/knowledge-base"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Knowledge Base
          </Link>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/knowledge-base" className="hover:text-cyan-400">
              Knowledge Base
            </Link>
            <span>/</span>
            <span className="text-gray-400">{article.category}</span>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-semibold">
              {article.category}
            </span>
            {article.pillar && (
              <span className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-xs">
                {article.pillar}
              </span>
            )}
            {article.type && (
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-semibold">
                {article.type}
              </span>
            )}
            {article.difficulty && (
              <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs">
                {article.difficulty}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent leading-tight">
            {article.title}
          </h1>

          {/* Summary */}
          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
            {article.summary}
          </p>

          {/* Article Info Bar */}
          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Updated {article.lastUpdated}</span>
            </div>
            {article.downloadable && (
              <button className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
                <Download className="w-4 h-4" />
                <span>Download Template</span>
              </button>
            )}
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-invert prose-lg max-w-none">
            <ArticleContent />
          </article>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 flex-wrap">
                <Tag className="w-4 h-4 text-gray-500" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-xs hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4 text-white">Was this article helpful?</h3>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors text-sm font-medium">
                  Yes, helpful
                </button>
                <button className="px-6 py-2 bg-white/5 text-gray-400 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
                  No, needs improvement
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-950 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-white">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.slug}
                  href={`/knowledge-base/${relatedArticle.slug}`}
                  className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-semibold">
                      {relatedArticle.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{relatedArticle.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
            Ready to see how this works for your brand?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's walk through your catalog, marketplace presence, and growth goals.
          </p>
          <CtaButton variant="primary" size="lg" location="Knowledge Article Page - Bottom CTA" />
        </div>
      </section>
    </div>
  );
}
