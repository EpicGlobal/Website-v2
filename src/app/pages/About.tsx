'use client';

import image_7827c6003ae306e0f9f630e11162a9aa55ffdd3f from '@/assets/7827c6003ae306e0f9f630e11162a9aa55ffdd3f.png';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Shield, Globe2, BarChart3, Award, Users, Clock, CheckCircle2, Linkedin } from 'lucide-react';
import { StructuredData, founderSchema, getBreadcrumbSchema, getWebPageSchema, organizationSchema, organizationRef } from '@/app/components/StructuredData';
import { SEO } from '@/app/components/SEO';
import { motion } from 'framer-motion';
import { GlobalReachMap } from '@/app/components/GlobalReachMap';
import { siteConfig } from '@/site/site-config';

// Import Glen Jensen's headshot
export function About() {
  const differentiators = [
    {
      icon: Target,
      title: 'Operator-first',
      description: 'We run the work, track it, and keep it clean.',
    },
    {
      icon: Award,
      title: 'System-driven',
      description: 'Repeatable cycles replace ad hoc heroics.',
    },
    {
      icon: Globe2,
      title: 'Global by design',
      description: 'Expansion is built into our data and execution model.',
    },
  ];

  const values = [
    {
      icon: CheckCircle2,
      title: 'Clarity over chaos',
      description: 'Clean documentation, clear ownership, traceable decisions.',
    },
    {
      icon: Award,
      title: 'Speed with safeguards',
      description: 'Move fast, but with controls that prevent expensive mistakes.',
    },
    {
      icon: Target,
      title: 'Decision quality first',
      description: 'Every action is tied to a metric, a reason, and an expected outcome.',
    },
    {
      icon: Shield,
      title: 'Own the outcome',
      description: 'We don\'t advise from the sidelines. We execute and take responsibility.',
    },
    {
      icon: BarChart3,
      title: 'Build once, scale everywhere',
      description: 'Systems designed for replication across regions and marketplaces.',
    },
  ];

  const aboutPageSchema = getWebPageSchema({
    '@type': 'AboutPage',
    name: 'About Epic Global Inc.',
    url: `${siteConfig.url}/about`,
    description: "Epic Global Inc. is a wholesale trade partner and global marketplace operator led by Glen Jensen: we buy brands' inventory at wholesale and sell it on Amazon, Walmart and other marketplaces, paying for the advertising, fees and fulfillment.",
    mainEntity: organizationRef,
  });

  return (
    <div className="min-h-screen text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 bg-gradient-to-br dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:from-lime-500 water:via-lime-100 water:to-white orange:from-[#F68932] orange:via-orange-100 orange:to-white">
      <SEO 
        title="About Epic Global Inc. - Wholesale Trade Partner"
        description="Epic Global Inc. is a wholesale trade partner and global marketplace operator: we buy brands' inventory and run marketplace operations in about 40 countries."
        canonicalUrl={`${siteConfig.url}/about`}
        keywords="commerce operator, marketplace management, global ecommerce, operator-first approach, marketplace technology"
      />
      <StructuredData data={organizationSchema} />
      <StructuredData data={founderSchema} />
      <StructuredData data={aboutPageSchema} />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: `${siteConfig.url}/` },
          { name: 'About', url: `${siteConfig.url}/about` },
        ])}
      />

      {/* Hero: answer first, then the facts people check */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.08] max-w-4xl text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">
            We run marketplace growth like operations, not marketing.
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed max-w-3xl mb-5 text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
            Epic Global Inc. is a wholesale trade partner and global marketplace operator. We buy your inventory upfront at wholesale, run your marketplace storefronts end to end, pay for the advertising, marketplace fees and fulfillment, and protect your brand. We own the inventory, so the retail execution risk is ours.
          </p>
          <p className="text-lg leading-relaxed max-w-3xl mb-12 text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
            The same model works for U.S. growth and international expansion: whether a brand is underperforming in the United States, losing margin to fees, or getting ready to sell abroad.
          </p>
          <dl className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/15 dark:border-white/15 soft-dark:border-gray-300 light:border-gray-200 orange:border-[#101828]/20 leaf:border-gray-400/40 water:border-gray-400/40 pt-6 sm:divide-x divide-white/15 soft-dark:divide-gray-300 light:divide-gray-200 orange:divide-[#101828]/20 leaf:divide-gray-400/40 water:divide-gray-400/40">
            <div className="py-4 sm:py-0 sm:px-6 first:sm:pl-0">
              <dt className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">On Amazon since</dt>
              <dd className="text-2xl font-semibold mt-1 tabular-nums text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">2015</dd>
            </div>
            <div className="py-4 sm:py-0 sm:px-6 first:sm:pl-0">
              <dt className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">Headquarters</dt>
              <dd className="text-2xl font-semibold mt-1 tabular-nums text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">Lindon, Utah</dd>
            </div>
            <div className="py-4 sm:py-0 sm:px-6 first:sm:pl-0">
              <dt className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">Countries</dt>
              <dd className="text-2xl font-semibold mt-1 tabular-nums text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">~40</dd>
            </div>
            <div className="py-4 sm:py-0 sm:px-6 first:sm:pl-0">
              <dt className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">Brands</dt>
              <dd className="text-2xl font-semibold mt-1 tabular-nums text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">50+</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Global Reach Section - Moved to position #2 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:bg-white orange:bg-transparent leaf:bg-transparent water:bg-transparent">
        <div className="max-w-7xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-[#101828]">
              Global marketplace expansion for brands
            </h2>
            <p className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-[#101828] max-w-2xl mx-auto">
              Operating across multiple countries and marketplaces with integrated systems.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <GlobalReachMap />
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:from-gray-50 light:to-white orange:bg-transparent leaf:bg-transparent water:bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">
              A wholesale trade partner, not an agency
            </h2>
            <p className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 max-w-2xl mx-auto">
              We're not a marketing agency. We're a wholesale trade partner: we buy the inventory and run the execution ourselves, with repeatable systems instead of one-off projects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group bg-gradient-to-br from-white/[0.08] to-white/[0.02] dark:from-white/[0.08] dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-gray-300 leaf:border-white/20 water:border-white/20 hover:border-cyan-500/50 soft-dark:hover:border-lime-600/40 orange:hover:border-orange-600/50 leaf:hover:border-cyan-600/50 water:hover:border-emerald-600/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 soft-dark:hover:shadow-lime-500/10 orange:hover:shadow-orange-500/20 light:hover:shadow-cyan-500/30 relative overflow-hidden"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 soft-dark:from-lime-500/5 orange:from-orange-500/10 to-transparent rounded-2xl" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/30 to-cyan-600/10 soft-dark:from-lime-600/20 soft-dark:to-lime-700/5 orange:from-orange-600/30 orange:to-orange-700/10 leaf:from-cyan-600/30 leaf:to-cyan-700/10 water:from-emerald-600/20 water:to-emerald-700/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-cyan-500/20 soft-dark:shadow-lime-500/10 orange:shadow-orange-500/20">
                      <Icon className="w-7 h-7 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-800 group-hover:text-cyan-300 soft-dark:group-hover:text-lime-600 light:group-hover:text-cyan-700 orange:group-hover:text-orange-600 leaf:group-hover:text-cyan-600 water:group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 group-hover:text-cyan-400 soft-dark:group-hover:text-lime-700 light:group-hover:text-cyan-600 orange:group-hover:text-orange-700 leaf:group-hover:text-cyan-700 water:group-hover:text-emerald-700 transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team / Operating Model Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:bg-white orange:bg-transparent leaf:bg-transparent water:bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/5 dark:to-white/[0.02] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-2xl p-8 sm:p-12 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-gray-300 leaf:border-white/20 water:border-white/20">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Headshot */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-cyan-500/20 dark:border-cyan-500/20 soft-dark:border-gray-200 light:border-cyan-500/20 orange:border-orange-500/30 leaf:border-cyan-600/30 water:border-emerald-600/30 shadow-xl shadow-cyan-500/10 soft-dark:shadow-md orange:shadow-orange-500/20">
                  <Image
                    src={image_7827c6003ae306e0f9f630e11162a9aa55ffdd3f}
                    alt="Glen Jensen, founder and CEO of Epic Global Inc."
                    sizes="192px"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* LinkedIn Badge */}
                <a
                  href="https://www.linkedin.com/in/glen-jensen-54a27/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500/10 dark:bg-cyan-500/10 soft-dark:bg-lime-600/15 light:bg-cyan-100 orange:bg-gradient-to-br orange:from-orange-600/30 orange:to-orange-700/10 leaf:bg-cyan-600/15 water:bg-emerald-600/15 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-700 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-800 rounded-lg hover:bg-cyan-500/20 soft-dark:hover:bg-lime-600/25 light:hover:bg-cyan-200 orange:hover:from-orange-600/40 orange:hover:to-orange-700/20 water:hover:bg-emerald-600/25 transition-all border border-cyan-500/20 dark:border-cyan-500/20 soft-dark:border-lime-600/30 light:border-cyan-300 orange:border-orange-500/30 leaf:border-cyan-600/30 water:border-emerald-600/30 orange:shadow-lg orange:shadow-orange-500/20 text-sm font-medium"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 mb-2">
                  Glen Jensen
                </h3>
                <p className="text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-800 mb-6">Founder &amp; CEO</p>
                
                <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 leading-relaxed mb-6">
                  {"Glen Jensen is the founder and CEO of Epic Global Inc., a wholesale trade partner and global marketplace operator. Epic buys brands' inventory and sells it on Amazon, Walmart, TikTok Shop and other leading marketplaces, so brands can grow without running those marketplaces themselves."}
                </p>
                <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 leading-relaxed mb-6">
                  {"Instead of following the agency model, Glen built Epic on a wholesale partnership that ties Epic's success to the brand's. Epic buys the inventory upfront, invests its own capital, and takes responsibility for marketplace advertising, logistics and day-to-day execution. Brands reach more marketplaces without carrying that financial and operational load."}
                </p>
                <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 leading-relaxed mb-6">
                  {"Under Glen's leadership, Epic has grown into an international company operating in about 40 countries across North and South America, Europe and Asia-Pacific. Every partner's brand equity is protected: the brand keeps its Brand Registry, and Epic enforces its minimum advertised price and works to remove unauthorized sellers."}
                </p>
                <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 leading-relaxed mb-6">
                  {"Glen's approach centers on innovation, accountability and execution, with a forward-looking focus on technology and automation. His vision is simple: a company that doesn't just advise brands on how to grow, but invests alongside them and takes responsibility for making that growth happen."}
                </p>

                <ul className="space-y-3 text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-600 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-800 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">Focus:</strong> Global marketplace operations, systems, automation, and execution cadence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-800 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">Scope:</strong> Multi-marketplace, multi-region operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-800 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">Model:</strong> Buy, Sell, Advertise, Protect</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:from-gray-50 light:to-white orange:bg-transparent leaf:bg-transparent water:bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">
            See how we execute
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-300 soft-dark:text-gray-600 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            From catalog rebuilds to multi-country expansion, explore real operations and real outcomes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/case-studies"
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-500 dark:to-cyan-600 soft-dark:from-lime-600 soft-dark:to-lime-700 light:from-cyan-500 light:to-cyan-600 orange:from-orange-700 orange:to-orange-800 text-white soft-dark:text-black rounded-lg hover:from-cyan-600 hover:to-cyan-700 dark:hover:from-cyan-600 dark:hover:to-cyan-700 soft-dark:hover:from-lime-700 soft-dark:hover:to-lime-800 light:hover:from-cyan-600 light:hover:to-cyan-700 orange:hover:from-orange-700 orange:hover:to-orange-800 transition-all shadow-lg shadow-cyan-500/25 soft-dark:shadow-lime-500/25 orange:shadow-orange-500/25 text-base font-medium"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

