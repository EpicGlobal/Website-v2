# Knowledge Base articles

Every article is one Markdown file in this folder. The file name is the web address:
`weekly-executive-dashboard.md` becomes `/knowledge-base/weekly-executive-dashboard`.

## Add an article

1. Copy an existing article file, rename it (lowercase words joined by hyphens), and change the details at the top.
2. Write the article below the second `---`.
3. Set `publishOn` to the day it should go live, or leave it empty to publish as soon as it's merged.
4. Push to the preview branch. The build checks every file and stops with a clear message if something is wrong.

## The details at the top

```yaml
---
title: "Weekly Executive Dashboard"
seoTitle: "Shorter title for Google (optional, when the title is long)"
summary: "One or two sentences. Shows on the card and under the title."
seoDescription: "150-160 characters for Google (optional)."
category: "Templates"
pillar: "Sell"                      # optional: Buy, Sell, Advertise or Protect
marketplace: ["Amazon", "Walmart"]  # optional
type: "Template"                    # Answer Page, Playbook, Checklist, Glossary, Template or Deep Dive
difficulty: "Operator"              # Intro, Operator or Advanced
updated: 2026-11-05                 # last real edit (YYYY-MM-DD)
publishOn: 2026-11-16               # optional: hidden until this day (Utah time), then goes live by itself
tags: ["dashboard", "reporting"]
related: ["kpi-glossary"]           # optional: other article file names to show under Related Articles
featured: false                     # optional: show in Popular on the Knowledge Base page
order: 30                           # position in the list (each article a different number)
---
```

The date readers see is `updated`, or `publishOn` if that's later. Until its `publishOn` day an article has no page,
no card, and isn't in the sitemap, feed or llms-full.txt. Pages refresh hourly, so it appears within about an hour
of midnight Utah time on its day, with no new deploy.

An article with nothing written below the details shows as "Coming Soon" and stays out of search.

## Writing

Plain Markdown: `## Section heading`, `### Sub-heading`, `**bold**`, `*italic*`, `- lists`, `1. numbered lists`,
tables, and links like `[KPI Glossary](/knowledge-base/kpi-glossary)`. Every `##` heading starts a new section.
No HTML.

Boxes and special blocks (they look the same as the rest of the site in every theme):

```markdown
:::card
### A boxed panel
Text inside the box.
:::

:::callout
Highlighted box (accent border).
:::

:::warning
Orange box for cautions.
:::

::::grid
:::card
Left panel
:::
:::card
Right panel
:::
::::

:::checks
- A list with check marks
:::

:::warnings
- A list with warning icons
:::

:::checks{columns=2}
- A smaller check list in two columns
:::

::::step{number="01" title="Assess" note="Intake + Baseline (1-2 weeks)"}
A numbered phase card. Text, a #### label and a checklist can go inside.
::::

:::links
- [How Our Model Works](/knowledge-base/how-our-model-works): One line about the page
:::

::term[1P (First Party)]          small heading, used for glossary terms
::tagline[We buy it. You profit.™] accent-colored line
:accent[Calculation:] text        accent-colored bold words inside a sentence
:small[Small grey note]           small muted text inside a sentence
```

A block inside another block uses one fewer colon than the block around it, and each block closes with the
same number of colons it opened with (like the grid above: `::::grid` ... `::::`, with `:::card` ... `:::` inside).

Never put internal figures in an article (wholesale %, payment terms, revenue, SKU counts).
