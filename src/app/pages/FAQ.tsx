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
import { BODY, H1, H2, HEAD, INNER, LEAD, PAGE_BG, POP_BUTTON, QUIET_BUTTON, RULE } from '@/app/components/story/tokens';
import { MEASURE } from '@/app/components/reading/reading';
import { siteConfig } from '@/site/site-config';

const SECTION = 'px-4 sm:px-6 lg:px-8';

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
        'Amazon is our main marketplace: we have sold on Amazon since 2015, including Amazon US, CA, EU and other regions. We also run Walmart, eBay, TikTok Shop, and select international platforms. We prioritize marketplaces based on your brand\'s category fit and regional opportunity. During assessment, we\'ll map which platforms make sense for your catalog.',
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
        'We work best with brands doing $50K+ monthly revenue that need control at scale. If you\'re earlier stage but planning aggressive marketplace expansion, we can assess fit. Our model is built for brands that want a system-driven operator, not a collection of one-off tactics.',
    },
    {
      question: "Will Epic buy my brand's inventory?",
      answer:
        'Yes. Epic Global is a wholesale trade partner, one of the companies that buys brand inventory outright. We buy your inventory upfront at an agreed wholesale price and own it from then on. The opening order is usually sized to about 60-90 days of stock, followed by monthly replenishment orders. You\'re paid on the payment terms set in your contract.',
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
    <div className={PAGE_BG}>
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
      <section className={`pt-32 pb-10 ${SECTION}`}>
        <div className={INNER}>
          <h1 className={`${H1} mb-5`}>Frequently Asked Questions</h1>
          <p className={`${LEAD} max-w-3xl`}>Common questions about how we operate and what makes us different.</p>
        </div>
      </section>

      {/* FAQ list: a calm document of questions. Every answer is in the HTML (force-mounted);
          any number can be open at once. */}
      <section className={`pb-16 ${SECTION}`}>
        <div className={INNER}>
          <h2 className="sr-only">Wholesale trade partner FAQ</h2>
          <Accordion type="multiple" className={`border-t ${RULE}`}>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className={`border-b last:border-b ${RULE}`}>
                <AccordionTrigger
                  className={`py-6 text-lg sm:text-xl font-semibold leading-snug hover:no-underline underline-offset-4 decoration-1 focus-visible:ring-0 focus-visible:underline [&:hover>span]:underline ${HEAD} [&>svg]:size-5 [&>svg]:translate-y-1 [&>svg]:text-[var(--pop)] orange:[&>svg]:text-orange-800`}
                >
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent forceMount className={`${MEASURE} text-base sm:text-[1.0625rem] leading-relaxed pb-6 ${BODY}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className={`pt-4 pb-24 ${SECTION}`}>
        <div className={INNER}>
          <h2 className={`${H2} mb-4`}>Still have questions?</h2>
          <p className={`text-lg leading-relaxed max-w-2xl mb-8 ${BODY}`}>
            Let&apos;s talk through your specific situation and see if our operating model is a fit. Or email <a href={`mailto:${siteConfig.contactEmail}`} className="underline underline-offset-2 font-medium">{siteConfig.contactEmail}</a>.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <CtaButton variant="primary" size="lg" location="FAQ Page - Still Have Questions CTA" />
            {/* With booking switched off, "See How It Works" is the page's one main action. */}
            <Link href="/our-model" className={`${siteConfig.bookACallEnabled ? QUIET_BUTTON : POP_BUTTON} self-start sm:self-auto`}>
              See How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
