'use client';

import Link from 'next/link';
import { CheckCircle2, X } from 'lucide-react';
import { StructuredData, getBreadcrumbSchema, getWebPageSchema } from '@/app/components/StructuredData';
import { SEO } from '@/app/components/SEO';
import { CtaButton } from '@/app/components/CtaButton';

export function WhatWeAre() {
  return (
    <div className="min-h-screen text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 bg-gradient-to-br dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:from-lime-500 water:via-lime-100 water:to-white orange:from-[#F68932] orange:via-orange-100 orange:to-white">
      <SEO 
        title="Our Model - Zero-Risk Global Commerce Operator"
        description="We buy inventory upfront at wholesale, operate marketplace storefronts end-to-end, fund all advertising and logistics, and protect brand equity. Brands receive guaranteed payments with zero operational burden."
        canonicalUrl="https://epicglobalinc.com/our-model"
        keywords="zero risk commerce, marketplace operator business model, inventory purchase model, guaranteed payment ecommerce"
      />
      <StructuredData
        data={getWebPageSchema({
          name: 'Our Model',
          url: 'https://epicglobalinc.com/our-model',
          description: 'Learn what Epic Global Inc. does: a marketplace operator that buys inventory, operates channels, funds advertising, and protects brand equity.',
        })}
      />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: 'https://epicglobalinc.com/' },
          { name: 'Our Model', url: 'https://epicglobalinc.com/our-model' },
        ])}
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-cyan-500/10 dark:bg-cyan-500/10 soft-dark:bg-lime-600/20 light:bg-cyan-100 orange:bg-gradient-to-r orange:from-orange-600 orange:to-orange-700 orange:shadow-lg leaf:bg-cyan-600/20 water:bg-gradient-to-r water:from-emerald-600 water:to-emerald-700 water:shadow-lg water:shadow-emerald-500/20 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-800 light:text-cyan-700 orange:text-white leaf:text-cyan-900 water:text-white rounded-full text-sm font-semibold tracking-wide mb-6">
            ZERO-RISK GLOBAL COMMERCE OPERATOR
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-b from-white to-gray-400 dark:from-white dark:to-gray-400 soft-dark:from-gray-900 soft-dark:to-gray-700 light:from-gray-900 light:to-gray-600 orange:from-[#101828] orange:to-[#101828] leaf:from-gray-900 leaf:to-gray-700 water:from-[#101828] water:to-[#101828] bg-clip-text text-transparent leading-tight">
            Our Model
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-800 water:text-[#101828] leading-relaxed mb-4">
            Plain language. No buzzwords. Here's what Epic Global Inc. actually does.
          </p>
          <p className="text-cyan-400/80 dark:text-cyan-400/80 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 font-medium">
            We buy it. You profit.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/5 dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-gray-300 leaf:border-white/20 water:border-white/20">
            <h2 className="text-2xl font-bold mb-6 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">What we do</h2>
            <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 leading-relaxed mb-4">
              Epic Global Inc. is a global marketplace operator and technology platform that purchases inventory at wholesale and runs end-to-end eCommerce execution across marketplaces worldwide.
            </p>
            <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 leading-relaxed">
              We cover operating costs like advertising, marketplace fees, and fulfillment, so incentives stay aligned. We don't sell consulting packages or charge hourly rates. We buy inventory, then operate retail sales across approved marketplaces.
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="pb-12 pt-12 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:from-transparent light:to-white orange:bg-transparent leaf:bg-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/5 dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-gray-300 leaf:border-white/20 water:border-white/20">
            <h2 className="text-2xl font-bold mb-6 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">Who it's for</h2>
            <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 leading-relaxed mb-6">
              Brands that want to scale on marketplaces without building an internal eCommerce operations team.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 mt-0.5 flex-shrink-0" />
                <span>You're already selling on one or more marketplaces but need more control and better execution</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 mt-0.5 flex-shrink-0" />
                <span>You want to expand into new regions but don't have the bandwidth or expertise internally</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 mt-0.5 flex-shrink-0" />
                <span>You're tired of agencies that advise but don't execute or own outcomes</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 mt-0.5 flex-shrink-0" />
                <span>You need a partner who takes responsibility for day-to-day operations, not just strategy</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How Our Model Works */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:bg-white orange:bg-transparent leaf:bg-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/5 dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-gray-300 leaf:border-white/20 water:border-white/20">
            <h2 className="text-2xl font-bold mb-8 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">How our model works</h2>
            
            <div className="space-y-8">
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 font-bold text-lg">1</span>
                  <h3 className="text-lg font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">We purchase inventory at wholesale</h3>
                </div>
                <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 leading-relaxed ml-8">
                  You sell us inventory at an agreed wholesale price. We own the inventory and take on the retail execution risk.
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 font-bold text-lg">2</span>
                  <h3 className="text-lg font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">We operate retail sales across approved marketplaces</h3>
                </div>
                <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 leading-relaxed ml-8">
                  We manage listings, advertising, pricing, inventory allocation, fulfillment coordination, catalog integrity, and brand protection on platforms like Amazon, Walmart, eBay, and international marketplaces.
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 font-bold text-lg">3</span>
                  <h3 className="text-lg font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">We cover operating expenses</h3>
                </div>
                <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 leading-relaxed ml-8">
                  Marketplace fees, advertising spend, and fulfillment costs are covered by us. This keeps incentives aligned. We only succeed when your brand grows profitably.
                </p>
              </div>

              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 font-bold text-lg">4</span>
                  <h3 className="text-lg font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">You get visibility and control</h3>
                </div>
                <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 leading-relaxed ml-8">
                  We provide weekly dashboards, SKU-level performance data, regional reporting, and clear accountability. You stay informed and maintain approval rights over major decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Don't Do */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:bg-white orange:bg-transparent leaf:bg-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/5 dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-gray-300 leaf:border-white/20 water:border-white/20">
            <h2 className="text-2xl font-bold mb-6 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">What we don't do</h2>
            <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 leading-relaxed mb-6">
              To be clear about what we're not:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-300 dark:text-gray-300 soft-dark:text-gray-600 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
                <X className="w-5 h-5 text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500 mt-0.5 flex-shrink-0" />
                <span>We don't sell a la carte services or consulting packages</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 dark:text-gray-300 soft-dark:text-gray-600 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
                <X className="w-5 h-5 text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500 mt-0.5 flex-shrink-0" />
                <span>We don't charge hourly rates or project fees</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 dark:text-gray-300 soft-dark:text-gray-600 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
                <X className="w-5 h-5 text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500 mt-0.5 flex-shrink-0" />
                <span>We don't provide advice without executing the work</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 dark:text-gray-300 soft-dark:text-gray-600 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
                <X className="w-5 h-5 text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500 mt-0.5 flex-shrink-0" />
                <span>We don't operate on a revenue share model without inventory ownership</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 dark:text-gray-300 soft-dark:text-gray-600 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
                <X className="w-5 h-5 text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500 mt-0.5 flex-shrink-0" />
                <span>We don't work with brands that want to maintain day-to-day operational control internally</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Competitive Landscape Table */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:bg-white orange:bg-transparent leaf:bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/5 dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-gray-300 leaf:border-white/20">
            <h2 className="text-2xl font-bold mb-2 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">Competitive Landscape</h2>
            <p className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 mb-8">
              How Epic Global compares to other marketplace operators and accelerators
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/10 dark:border-white/10 soft-dark:border-gray-200 light:border-gray-200 orange:border-gray-300 leaf:border-gray-200 water:border-gray-200">
                    <th className="text-left py-4 px-3 text-xs font-semibold text-cyan-400 dark:text-cyan-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-orange-700 leaf:text-cyan-800 water:text-gray-900 uppercase tracking-wide">
                      Capability / Model
                    </th>
                    <th className="text-center py-4 px-3 text-xs font-semibold text-cyan-400 dark:text-cyan-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-orange-700 leaf:text-cyan-800 water:text-emerald-700 uppercase tracking-wide">
                      Epic
                    </th>
                    <th className="text-center py-4 px-3 text-xs font-semibold text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 uppercase tracking-wide">
                      Competitor A
                    </th>
                    <th className="text-center py-4 px-3 text-xs font-semibold text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 uppercase tracking-wide">
                      Competitor B
                    </th>
                    <th className="text-center py-4 px-3 text-xs font-semibold text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 uppercase tracking-wide">
                      Competitor C
                    </th>
                    <th className="text-center py-4 px-3 text-xs font-semibold text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 uppercase tracking-wide">
                      Competitor D
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 dark:divide-white/10 soft-dark:divide-gray-200 light:divide-gray-200 orange:divide-gray-300 leaf:divide-gray-200 water:divide-gray-200">
                  <tr className="hover:bg-white/[0.02] transition-colors dark:hover:bg-white/[0.02] soft-dark:hover:bg-gray-50 light:hover:bg-gray-50 orange:hover:bg-white/[0.02] leaf:hover:bg-white/20 water:hover:bg-white/20">
                    <td className="py-4 px-3 text-sm text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-800 water:text-gray-800">
                      <strong>Buys inventory upfront</strong>
                    </td>
                    <td className="py-4 px-3 text-center text-sm font-semibold dark:text-cyan-400 soft-dark:text-lime-700 light:text-gray-900 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 text-[#05df72]">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-green-400 dark:text-green-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-green-400 leaf:text-green-700 water:text-green-700">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-green-400 dark:text-green-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-green-400 leaf:text-green-700 water:text-green-700">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors dark:hover:bg-white/[0.02] soft-dark:hover:bg-gray-50 light:hover:bg-gray-50 orange:hover:bg-white/[0.02] leaf:hover:bg-white/20 water:hover:bg-white/20">
                    <td className="py-4 px-3 text-sm text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-800 water:text-gray-800">
                      <strong>Sells on their own account</strong>
                    </td>
                    <td className="py-4 px-3 text-center text-sm font-semibold dark:text-cyan-400 soft-dark:text-lime-700 light:text-gray-900 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 text-[#05df72]">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-green-400 dark:text-green-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-green-400 leaf:text-green-700 water:text-green-700">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-green-400 dark:text-green-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-green-400 leaf:text-green-700 water:text-green-700">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors dark:hover:bg-white/[0.02] soft-dark:hover:bg-gray-50 light:hover:bg-gray-50 orange:hover:bg-white/[0.02] leaf:hover:bg-white/20 water:hover:bg-white/20">
                    <td className="py-4 px-3 text-sm text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-800 water:text-gray-800">
                      <strong>"No fees / no commissions"</strong>
                    </td>
                    <td className="py-4 px-3 text-center text-sm font-semibold dark:text-cyan-400 soft-dark:text-lime-700 light:text-gray-900 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 text-[#05df72]">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors dark:hover:bg-white/[0.02] soft-dark:hover:bg-gray-50 light:hover:bg-gray-50 orange:hover:bg-white/[0.02] leaf:hover:bg-white/20 water:hover:bg-white/20">
                    <td className="py-4 px-3 text-sm text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-800 water:text-gray-800">
                      <strong>Advertising management</strong>
                    </td>
                    <td className="py-4 px-3 text-center text-sm font-semibold dark:text-cyan-400 soft-dark:text-lime-700 light:text-gray-900 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 text-[#05df72]">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-green-400 dark:text-green-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-green-400 leaf:text-green-700 water:text-green-700">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-green-400 dark:text-green-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-green-400 leaf:text-green-700 water:text-green-700">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-green-400 dark:text-green-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-green-400 leaf:text-green-700 water:text-green-700">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors dark:hover:bg-white/[0.02] soft-dark:hover:bg-gray-50 light:hover:bg-gray-50 orange:hover:bg-white/[0.02] leaf:hover:bg-white/20 water:hover:bg-white/20">
                    <td className="py-4 px-3 text-sm text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-800 water:text-gray-800">
                      <strong>Fulfillment / warehousing</strong>
                    </td>
                    <td className="py-4 px-3 text-center text-sm font-semibold dark:text-cyan-400 soft-dark:text-lime-700 light:text-gray-900 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 text-[#05df72]">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-green-400 dark:text-green-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-green-400 leaf:text-green-700 water:text-green-700">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-green-400 dark:text-green-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-green-400 leaf:text-green-700 water:text-green-700">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-green-400 dark:text-green-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-green-400 leaf:text-green-700 water:text-green-700">Yes</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors dark:hover:bg-white/[0.02] soft-dark:hover:bg-gray-50 light:hover:bg-gray-50 orange:hover:bg-white/[0.02] leaf:hover:bg-white/20 water:hover:bg-white/20">
                    <td className="py-4 px-3 text-sm text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-800 water:text-gray-800">
                      <strong>Brand protection</strong>
                    </td>
                    <td className="py-4 px-3 text-center text-sm font-semibold dark:text-cyan-400 soft-dark:text-lime-700 light:text-gray-900 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 text-[#05df72]">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-green-400 dark:text-green-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-green-400 leaf:text-green-700 water:text-green-700">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors dark:hover:bg-white/[0.02] soft-dark:hover:bg-gray-50 light:hover:bg-gray-50 orange:hover:bg-white/[0.02] leaf:hover:bg-white/20 water:hover:bg-white/20">
                    <td className="py-4 px-3 text-sm text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-800 water:text-gray-800">
                      <strong>Global operations</strong>
                    </td>
                    <td className="py-4 px-3 text-center text-sm font-semibold dark:text-cyan-400 soft-dark:text-lime-700 light:text-gray-900 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 text-[#05df72]">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-green-400 dark:text-green-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-green-400 leaf:text-green-700 water:text-green-700">Yes</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-red-400 dark:text-red-400 soft-dark:text-red-500 light:text-red-400 orange:text-red-400 leaf:text-red-500 water:text-red-500">No</td>
                    <td className="py-4 px-3 text-center text-sm font-semibold text-green-400 dark:text-green-400 soft-dark:text-gray-900 light:text-gray-900 orange:text-green-400 leaf:text-green-700 water:text-green-700">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:from-gray-50 light:to-white orange:bg-transparent leaf:bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">
            Questions about how this works?
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's walk through your catalog, marketplace presence, and growth goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaButton variant="primary" size="lg" location="What We Are Page - Final CTA" />
            <Link
              href="/faq"
              className="px-8 py-3.5 bg-white/5 dark:bg-white/5 soft-dark:bg-white/10 light:bg-gray-100 orange:bg-white/30 leaf:bg-white/10 water:bg-white/10 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 rounded-lg hover:bg-white/10 soft-dark:hover:bg-gray-200 light:hover:bg-gray-200 orange:hover:bg-white/40 leaf:hover:bg-white/20 water:hover:bg-white/20 transition-all border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-300 orange:border-gray-300 leaf:border-white/20 water:border-white/20 text-base font-medium"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
