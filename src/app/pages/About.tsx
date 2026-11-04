'use client';

import image_7827c6003ae306e0f9f630e11162a9aa55ffdd3f from '@/assets/7827c6003ae306e0f9f630e11162a9aa55ffdd3f.png';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import { StructuredData, founderSchema, getBreadcrumbSchema, getWebPageSchema, organizationSchema, organizationRef } from '@/app/components/StructuredData';
import { SEO } from '@/app/components/SEO';
import { GlobalReachMap } from '@/app/components/GlobalReachMap';
import { siteConfig } from '@/site/site-config';

export function About() {
  const differentiators = [
    {
      title: 'Operator-first',
      description: 'We run the work, track it, and keep it clean.',
    },
    {
      title: 'System-driven',
      description: 'Repeatable cycles replace ad hoc heroics.',
    },
    {
      title: 'Global by design',
      description: 'Expansion is built into our data and execution model.',
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

      {/* Founder: who runs Epic, answered second on the page */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[minmax(0,15rem)_1fr] gap-10 md:gap-14 items-start">
          <div className="max-w-[15rem] mx-auto md:mx-0 w-full">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)]">
              <Image
                src={image_7827c6003ae306e0f9f630e11162a9aa55ffdd3f}
                alt="Glen Jensen, founder and CEO of Epic Global Inc."
                sizes="240px"
                className="w-full h-full object-cover"
              />
            </div>
            <a
              href={siteConfig.founderLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 decoration-1 hover:decoration-2 text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
              Glen on LinkedIn
            </a>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">Glen Jensen</h2>
            <p className="mt-1 mb-8 text-lg text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">Founder &amp; CEO</p>
              <p className="leading-relaxed mb-5 text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
                {"Glen Jensen is the founder and CEO of Epic Global Inc., a wholesale trade partner and global marketplace operator. Epic buys brands' inventory and sells it on Amazon, Walmart, TikTok Shop and other leading marketplaces, so brands can grow without running those marketplaces themselves."}
              </p>
              <p className="leading-relaxed mb-5 text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
                {"Instead of following the agency model, Glen built Epic on a wholesale partnership that ties Epic's success to the brand's. Epic buys the inventory upfront, invests its own capital, and takes responsibility for marketplace advertising, logistics and day-to-day execution. Brands reach more marketplaces without carrying that financial and operational load."}
              </p>
              <p className="leading-relaxed mb-5 text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
                {"Under Glen's leadership, Epic has grown into an international company operating in about 40 countries across North and South America, Europe and Asia-Pacific. Every partner's brand equity is protected: the brand keeps its Brand Registry, and Epic enforces its minimum advertised price and works to remove unauthorized sellers."}
              </p>
              <p className="leading-relaxed text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
                {"Glen's approach centers on innovation, accountability and execution, with a forward-looking focus on technology and automation. His vision is simple:"}
              </p>
            <blockquote className="mt-8">
              <p className="text-2xl sm:text-3xl font-semibold leading-snug tracking-tight text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">
                <span aria-hidden="true" className="block text-6xl leading-none h-8 text-[var(--pop)]">&ldquo;</span>
                {"A company that doesn't just advise brands on how to grow, but invests alongside them and takes responsibility for making that growth happen."}
              </p>
            </blockquote>
          </div>
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

      {/* What makes us different: plain text columns */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">
            A wholesale trade partner, not an agency
          </h2>
          <p className="text-lg leading-relaxed max-w-3xl mb-12 text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">
            We&apos;re not a marketing agency. We&apos;re a wholesale trade partner: we buy the inventory and run the execution ourselves, with repeatable systems instead of one-off projects.
          </p>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-8">
            {differentiators.map((item) => (
              <div key={item.title} className="border-t border-white/15 dark:border-white/15 soft-dark:border-gray-300 light:border-gray-200 orange:border-[#101828]/20 leaf:border-gray-400/40 water:border-gray-400/40 pt-5">
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">{item.title}</h3>
                <p className="leading-relaxed text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-transparent dark:bg-transparent soft-dark:bg-transparent light:from-gray-50 light:to-white orange:bg-transparent leaf:bg-transparent water:bg-transparent">
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
              className="px-8 py-3.5 rounded-lg bg-[var(--pop)] text-[var(--on-pop)] font-semibold hover:bg-[var(--pop-hover)] transition-colors shadow-lg shadow-black/20 text-base"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

