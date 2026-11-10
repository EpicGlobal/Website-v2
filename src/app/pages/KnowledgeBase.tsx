'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Book, Lightbulb, CheckSquare, BookOpen, FileText, Sparkles } from 'lucide-react';
import { SEO } from '@/app/components/SEO';
import { StructuredData, getBreadcrumbSchema, websiteReference } from '@/app/components/StructuredData';
import { CtaButton } from '@/app/components/CtaButton';
import { ACCENT, BODY, CHAPTER, H1, H2, HEAD, INNER, LEAD, MUTED, PAGE_BG, POP_BUTTON, QUIET_BUTTON, RULE } from '@/app/components/story/tokens';
import { ArticleCard } from '@/app/components/reading/ArticleCard';
import { CARD_LINK, FIELD } from '@/app/components/reading/reading';
import { ThemedSelect } from '@/app/components/reading/ThemedSelect';

// This will be replaced with actual articles from a data file
import type { KnowledgeArticle } from '@/app/data/knowledgeArticles';
import { siteConfig } from '@/site/site-config';

const categories = [
  'All',
  'Start Here',
  'Model and Process',
  'Marketplace Operations',
  'Global Expansion',
  'Advertising Operations',
  'Inventory and Forecasting',
  'Brand Protection',
  'Data and Reporting',
  'Systems and Automation',
  'Policies and Compliance',
  'Glossary',
  'Templates and Downloads',
  'Library',
];

const pillars = ['All', 'Buy', 'Sell', 'Advertise', 'Protect'];
const marketplaces = ['All', 'Amazon', 'Walmart', 'eBay', 'International'];

function normalizeFilter(value: string, options: string[]) {
  return options.includes(value) ? value : 'All';
}

export type KnowledgeBaseFilters = {
  category: string;
  pillar: string;
  marketplace: string;
};

type KnowledgeBaseProps = {
  initialFilters: KnowledgeBaseFilters;
  /** All articles as the public sees them today (from articlesAsOf on the server). */
  articles: KnowledgeArticle[];
};

