/** Epic's FAQ: the /faq page, the short answer blocks on other pages and /llms-full.txt all read this list. */
export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: 'How is Epic Global different from an Amazon agency or aggregator?',
    answer:
      'We\'re an alternative to both: a wholesale trade partner that operates, not an agency. We purchase inventory upfront at wholesale pricing and run end-to-end marketplace execution ourselves. Agencies advise and charge retainers; we take ownership of inventory, cover operating expenses (ads, fees, fulfillment), and succeed only when your brand grows. Aggregators buy the brand itself; we buy inventory at wholesale, and you keep your brand, Brand Registry and listings. Our incentives are aligned from day one.',
  },
  {
    question: 'Which marketplaces do you operate on?',
    answer:
      'Amazon is our main marketplace: we have sold on Amazon since 2015, including Amazon US, CA, EU and other regions. We also run Walmart, eBay, TikTok Shop, Temu, Shopify, Mercado Libre, Coupang, Shopee, Lazada, Rakuten and Naver, in the regions where they fit your catalog. We prioritize marketplaces based on your brand\'s category fit and regional opportunity. During assessment, we\'ll map which platforms make sense for your catalog.',
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
    question: 'How do you handle brand protection, MAP and unauthorized sellers?',
    answer:
      'Compliance and brand protection are built into our workflows, not bolted on afterward. We design every process around marketplace policies, documentation requirements, and auditability. For brand protection, we get authorized under your Brand Registry, monitor unauthorized sellers and report the violations Amazon acts on, follow up on MAP violations through your reseller policy, use Amazon Transparency where you enroll, monitor the Buy Box and your catalog, and send you brand protection reports by marketplace. Every enforcement action is documented and tracked.',
  },
  {
    question: 'What kind of reporting and visibility do we get?',
    answer:
      'You get a shared Epic Insights dashboard from day one with SKU-level sales, advertising and inventory, plus monthly reports (sales, rank, advertising, Subscribe & Save and inventory) and quarterly business reviews. Reporting is designed for decision-making, not just data dumps.',
  },
  {
    question: 'Do you work with brands of all sizes?',
    answer:
      'We work best with established brands, typically doing $1M+ a year in sales. Newer or smaller brands can still work with us: we can build a brand up, but it takes more investment and testing, so we look at fit case by case. Our model is built for brands that want a system-driven operator, not a collection of one-off tactics.',
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
      'Epic sets the retail price on the marketplaces we operate, and we sell at or above your minimum advertised price (MAP). Amazon does not enforce MAP, so we monitor the prices of other sellers and follow up through your MAP and reseller policy to keep pricing consistent.',
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

/** The FAQ entries with these exact questions, in the order given (throws at build time if one is renamed). */
export function pickFaqs(questions: string[]): Faq[] {
  return questions.map((q) => {
    const hit = FAQS.find((f) => f.question === q);
    if (!hit) throw new Error(`FAQ not found: ${q}`);
    return hit;
  });
}
