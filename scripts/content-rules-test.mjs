/**
 * Regression tests for scripts/content-rules.mjs: sentences that must be blocked, and ordinary marketplace
 * writing that must still pass (so the rules don't block legitimate articles).
 */
import assert from 'node:assert/strict';
import { dollarAmounts, scanContent } from './content-rules.mjs';

const mustBlock = [
  // Wholesale share of retail.
  'We pay 40% of retail price.',
  'We pay 40-50% of MSRP.',
  'Epic pays 40 to 50 percent of the list price.',
  'We typically pay 35% of the retail value.',
  'We buy at 40% off retail.',
  'We pay about half of retail.',
  'Epic offers cents on the dollar for slow stock.',
  // Payment terms, including look-alike hyphens and spaces.
  'Net30 terms.',
  'We pay on net 60 terms.',
  'net‑30 terms',
  'net – 60',
  'We offer 30-day payment terms.',
  'Payment terms of 60 days.',
  'We pay within 30 days of delivery.',
  'Brands get paid within 45 days.',
  // Prices Epic pays.
  'A purchase price of $12.',
  'The wholesale cost is $8.40.',
  'We paid $12.50 per unit.',
  'Epic offered $6 a unit.',
  // Epic's own numbers and history.
  'Epic did $40M in revenue last year.',
  'Our annual revenue is $40 million.',
  "Epic's margin is 18%.",
  'We carry 12,000 SKUs.',
  'Epic started as an MLM.',
  'It began as a multi-level marketing company.',
  // Competitor names, including spacing tricks.
  'Unlike Pattern Inc., we buy.',
  'Pattern Inc',
  'Pattern\nGroup',
  'Spreetail’s model',
  'THRASIO rolled up brands.',
];

const mustPass = [
  // Approved public facts and claims already on the site.
  'We work with brands doing $1M+ a year.',
  'Under Epic’s offer, brand net revenue per unit is 159% higher than under 1P.',
  'A 4.9/5 rating from 9,600+ ratings on Amazon US.',
  '50+ brands, about 40 countries and 12 marketplaces.',
  // Ordinary marketplace teaching.
  'Amazon’s referral fee is typically 8-15% of the sale price.',
  'An FBA fulfillment fee of $3.22 per unit adds up.',
  'Unauthorized sellers listing at 20% off retail hurt MAP.',
  'Amazon pays sellers every 14 days.',
  'If your unit cost is $8 and you sell at $24, your margin is healthy.',
  'If you sell 200 SKUs, start with your top 20.',
  'Your sales grew 30% after the listing fix.',
  'We buy 30% of your catalog first, then expand.',
  'We buy your inventory up front, so you get paid sooner.',
  'Pattern recognition in search-term reports.',
  'A perch on the first page of results.',
  'Network effects in marketplaces.',
  'Return rates near 10% are common.',
  'Expect 30 days before the new listing indexes.',
];

const missed = mustBlock.filter((s) => scanContent(s).length === 0);
const wrongly = mustPass.map((s) => [s, scanContent(s)]).filter(([, p]) => p.length);
assert.deepEqual(missed, [], `should be blocked:\n  ${missed.join('\n  ')}`);
assert.deepEqual(wrongly, [], `should pass:\n  ${wrongly.map(([s, p]) => `${s}  ->  ${p.join('; ')}`).join('\n  ')}`);
assert.deepEqual(dollarAmounts('cost $1,250.50 and ＄ 9'), ['$1,250.50', '$ 9'], 'full-width dollar signs count too');

console.log(`Content rule tests passed: ${mustBlock.length} confidential or competitor sentences are blocked, ${mustPass.length} ordinary sentences pass.`);
