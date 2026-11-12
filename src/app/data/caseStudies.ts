import type { StaticImageData } from 'next/image';
import suteraLogo from '@/assets/967c8426adebcc2a86cafe0b4d49f813b966b007.png';

/*
 * Every case study lives here, one object each. The Case Studies gallery, each study's own page
 * (/case-studies/<slug>), the sitemap and the homepage cards all read from this list.
 *
 * Adding a study: copy an entry, fill it from the brand's report, set status to 'review' while the designated Epic
 * reviewer and the brand check it, then 'published' once both approve. Only 'published' studies appear anywhere on
 * the site. The page says "Prepared by the Epic team"; it names no reviewer (none is recorded for case studies).
 *
 * Rules (Kevin's facts, Glen Nov 9): never put internal figures here (wholesale % or purchase price as a
 * share of retail, payment terms, revenue, SKU counts). Mark estimates as estimates. Leave a field out
 * rather than guess (for example a measurement period the report doesn't state).
 */

export type CaseStudyStatus = 'draft' | 'review' | 'approved' | 'published';

/** The four parts of Epic's model, used as the study's service tags. */
export type Pillar = 'Buy' | 'Sell' | 'Advertise' | 'Protect';

export type Metric = {
  value: string;
  label: string;
  note: string;
  /** Measured from account data, or an estimate/projection derived from it. */
  basis?: 'measured' | 'estimate';
};

/** Per-item change chart (one bar per product), drawn from the brand report's chart. */
export type ChangeChart = {
  kind: 'change';
  title: string;
  unit: '%';
  /** Whether a fall (fees) or a rise (conversion) is the good direction; sets the bar colors. */
  better: 'down' | 'up';
  items: readonly { label: string; value: number }[];
  caption: string;
};

/** Side-by-side comparison chart (for example net revenue per unit, before vs after). */
export type CompareChart = {
  kind: 'compare';
  title: string;
  unit: '$';
  series: readonly [string, string];
  items: readonly { label: string; values: readonly [number, number] }[];
  caption: string;
};

export type Table = {
  title: string;
  columns: readonly [string, string, string];
  rows: readonly (readonly [string, string, string])[];
};

export type Workstream = {
  title: string;
  actions: readonly { label: string; text: string }[];
  result?: string;
  resultBullets?: readonly string[];
  chart?: ChangeChart | CompareChart;
  table?: Table;
};

export type Testimonial = {
  /** Exact words, as approved. Never edit the meaning. */
  quote: string;
  name: string;
  title: string;
  company: string;
  relationship: string;
  /** Date the speaker approved publication (YYYY-MM-DD). No date, no quote on the site. */
  approvedOn: string;
};

