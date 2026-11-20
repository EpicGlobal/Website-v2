/** Epic's FAQ: the /faq page, the short answer blocks on other pages and /llms-full.txt all read this list. */
/**
 * learnMore (optional): the slug of one existing Knowledge Base article that answers the question in depth. The
 * "Learn more" link is decided when the page is built: it appears only if that article is published at build time
 * (approved or live before reviews, publish date reached); otherwise the FAQ shows its answer alone. /faq and the
 * homepage are static, so when a new article goes live its FAQ link appears with the next deployment, not on its
 * own. A slug that isn't an article fails the build.
 */
export type Faq = { question: string; answer: string; learnMore?: string };

/** A Learn more link the server has checked: the article was published when the page was built. */
export type FaqLink = { href: string; title: string };

export const FAQS: Faq[] = [
  {
    question: 'How is Epic Global different from an Amazon agency or aggregator?',
    answer:
      'We\'re an alternative to both: a wholesale trade partner that operates, not an agency. We purchase inventory outright at negotiated wholesale prices and run end-to-end marketplace execution ourselves. Agencies advise and usually charge fees or retainers; we take ownership of inventory, cover operating expenses (ads, fees, fulfillment), and succeed only when your brand grows. Aggregators buy the brand itself; we buy inventory at negotiated wholesale prices, and you keep your brand, Brand Registry and listings. Our incentives are aligned from day one.',
    learnMore: 'why-epic-isnt-an-agency',
  },
  {
    question: 'Do you have a warehouse?',
    answer:
      'Yes. Our sister company, Epic Warehouse Operations, runs a 100,000 sq ft facility in Springville, Utah. It is a flow-through hub, not long-term storage: inventory comes in, gets prepped and labeled, and ships out quickly to Amazon, Walmart and the other marketplaces we sell on.',
  },
  {
    question: 'Which marketplaces do you operate on?',
    answer:
      'Amazon is our main marketplace: we have sold on Amazon since 2015, including Amazon US, CA, EU and other regions. We also run Walmart, eBay, TikTok Shop, Temu, Mercado Libre, Coupang, Shopee, Lazada, Rakuten and Naver, in the regions where they fit your catalog. We prioritize marketplaces based on your brand\'s category fit and regional opportunity. During assessment, we\'ll map which platforms make sense for your catalog. Coming in 2027: Macy\'s, Nordstrom, Lowe\'s and Kohl\'s.',
  },
  {
    question: 'What do you need from us to get started?',
    answer:
      'To begin, we need four things: (1) Product data and SKU list with complete attributes, (2) Asset library access including images, packaging designs, and compliance docs, (3) Market and region priorities in order of importance, and (4) Constraints around pricing floors, inventory limits, and brand guidelines. We\'ll provide a detailed intake checklist during assessment.',
    learnMore: 'epic-operational-process',
  },
  {
    question: 'What is the difference between 1P and 3P on Amazon?',
    answer:
      '1P (first party) means your brand sells to Amazon as a vendor: Amazon buys your stock at a wholesale cost, then sets the retail price and decides how much to order. 3P (third party) means a seller lists and sells to shoppers on Amazon’s marketplace through Seller Central and keeps control of price, listings and stock.',
    learnMore: 'amazon-1p-vs-3p',
  },
  {
    question: 'Does Epic sell 1P or 3P?',
    answer:
      '3P. Epic does not sell to Amazon as a 1P vendor. We take brands that sell 1P on Amazon today and move them to 3P: we purchase the inventory at negotiated wholesale prices and sell it on Amazon as the third-party seller, so listings, ads and stock stay with one operator. Where applicable, Epic prices its own offers at or above your MAP.',
    learnMore: 'amazon-1p-vs-3p',
  },
  {
    question: 'Why do brands often earn less in 1P than in 3P?',
    answer:
      'In 1P, Amazon controls the retail price and the order volume: it can lower the price, cut or pause purchase orders, and vendor terms usually add allowances and fees. Amazon often prefers to keep large brands in 1P for that control. In 3P, the price and the stock stay with the seller, so the brand keeps more say over how it is sold. Our case study on an auto parts brand compares the two on one product.',
    learnMore: 'amazon-1p-vs-3p',
  },
  {
    question: 'What are typical timelines from assessment to launch?',
    answer:
      'Onboarding runs in phases, and the timing depends on your catalog, your inventory and each marketplace. First, we agree terms, place the first purchase order and get authorized under your Brand Registry. Next, we build and optimize your listings, A+ content and Storefront. Products go live after the inventory arrives and is received at the fulfillment centers. Additional marketplaces and countries follow Amazon US, depending on registration in each market.',
    learnMore: 'epic-operational-process',
  },
  {
    question: 'How do you handle brand protection, MAP and unauthorized sellers?',
    answer:
      'The goal is price integrity: a consistent authorized presence on each marketplace instead of resellers undercutting each other in a race to the bottom. We monitor unauthorized offers, document potential violations and pursue platform-approved enforcement where eligible. We monitor advertised prices against brand policies and manage Epic’s own pricing under the agreement. Compliance and brand protection are built into our workflows, not bolted on afterward. We design every process around marketplace policies, documentation requirements, and auditability. For brand protection, we get authorized under your Brand Registry, monitor for new unauthorized sellers, follow up on MAP violations through your reseller policy, use Amazon Transparency where you enroll, monitor the Buy Box and your catalog, and send you brand protection reports by marketplace. Every enforcement action is documented and tracked.',
    learnMore: 'unauthorized-seller-monitoring-workflow',
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
    learnMore: 'who-we-are-fit-for',
  },
  {
    question: "Will Epic buy my brand's inventory?",
    answer:
      'Yes. Epic purchases inventory outright from approved brand partners at negotiated wholesale prices and takes ownership of the products purchased.',
    learnMore: 'how-our-model-works',
  },
  {
    question: 'Do you charge retainers, hourly rates or project fees?',
    answer:
      "Under Epic's standard wholesale partnership, brands do not pay an agency retainer. Epic earns its margin by purchasing inventory and reselling it through authorized marketplaces.",
    learnMore: 'why-epic-isnt-an-agency',
  },
  {
    question: 'Who sets the retail price?',
    answer:
      'Epic sets the retail price of its own offers on the marketplaces we operate and, where applicable, prices them at or above your minimum advertised price (MAP). Amazon does not enforce MAP, and Epic does not control other sellers\' prices: we monitor them and can follow up through your MAP and reseller policy.',
  },
  {
    question: 'Do we keep our Brand Registry, listings and reviews?',
    answer:
      'Yes. You keep ownership of your trademarks and Brand Registry and authorize Epic as a reseller. Epic generally sells on your existing product pages, so their reviews stay with those listings. How listings, reviews and rank are handled is subject to each marketplace\'s policies.',
    learnMore: 'how-our-model-works',
  },
  {
    question: 'What happens to our Subscribe & Save customers?',
    answer:
      'Subscribe & Save subscriptions do not simply move from one seller to another. Whether existing subscribers continue depends on Amazon\'s Subscribe & Save processes for the listing and offer, and there is no set completion time. Epic works through those processes during onboarding, and you can follow Subscribe & Save numbers in your monthly reports.',
  },
  {
    question: 'Who runs and pays for advertising?',
    answer:
      'Epic plans, runs and pays for the advertising on the marketplaces we operate. You don\'t fund ad spend. You see advertising spend and results in your shared dashboard, monthly reports and quarterly business reviews.',
    learnMore: 'how-our-model-works',
  },
  {
    question: 'Is the agreement exclusive, and what about our current distributors?',
    answer:
      'Where agreed, Epic may serve as the exclusive authorized seller on the marketplaces and countries named in the contract; exclusivity is set contract by contract. During assessment we map your current distributors and resellers. Epic monitors unauthorized sellers and coordinates evidence-based enforcement where eligible. Clearing unauthorized sellers typically takes 8–20 weeks, although individual outcomes depend on the circumstances and marketplace decisions.',
  },
  {
    question: 'How long is a typical contract?',
    answer:
      'Contract length is set agreement by agreement. A longer term gives Epic room to invest in your listings, advertising and inventory, and to expand your brand to new marketplaces over time.',
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
    learnMore: 'who-we-are-fit-for',
  },
  {
    question: 'How can we check Epic\'s track record?',
    answer:
      'Across all of Epic’s Amazon stores, customers rate us 4.8 out of 5 from 265,000+ ratings (November 2026). Our main Amazon US store is "Epic Global," and on Walmart we sell as Epic Global Inc. You can see both seller pages, and our case studies show results for partner brands.',
  },
];

/** The id each question gets on /faq, so other pages can link straight to it (/faq#<slug> opens that answer). */
export function faqSlug(question: string): string {
  return question.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** The FAQ entries with these exact questions, in the order given (throws at build time if one is renamed). */
export function pickFaqs(questions: string[]): Faq[] {
  return questions.map((q) => {
    const hit = FAQS.find((f) => f.question === q);
    if (!hit) throw new Error(`FAQ not found: ${q}`);
    return hit;
  });
}
