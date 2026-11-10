---
title: "Catalog QA Checklist"
summary: "A catalog-level audit checklist for finding suppressed listings, broken variations, bad data and price conflicts that cost sales."
seoDescription: "A catalog-wide QA checklist for marketplace brands: suppressed listings, variations, attributes, images, content, pricing and brand control."
category: "Templates and Downloads"
pillar: "Sell"
type: "Checklist"
difficulty: "Operator"
updated: 2026-11-05
publishOn: 2026-12-24
tags: ["catalog", "qa", "checklist", "template"]
related: ["catalog-hygiene-what-it-is-why-it-matters", "listing-qa-checklist", "variation-strategy-basics", "catalog-integrity-controls"]
featured: false
downloadable: true
order: 21
---

The Catalog QA Checklist is an audit of a brand's whole marketplace catalog at once, looking for problems that only show up across many listings: suppressed or duplicate listings, broken [variation families](/knowledge-base/variation-strategy-basics), inconsistent attributes, missing content and price conflicts.

Use it when you take over a catalog, before a major sales event, after a large catalog upload, and on a regular schedule, because catalogs drift as marketplaces, sellers and automated systems change listing data.

## How is this different from the Listing QA Checklist?

The [Listing QA](/knowledge-base/listing-qa-checklist) Checklist checks one listing in depth before it goes live: title, bullets, images, keywords. This checklist works at catalog level. It asks whether the full set of listings is complete, consistent and under the brand's control. Run the Listing QA Checklist on any individual listing this audit flags.

## How do I run a catalog audit?

1. **Export the catalog.** Pull a full listings report from each marketplace (on Amazon, an All Listings report plus the Category Listings report or a flat-file export), along with suppressed and inactive listings reports.
2. **Build one master sheet.** One row per SKU and marketplace, with ASIN or item ID, parent, status, price, inventory and key attributes.
3. **Work section by section** through the checklist below, logging each issue with its SKU, severity and owner.
4. **Fix in severity order.** Anything stopping a product from being bought comes first; content improvements come last.
5. **Re-export and confirm.** Marketplaces can take time to reflect changes, and some edits get overwritten by other contributors. Check again after fixes are submitted.

## How should I rank what I find?

| Severity | Meaning | Examples |
|---|---|---|
| 1. Blocking | Product cannot be bought or found | Suppressed listing, stranded inventory, missing Buy Box, wrong category gating |
| 2. Revenue leak | Product sells less than it should | Split reviews from broken variations, duplicate listings, wrong browse node, out of stock |
| 3. Quality | Weak or inconsistent content | Missing A+ content, low image count, incomplete attributes |

## The checklist

### 1. Listing status and availability

- Every active SKU is live and buyable on every intended marketplace.
- No suppressed or search-suppressed listings (check the suppressed listings view and the reason given for each).
- No stranded inventory (units in the fulfillment network without an active offer).
- Every in-stock listing holds the Featured Offer / Buy Box, or the reason it does not is known.
- Discontinued SKUs are closed out intentionally, not left as dead listings.

### 2. Catalog structure

- No duplicate ASINs or item pages for the same product. Duplicates split reviews and sales history and can break marketplace policy.
- Every variation family has one parent, correct variation themes (size, color, count) and no unrelated products merged in.
- No orphaned child SKUs that should be in a family.
- Each product sits in the most specific correct browse node / category.
- Bundles and multipacks have their own GTINs or exemptions and correct unit counts.

### 3. Attributes and data

- Brand name is spelled identically on every listing.
- Required and recommended attributes are filled for each category (size, material, color, count, item weight and dimensions).
- Item dimensions and weights match the real product, since they drive fulfillment fees.
- GTINs are valid and match the product on the page.
- Compliance fields are complete: safety warnings, hazmat information, country of origin, and any certifications the category needs.
- Contributed data has not been overwritten. Compare live listing data with the brand's master data.

### 4. Images and content

- Main images follow the marketplace spec (for Amazon, pure white background, product filling most of the frame, at least 1,000 pixels on the longest side for zoom).
- Every listing has a full image set: lifestyle, scale, detail and infographic images.
- Titles follow one consistent pattern across the catalog and stay within the marketplace's length and character rules.
- Bullets and descriptions are accurate, with no claims the brand cannot support (especially health, safety or "best" claims).
- Backend search terms are filled, within the byte limit, and do not repeat brand names or words already in the title.
- A+ / enhanced content is published on every top-selling parent.
- Video is present on hero products where the marketplace supports it.

### 5. Pricing and offers

- Prices are at or above MAP on every channel the brand controls.
- No unintended price conflicts between marketplaces (the same item far cheaper on one channel can trigger pricing alerts or Buy Box loss on another).
- Coupons, promotions and deals have end dates and are intentional.
- Unknown sellers on the brand's listings are logged for the Unauthorized Seller Monitoring Workflow.

### 6. Reviews and customer signals

- Listings with ratings below the brand's threshold are flagged for root-cause review.
- Return reasons and customer questions are checked for listing errors (wrong size chart, missing info).
- Any listing with a quality or safety complaint pattern is escalated.

### Issue log template

| SKU / ASIN | Marketplace | Section | Issue | Severity (1-3) | Owner | Fix submitted | Verified live |
|---|---|---|---|---|---|---|---|

## How Epic handles this

As a wholesale trade partner, Epic buys the brand's inventory upfront, so a broken listing costs Epic sales on stock it owns. Pricing and seller checks from section 5 feed Epic's MAP enforcement and its work against [unauthorized sellers](/knowledge-base/unauthorized-seller-monitoring-workflow).

## FAQ

### How often should I audit my catalog?

Run a full audit when you take over a catalog, before peak season and after large uploads, plus on a regular schedule. Status and Buy Box checks (section 1) are worth doing weekly.

### Why do listing details change without my edits?

Marketplaces combine data from several contributors, including other sellers and automated systems. Brand Registry gives the brand more control over its listing content, but you still need to compare live data with your master data.

### Should I merge duplicate listings?

If they are truly the same product, yes. Work through Seller Support or the brand's catalog tools to merge or close the duplicate, rather than leaving both live.

### What is the most expensive catalog error?

Usually a suppressed or stranded listing on a top seller, because the product cannot sell at all while inventory still incurs storage fees.
