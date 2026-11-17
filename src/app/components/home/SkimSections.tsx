/**
 * Skim-first homepage sections (local test, Nov 5): the comparison table, who we're a fit for, and a short FAQ.
 * Every word is in the server HTML. Facts come only from the live FAQ and Knowledge Base.
 */
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { ACCENT, BODY, HEAD, MUTED, RULE } from '@/app/components/story/tokens';
import { CARD } from './homeStyles';

/** Each cell: good for the brand owner (yes), bad (no), plus a few words. Icon + word, so it never relies on color. */
type Cell = { ok: boolean; text: string };
function Mark({ cell, strong }: { cell: Cell; strong?: boolean }) {
  const Icon = cell.ok ? Check : X;
  return (
    <span className={`inline-flex items-start gap-2 ${strong ? `font-semibold ${HEAD}` : BODY}`}>
      <span
        aria-hidden="true"
        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          cell.ok ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
        }`}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
      {cell.text}
    </span>
  );
}

/** The comparison table used on Home and Our Model. The first column is Epic and gets the soft highlight. */
export function MarkTable({ columns, rows }: { columns: string[]; rows: { q: string; cells: Cell[] }[] }) {
  const EPIC = 'bg-[var(--pop)]/[0.07]';
  return (
    <div className={`overflow-x-auto rounded-2xl border ${RULE}`}>
      <table className={`w-full table-fixed text-left text-sm sm:text-base ${columns.length > 3 ? 'min-w-[48rem]' : 'min-w-[38rem]'}`}>
        {/* Even columns: the question column is a bit wider, every answer column gets the same width. */}
        <colgroup>
          <col className={columns.length > 3 ? 'w-[22%]' : 'w-[28%]'} />
          {columns.map((c) => (
            <col key={c} />
          ))}
        </colgroup>
        <thead>
          <tr className={`border-b ${RULE}`}>
            <th scope="col" className="p-4"><span className="sr-only">Question</span></th>
            {columns.map((c, i) => (
              <th key={c} scope="col" className={`p-4 align-bottom font-semibold ${i === 0 ? `${ACCENT} ${EPIC}` : HEAD}`}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.q} className={`border-b last:border-b-0 ${RULE}`}>
              <th scope="row" className={`p-4 font-medium align-top ${HEAD}`}>{r.q}</th>
              {r.cells.map((cell, i) => (
                <td key={columns[i]} className={`p-4 align-top ${i === 0 ? EPIC : ''}`}><Mark cell={cell} strong={i === 0} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Homepage comparison (Nov 17): what each business model owns and how it earns. Epic's row gets the pop accent. */
const MODELS: { model: string; inventory: string; brand: string; earns: string; epic?: boolean }[] = [
  { model: 'Epic Wholesale Partnership', inventory: 'Epic purchases inventory outright', brand: 'Brand owner retains ownership', earns: 'Wholesale resale margin', epic: true },
  { model: 'Marketplace Agency', inventory: 'Usually owned by the brand', brand: 'Brand owner retains ownership', earns: 'Service or performance fees' },
  { model: 'Traditional Distributor', inventory: 'Purchases inventory for resale', brand: 'Brand owner retains ownership', earns: 'Resale margin' },
  { model: 'Brand Aggregator', inventory: 'Owns inventory within acquired brands', brand: 'Typically acquires the brand', earns: 'Profits and enterprise value of owned brands' },
];

export function CompareTable() {
  const EPIC = 'bg-[var(--pop)]/[0.07]';
  const cols = ['Inventory Ownership', 'Brand Ownership', 'How It Earns'];
  return (
    <div className={`overflow-x-auto rounded-2xl border ${RULE}`}>
      <table className="w-full min-w-[40rem] table-fixed text-left text-sm sm:text-base">
        <caption className="sr-only">How Epic compares to agencies, distributors and aggregators</caption>
        <thead>
          <tr className={`border-b ${RULE}`}>
            <th scope="col" className={`p-4 align-bottom font-semibold ${HEAD}`}>Business Model</th>
            {cols.map((c) => (
              <th key={c} scope="col" className={`p-4 align-bottom font-semibold ${HEAD}`}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MODELS.map((m) => (
            <tr key={m.model} className={`border-b last:border-b-0 ${RULE} ${m.epic ? EPIC : ''}`}>
              <th scope="row" className={`p-4 align-top font-semibold ${m.epic ? ACCENT : HEAD}`}>{m.model}</th>
              {[m.inventory, m.brand, m.earns].map((v, i) => (
                <td key={cols[i]} className={`p-4 align-top ${m.epic ? `font-semibold ${HEAD}` : BODY}`}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FitColumns() {
  const fit = [
    'You are an established brand: typically $1M+ a year in sales',
    'You want Amazon to run as a system, not a side project',
    'You want Epic to purchase your inventory and take responsibility for marketplace advertising, selling fees and fulfillment',
  ];
  const notFit = [
    'You want to keep every operation in-house',
    'You only need à la carte help',
    'You’re a reseller, not the brand owner',
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className={`${CARD} p-6`}>
        <h3 className={`font-semibold mb-4 ${HEAD}`}>A good fit if</h3>
        <ul className="space-y-3">
          {fit.map((t) => (
            <li key={t} className={`flex gap-3 ${BODY}`}>
              <Check className={`w-5 h-5 shrink-0 mt-0.5 ${ACCENT}`} aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${CARD} p-6`}>
        <h3 className={`font-semibold mb-4 ${HEAD}`}>Probably not a fit if</h3>
        <ul className="space-y-3">
          {notFit.map((t) => (
            <li key={t} className={`flex gap-3 ${BODY}`}>
              <X className={`w-5 h-5 shrink-0 mt-0.5 ${MUTED}`} aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <p className={`md:col-span-2 text-sm ${MUTED}`}>
        Smaller or emerging brand? We evaluate opportunities individually based on product demand, marketplace potential
        and the investment required.
      </p>
    </div>
  );
}

/** Short answers to what a brand owner asks first; the full list lives on /faq. Answers trimmed from the FAQ page. */
export const HOME_FAQ = [
  {
    q: 'Will Epic buy my inventory?',
    a: 'Yes. We buy it outright at an agreed wholesale price, pay on agreed terms, and own it from then on. The opening order is usually about 60 to 90 days of stock, then monthly replenishment.',
  },
  {
    q: 'Do you charge retainers or fees?',
    a: 'No retainers, hourly rates or project fees. We earn our margin by selling your inventory at retail, and we pay for the advertising, marketplace fees and fulfillment.',
  },
  {
    q: 'Do we keep our Brand Registry, listings and reviews?',
    a: 'Yes. You keep your Brand Registry and authorize Epic to sell. We sell on your existing product pages, so listings, reviews and rank carry over.',
  },
  {
    q: 'Which marketplaces do you run?',
    a: 'Amazon is our main marketplace: we have sold on Amazon since 2015. We also run Walmart, Target, eBay and select international marketplaces in 42 countries.',
  },
  {
    q: 'Do you sell 1P or 3P on Amazon?',
    a: '3P. We purchase your inventory at agreed wholesale prices and sell it on Amazon as the third-party seller, priced at or above your MAP. In 1P, Amazon buys your stock and sets the price. If you sell 1P to Amazon today, we move you to 3P.',
  },
  {
    q: 'How does Epic make money?',
    a: 'Epic earns its margin by purchasing inventory at wholesale and reselling those products through authorized marketplaces. Under our standard wholesale partnership, Epic funds its advertising, marketplace selling fees and fulfillment rather than charging the brand a recurring agency retainer.',
  },
  {
    q: 'How does Epic handle unauthorized sellers?',
    a: 'Epic monitors unauthorized offers, investigates suspected violations and coordinates documentation and appropriate reporting with the brand. Our typical clearing timeframe is 8–20 weeks, although actual outcomes depend on the evidence, seller circumstances and marketplace policies.',
  },
];

export function HomeFaq() {
  return (
    <div>
      <div className={`divide-y rounded-2xl border ${RULE} [&>details]:border-inherit`}>
        {HOME_FAQ.map((f) => (
          <details key={f.q} className="group px-5 sm:px-6">
            <summary className={`flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-semibold [&::-webkit-details-marker]:hidden ${HEAD}`}>
              <h3 className="text-base sm:text-lg">{f.q}</h3>
              <span aria-hidden="true" className={`text-2xl leading-none transition-transform group-open:rotate-45 ${ACCENT}`}>+</span>
            </summary>
            <p className={`pb-5 -mt-1 max-w-3xl leading-relaxed ${BODY}`}>{f.a}</p>
          </details>
        ))}
      </div>
      <Link href="/faq" className={`inline-block mt-5 text-sm font-semibold ${ACCENT}`}>
        All questions →
      </Link>
    </div>
  );
}
