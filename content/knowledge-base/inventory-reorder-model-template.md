---
title: "Inventory Reorder Model Template"
summary: "A one-row-per-SKU spreadsheet layout with columns and formulas for safety stock, reorder point and order quantity."
seoDescription: "A spreadsheet template for marketplace reorder planning: columns and formulas for safety stock, reorder point and order quantity per SKU."
category: "Templates and Downloads"
pillar: "Buy"
type: "Template"
difficulty: "Advanced"
updated: 2026-11-03
publishOn: 2027-01-11
tags: ["inventory", "reorder", "template", "forecasting"]
related: ["reorder-point-logic-explained", "weekly-operating-cadence-doc", "kpi-glossary"]
featured: false
downloadable: true
order: 24
---

This template is a one-row-per-SKU spreadsheet that tells you, each week, which SKUs to reorder and how many units to order. It calculates safety stock, the [reorder point](/knowledge-base/reorder-point-logic-explained) and the order quantity from four inputs: daily demand, demand variability, full lead time and current inventory.

The logic behind each formula is explained in Reorder Point Logic Explained. This page gives the columns, the formulas and a filled-in example row.

## What inputs does the model need?

- **Sales history:** units sold per day for the last 4 to 8 weeks, with out-of-stock days removed.
- **Lead time:** days from purchase order to sellable stock at the marketplace, including production, freight, prep and check-in.
- **Inventory:** units on hand at the marketplace, units in transit and units on open purchase orders.
- **Order rules:** case pack size, supplier minimum order quantity and your review period (how often you place orders).
- **Service level:** how often you want to avoid a stockout, set as a Z-score.

## The template: columns and formulas

Column letters assume the table starts in column A, with one SKU per row starting at row 2. Inputs are typed in; calculated columns use the formulas shown.

| Col | Column name | Type | Formula or source |
|---|---|---|---|
| A | SKU / ASIN | Input | From catalog |
| B | Marketplace / region | Input | One row per SKU per region |
| C | Avg daily demand (units) | Input or calc | Units sold in period ÷ in-stock days in period |
| D | Std dev of daily demand | Input or calc | =STDEV.S(daily sales range), in-stock days only |
| E | Lead time (days) | Input | Production + freight + prep + check-in |
| F | Review period (days) | Input | Days between order reviews, e.g. 7 or 30 |
| G | Z-score | Input | 1.65 for 95%, 2.05 for 98%; or =NORM.S.INV(service level) |
| H | Safety stock | Calc | =ROUNDUP(G2\*D2\*SQRT(E2),0) |
| I | Reorder point | Calc | =ROUNDUP(C2\*E2,0)+H2 |
| J | On hand | Input | Sellable units at the marketplace |
| K | Inbound | Input | Units shipped, not yet received |
| L | Open POs | Input | Units ordered, not yet shipped |
| M | Inventory position | Calc | =J2+K2+L2 |
| N | Weeks of cover | Calc | =IFERROR(M2/(C2\*7),"") |
| O | Reorder now? | Calc | =IF(M2<=I2,"YES","no") |
| P | Order-up-to level | Calc | =ROUNDUP(C2\*(E2+F2),0)+H2 |
| Q | Raw order qty | Calc | =IF(O2="YES",MAX(P2-M2,0),0) |
| R | Case pack | Input | Units per carton |
| S | Supplier MOQ | Input | Minimum units per order |
| T | Final order qty | Calc | =IF(Q2=0,0,MAX(CEILING(Q2,R2),S2)) |
| U | Days until stockout | Calc | =IFERROR(J2/C2,"") |
| V | Stockout before arrival? | Calc | =IF(U2<E2,"RISK","ok") |
| W | Notes / overrides | Input | Promotions, launches, supplier delays |

## Example row (illustrative numbers, not Epic results)

| Column | Value | How it was calculated |
|---|---|---|
| Avg daily demand (C) | 40 | Input |
| Std dev (D) | 10 | Input |
| Lead time (E) | 45 | Input |
| Review period (F) | 30 | Input |
| Z-score (G) | 1.65 | 95% service level |
| Safety stock (H) | 111 | 1.65 × 10 × √45 = 110.7, rounded up |
| Reorder point (I) | 1,911 | 40 × 45 + 111 |
| On hand / inbound / open POs (J, K, L) | 1,300 / 500 / 0 | Inputs |
| Inventory position (M) | 1,800 | 1,300 + 500 + 0 |
| Weeks of cover (N) | 6.4 | 1,800 ÷ 280 |
| Reorder now? (O) | YES | 1,800 is below 1,911 |
| Order-up-to level (P) | 3,111 | 40 × 75 + 111 |
| Raw order qty (Q) | 1,311 | 3,111 − 1,800 |
| Case pack / MOQ (R, S) | 24 / 500 | Inputs |
| Final order qty (T) | 1,320 | 1,311 rounded up to 55 cases of 24 |
| Days until stockout (U) | 32.5 | 1,300 ÷ 40 |
| Stockout before arrival? (V) | RISK | 32.5 days of stock on hand vs 45-day lead time |

The RISK flag matters: the 500 inbound units should arrive well before day 32, so check their expected arrival date. If they are delayed, this SKU needs an expedited shipment or a temporary cut in ad spend to slow sales.

## How to use the template each week

1. Refresh sales, on hand, inbound and open PO columns from marketplace reports.
2. Filter column O for "YES" and column V for "RISK".
3. Review each flagged SKU against the notes column for promotions or launches that change demand.
4. Check marketplace storage limits before approving order quantities.
5. Place purchase orders and add them to column L so they are not ordered twice.
6. Once a month, refresh lead times from actual shipment dates and recheck service levels.

## What are the common mistakes?

- Averaging demand over stockout days, which understates true demand.
- Using production time instead of full lead time.
- Leaving inbound or open POs out of inventory position, which causes double orders.
- One row for a SKU sold in several countries. Use one row per SKU per region.

## How Epic handles this

As a wholesale trade partner, Epic buys a brand's inventory upfront at wholesale, so this model drives Epic's own purchase orders to the brand. Epic owns the forecast and the inventory risk, and pays for fulfillment and storage. The brand's part is to supply reliable lead times, case packs and minimums, and to flag production changes early.

## FAQ

### Can I use this for Walmart, eBay or TikTok Shop too?

Yes. Add a row per SKU per marketplace or fulfillment network, since each has its own demand and lead time.

### What if I do not have enough sales history?

Use a launch forecast for column C and a higher buffer, such as a fixed number of extra days of demand, until 6 to 8 weeks of data exist.

### Why round up to case packs?

Suppliers ship in full cartons, and marketplace prep rules often require case-packed inventory to be shipped in consistent carton quantities.
