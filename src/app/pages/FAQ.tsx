'use client';

import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';
import { StructuredData, getBreadcrumbSchema, getFAQPageSchema } from '@/app/components/StructuredData';
import { SEO } from '@/app/components/SEO';
import { CtaButton } from '@/app/components/CtaButton';
import { siteConfig } from '@/site/site-config';

export function FAQ() {
  const faqs = [
    {
      question: 'How is Epic Global different from an Amazon agency or aggregator?',
      answer:
        'We\'re an alternative to both: a wholesale trade partner that operates, not an agency. We purchase inventory upfront at wholesale pricing and run end-to-end marketplace execution ourselves. Agencies advise and charge retainers; we take ownership of inventory, cover operating expenses (ads, fees, fulfillment), and succeed only when your brand grows. Aggregators buy the brand itself; we buy inventory at wholesale, and you keep your brand, Brand Registry and listings. Our incentives are aligned from day one.',
    },
    {
      question: 'Which marketplaces do you operate on?',
      answer:
        'We operate across major marketplaces including Amazon (US, CA, EU, and other regions), Walmart, eBay, TikTok Shop, and select international platforms. We prioritize marketplaces based on your brand\'s category fit and regional opportunity. During assessment, we\'ll map which platforms make sense for your catalog.',
    },
    {
      question: 'What do you need from us to get started?',
      answer:
        'To begin, we need four things: (1) Product data and SKU list with complete attributes, (2) Asset library access including images, packaging designs, and compliance docs, (3) Market and region priorities in order of importance, and (4) Constraints around pricing floors, inventory limits, and brand guidelines. We\'ll provide a detailed intake checklist during assessment.',
    },
    {
      question: 'What are typical timelines from assessment to launch?',
      answer:
        'Most brands go from signed agreement to purchase order and Brand Registry authorization within days. We build and optimize your listings, A+ content and Storefront within about 4 weeks, and products typically go live 3-4 weeks after inventory arrives. Additional marketplaces and countries usually follow 1-6 months after Amazon US, depending on registration in each market.',
    },
    {
      question: 'How does the inventory purchase model work?',
      answer:
        'We purchase your inventory at agreed wholesale pricing and take ownership. We then manage retail pricing, marketplace operations, and sales across approved platforms. We cover the operating expenses required to scale (advertising, marketplace fees, fulfillment). This aligns incentives: we succeed when your brand grows sustainably on marketplaces. The opening order is usually sized to about 60-90 days of inventory, with monthly replenishment after that, and you\'re paid on agreed payment terms.',
    },
    {
      question: 'How do you handle brand protection, MAP and unauthorized sellers?',
      answer:
        'Compliance and brand protection are built into our workflows, not bolted on afterward. We design every process around marketplace policies, documentation requirements, and auditability. For brand protection, we get authorized under your Brand Registry, remove unauthorized sellers, enforce MAP pricing, use Amazon Transparency where it fits, monitor the Buy Box and your catalog, and send you brand protection reports by marketplace. Every enforcement action is documented and tracked.',
    },
    {
      question: 'What kind of reporting and visibility do we get?',
      answer:
        'You get a shared Epic Insights dashboard from day one with SKU-level sales, advertising and inventory, plus monthly reports (sales, rank, advertising, Subscribe & Save and inventory) and quarterly business reviews. Reporting is designed for decision-making, not just data dumps.',
    },
    {
      question: 'Do you work with brands of all sizes?',
      answer:
        'We work best with brands doing $100K+ monthly revenue that need control at scale. If you\'re earlier stage but planning aggressive marketplace expansion, we can assess fit. Our model is built for brands that want a system-driven operator, not a collection of one-off tactics.',
    },
    {
      question: "Will Epic buy my brand's inventory?",
      answer:
        'Yes. Epic Global is a wholesale trade partner, one of the companies that buys brand inventory outright. We buy your inventory upfront at an agreed wholesale price and owns it from then on. The opening order is usually sized to about 60-90 days of stock, followed by monthly replenishment orders. You\'re paid on the payment terms set in your contract.',
    },
    {
      question: 'Do you charge retainers, hourly rates or project fees?',
      answer:
        'No. Epic doesn\'t charge retainers, hourly rates, project fees or consulting packages. We earn our margin by buying your inventory at wholesale and selling it at retail, and we pay for the advertising, marketplace fees and fulfillment ourselves.',
    },
    {
      question: 'Who sets the retail price?',
      answer:
        'Epic sets the retail price on the marketplaces we operate, and we sell at or above your minimum advertised price (MAP). We also enforce MAP against other sellers, so your pricing stays consistent across marketplaces.',
    },
    {
      question: 'Do we keep our Brand Registry, listings, reviews and rank?',
      answer:
        'Yes. Your brand keeps its Brand Registry and authorizes Epic to sell. Epic sells from its own seller account on your existing product detail pages, so the listings, reviews and sales rank built on those pages carry over. Epic then builds or improves your listings, A+ content and Storefront at no charge.',
    },
    {
      question: 'What happens to our Subscribe & Save customers?',
      answer:
        'Subscribe & Save subscriptions are transferred to Epic as part of onboarding. The transfer usually takes about 4 months, and you can follow Subscribe & Save numbers in your monthly reports.',
    },
    {
      question: 'Who runs and pays for advertising?',
      answer:
        'Epic plans, runs and pays for the advertising on the marketplaces we operate. You don\'t fund ad spend. You see advertising spend and results in your shared dashboard, monthly reports and quarterly business reviews.',
    },
    {
      question: 'Is the agreement exclusive, and what about our current distributors?',
      answer:
        'Epic becomes the exclusive authorized seller on the marketplaces and countries named in your contract; exclusivity is set contract by contract. During assessment we map your current distributors and resellers. Unauthorized sellers on the named marketplaces are then removed, which usually takes 8-20 weeks.',
    },
    {
      question: 'How long is a typical contract?',
      answer:
        'Contracts are typically 3 years. A longer term gives Epic room to invest in your listings, advertising and inventory, and to expand your brand to new marketplaces over time.',
    },
    {
      question: 'Who handles fulfillment?',
      answer:
        'Epic does, and pays for it. Most orders ship through Fulfillment by Amazon (FBA), and Epic also fulfills some orders from its own US warehouse.',
    },
    {
      question: 'What types of brands and categories do you work with?',
      answer:
        'Epic works with 50+ brands. Supplements and wellness is our largest category, alongside essential oils, skincare, cosmetics, haircare, baby, snacks, home, bedding and bath, cleaning, garden, sporting goods and outdoor, auto accessories and lighting. Typical partners are direct-selling wellness and beauty brands, founder-led consumer brands, and international brands entering the US.',
    },
    {
      question: 'How can we check Epic\'s track record?',
      answer:
        'Epic sells on Amazon US as "Epic Global," rated 4.9 out of 5 from 9,600+ customer ratings (October 2026), and on Walmart as Epic Global Inc. You can see both seller pages, and our case studies show results for partner brands.',
    },
  ];

  return (
    <div className="min-h-screen text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 bg-gradient-to-br dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:from-lime-500 water:via-lime-100 water:to-white orange:from-[#F68932] orange:via-orange-100 orange:to-white">
      <SEO 
        title="FAQ - Frequently Asked Questions | Epic Global Inc."
        description="Get answers to common questions about Epic Global Inc.'s wholesale trade partner model, marketplace operations, timelines, pricing, and how we differ from traditional agencies."
        canonicalUrl={`${siteConfig.url}/faq`}
        keywords="ecommerce faq, marketplace operator questions, wholesale trade partner faq, global expansion questions"
      />
      <StructuredData data={getFAQPageSchema(faqs, `${siteConfig.url}/faq`)} />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: `${siteConfig.url}/` },
          { name: 'FAQ', url: `${siteConfig.url}/faq` },
        ])}
      />
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-b from-white to-gray-400 dark:from-white dark:to-gray-400 soft-dark:from-gray-900 soft-dark:to-gray-700 light:from-gray-900 light:to-gray-600 orange:from-[#101828] orange:to-[#101828] leaf:from-gray-900 leaf:to-gray-700 water:from-[#101828] water:to-[#101828] bg-clip-text text-transparent leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-800 water:text-[#101828] leading-relaxed">
            Common questions about how we operate and what makes us different.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] dark:from-white/5 dark:to-white/[0.02] soft-dark:from-white/10 soft-dark:to-white/[0.05] light:from-gray-50 light:to-white orange:from-white/5 orange:to-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 dark:border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-white/10">
            <h2 className="sr-only">Wholesale trade partner FAQ</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-white/10 dark:border-white/10 soft-dark:border-lime-800/30 light:border-gray-200 orange:border-white/10 rounded-lg px-6 bg-white/[0.02] dark:bg-white/[0.02] soft-dark:bg-white/[0.05] light:bg-white orange:bg-white/70 leaf:bg-white/70 water:bg-white/70 leaf:border-sky-300/70 water:border-lime-500/40 orange:border-orange-300/70 hover:border-cyan-500/30 leaf:hover:border-sky-500 water:hover:border-lime-600 dark:hover:border-cyan-500/30 soft-dark:hover:border-lime-600/50 light:hover:border-cyan-500/30 orange:hover:border-orange-500 transition-colors"
                >
                  <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-[#101828] water:text-[#101828] hover:text-cyan-400 soft-dark:hover:text-lime-700 light:hover:text-cyan-600 orange:hover:text-orange-800 leaf:hover:text-sky-700 water:hover:text-lime-800 leaf:data-[state=open]:text-sky-700 water:data-[state=open]:text-lime-800 orange:data-[state=open]:text-orange-800 orange:[&>svg]:text-orange-700 leaf:[&>svg]:text-sky-700 water:[&>svg]:text-lime-800 focus-visible:underline leaf:decoration-sky-700 water:decoration-lime-800 orange:decoration-orange-700 py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent forceMount className="text-sm sm:text-base text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-700 orange:text-slate-700 leaf:text-slate-700 water:text-slate-700 leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-950/20 to-cyan-900/10 dark:from-cyan-950/20 dark:to-cyan-900/10 soft-dark:from-lime-700/20 soft-dark:to-lime-800/10 light:from-cyan-50 light:to-cyan-100 orange:from-white/80 orange:to-orange-50/80 leaf:from-white/80 leaf:to-sky-50/80 water:from-white/80 water:to-lime-50/80 rounded-2xl p-8 md:p-12 border border-cyan-500/20 dark:border-cyan-500/20 soft-dark:border-lime-600/30 light:border-cyan-300 orange:border-orange-300 leaf:border-sky-300 water:border-lime-400 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-[#101828] water:text-[#101828]">
              Still have questions?
            </h2>
            <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-800 light:text-gray-700 orange:text-slate-700 leaf:text-slate-700 water:text-slate-700 mb-8 max-w-2xl mx-auto">
              Let's talk through your specific situation and see if our operating model is a fit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CtaButton variant="primary" size="lg" location="FAQ Page - Still Have Questions CTA" />
              <Link
                href="/our-model"
                className="px-8 py-3.5 bg-white/5 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-white leaf:text-white water:text-white orange:bg-orange-700 leaf:bg-sky-700 water:bg-lime-800 rounded-lg hover:bg-white/10 soft-dark:hover:bg-white/20 light:hover:bg-gray-100 orange:hover:bg-orange-800 leaf:hover:bg-sky-800 water:hover:bg-lime-900 transition-all border border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-orange-700 leaf:border-sky-700 water:border-lime-800 text-base font-semibold"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
