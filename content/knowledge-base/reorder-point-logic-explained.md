---
title: "Reorder Point Logic Explained"
summary: "How to calculate a marketplace reorder point from daily demand, full lead time and safety stock, with a worked example."
seoDescription: "How to set a marketplace reorder point from daily demand, full lead time and safety stock, with a worked example and the formulas."
category: "Inventory and Forecasting"
pillar: "Buy"
type: "Deep Dive"
difficulty: "Operator"
updated: 2026-11-05
publishOn: 2027-01-06
tags: ["inventory", "reorder", "forecasting", "planning"]
related: ["inventory-reorder-model-template", "kpi-glossary"]
featured: false
order: 14
---

A reorder point is the inventory level at which you place the next purchase order, so new stock arrives before the old stock runs out. It equals average daily demand multiplied by the full lead time in days, plus a safety stock buffer for demand and supply surprises.

On marketplaces, getting this right matters more than in most channels. A stockout on Amazon does not just pause sales; it can cost organic rank, ad momentum and the [Buy Box](/knowledge-base/amazon-marketplace-glossary), which take weeks to rebuild. Ordering too early ties up cash and adds storage fees.

## What is the reorder point formula?

**Reorder point = (average daily demand × lead time in days) + safety stock**

- **Average daily demand:** units sold per day, usually a trailing 4 to 8 week average, adjusted for known events (promotions, seasonality, a new marketplace going live).
- **Lead time:** every day between deciding to order and having sellable stock at the marketplace. Not just production time.
- **Safety stock:** extra units that cover the gap when demand runs high or supply runs late.

## What counts as lead time?

The most common mistake is using the supplier's production time as the lead time. For marketplace selling, lead time is the sum of every step until a unit is available to buy:

1. Purchase order approval and confirmation
2. Production or pick time at the brand or factory
3. Freight to the warehouse or prep center
4. Prep, labeling and inbound shipment creation
5. Carrier transit to the marketplace fulfillment center
6. Receiving and check-in at the fulfillment center (FBA check-in can take days to weeks in busy periods)

Use the realistic number from recent shipments, not the best case. If lead time varies a lot, that variability belongs in safety stock.

## How do you calculate safety stock?

There are two common methods.

### Simple method: days of buffer

**Safety stock = average daily demand × buffer days**. For example, 14 buffer days. This is easy to explain and fine for stable products.

### Statistical method: service level

**Safety stock = Z × standard deviation of daily demand × √(lead time in days)**

Z is set by the service level you want, meaning the share of order cycles with no stockout. Common values:

| Target service level | Z-score |
|---|---|
| 90% | 1.28 |
| 95% | 1.65 |
| 98% | 2.05 |
| 99% | 2.33 |

Higher service levels cost more inventory for each extra point of protection, so most sellers reserve 98 to 99% for their top sellers.

## Worked example (illustrative numbers, not Epic results)

An illustrative SKU sells an average of 40 units per day, with a standard deviation of 10 units per day. Full lead time is 45 days (25 days production, 12 days freight, 8 days prep and check-in). Target service level is 95%, so Z = 1.65.

| Step | Calculation | Result |
|---|---|---|
| Lead time demand | 40 × 45 | 1,800 units |
| Safety stock | 1.65 × 10 × √45 (6.71) | 111 units |
| Reorder point | 1,800 + 111 | 1,911 units |

Now compare the reorder point with **inventory position**, not just stock on hand:

**Inventory position = on hand at the marketplace + inbound in transit + open purchase orders − backorders**

If the illustrative SKU has 1,500 units on hand and 600 inbound, its inventory position is 2,100. That is 189 units above the reorder point, or about 5 days of sales (189 ÷ 40), so the next order goes out within the week.

## How much should you order when you hit the reorder point?

A common approach is an order-up-to level that covers the lead time plus the time until your next order review:

**Order-up-to level = daily demand × (lead time + review period) + safety stock**

**Order quantity = order-up-to level − inventory position**

With a 30-day review period in the illustrative example: 40 × (45 + 30) + 111 = 3,111 units. At an inventory position of 1,911, the order is 1,200 units. Round to case packs and supplier minimums, and check against marketplace storage limits before placing it.

## What breaks reorder point logic?

- **Demand measured during a stockout.** Days with zero stock show zero sales, which drags the average down. Exclude out-of-stock days.
- **Ignoring planned events.** A Prime Day deal or a new marketplace launch needs a separate demand forecast, not the trailing average.
- **One reorder point for all regions.** Each country or fulfillment network has its own demand and lead time.
- **Storage limits.** Marketplace capacity limits can cap how much you can send, so the order may need to be split across shipments.
- **Setting it once.** Demand and lead times move. Recalculate on a fixed cadence.

## How Epic handles this

- Epic is a wholesale trade partner, so reorder points are Epic's problem: it buys the inventory upfront and carries the cost of overstock or a stockout.
- Epic turns reorder points into purchase orders to the brand, replenishing monthly after an opening order of about 60 to 90 days of stock.
- The brand's most useful input is an accurate production lead time and early notice of changes.

## FAQ

### Is the reorder point the same as the order quantity?

No. The reorder point tells you when to order. The order quantity tells you how much, usually enough to reach an order-up-to level that covers lead time plus the review period.

### Should inbound shipments count toward the reorder point?

Yes. Compare the reorder point with inventory position (on hand plus inbound plus open orders), or you will double-order.

### How much safety stock is enough?

It depends on how variable demand and lead time are and how costly a stockout is. Top sellers usually justify a higher service level than slow movers.

### How often should reorder points be recalculated?

At least monthly, and weekly for fast movers or during peak season, when both demand and fulfillment center check-in times change quickly.
