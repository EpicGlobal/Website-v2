'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Brain, TrendingUp, Shield, Zap, BarChart3, Globe2, AlertTriangle, Target } from 'lucide-react';
import { StructuredData, getBreadcrumbSchema, getWebPageSchema } from '@/app/components/StructuredData';
import { CtaButton } from '@/app/components/CtaButton';

export function Intelligence() {
  const intelligencePillars = [
    {
      icon: TrendingUp,
      title: 'Predictive Demand Intelligence',
      description: 'AI determines where inventory should exist globally before demand materializes.',
      details: [
        'Cross-marketplace demand forecasting',
        'Regional inventory positioning',
        'Seasonal trend prediction',
        'SKU-level allocation optimization'
      ],
      impact: 'Inventory positioned where it converts, not where it sits.'
    },
    {
      icon: Zap,
      title: 'Autonomous Channel Optimization',
      description: 'AI adjusts pricing, listings, media, and supply in real time across all channels.',
      details: [
        'Dynamic pricing adjustments',
        'Listing content optimization',
        'Ad spend reallocation',
        'Supply chain routing'
      ],
      impact: 'Every marketplace adapts automatically to competitive conditions.'
    },
    {
      icon: Shield,
      title: 'Brand Protection Intelligence',
      description: 'AI detects unauthorized sellers and brand erosion before damage occurs.',
      details: [
        'Unauthorized seller detection',
        'Pricing violation monitoring',
        'Content hijacking alerts',
        'Gray market identification'
      ],
      impact: 'Brand equity protected at machine speed.'
    }
  ];

  const traditionalVsEpic = [
    {
      aspect: 'Channel Management',
      traditional: 'Manual updates across platforms',
      epic: 'Unified intelligence layer syncs changes automatically',
      icon: Globe2
    },
    {
      aspect: 'Pricing Strategy',
      traditional: 'Quarterly pricing reviews by team',
      epic: 'Real-time price optimization by AI',
      icon: TrendingUp
    },
    {
      aspect: 'Brand Protection',
      traditional: 'Monthly audits, reactive enforcement',
      epic: 'Continuous monitoring, instant response',
      icon: Shield
    },
    {
      aspect: 'Inventory Allocation',
      traditional: 'Historical data + gut decisions',
      epic: 'Predictive positioning before demand shifts',
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen text-white bg-gradient-to-br dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:text-gray-900 soft-dark:from-lime-500 soft-dark:via-lime-100 soft-dark:to-white leaf:text-gray-900 leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:text-gray-900 water:from-lime-500 water:via-lime-100 water:to-white orange:text-gray-900 orange:from-[#F68932] orange:via-orange-100 orange:to-white">
      <StructuredData data={getWebPageSchema({
        name: 'The Epic Intelligence Layer',
        url: 'https://epicglobalinc.com/intelligence',
        description: 'Marketplace commerce is becoming machine-run. Epic Global Inc. operates the intelligence layer that orchestrates global marketplace execution.',
        mainEntity: {
          '@type': 'Thing',
          name: 'Epic Intelligence Layer',
          description: 'Epic Global Inc. uses predictive demand intelligence, marketplace automation, and brand protection systems to operate ecommerce channels.',
        },
      })} />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: 'https://epicglobalinc.com/' },
          { name: 'AI Intelligence', url: 'https://epicglobalinc.com/intelligence' },
        ])}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-cyan-500/20 dark:bg-cyan-500/20 soft-dark:bg-lime-600/20 water:bg-gradient-to-r water:from-emerald-600 water:to-emerald-700 water:shadow-lg water:shadow-emerald-500/20 leaf:bg-gradient-to-r leaf:from-sky-600 leaf:to-sky-700 leaf:shadow-lg leaf:shadow-sky-500/20 orange:bg-gradient-to-r orange:from-orange-600 orange:to-orange-700 orange:shadow-lg orange:shadow-orange-500/20 dark:text-cyan-300 soft-dark:text-lime-800 water:text-white leaf:text-white orange:text-white rounded-full text-sm font-semibold tracking-wide mb-6"
          >
            THE EPIC INTELLIGENCE LAYER
          </motion.div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-b from-white to-gray-400 dark:from-white dark:to-gray-400 soft-dark:from-gray-900 soft-dark:to-gray-700 water:from-gray-900 water:to-gray-700 leaf:from-gray-900 leaf:to-gray-700 orange:from-[#101828] orange:to-[#101828] bg-clip-text text-transparent leading-tight">
            Marketplace commerce is becoming machine-run.
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 water:text-gray-900 leaf:text-gray-900 orange:text-[#101828] leading-relaxed max-w-3xl mb-8">
            The future of global commerce will not be managed by teams. It will be orchestrated by intelligence layers. Epic operates that layer.
          </p>
          <p className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 water:text-gray-700 leaf:text-gray-700 orange:text-gray-700 leading-relaxed max-w-3xl">
            While competitors hire more people to manage more complexity, Epic deploys systems that remove the need for human intervention entirely, except where strategic decisions still require operator judgment.
          </p>
        </div>
      </section>

      {/* The Shift Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white dark:text-white soft-dark:text-gray-900 water:text-[#101828] leaf:text-[#101828] orange:text-[#101828]">
              What Commerce Used To Be
            </h2>
            <p className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 water:text-[#101828] leaf:text-gray-700 orange:text-gray-700 max-w-2xl mx-auto">
              vs. what AI is changing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {traditionalVsEpic.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] dark:from-white/[0.08] dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 water:from-white/70 water:to-white/60 leaf:from-white/70 leaf:to-white/60 orange:from-white/70 orange:to-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 dark:border-white/10 soft-dark:border-white/20 water:border-white/30 leaf:border-white/30 orange:border-white/30"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-600/20 to-sky-700/5 soft-dark:from-lime-600/20 soft-dark:to-lime-700/5 water:from-emerald-600/20 water:to-emerald-700/5 leaf:from-sky-600/20 leaf:to-sky-700/5 orange:from-orange-600/30 orange:to-orange-700/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-sky-700 dark:text-sky-700 soft-dark:text-lime-700 water:text-emerald-700 leaf:text-sky-700 orange:text-orange-700" />
                  </div>
                  <h3 className="text-sm font-semibold mb-3 text-gray-300 dark:text-gray-300 soft-dark:text-gray-600 water:text-gray-600 leaf:text-gray-600 orange:text-gray-600 uppercase tracking-wide">
                    {item.aspect}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 soft-dark:text-gray-500 water:text-gray-500 leaf:text-gray-500 orange:text-gray-500 mb-1">Traditional:</p>
                      <p className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 water:text-[#101828] leaf:text-gray-700 orange:text-gray-700">{item.traditional}</p>
                    </div>
                    <div className="border-t border-white/10 soft-dark:border-gray-300 water:border-gray-300 leaf:border-gray-300 orange:border-gray-300 pt-3">
                      <p className="text-xs text-cyan-400/70 dark:text-cyan-400/70 soft-dark:text-lime-700 water:text-[#007595] leaf:text-emerald-700 orange:text-orange-700 mb-1">Epic:</p>
                      <p className="text-sm text-white dark:text-white soft-dark:text-gray-900 water:text-[#101828] leaf:text-gray-900 orange:text-[#101828] font-medium">{item.epic}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Three Intelligence Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white dark:text-white soft-dark:text-gray-900 water:text-[#101828] leaf:text-[#101828] orange:text-[#101828]">
              Three Intelligence Pillars
            </h2>
            <p className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 water:text-[#101828] leaf:text-gray-700 orange:text-gray-700 max-w-2xl mx-auto">
              Epic's authority in AI commerce stands on these three systems
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {intelligencePillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group bg-gradient-to-br from-white/[0.08] to-white/[0.02] dark:from-white/[0.08] dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 water:from-white/70 water:to-white/60 leaf:from-white/70 leaf:to-white/60 orange:from-white/70 orange:to-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 dark:border-white/10 soft-dark:border-white/20 water:border-white/30 leaf:border-white/30 orange:border-white/30 hover:border-cyan-500/50 soft-dark:hover:border-lime-600/40 water:hover:border-emerald-600/40 leaf:hover:border-sky-600/40 orange:hover:border-orange-600/50 transition-all duration-500"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/30 to-cyan-600/10 soft-dark:from-lime-600/20 soft-dark:to-lime-700/5 water:from-emerald-600/20 water:to-emerald-700/5 leaf:from-sky-600/20 leaf:to-sky-700/5 orange:from-orange-600/30 orange:to-orange-700/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-cyan-500/20 soft-dark:shadow-lime-500/10 water:shadow-emerald-500/20 leaf:shadow-sky-500/20 orange:shadow-orange-500/20">
                    <Icon className="w-7 h-7 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 water:text-emerald-700 leaf:text-emerald-700 orange:text-orange-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white dark:text-white soft-dark:text-gray-900 water:text-gray-900 leaf:text-gray-900 orange:text-[#101828]">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 water:text-gray-700 leaf:text-gray-700 orange:text-gray-700 leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {pillar.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 water:text-[#101828] leaf:text-gray-700 orange:text-gray-700">
                        <ArrowRight className="w-4 h-4 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 water:text-emerald-700 leaf:text-emerald-700 orange:text-orange-700 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-white/10 soft-dark:border-gray-300 water:border-gray-300 leaf:border-gray-300 orange:border-gray-300">
                    <p className="text-sm text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-800 water:text-emerald-800 leaf:text-emerald-800 orange:text-orange-700 font-semibold italic">
                      {pillar.impact}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Epic POV */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/5 dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 water:from-white/70 water:to-white/60 leaf:from-white/70 leaf:to-white/60 orange:from-white/70 orange:to-white/60 backdrop-blur-xl rounded-2xl p-8 sm:p-12 border border-white/10 dark:border-white/10 soft-dark:border-white/20 water:border-white/30 leaf:border-white/30 orange:border-white/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/30 to-cyan-600/10 soft-dark:from-lime-600/20 soft-dark:to-lime-700/5 water:from-emerald-600/20 water:to-emerald-700/5 leaf:from-sky-600/20 leaf:to-sky-700/5 orange:from-orange-600/30 orange:to-orange-700/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 water:text-emerald-700 leaf:text-sky-700 orange:text-orange-700" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white dark:text-white soft-dark:text-gray-900 water:text-gray-900 leaf:text-gray-900 orange:text-[#101828] mb-2">
                  The Epic AI Point of View
                </h3>
                <p className="text-sm text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 water:text-emerald-700 leaf:text-sky-700 orange:text-orange-700">
                  Our thesis on the future of marketplace commerce
                </p>
              </div>
            </div>
            
            <div className="space-y-4 text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 water:text-[#101828] leaf:text-gray-700 orange:text-gray-700 leading-relaxed">
              <p className="text-lg font-medium text-white dark:text-white soft-dark:text-gray-900 water:text-gray-900 leaf:text-gray-900 orange:text-[#101828]">
                The future of global commerce will not be managed by teams. It will be orchestrated by intelligence layers.
              </p>
              <p>
                Brands cannot keep up. Every marketplace has unique requirements. Every region has different demand patterns. Every competitor moves prices daily. Every unauthorized seller erodes margin hourly.
              </p>
              <p>
                Building internal capability is no longer viable. The infrastructure required - data pipelines, automation systems, real-time monitoring, and multi-marketplace integrations - exceeds the capacity of brand teams.
              </p>
              <p className="text-white dark:text-white soft-dark:text-gray-900 water:text-gray-900 leaf:text-gray-900 orange:text-[#101828] font-semibold">
                Epic removes the need for brands to build this capability. We are the intelligence layer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Brands Cannot Keep Up */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white dark:text-white soft-dark:text-gray-900 water:text-[#101828] leaf:text-[#101828] orange:text-[#101828]">
              Why brands cannot keep up
            </h2>
            <p className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 water:text-[#101828] leaf:text-gray-700 orange:text-gray-700 max-w-2xl mx-auto">
              The infrastructure gap is widening
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                problem: 'Marketplace complexity multiplying',
                reality: 'Each marketplace has unique requirements for listings, ads, inventory, and compliance. Managing 5+ marketplaces requires 5+ different systems.',
                icon: AlertTriangle
              },
              {
                problem: 'Speed requirements increasing',
                reality: 'Competitors adjust prices hourly. Unauthorized sellers appear daily. Brands need real-time response, not weekly meetings.',
                icon: Zap
              },
              {
                problem: 'Data infrastructure demands growing',
                reality: 'Unified reporting across regions and marketplaces requires data engineering, not spreadsheets.',
                icon: BarChart3
              },
              {
                problem: 'Operator layer needed',
                reality: 'Brands need infrastructure that runs commerce, not tools that require teams to manage tools.',
                icon: Target
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] dark:from-white/[0.08] dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 water:from-white/70 water:to-white/60 leaf:from-white/70 leaf:to-white/60 orange:from-white/70 orange:to-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 dark:border-white/10 soft-dark:border-white/20 water:border-white/30 leaf:border-white/30 orange:border-white/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/30 to-cyan-600/10 soft-dark:from-lime-600/20 soft-dark:to-lime-700/5 water:from-emerald-600/20 water:to-emerald-700/5 leaf:from-sky-600/20 leaf:to-sky-700/5 orange:from-orange-600/30 orange:to-orange-700/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 water:text-emerald-700 leaf:text-sky-700 orange:text-orange-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-white dark:text-white soft-dark:text-gray-900 water:text-gray-900 leaf:text-gray-900 orange:text-[#101828]">
                        {item.problem}
                      </h3>
                      <p className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 water:text-[#101828] leaf:text-gray-700 orange:text-gray-700 leading-relaxed">
                        {item.reality}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white dark:text-white soft-dark:text-gray-900 water:text-gray-900 leaf:text-gray-900 orange:text-[#101828]">
            Stop managing complexity. Start operating with intelligence.
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-300 soft-dark:text-gray-600 water:text-gray-700 leaf:text-gray-700 orange:text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Epic replaces marketplace complexity with infrastructure. Let's map what that looks like for your brand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaButton variant="primary" size="lg" location="Intelligence Page CTA" />
          </div>
        </div>
      </section>
    </div>
  );
}

