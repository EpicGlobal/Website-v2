---
title: "Campaign Structure Playbook: How Should You Structure Amazon Ad Campaigns?"
seoTitle: "Campaign Structure Playbook"
summary: "How to build a baseline Amazon ads structure with campaigns by objective, match type and SKU priority, plus naming rules and weekly checks."
seoDescription: "How to build a baseline Amazon ads structure: campaigns by objective, match type and SKU priority, with naming rules and weekly checks."
category: "Advertising Operations"
pillar: "Advertise"
marketplace: ["Amazon", "Walmart"]
type: "Playbook"
difficulty: "Operator"
updated: 2026-11-05
publishOn:
tags: ["advertising", "campaigns", "structure", "ppc"]
related: ["search-term-harvesting-playbook", "creative-testing-loop", "ad-account-rebuild-checklist", "kpi-glossary", "how-our-model-works"]
featured: false
order: 11
---

A good baseline Amazon ads structure separates campaigns by objective (discovery, performance, brand defense and competitor conquest), by match type, and by product priority, so each campaign has one job and its own budget. That separation lets you read the data cleanly, move budget to what works, and stop spend on what doesn't without affecting everything else.

This playbook covers Sponsored Products first, since that is where most spend sits for most brands, then adds Sponsored Brands and Sponsored Display. The same logic works on Walmart Connect, with different names for some settings.

## Why does campaign structure matter?

Amazon sets budgets and bidding strategies at the campaign level and reports at the campaign, ad group, target and [search term](/knowledge-base/search-term-harvesting-playbook) levels. If one campaign mixes auto targeting, broad keywords, exact keywords and ten unrelated products, you cannot tell which part is working, and your best keywords compete with your worst ones for the same budget. Structure is what makes the account readable.

## What does a baseline structure look like?

| Campaign type | Objective | Targeting | Typical bidding |
|---|---|---|---|
| SP Auto | Discovery: find new search terms and ASINs | Automatic (close match, loose match, substitutes, complements) | Dynamic down only, modest bids |
| SP Broad / Phrase | Discovery with more control | Broad and phrase keywords from research | Dynamic down only |
| SP Exact (performance) | Scale proven converters | Exact keywords harvested from discovery | Down only, or up and down for top terms |
| SP Brand defense | Protect branded searches | Exact match on brand terms | Down only; low cost per click expected |
| SP Product targeting | Show on competitor and complementary pages | ASIN and category targets | Down only |
| Sponsored Brands | Top-of-search brand presence, video | Keywords or products; brand store or product collection | Set per campaign |
| Sponsored Display | Retargeting and on-page placements | Views remarketing, product and audience targeting | Set per campaign |

## How do you build it, step by step?

1. **Rank your SKUs.** Sort by margin, stock depth and sales. Tier 1 products (healthy margin, deep stock, proven demand) get dedicated campaigns. Tier 2 and 3 can share campaigns by product group.
2. **Group products that share keywords.** One ad group should contain products a shopper would see as alternatives for the same search. Never mix a $10 item and a $90 item in one ad group with shared bids.
3. **Launch discovery campaigns.** One auto campaign and one broad/phrase campaign per product group.
4. **Launch exact campaigns with your known winners.** Start with your brand terms and any keywords you already know convert.
5. **Add negatives to separate the layers.** Add your exact keywords as negative exact in the discovery campaigns, so each search term is bought by one campaign on purpose.
6. **Set budgets by objective.** Performance and brand defense should not run out of budget. Discovery gets a fixed, smaller share. The right split depends on margin and goals, so set it from your target ACoS or TACoS.
7. **Set placement adjustments only with data.** After two to four weeks, compare top of search, rest of search and product page performance before raising any placement.
8. **Name everything consistently.** See the template below.

## What naming convention should you use?

A clear name lets anyone filter the account in seconds. A simple pattern is ad type, product group or SKU, objective, targeting, and match type, separated by hyphens. Examples:

- SP - Protein-Vanilla - Perf - KW - Exact
- SP - Protein-All - Disc - Auto
- SP - Brand - Defense - KW - Exact
- SB - Protein-All - Video - KW - Phrase

## Which numbers should you watch each week?

| Metric | What it tells you |
|---|---|
| ACoS (ad spend / ad sales) | Efficiency of each campaign against your margin |
| TACoS (ad spend / total sales) | Whether ads are growing the whole business or just buying sales |
| Conversion rate by target | Whether the keyword matches the product |
| Impression share / top-of-search share | How much room there is to grow on a proven term |
| Budget-capped hours | Whether good campaigns are going dark early in the day |
| Spend with no sales by target | What to cut or negate |

## Weekly maintenance checklist

- Harvest converting search terms from discovery into exact campaigns
- Add non-converting terms as negatives
- Adjust bids on targets above or below target ACoS
- Check budget-capped campaigns; move money to proven performers
- Pause ads on out-of-stock or low-stock SKUs
- Confirm the advertised listings are still active and correct

## How Epic handles this

- Epic Global Inc. is a wholesale trade partner: we buy the brand's inventory upfront and pay for the ads ourselves.
- So campaign structure is built to protect margin and sell through stock we own, not to grow billable spend.
- Structure is set within about 4 weeks of kickoff and managed weekly, with a shared dashboard from day one.

## FAQ

### How many campaigns should a brand have?

Enough that each has one objective and one budget. For a small catalog that may be under 20; for a large one, more. Fewer, cleaner campaigns beat many overlapping ones.

### Should auto campaigns stay on forever?

Usually yes, at modest bids. They keep finding new search terms and ASINs as shopper behavior changes.

### What is the difference between ACoS and TACoS?

[ACoS](/knowledge-base/kpi-glossary) compares ad spend to ad-attributed sales. TACoS compares ad spend to all sales, so it shows whether ads are lifting total business.

### Do I need to bid on my own brand name?

Often yes. Competitors can bid on your brand terms, and branded clicks are usually cheap and convert well.
