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

export function FAQ() {
  const faqs = [
    {
      question: 'How is Epic Global different from a marketplace agency?',
      answer:
        'We\'re an operator, not an agency. We purchase inventory upfront at wholesale pricing and run end-to-end marketplace execution ourselves. Agencies advise and charge retainers; we take ownership of inventory, cover operating expenses (ads, fees, fulfillment), and succeed only when your brand grows. Our incentives are aligned from day one.',
    },
    {
      question: 'Which marketplaces do you operate on?',
      answer:
        'We operate across major marketplaces including Amazon (US, CA, EU, and other regions), Walmart, eBay, and select international platforms. We prioritize marketplaces based on your brand\'s category fit and regional opportunity. During assessment, we\'ll map which platforms make sense for your catalog.',
    },
    {
      question: 'What do you need from us to get started?',
      answer:
        'To begin, we need four things: (1) Product data and SKU list with complete attributes, (2) Asset library access including images, packaging designs, and compliance docs, (3) Market and region priorities in order of importance, and (4) Constraints around pricing floors, inventory limits, and brand guidelines. We\'ll provide a detailed intake checklist during assessment.',
    },
    {
      question: 'What are typical timelines from assessment to launch?',
      answer:
        'Assessment takes 1-2 weeks. Building the operating system (rules, workflows, reporting) takes 2-4 weeks. Initial execution cycles begin immediately after, with full marketplace rollout typically within 8-12 weeks depending on catalog complexity. International expansion adds 4-8 weeks per marketplace for setup and coordination.',
    },
    {
      question: 'How does the inventory purchase model work?',
      answer:
        'We purchase your inventory at agreed wholesale pricing and take ownership. We then manage retail pricing, marketplace operations, and sales across approved platforms. We cover the operating expenses required to scale (advertising, marketplace fees, fulfillment). This aligns incentives: we succeed when your brand grows sustainably on marketplaces.',
    },
    {
      question: 'How do you handle compliance and brand protection?',
      answer:
        'Compliance and brand protection are built into our workflows, not bolted on afterward. We design every process around marketplace policies, documentation requirements, and auditability. For brand protection, we run automated monitoring for unauthorized sellers, counterfeit detection, MAP violations, and catalog integrity. Every enforcement action is documented and tracked.',
    },
    {
      question: 'What kind of reporting and visibility do we get?',
      answer:
        'You get unified dashboards with SKU-level P&L, regional performance comparisons, advertising attribution, inventory health metrics, and compliance tracking. Reporting is designed for decision-making, not just data dumps. Weekly operating reviews keep you informed on execution cycles, optimization actions, and next steps.',
    },
    {
      question: 'Do you work with brands of all sizes?',
      answer:
        'We work best with brands doing $100K+ monthly revenue that need control at scale. If you\'re earlier stage but planning aggressive marketplace expansion, we can assess fit. Our model is built for brands that want a system-driven operator, not a collection of one-off tactics.',
    },
  ];

  return (
    <div className="min-h-screen text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 bg-gradient-to-br dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:from-lime-500 water:via-lime-100 water:to-white orange:from-[#F68932] orange:via-orange-100 orange:to-white">
      <SEO 
        title="FAQ - Frequently Asked Questions | Epic Global Inc."
        description="Get answers to common questions about Epic Global Inc.'s zero-risk commerce model, marketplace operations, timelines, pricing, and how we differ from traditional agencies."
        canonicalUrl="https://epicglobalinc.com/faq"
        keywords="ecommerce faq, marketplace operator questions, zero risk commerce faq, global expansion questions"
      />
      <StructuredData data={getFAQPageSchema(faqs, 'https://epicglobalinc.com/faq')} />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: 'https://epicglobalinc.com/' },
          { name: 'FAQ', url: 'https://epicglobalinc.com/faq' },
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
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-white/10 dark:border-white/10 soft-dark:border-lime-800/30 light:border-gray-200 orange:border-white/10 rounded-lg px-6 bg-white/[0.02] dark:bg-white/[0.02] soft-dark:bg-white/[0.05] light:bg-white orange:bg-white/[0.02] hover:border-cyan-500/30 dark:hover:border-cyan-500/30 soft-dark:hover:border-lime-600/50 light:hover:border-cyan-500/30 orange:hover:border-cyan-500/30 transition-colors"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-white hover:text-cyan-400 soft-dark:hover:text-lime-700 light:hover:text-cyan-600 py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-700 orange:text-gray-400 leading-relaxed pb-5">
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
          <div className="bg-gradient-to-r from-cyan-950/20 to-cyan-900/10 dark:from-cyan-950/20 dark:to-cyan-900/10 soft-dark:from-lime-700/20 soft-dark:to-lime-800/10 light:from-cyan-50 light:to-cyan-100 orange:from-cyan-950/20 orange:to-cyan-900/10 rounded-2xl p-8 md:p-12 border border-cyan-500/20 dark:border-cyan-500/20 soft-dark:border-lime-600/30 light:border-cyan-300 orange:border-cyan-500/20 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-white">
              Still have questions?
            </h2>
            <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-800 light:text-gray-700 orange:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's talk through your specific situation and see if our operating model is a fit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CtaButton variant="primary" size="lg" location="FAQ Page - Still Have Questions CTA" />
              <Link
                href="/our-model"
                className="px-8 py-3.5 bg-white/5 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-white rounded-lg hover:bg-white/10 soft-dark:hover:bg-white/20 light:hover:bg-gray-100 orange:hover:bg-white/10 transition-all border border-white/10 soft-dark:border-white/20 light:border-gray-200 orange:border-white/10 text-base font-medium"
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