export type CaseStudy = {
  slug: string;
  status: CaseStudyStatus;
  /** Brand name, or an approved anonymous descriptor such as "Auto Parts Brand". */
  brand: string;
  anonymous: boolean;
  logo?: { src: StaticImageData; approved: boolean };
  title: string;
  /** One line under the title: the outcome in plain words. */
  dek: string;
  seoTitle: string;
  seoDescription: string;
  industry: string;
  marketplaces: readonly string[];
  region: string;
  pillars: readonly Pillar[];
  glance: { problem: string; did: string; result: string };
  metrics: readonly Metric[];
  challenges: readonly { title: string; text: string }[];
  workstreams: readonly Workstream[];
  results: readonly string[];
  /** Where the numbers come from and what period they cover, in plain words. */
  evidence: { source: string; period?: string; notes?: readonly string[] };
  testimonial?: Testimonial;
  /** Our pages that explain the work in this study. */
  related: readonly { href: string; label: string }[];
  featured?: boolean;
  /** YYYY-MM-DD. Leave out until the study goes live. */
  published?: string;
  updated?: string;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'sutera-amazon-fees-conversion-brand-defense',
    status: 'published',
    brand: 'Sutera',
    anonymous: false,
    logo: { src: suteraLogo, approved: true },
    title: 'Sutera: Lower Fees, Higher Conversion, Branded Search Won Back',
    dek: 'How Epic cut FBA fees on 18 of 21 products, lifted conversion in A/B tests and took back Sutera’s branded search on Amazon.',
    seoTitle: 'Sutera Amazon Case Study: Lower FBA Fees, Higher Conversion',
    seoDescription:
      'How Epic Global cut FBA fees on 18 of 21 Sutera products, lifted conversion 21% in successful A/B tests and won back branded search on Amazon US.',
    industry: 'Home & Bath',
    marketplaces: ['Amazon US'],
    region: 'United States',
    pillars: ['Sell', 'Advertise', 'Protect'],
    featured: true,
    glance: {
      problem: 'High FBA fees, untested listings, and competitors like Purple and Casper taking its branded search.',
      did: 'Cut fulfillment fees, rebuilt and A/B tested the listings, and ran branded-search ads.',
      result: 'Lower FBA fees on 18 of 21 products, +21% conversion in successful A/B tests, and branded search won back.',
    },
    metrics: [
      { value: '18/21', label: 'Products with lower FBA fees', note: 'Average fee change -2.9%', basis: 'measured' },
      { value: '+21%', label: 'Conversion lift', note: 'Average of the 6 successful A/B tests', basis: 'measured' },
      { value: '6/6', label: 'Sutera products on its branded search', note: 'Plus a Sutera Sponsored Brand ad', basis: 'measured' },
      { value: '+11 weeks', label: 'Of demand a year', note: 'Based on the conversion lift', basis: 'estimate' },
    ],
    challenges: [
      {
        title: 'High FBA fees were eating the margin',
        text: 'Inefficient packaging, storage and fulfillment kept Sutera’s FBA fees high and eroded profit on every unit.',
      },
      {
        title: 'Listings were never tested',
        text: 'No A/B tests, no video, too few secondary images and copy that wasn’t built around what shoppers search for.',
      },
      {
        title: 'Competitors owned Sutera’s own name',
        text: 'Purple and Casper ranked high on searches for Sutera, taking sales from shoppers already looking for the brand.',
      },
    ],
    workstreams: [
      {
        title: 'Fulfillment optimization',
        actions: [
          { label: 'Packaging', text: 'Reduced product dimensions and packaging materials to lower FBA fees, without hurting product protection.' },
          { label: 'Inventory', text: 'Tightened inventory planning to avoid overstock and long-term storage fees.' },
        ],
        result:
          'Per-unit FBA fulfillment and shipping fees fell on 18 of the 21 products in Sutera’s Amazon catalog (86%), an average change of -2.9%.',
        chart: {
          kind: 'change',
          title: 'Change in per-unit FBA fulfillment and shipping fee, by product',
          unit: '%',
          better: 'down',
          items: [
            { label: '1', value: -4.4 }, { label: '2', value: -4.3 }, { label: '3', value: -2.9 },
            { label: '4', value: -4.1 }, { label: '5', value: -5.3 }, { label: '6', value: -1.2 },
            { label: '7', value: -3.7 }, { label: '8', value: -3.6 }, { label: '9', value: -2.7 },
            { label: '10', value: -10.9 }, { label: '11', value: 1.8 }, { label: '12', value: -5.8 },
            { label: '13', value: 1.7 }, { label: '14', value: -1.3 }, { label: '15', value: -2.8 },
            { label: '16', value: -2.4 }, { label: '17', value: 5.9 }, { label: '18', value: -4.5 },
            { label: '19', value: -3.8 }, { label: '20', value: -4.4 }, { label: '21', value: -2.3 },
          ],
          caption: 'All 21 products in the catalog. Fee when Epic took over the account vs. after the changes. Lower is better.',
        },
      },
      {
        title: 'Listing optimization and A/B testing',
        actions: [
          { label: 'Keywords', text: 'Rebuilt titles, bullet points and descriptions around high-converting search terms.' },
          {
            label: 'Video',
            text: 'Added product videos made for Sutera’s actual buyers (mostly male, millennial and Gen Z, high-income) instead of typical bed-and-bath marketing.',
          },
          { label: 'Images and copy', text: 'Added secondary images and A/B tested images and copy. Tests that lowered conversion were not applied.' },
        ],
        result: '6 of the top 10 products by sales had a successful test, with an average conversion lift of 21% (for example, from 10.0% to 12.1%).',
        resultBullets: [
          'Estimate: that lift is about the same as adding 11 weeks of demand over a year.',
          'Testing continues with images, video, A+ content and titles.',
        ],
        chart: {
          kind: 'change',
          title: 'Change in conversion rate, optimized vs. inherited listing',
          unit: '%',
          better: 'up',
          items: [
            { label: '1', value: -8.2 }, { label: '2', value: 7.5 }, { label: '3', value: 9.9 },
            { label: '4', value: -20.4 }, { label: '5', value: 21.7 }, { label: '6', value: -17.7 },
            { label: '7', value: 22.1 }, { label: '8', value: 22.6 }, { label: '9', value: 44.3 },
            { label: '10', value: -10.5 },
          ],
          caption: 'Top 10 products by sales. Higher is better. Losing variants were not applied.',
        },
      },
      {
        title: 'Brand defense',
        actions: [
          {
            label: 'Branded-search ads',
            text: 'Ran targeted campaigns on Sutera’s own search terms, where Purple and Casper had been showing up.',
          },
          { label: 'Marketing budget', text: 'Epic funds the marketing: advertising, promotions, Subscribe & Save, coupons and deals.' },
        ],
        result: 'A search for “Sutera” on Amazon now shows a Sutera Sponsored Brand ad and 6 of 6 Sutera products, instead of competitors.',
      },
    ],
    results: [
      'Lower FBA fees on 18 of 21 products, an average change of -2.9%.',
      '+21% average conversion on successful A/B tests (6 of the top 10 products).',
      'Branded search back with the brand: a Sutera ad and 6 of 6 Sutera products for “Sutera”.',
      'Fee savings go back into advertising for the brand.',
    ],
    evidence: {
      source: 'Sutera’s Amazon seller account data, from Epic’s case study report.',
      notes: [
        'Fee changes compare each product’s fee when Epic took over the account with the fee after the changes.',
        'The report does not state the dates of the measurement period.',
      ],
    },
    related: [
      { href: '/our-model', label: 'How the Buy-Sell-Advertise-Protect model works' },
      { href: '/intelligence', label: 'How Epic tests and optimizes listings' },
    ],
  },
  {
    slug: 'auto-parts-amazon-1p-vs-epic-3p',
    status: 'published',
    brand: 'Auto Parts Brand',
    anonymous: true,
    title: 'Auto Parts Brand: Amazon 1P vs Epic 3P',
    dek: 'What a brand nets per unit when Amazon buys as a 1P retailer, compared with Epic buying the inventory and paying the Amazon fees.',
    seoTitle: 'Amazon 1P vs 3P Case Study: Auto Parts Brand Net Revenue',
    seoDescription:
      'An auto parts brand compared Amazon 1P with Epic Global’s 3P model: net revenue per unit rose 159% on one brake kit and 53% on another.',
    industry: 'Automotive Parts',
    marketplaces: ['Amazon US'],
    region: 'United States',
    pillars: ['Buy', 'Sell'],
    glance: {
      problem: 'Thin margins and unpredictable fees under Amazon 1P.',
      did: "Moved the brand to Epic's 3P model: Epic buys the inventory and pays the Amazon fees.",
      result: 'Net revenue per unit up 159% on one brake kit and 53% on another.',
    },
    metrics: [
      { value: '+159%', label: 'Net revenue per unit', note: 'Escalade brake kit (+$215.43)', basis: 'measured' },
      { value: '+53%', label: 'Net revenue per unit', note: 'Civic brake kit (+$58.58)', basis: 'measured' },
      { value: '$0', label: 'Amazon fees paid by the brand', note: 'Epic pays fees, chargebacks and co-op', basis: 'measured' },
    ],
    challenges: [
      {
        title: 'Low net margin under 1P',
        text: 'As an Amazon 1P vendor, the brand absorbed nearly all Amazon-imposed fees and netted only about 15–30% of retail price.',
      },
      {
        title: 'Fees that were hard to predict',
        text: 'Chargebacks, co-op and other Amazon costs made true profit hard to forecast.',
      },
      {
        title: 'Little left after cost of goods',
        text: 'With high manufacturing costs, a 15–30% net margin left the brand very little profit.',
      },
    ],
    workstreams: [
      {
        title: 'Comparing the two models',
        actions: [
          {
            label: '1P',
            text: 'Amazon buys the inventory, but the brand pays nearly all of Amazon’s fees, chargebacks and co-op out of that price.',
          },
          {
            label: 'Epic 3P',
            text: 'Epic buys the inventory at an agreed wholesale price, sells it on its own Amazon seller account and pays the Amazon fees.',
          },
        ],
        result: 'The question is simple: what does the brand actually keep per unit after fees? The two brake kits below answer it.',
        chart: {
          kind: 'compare',
          title: 'Brand net revenue per unit',
          unit: '$',
          series: ['Amazon 1P', 'Epic 3P'],
          items: [
            { label: 'Escalade brake kit', values: [135.72, 351.15] },
            { label: 'Civic brake kit', values: [111.46, 170.04] },
          ],
          caption: 'What the brand keeps per unit after all fees.',
        },
      },
      {
        title: 'Brake kit (2015–2020 Escalade, Silverado, Suburban, Sierra, Yukon)',
        actions: [],
        table: {
          title: 'Escalade brake kit, per unit',
          columns: ['', 'Amazon 1P', 'Epic 3P'],
          rows: [
            ['Paid to the brand', '$489.85', '$351.15'],
            ['Fees paid by the brand', '$354.13 (Amazon fees, chargebacks, etc.)', '$0 (Epic pays all fees)'],
            ['Brand net revenue', '$135.72', '$351.15'],
            ['Change', '', '+159% (+$215.43 per unit)'],
          ],
        },
      },
      {
        title: 'Front and rear brake kit (2016–2021 Honda Civic)',
        actions: [],
        table: {
          title: 'Civic brake kit, per unit',
          columns: ['', 'Amazon 1P', 'Epic 3P'],
          rows: [
            ['Paid to the brand', '$230.23', '$170.04'],
            ['Fees paid by the brand', '$118.77 (Amazon fees, chargebacks, etc.)', '$0 (Epic pays all fees)'],
            ['Brand net revenue', '$111.46', '$170.04'],
            ['Change', '', '+53% (+$58.58 per unit)'],
          ],
        },
      },
    ],
    results: [
      'Escalade brake kit: brand net revenue per unit up 159%, from $135.72 to $351.15 (+$215.43).',
      'Civic brake kit: brand net revenue per unit up 53%, from $111.46 to $170.04 (+$58.58).',
      'The brand pays no Amazon fees, chargebacks or co-op costs.',
      'A predictable price per unit instead of fees that change month to month.',
    ],
    evidence: {
      source: 'The brand’s Amazon 1P figures for two products, compared with Epic’s 3P offer, from Epic’s 1P vs 3P financial breakdown.',
      notes: [
        'Per-unit figures for two products; other products and brands will differ.',
        'The report does not state the dates of the comparison.',
      ],
    },
    related: [
      { href: '/our-model', label: 'How Epic buys inventory and pays the marketplace costs' },
      { href: '/our-model', label: 'Epic vs an agency vs an aggregator' },
    ],
  },
];

/** Studies the public can see, featured first. */
export const publishedCaseStudies = caseStudies
  .filter((study) => study.status === 'published')
  .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

export function getCaseStudy(slug: string) {
  return publishedCaseStudies.find((study) => study.slug === slug);
}

/** Old on-page anchors (homepage links, shared links) mapped to each study's own page. */
export const legacyAnchors: Record<string, string> = {
  sutera: 'sutera-amazon-fees-conversion-brand-defense',
  'auto-parts-1p-vs-3p': 'auto-parts-amazon-1p-vs-epic-3p',
};