export function KnowledgeBase({ initialFilters, articles: knowledgeArticles }: KnowledgeBaseProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(() =>
    normalizeFilter(initialFilters.category, categories)
  );
  const [selectedPillar, setSelectedPillar] = useState(() =>
    normalizeFilter(initialFilters.pillar, pillars)
  );
  const [selectedMarketplace, setSelectedMarketplace] = useState(() =>
    normalizeFilter(initialFilters.marketplace, marketplaces)
  );

  useEffect(() => {
    setSelectedCategory(normalizeFilter(initialFilters.category, categories));
    setSelectedPillar(normalizeFilter(initialFilters.pillar, pillars));
    setSelectedMarketplace(normalizeFilter(initialFilters.marketplace, marketplaces));
  }, [initialFilters.category, initialFilters.marketplace, initialFilters.pillar]);

  const updateFilterUrl = (nextFilters: KnowledgeBaseFilters) => {
    const params = new URLSearchParams();

    if (nextFilters.category !== 'All') {
      params.set('category', nextFilters.category);
    }

    if (nextFilters.pillar !== 'All') {
      params.set('pillar', nextFilters.pillar);
    }

    if (nextFilters.marketplace !== 'All') {
      params.set('marketplace', nextFilters.marketplace);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  // Filter articles
  // Only published articles are listed; unwritten ones stay hidden until they have content.
  const publishedArticles = knowledgeArticles.filter((article) => article.hasContent);
  const filteredArticles = publishedArticles.filter((article) => {
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;

    const matchesPillar =
      selectedPillar === 'All' || article.pillar === selectedPillar;

    const matchesMarketplace =
      selectedMarketplace === 'All' || article.marketplace?.includes(selectedMarketplace);

    return matchesSearch && matchesCategory && matchesPillar && matchesMarketplace;
  });

  // Popular articles
  const popularArticles = publishedArticles.filter((a) => a.featured).slice(0, 6);

  // Quick access tiles
  const quickTiles = [
    {
      icon: Sparkles,
      title: 'Start Here',
      description: 'New to Epic Global? Start with what we do and how we work with brands.',
      link: '/knowledge-base/what-is-epic-global-inc',
    },
    {
      icon: Book,
      title: 'How Our Model Works',
      description: 'Buy, Sell, Advertise, Protect explained in detail.',
      link: '/knowledge-base/how-our-model-works',
    },
    {
      icon: Lightbulb,
      title: 'Playbooks',
      description: 'Step-by-step workflows for key operations.',
      link: '/knowledge-base?category=Marketplace+Operations',
    },
    {
      icon: CheckSquare,
      title: 'Checklists',
      description: 'Ready-to-use checklists for every stage.',
      link: '/knowledge-base?category=Templates+and+Downloads',
    },
    {
      icon: BookOpen,
      title: 'Glossary',
      description: 'Definitions and marketplace terminology.',
      link: '/knowledge-base?category=Glossary',
    },
    {
      icon: FileText,
      title: 'Browse All Articles',
      description: 'Explore the complete knowledge library.',
      link: '/knowledge-base?category=All',
    },
  ];

  const filtersActive =
    searchQuery !== '' || selectedCategory !== 'All' || selectedPillar !== 'All' || selectedMarketplace !== 'All';
  const SECTION = 'px-4 sm:px-6 lg:px-8';

  return (
    <div className={PAGE_BG}>
      <SEO
        title="Knowledge Base - Marketplace Operations & Global Expansion Resources"
        description="Comprehensive guides on marketplace expansion, brand protection, advertising operations, inventory management, and global ecommerce strategies from Epic Global Inc."
        canonicalUrl={`${siteConfig.url}/knowledge-base`}
        keywords="marketplace guides, ecommerce knowledge base, amazon expansion guide, marketplace operations, brand protection strategies"
      />
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${siteConfig.url}/knowledge-base#webpage`,
          name: 'Knowledge Base',
          url: `${siteConfig.url}/knowledge-base`,
          description: 'Operator-grade playbooks, checklists, and definitions for running Amazon, Walmart and international marketplaces as a system.',
          isPartOf: websiteReference,
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: publishedArticles.length,
            itemListElement: publishedArticles.map((a, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${siteConfig.url}/knowledge-base/${a.slug}`,
              name: a.seoTitle ?? a.title,
            })),
          },
        }}
      />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: `${siteConfig.url}/` },
          { name: 'Knowledge Base', url: `${siteConfig.url}/knowledge-base` },
        ])}
      />

      {/* Hero: answer first, then the tools to find an article (search and filters together). */}
      <section className={`pt-32 pb-10 ${SECTION}`}>
        <div className={INNER}>
          <h1 className={`${H1} mb-5`}>Knowledge Base</h1>
          <p className={`${LEAD} max-w-3xl mb-10`}>
            Operator-grade playbooks, checklists, and definitions for running Amazon, Walmart and international marketplaces as a system.
          </p>

          <div className="relative mb-4">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${MUTED}`} aria-hidden="true" />
            <input
              type="search"
              aria-label="Search the Knowledge Base"
              placeholder="Search playbooks, checklists, and answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${FIELD} pl-12 pr-4 py-4 text-base`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
            <ThemedSelect
              id="kb-filter-category"
              label="Category"
              labelClassName={`text-sm mb-2 block ${MUTED}`}
              value={selectedCategory}
              options={categories}
              onChange={(value) => {
                setSelectedCategory(value);
                updateFilterUrl({ category: value, pillar: selectedPillar, marketplace: selectedMarketplace });
              }}
            />
            </div>

            <div>
            <ThemedSelect
              id="kb-filter-pillar"
              label="Pillar"
              labelClassName={`text-sm mb-2 block ${MUTED}`}
              value={selectedPillar}
              options={pillars}
              onChange={(value) => {
                setSelectedPillar(value);
                updateFilterUrl({ category: selectedCategory, pillar: value, marketplace: selectedMarketplace });
              }}
            />
            </div>

            <div>
            <ThemedSelect
              id="kb-filter-marketplace"
              label="Marketplace"
              labelClassName={`text-sm mb-2 block ${MUTED}`}
              value={selectedMarketplace}
              options={marketplaces}
              onChange={(value) => {
                setSelectedMarketplace(value);
                updateFilterUrl({ category: selectedCategory, pillar: selectedPillar, marketplace: value });
              }}
            />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access: six ways in, as quiet cards. */}
      <section className={`py-10 ${SECTION}`}>
        <div className={INNER}>
          <h2 className={`${H2} mb-8`}>Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickTiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <Link key={tile.title} href={tile.link} className={`${CARD_LINK} flex gap-4 items-start`}>
                  <Icon className={`w-5 h-5 mt-1 shrink-0 ${ACCENT}`} aria-hidden="true" />
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${HEAD} group-hover:underline underline-offset-4 decoration-1`}>{tile.title}</h3>
                    <p className={`text-sm leading-relaxed ${MUTED}`}>{tile.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles (only when nothing is filtered) */}
      {!filtersActive && (
        <section className={`py-10 ${SECTION}`}>
          <div className={INNER}>
            <h2 className={`${H2} mb-8`}>Popular Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} showType={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles / Search Results */}
      <section className={`py-10 ${SECTION}`}>
        <div className={INNER}>
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <h2 className={H2}>{filtersActive ? 'Search Results' : 'All Articles'}</h2>
            <p className={`text-sm shrink-0 ${MUTED}`}>{filteredArticles.length} articles</p>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="py-12">
              <p className={`mb-4 ${BODY}`}>No articles found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedPillar('All');
                  setSelectedMarketplace('All');
                  updateFilterUrl({
                    category: 'All',
                    pillar: 'All',
                    marketplace: 'All',
                  });
                }}
                className={QUIET_BUTTON}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Closing call to action */}
      <section className={CHAPTER}>
        <div className={`${INNER} border-t ${RULE} pt-14`}>
          <h2 className={`${H2} mb-4`}>Can&apos;t find what you&apos;re looking for?</h2>
          <p className={`text-lg leading-relaxed max-w-2xl mb-8 ${BODY}`}>
            Let&apos;s talk through your specific situation and map the right approach. Or email <a href={`mailto:${siteConfig.contactEmail}`} className="underline underline-offset-2 font-medium">{siteConfig.contactEmail}</a>.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <CtaButton variant="primary" size="lg" location="Knowledge Base Page - Final CTA" />
            {/* With booking switched off, the FAQ link is the page's one main action. */}
            <Link href="/faq" className={`${siteConfig.bookACallEnabled ? QUIET_BUTTON : POP_BUTTON} self-start sm:self-auto`}>
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
