/**
 * Content rules for everything the public reads (Knowledge Base articles, content/llms.txt, case studies).
 * The article build (scripts/build-articles.mjs) and the site checks (scripts/site-content-test.mjs) stop on a match.
 *
 * 1. No named competitors in public content (Nov 12 2026 policy). Compare business models instead
 *    (wholesale trade partner vs agency vs distributor vs aggregator). The private AIEO dashboard may track names.
 * 2. No internal figures: wholesale % of retail, payment terms, purchase prices.
 *
 * To add a name or pattern, add it below. A false match on a real need: rephrase rather than weaken the rule.
 */

/** Companies that compete with Epic for brands. Matched as whole words, any capitalization. */
export const COMPETITOR_NAMES = [
  // Specific names only: plain words that are also company names (pattern, heyday, perch) would block normal writing.
  'Pattern Inc', 'Pattern Group', 'pattern.com', 'Spreetail', 'Pharmapacks', 'Thrasio', 'Perch Brands',
  'Razor Group', 'Branded Group', 'Boosted Commerce', 'Elevate Brands', 'Berlin Brands', 'SellerX',
  'Canopy Management', 'SalesDuo', 'Brand Propello', 'Platinum Commerce', 'Buy Box Experts', 'Avenue7Media',
  'Podean', 'D1 Brands',
];

/** Internal-only figures. Each entry: [pattern, what it looks like]. */
export const INTERNAL_PATTERNS = [
  [/\b\d{1,2}(?:\.\d+)?\s?(?:%|percent)\s+(?:of\s+)?(?:the\s+)?(?:retail|MSRP|list)\s+price\b/i, 'a wholesale percentage of retail price'],
  [/\bnet[\s-]?(?:15|30|45|60|90)\b/i, 'payment terms (net 30 and similar)'],
  [/\bpurchase price of \$\s?\d/i, 'a purchase price'],
  [/\bwholesale price (?:of|was|is) \$\s?\d/i, 'a wholesale price'],
];

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Problems in a piece of public text, as plain-English messages (empty when it's fine). */
export function scanContent(text) {
  const problems = [];
  for (const name of COMPETITOR_NAMES) {
    if (new RegExp(`(^|[^A-Za-z0-9])${escape(name)}($|[^A-Za-z0-9])`, 'i').test(text)) {
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
  return [...text.matchAll(/\$\s?\d[\d,]*(?:\.\d+)?/g)].map((m) => m[0]);
}
