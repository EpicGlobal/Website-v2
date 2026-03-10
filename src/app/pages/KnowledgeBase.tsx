'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Book, Lightbulb, CheckSquare, BookOpen, FileText, Download, Sparkles } from 'lucide-react';
import { SEO } from '@/app/components/SEO';
import { CtaButton } from '@/app/components/CtaButton';

// This will be replaced with actual articles from a data file
import { knowledgeArticles } from '@/app/data/knowledgeArticles';

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

const pillars = ['All', 'Purchase', 'Expand', 'Cover'];
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
};

export function KnowledgeBase({ initialFilters }: KnowledgeBaseProps) {
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
  const filteredArticles = knowledgeArticles.filter((article) => {
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
  const popularArticles = knowledgeArticles.filter((a) => a.featured).slice(0, 6);

  // Quick access tiles
  const quickTiles = [
    {
      icon: Sparkles,
      title: 'Start Here',
      description: 'New to Epic Global? Start with these fundamentals.',
      link: '/knowledge-base?category=Start+Here',
      color: 'from-cyan-500/20 to-cyan-600/10',
    },
    {
      icon: Book,
      title: 'How Our Model Works',
      description: 'Purchase, Expand, Cover explained in detail.',
      link: '/knowledge-base/how-our-model-works',
      color: 'from-blue-500/20 to-blue-600/10',
    },
    {
      icon: Lightbulb,
      title: 'Playbooks',
      description: 'Step-by-step workflows for key operations.',
      link: '/knowledge-base?category=Marketplace+Operations',
      color: 'from-purple-500/20 to-purple-600/10',
    },
    {
      icon: CheckSquare,
      title: 'Checklists',
      description: 'Ready-to-use checklists for every stage.',
      link: '/knowledge-base?category=Templates+and+Downloads',
      color: 'from-green-500/20 to-green-600/10',
    },
    {
      icon: BookOpen,
      title: 'Glossary',
      description: 'Definitions and marketplace terminology.',
      link: '/knowledge-base?category=Glossary',
      color: 'from-orange-500/20 to-orange-600/10',
    },
    {
      icon: FileText,
      title: 'Browse All Articles',
      description: 'Explore the complete knowledge library.',
      link: '/knowledge-base?category=All',
      color: 'from-gray-500/20 to-gray-600/10',
    },
  ];

  return (
    <div className="min-h-screen text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 bg-gradient-to-br dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:from-lime-500 water:via-lime-100 water:to-white orange:from-[#F68932] orange:via-orange-100 orange:to-white">
      <SEO 
        title="Knowledge Base - Marketplace Operations & Global Expansion Resources"
        description="Comprehensive guides on marketplace expansion, brand protection, advertising operations, inventory management, and global ecommerce strategies from Epic Global Inc."
        canonicalUrl="https://epicglobalinc.com/knowledge-base"
        keywords="marketplace guides, ecommerce knowledge base, amazon expansion guide, marketplace operations, brand protection strategies"
      />
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:from-gray-50 light:to-white orange:bg-transparent leaf:bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-gray-400 dark:from-white dark:to-gray-400 soft-dark:from-gray-900 soft-dark:to-gray-700 light:from-gray-900 light:to-gray-600 orange:from-[#101828] orange:to-[#101828] leaf:from-gray-900 leaf:to-gray-700 water:from-gray-900 water:to-gray-700 bg-clip-text text-transparent leading-tight">
              Knowledge Base
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 soft-dark:text-gray-800 light:text-gray-600 orange:text-[#101828] leaf:text-gray-800 water:text-gray-800 mb-8 leading-relaxed">
              Operator-grade playbooks, checklists, and definitions for running marketplaces as a system.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-500 orange:text-gray-600 leaf:text-gray-600 water:text-gray-600" />
              <input
                type="text"
                placeholder="Search playbooks, checklists, and answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 dark:bg-white/5 soft-dark:bg-white/70 light:bg-gray-100 orange:bg-white/70 leaf:bg-white/70 water:bg-white/70 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-300 orange:border-white/30 leaf:border-white/20 water:border-white/20 rounded-lg pl-12 pr-4 py-4 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 soft-dark:placeholder-gray-600 light:placeholder-gray-500 orange:placeholder-gray-600 leaf:placeholder-gray-600 water:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 orange:focus:ring-orange-500/50 water:focus:ring-emerald-500/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Tiles */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:bg-transparent orange:bg-transparent leaf:bg-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickTiles.map((tile, index) => {
              const Icon = tile.icon;
              return (
                <Link
                  key={index}
                  href={tile.link}
                  className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/5 dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-white/30 leaf:border-white/20 water:border-white/20 hover:border-cyan-500/30 soft-dark:hover:border-lime-600/30 orange:hover:border-orange-500/30 leaf:hover:border-cyan-600/50 water:hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 soft-dark:hover:shadow-lime-500/10 orange:hover:shadow-orange-500/20 light:hover:shadow-cyan-500/20 water:hover:shadow-emerald-500/20 overflow-hidden"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 soft-dark:from-lime-500/10 orange:from-orange-500/10 water:from-emerald-500/10 to-transparent rounded-2xl" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 bg-gradient-to-br ${tile.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 group-hover:text-cyan-400 soft-dark:group-hover:text-lime-700 light:group-hover:text-cyan-600 orange:group-hover:text-orange-700 leaf:group-hover:text-cyan-700 water:group-hover:text-emerald-700 transition-colors">
                      {tile.title}
                    </h3>
                    <p className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">{tile.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:bg-transparent orange:bg-transparent leaf:bg-transparent water:bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-gray-700 leaf:text-gray-700 water:text-gray-700 mb-2 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedCategory(value);
                  updateFilterUrl({
                    category: value,
                    pillar: selectedPillar,
                    marketplace: selectedMarketplace,
                  });
                }}
                className="w-full bg-white/5 dark:bg-white/5 soft-dark:bg-white/70 light:bg-white orange:bg-white/70 leaf:bg-white/70 water:bg-white/70 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-300 orange:border-white/20 leaf:border-white/20 water:border-white/20 rounded-lg px-4 py-2 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 water:focus:ring-emerald-500/50 [&>option]:bg-gray-900 dark:[&>option]:bg-gray-900 soft-dark:[&>option]:bg-slate-800 light:[&>option]:bg-white orange:[&>option]:bg-orange-900 leaf:[&>option]:bg-slate-800 water:[&>option]:bg-white [&>option]:text-white dark:[&>option]:text-white soft-dark:[&>option]:text-gray-100 light:[&>option]:text-gray-900 orange:[&>option]:text-white leaf:[&>option]:text-gray-100 water:[&>option]:text-gray-900"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-gray-700 leaf:text-gray-700 water:text-gray-700 mb-2 block">Pillar</label>
              <select
                value={selectedPillar}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedPillar(value);
                  updateFilterUrl({
                    category: selectedCategory,
                    pillar: value,
                    marketplace: selectedMarketplace,
                  });
                }}
                className="w-full bg-white/5 dark:bg-white/5 soft-dark:bg-white/70 light:bg-white orange:bg-white/70 leaf:bg-white/70 water:bg-white/70 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-300 orange:border-white/20 leaf:border-white/20 water:border-white/20 rounded-lg px-4 py-2 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 water:focus:ring-emerald-500/50 [&>option]:bg-gray-900 dark:[&>option]:bg-gray-900 soft-dark:[&>option]:bg-slate-800 light:[&>option]:bg-white orange:[&>option]:bg-orange-900 leaf:[&>option]:bg-slate-800 water:[&>option]:bg-white [&>option]:text-white dark:[&>option]:text-white soft-dark:[&>option]:text-gray-100 light:[&>option]:text-gray-900 orange:[&>option]:text-white leaf:[&>option]:text-gray-100 water:[&>option]:text-gray-900"
              >
                {pillars.map((pillar) => (
                  <option key={pillar} value={pillar}>
                    {pillar}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-gray-700 leaf:text-gray-700 water:text-gray-700 mb-2 block">Marketplace</label>
              <select
                value={selectedMarketplace}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedMarketplace(value);
                  updateFilterUrl({
                    category: selectedCategory,
                    pillar: selectedPillar,
                    marketplace: value,
                  });
                }}
                className="w-full bg-white/5 dark:bg-white/5 soft-dark:bg-white/70 light:bg-white orange:bg-white/70 leaf:bg-white/70 water:bg-white/70 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-300 orange:border-white/20 leaf:border-white/20 water:border-white/20 rounded-lg px-4 py-2 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 water:focus:ring-emerald-500/50 [&>option]:bg-gray-900 dark:[&>option]:bg-gray-900 soft-dark:[&>option]:bg-slate-800 light:[&>option]:bg-white orange:[&>option]:bg-orange-900 leaf:[&>option]:bg-slate-800 water:[&>option]:bg-white [&>option]:text-white dark:[&>option]:text-white soft-dark:[&>option]:text-gray-100 light:[&>option]:text-gray-900 orange:[&>option]:text-white leaf:[&>option]:text-gray-100 water:[&>option]:text-gray-900"
              >
                {marketplaces.map((mp) => (
                  <option key={mp} value={mp}>
                    {mp}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      {searchQuery === '' && selectedCategory === 'All' && selectedPillar === 'All' && selectedMarketplace === 'All' && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:from-white light:to-gray-50 orange:from-orange-900 orange:to-orange-950 leaf:bg-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">Popular Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/knowledge-base/${article.slug}`}
                  className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/5 dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-xl p-6 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-white/30 leaf:border-white/20 water:border-white/20 hover:border-cyan-500/30 soft-dark:hover:border-lime-600/30 orange:hover:border-orange-500/30 leaf:hover:border-cyan-600/50 water:hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 soft-dark:hover:shadow-lime-500/10 orange:hover:shadow-orange-500/20 light:hover:shadow-cyan-500/20 water:hover:shadow-emerald-500/20 overflow-hidden"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 soft-dark:from-lime-500/10 orange:from-orange-500/10 water:from-emerald-500/10 to-transparent rounded-xl" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-cyan-500/10 soft-dark:bg-lime-600/20 text-cyan-400 soft-dark:text-lime-800 light:bg-cyan-100 light:text-cyan-700 orange:bg-gradient-to-r orange:from-orange-600 orange:to-orange-700 orange:shadow-lg orange:shadow-orange-500/20 orange:text-white leaf:bg-cyan-600/20 leaf:text-cyan-900 water:bg-gradient-to-r water:from-emerald-600 water:to-emerald-700 water:shadow-lg water:shadow-emerald-500/20 water:text-white rounded-full text-xs font-semibold">
                        {article.category}
                      </span>
                      {article.pillar && (
                        <span className="px-3 py-1 bg-white/5 soft-dark:bg-white/20 soft-dark:text-gray-700 light:bg-gray-100 light:text-gray-700 orange:bg-white/20 orange:text-[#101828] leaf:bg-white/20 leaf:text-gray-700 water:bg-white/20 water:text-gray-700 rounded-full text-xs">
                          {article.pillar}
                        </span>
                      )}
                      {!article.hasContent && (
                        <span className="px-3 py-1 bg-yellow-500/10 soft-dark:bg-yellow-600/20 text-yellow-400 soft-dark:text-yellow-800 light:bg-yellow-100 light:text-yellow-700 orange:bg-yellow-500/10 orange:text-yellow-400 leaf:bg-yellow-600/20 leaf:text-yellow-800 water:bg-yellow-600/20 water:text-yellow-800 rounded-full text-xs font-semibold">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 group-hover:text-cyan-400 soft-dark:group-hover:text-lime-700 light:group-hover:text-cyan-600 orange:group-hover:text-orange-700 leaf:group-hover:text-cyan-700 water:group-hover:text-emerald-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 mb-4 line-clamp-2">
                      {!article.hasContent ? 'Coming Soon - ' : ''}{article.summary}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 soft-dark:text-gray-600 light:text-gray-500 orange:text-gray-700 leaf:text-gray-700 water:text-gray-700">Updated {article.lastUpdated}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:bg-transparent orange:bg-transparent leaf:bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">
              {searchQuery || selectedCategory !== 'All' || selectedPillar !== 'All' || selectedMarketplace !== 'All'
                ? 'Search Results'
                : 'All Articles'}
            </h2>
            <p className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 text-sm">{filteredArticles.length} articles</p>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 mb-4">No articles found matching your search.</p>
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
                className="text-cyan-400 hover:text-cyan-300 soft-dark:text-lime-700 soft-dark:hover:text-lime-800 light:text-cyan-600 light:hover:text-cyan-700 orange:text-orange-700 orange:hover:text-orange-600 leaf:text-cyan-700 leaf:hover:text-cyan-600 water:text-emerald-700 water:hover:text-emerald-600 text-sm"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/knowledge-base/${article.slug}`}
                  className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/5 dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-xl p-6 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-white/30 leaf:border-white/20 water:border-white/20 hover:border-cyan-500/30 soft-dark:hover:border-lime-600/30 orange:hover:border-orange-500/30 leaf:hover:border-cyan-600/50 water:hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 soft-dark:hover:shadow-lime-500/10 orange:hover:shadow-orange-500/20 light:hover:shadow-cyan-500/20 water:hover:shadow-emerald-500/20 overflow-hidden"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 soft-dark:from-lime-500/10 orange:from-orange-500/10 water:from-emerald-500/10 to-transparent rounded-xl" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="px-3 py-1 bg-cyan-500/10 soft-dark:bg-lime-600/20 text-cyan-400 soft-dark:text-lime-800 light:bg-cyan-100 light:text-cyan-700 orange:bg-gradient-to-r orange:from-orange-600 orange:to-orange-700 orange:shadow-lg orange:shadow-orange-500/20 orange:text-white leaf:bg-cyan-600/20 leaf:text-cyan-900 water:bg-gradient-to-r water:from-emerald-600 water:to-emerald-700 water:shadow-lg water:shadow-emerald-500/20 water:text-white rounded-full text-xs font-semibold">
                        {article.category}
                      </span>
                      {article.pillar && (
                        <span className="px-3 py-1 bg-white/5 soft-dark:bg-white/20 text-gray-400 soft-dark:text-gray-700 light:bg-gray-100 light:text-gray-700 orange:bg-white/20 orange:text-[#101828] leaf:bg-white/20 leaf:text-gray-700 water:bg-white/20 water:text-gray-700 rounded-full text-xs">
                          {article.pillar}
                        </span>
                      )}
                      {article.type && (
                        <span className="px-3 py-1 bg-purple-500/10 soft-dark:bg-purple-600/20 text-purple-400 soft-dark:text-purple-800 light:bg-purple-100 light:text-purple-700 orange:bg-purple-500/10 orange:text-purple-400 leaf:bg-purple-600/20 leaf:text-purple-800 water:bg-purple-600/20 water:text-purple-800 rounded-full text-xs">
                          {article.type}
                        </span>
                      )}
                      {!article.hasContent && (
                        <span className="px-3 py-1 bg-yellow-500/10 soft-dark:bg-yellow-600/20 text-yellow-400 soft-dark:text-yellow-800 light:bg-yellow-100 light:text-yellow-700 orange:bg-yellow-500/10 orange:text-yellow-400 leaf:bg-yellow-600/20 leaf:text-yellow-800 water:bg-yellow-600/20 water:text-yellow-800 rounded-full text-xs font-semibold">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 group-hover:text-cyan-400 soft-dark:group-hover:text-lime-700 light:group-hover:text-cyan-600 orange:group-hover:text-orange-700 leaf:group-hover:text-cyan-700 water:group-hover:text-emerald-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 mb-4 line-clamp-2">
                      {!article.hasContent ? 'Coming Soon - ' : ''}{article.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 dark:text-gray-500 soft-dark:text-gray-600 light:text-gray-500 orange:text-gray-700 leaf:text-gray-700 water:text-gray-700">Updated {article.lastUpdated}</p>
                      {article.downloadable && (
                        <Download className="w-4 h-4 text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700" />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:from-gray-50 light:to-white orange:from-orange-900 orange:to-orange-950 leaf:bg-transparent border-t border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-white/10 leaf:border-white/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's talk through your specific situation and map the right approach.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaButton variant="primary" size="lg" location="Knowledge Base Page - Final CTA" />
            <Link
              href="/faq"
              className="px-8 py-3.5 bg-white/5 dark:bg-white/5 soft-dark:bg-white/10 light:bg-gray-100 orange:bg-white/70 leaf:bg-white/10 water:bg-white/70 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 rounded-lg hover:bg-white/10 light:hover:bg-gray-200 orange:hover:bg-white/80 leaf:hover:bg-white/20 water:hover:bg-white/80 transition-all border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-300 orange:border-white/30 leaf:border-white/20 water:border-white/20 text-base font-medium"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

