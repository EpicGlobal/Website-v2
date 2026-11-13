/**
 * Content rules for everything the public reads (Knowledge Base articles, content/llms.txt, page text, case studies).
 * The article build (scripts/build-articles.mjs) and the site checks (scripts/site-content-test.mjs) stop on a match.
 *
 * 1. No named competitors in public content (Nov 12 2026 policy). Compare business models instead
 *    (wholesale trade partner vs agency vs distributor vs aggregator). The private AIEO dashboard may track names.
 * 2. No internal figures: wholesale % of retail, payment terms, purchase prices, Epic's own revenue, margin or SKU
 *    count, and the company's early history. Rules about money Epic pays need Epic ("we", "Epic") as the payer,
 *    so articles can still explain Amazon fees, MAP discounts and a brand's own costs.
 *
 * Text is normalized first (odd hyphens, non-breaking spaces, curly quotes), so "net-30" written with a special
 * hyphen, or a name with a non-breaking space, can't slip past. These rules are a safety net; the reviewer is
 * still the main check. Examples that must and must not match are in scripts/content-rules-test.mjs.
 *
 * To add a name or pattern, add it below and an example to the test. A false match on a real need: rephrase
 * rather than weaken the rule.
 */

/** Companies that compete with Epic for brands. Matched as whole words, any capitalization. */
export const COMPETITOR_NAMES = [
  // Specific names only: plain words that are also company names (pattern, heyday, perch) would block normal writing.
  'Pattern Inc', 'Pattern Group', 'pattern.com', 'Spreetail', 'Pharmapacks', 'Thrasio', 'Perch Brands',
  'Razor Group', 'Branded Group', 'Boosted Commerce', 'Elevate Brands', 'Berlin Brands', 'SellerX',
  'Canopy Management', 'SalesDuo', 'Brand Propello', 'Platinum Commerce', 'Buy Box Experts', 'Avenue7Media',
  'Podean', 'D1 Brands',
];

/** A percentage or range: "40%", "40-50%", "40 to 50 percent". */
const PCT = String.raw`\d{1,2}(?:\.\d+)?(?:\s?(?:-|to)\s?\d{1,2}(?:\.\d+)?)?\s?(?:%|percent)`;
/** Epic as the subject: "we", "Epic", "Epic Global", optionally "typically/usually/will/can/often". */
const WE = String.raw`\b(?:we|Epic|Epic Global(?: Inc\.?)?)\s+(?:typically\s+|usually\s+|will\s+|can\s+|often\s+)?`;
const re = (source) => new RegExp(source, 'i');

/** Internal-only figures. Each entry: [pattern, what it looks like]. */
export const INTERNAL_PATTERNS = [
  [re(String.raw`\b${PCT}\s+(?:of\s+)?(?:the\s+)?(?:retail|MSRP|list)\s+(?:price|value)\b`), 'a wholesale percentage of retail price'],
  [re(String.raw`\b${PCT}\s+of\s+(?:the\s+)?(?:MSRP|retail)\b`), 'a wholesale percentage of retail price'],
  [re(String.raw`${WE}(?:pay|pays|paid|buy|buys|bought|purchase|purchases|offer|offers)\b[^.\n]{0,40}?(?:(?:${PCT}|\bhalf|\ba third|\ba quarter)\s+(?:of|off|below|under)\s+(?:the\s+)?(?:retail|MSRP|list)|cents on the dollar)`), 'what Epic pays as a share of retail'],
  [/\bnet\s?-?\s?(?:7|10|15|30|45|60|75|90|120)\b/i, 'payment terms (net 30 and similar)'],
  [/\b\d{1,3}-?\s?days?\s+payment\s+terms\b|\bpayment\s+terms\s+of\s+\d/i, 'payment terms'],
  [re(String.raw`${WE}(?:pay|pays)\b[^.\n]{0,40}?\b(?:with)?in\s+\d{1,3}\s+(?:business\s+)?days\b`), 'payment terms (when Epic pays)'],
  [/\b(?:brands?|you)\s+(?:get|gets|are|will\s+be)\s+paid\b[^.\n]{0,30}?\b(?:with)?in\s+\d{1,3}\s+(?:business\s+)?days\b/i, 'payment terms (when brands get paid)'],
  [/\bpurchase price of \$\s?\d/i, 'a purchase price'],
  [/\bwholesale (?:price|cost) (?:of|was|is|at) \$\s?\d/i, 'a wholesale price'],
  [re(String.raw`${WE}(?:pay|pays|paid|offer|offers|offered)\b[^.\n]{0,40}?\$\s?\d[\d,.]*\s*(?:per|a|\/|each)\s*(?:unit|item|piece)\b`), 'a per-unit price Epic pays'],
  [/\b(?:Epic's|our)\s+(?:annual\s+|total\s+|gross\s+|net\s+)?(?:revenue|GMV|sales|margins?|profits?)\b[^.\n]{0,40}?(?:\$\s?\d|\b\d+(?:\.\d+)?\s?%)/i, "Epic's own revenue or margin"],
  [re(String.raw`${WE}(?:did|made|generated|sold|does|do)\s+(?:over\s+|about\s+|more\s+than\s+|nearly\s+)?\$\s?\d`), "Epic's own revenue"],
  [/\b(?:we|Epic|our)\b[^.\n]{0,30}?\b\d[\d,]*\+?\s*SKUs\b/i, "Epic's SKU count"],
  [/\b(?:MLM|multi-level marketing|network marketing)\b/i, "the company's early history (internal only)"],
];

/** The same text with look-alike characters made plain: dashes, non-breaking and zero-width spaces, curly quotes. */
export function normalize(text) {
  return text
    .normalize('NFKC')
    .replace(/[‐-―−﹘﹣－]/g, '-')
    .replace(/[   ]/g, ' ')
    .replace(/[​⁠﻿]/g, '')
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"');
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Problems in a piece of public text, as plain-English messages (empty when it's fine). */
export function scanContent(raw) {
  const text = normalize(raw);
  const problems = [];
  for (const name of COMPETITOR_NAMES) {
    const words = escape(name).replace(/ /g, '\\s+');
    if (new RegExp(`(^|[^A-Za-z0-9])${words}($|[^A-Za-z0-9])`, 'i').test(text)) {
      problems.push(`names a competitor ("${name}"); public pages compare business models, not companies`);
    }
  }
  for (const [pattern, what] of INTERNAL_PATTERNS) {
    const m = pattern.exec(text);
    if (m) problems.push(`contains ${what} ("${m[0]}"); internal figures stay off the website`);
  }
  return problems;
}

/** Dollar amounts, for files where any price is a problem (case studies). */
export function dollarAmounts(text) {
  return [...normalize(text).matchAll(/\$\s?\d[\d,]*(?:\.\d+)?/g)].map((m) => m[0]);
}
