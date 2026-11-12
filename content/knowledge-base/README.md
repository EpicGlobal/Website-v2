# Knowledge Base articles

Every article is one Markdown file in this folder. The file name is the web address:
`weekly-executive-dashboard.md` becomes `/knowledge-base/weekly-executive-dashboard`.

Brex writes the articles (with AI help). A designated Epic team member reviews and approves each one before it
goes live. Nobody is credited as a reviewer unless their approval is recorded (see "Review" below).

## The short version (what to tell Claude)

> "Claude, prepare these three approved articles for publication Monday, Wednesday and Friday."

Claude then: creates or updates the three Markdown files, fills in the details at the top (dates in Utah time,
tags, related articles, SEO title and description), adds internal links, records each approval, runs
`npm run check:articles`, and opens a pull request for review. Claude never approves or merges an article.
Someone with permission to merge to `main` merges the pull request any time before the first publish day; each
article then goes live by itself at midnight Utah time on its date. No deploy is needed on publish days.

## Statuses

| status | Meaning | Public? |
|---|---|---|
| `draft` | Being written | Never (404) |
| `review` | Sent to a reviewer | Never (404) |
| `approved` | A named reviewer approved the final text; the approval is recorded | From its `publishOn` day (or right away without one) |
| `live-unreviewed` | Went live before reviews began (Nov 12, 2026). No reviewer is shown. New articles can't use it | Yes |

Before its day, or while it's a draft or in review, an article has no page (404), no card, no link preview, and
isn't in the sitemap, RSS feed, llms.txt or llms-full.txt. Links to it from other articles show as plain text.

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
publishOn: 2026-11-16               # optional: hidden until this day (Utah time), then live by itself
published: 2026-01-22               # optional: the day it first went live (only for articles already live)
tags: ["dashboard", "reporting"]
related: ["kpi-glossary"]           # optional: other article file names to show under Related Articles
featured: false                     # optional: show in Popular on the Knowledge Base page
order: 30                           # position in the list (each article a different number)
status: approved                    # draft, review, approved (or live-unreviewed for pre-Nov 12 articles)
author: "Brexton Hansen"            # who wrote it; shown as "Written by ..." (leave out for "the Epic team")
reviewedBy: "Reviewer Name"         # approved only: exactly as they agreed to be credited
reviewerRole: "Brand Manager"       # approved only: their role at Epic
reviewedOn: 2026-11-14              # approved only: the day they approved the final text
reviewRecord: "https://github.com/EpicGlobal/Website-v2/pull/123#pullrequestreview-456"  # approved only: link to the approval
reviewerGitHub: "their-github-name" # GitHub approvals: the account that clicked Approve
recordConfirmation: "https://github.com/EpicGlobal/Website-v2/pull/123#pullrequestreview-789"  # Doc/email approvals only (see Review)
---
```

Readers see "Published (first day) · Updated (last edit)", and on an approved article "Reviewed by (name),
(role), (date)". The page's search data (Open Graph and Article schema) uses the same author, reviewer and dates.

## Review

A field that says `approved` is not proof by itself, so every approval links to a record:

1. **Reviewer uses GitHub (preferred).** Open a pull request with the article. The reviewer reads it in the
   "Files changed" tab and clicks **Review changes → Approve**. Copy the link to that review (it ends in
   `#pullrequestreview-<number>`) into `reviewRecord`, and their GitHub account name into `reviewerGitHub`.
2. **Reviewer uses Google Docs.** Share the final text as a Google Doc. The reviewer leaves a comment like
   "Approved for publication" on it. Copy the link to that comment into `reviewRecord`.
3. **Reviewer replies by email.** Save the reply as a PDF in the shared Drive folder and link it in `reviewRecord`.

For 2 and 3, a link alone can't be checked by a machine, so one more step happens on GitHub: someone other than
the pull request's author opens the link, checks it approves the text in the pull request, and clicks
**Review changes → Approve** with the link pasted in the review text. Copy the link to that review into
`recordConfirmation`.

CI (`npm run check:reviews -- --strict`) then checks with GitHub that the review is on this repository, is an
approval by a person (not a bot) other than the pull request's author, is on a pull request that changes this
article, and, for 1, was left by `reviewerGitHub`; for 2 and 3, that its text contains the `reviewRecord` link.
It also compares the article at the reviewed commit with the final article: if anything other than `status`, the
review fields, `publishOn`, `order` or `featured` changed after the review, the check fails and the final text
needs a new approval. Record the approval in a commit after the review; that's expected and allowed.

What stays a human check: that the Google Doc comment or email really comes from the named reviewer (the
confirmer vouches for it on GitHub), and that the reviewer actually read the text.

Then set `status: approved`, `reviewedBy`, `reviewerRole` and `reviewedOn` (the approval date, on or after the
last edit). The build refuses an approval without all of these, a review dated in the future, a review older
than the last edit, or a review dated after the publish day. Never fill these in for someone who hasn't
approved the final text.

## Add and schedule articles

1. Create the file (copy an existing article, rename it with lowercase words joined by hyphens).
2. Write the article below the second `---`, with `status: draft` and your `author`.
3. When it's ready, set `status: review` and send it to the reviewer (pull request or Google Doc).
4. After approval, record it (above) and set `publishOn` to the day it should go live (Utah date).
   For Monday, Wednesday, Friday: three files with three `publishOn` dates, one pull request.
5. Run `npm run check:articles`. It stops with a clear message if anything is wrong.
6. Open the pull request into `main`. CI runs the checks. Someone authorized merges it before the first date.

## Edit a live article

Change the text and set `updated` to today. A real change to facts or advice needs a new review: record the new
approval (`reviewedOn` on or after `updated`). Fixing a typo doesn't need a new date or review.

## Unpublish or delay

- Delay: move `publishOn` to a later day (works until its current day arrives).
- Take down: set `status: draft`. The page becomes a 404 at the next deploy. Links to it from other articles turn
  into plain text by themselves. If it was live for a while, consider a redirect to the closest article in
  `next.config.mjs` instead.

## Roll back

Every change is a commit. To undo one, revert that commit (`git revert <hash>`) in a pull request and merge it;
the site goes back to the previous version at the next deploy.

## Content rules (the build enforces them)

- No named competitors in public content. Compare business models (agency, distributor, Amazon 1P, aggregator,
  wholesale trade partner), not companies. The private AIEO dashboard may track names.
- Never put internal figures in an article: wholesale % of retail, payment terms, purchase prices, revenue,
  SKU counts. Case studies show approved percentages, never per-unit prices.
- Label estimates and offers as such; only measured results are stated as results.
- Company numbers (countries, marketplaces, founding year) only as already approved on the site.

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

