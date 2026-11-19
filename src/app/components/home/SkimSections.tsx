/**
 * Skim-first homepage sections (local test, Nov 5): the comparison table, who we're a fit for, and a short FAQ.
 * Every word is in the server HTML. Facts come only from the live FAQ and Knowledge Base.
 */
import Link from 'next/link';
import { Check, Minus, X } from 'lucide-react';
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

/**
 * Homepage comparison, section 05 (Nov 17, second pass): check / X / "varies" signals instead of a text grid, so it
 * scans fast. Wide screens: one row per question, a column per model, Epic's column tinted lime. Below lg the same
 * markup stacks into one card per question with the model name beside each answer, so nothing scrolls sideways.
 * ARIA table roles keep it a table for screen readers in both layouts.
 */
/** 'vary' is the yellow "varies" signal, the same on Home and Our Model (Nov 19); 'some' is the older grey one. */
export type Sig = 'yes' | 'no' | 'some' | 'vary' | 'text';
export type Ans = { sig: Sig; text: string };
export type CompareRow = { q: string; a: Ans[] };
const MODEL_COLS = [
  { name: 'Epic', sub: 'Wholesale partner' },
  { name: 'Agency', sub: 'Marketplace agency' },
  { name: 'Distributor', sub: 'Traditional distributor' },
  { name: 'Aggregator', sub: 'Brand aggregator' },
];
const COMPARE: CompareRow[] = [
  {
    q: 'Buys your inventory',
    a: [{ sig: 'yes', text: 'Outright, at wholesale' }, { sig: 'no', text: 'Usually not' }, { sig: 'yes', text: 'For resale' }, { sig: 'some', text: 'Acquires the whole brand' }],
  },
  {
    q: 'Funds ads, fees and fulfillment',
    a: [{ sig: 'yes', text: 'Yes' }, { sig: 'no', text: 'Usually not' }, { sig: 'some', text: 'Varies' }, { sig: 'some', text: 'As the new owner' }],
  },
  {
    q: 'Runs marketplace operations',
    a: [{ sig: 'yes', text: 'Yes' }, { sig: 'some', text: 'For a fee' }, { sig: 'some', text: 'Sometimes' }, { sig: 'some', text: 'As the brand owner' }],
  },
  {
    q: 'You keep your brand',
    a: [{ sig: 'yes', text: 'Yes' }, { sig: 'yes', text: 'Yes' }, { sig: 'yes', text: 'Yes' }, { sig: 'no', text: 'Typically acquires it' }],
  },
  {
    q: 'How it earns',
    a: [{ sig: 'text', text: 'Wholesale resale margin' }, { sig: 'text', text: 'Service or performance fees' }, { sig: 'text', text: 'Resale margin' }, { sig: 'text', text: 'Profits of the brands it owns' }],
  },
];

function Signal({ ans, epic }: { ans: Ans; epic?: boolean }) {
  const tone = epic ? `font-semibold ${HEAD}` : BODY;
  if (ans.sig === 'text') return <span className={`text-sm sm:text-base leading-snug ${tone}`}>{ans.text}</span>;
  const Icon = ans.sig === 'yes' ? Check : ans.sig === 'no' ? X : Minus;
  const dot =
    ans.sig === 'yes'
      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
      : ans.sig === 'no'
        ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
        : ans.sig === 'vary'
          ? 'bg-amber-400/15 text-amber-600 dark:text-amber-300'
          : 'bg-white/10 text-gray-400 light:bg-gray-100 light:text-gray-500 orange:bg-[#101828]/10 orange:text-[#101828]/60';
  return (
    <span className={`inline-flex items-start gap-2 text-sm sm:text-base leading-snug ${tone}`}>
      <span aria-hidden="true" className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${dot}`}>
        <Icon className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
      {ans.text}
    </span>
  );
}

export function CompareTable({
  columns = MODEL_COLS,
  rows = COMPARE,
  label = 'How Epic compares to agencies, distributors and aggregators',
}: { columns?: { name: string; sub: string }[]; rows?: CompareRow[]; label?: string } = {}) {
  const GRID = 'lg:grid lg:grid-cols-[minmax(0,1.2fr)_repeat(4,minmax(0,1fr))]';
  const EPIC = 'bg-[var(--pop)]/[0.08]';
  return (
    <div className="relative">
      {/* Decorative: a faint cyan glow behind the panel */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -inset-y-10 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.10),transparent_65%)] orange:hidden light:hidden" />
      <div role="table" aria-label={label} className={`relative overflow-hidden rounded-2xl border ${RULE} bg-white/[0.03] light:bg-white orange:bg-white/60`}>
        <div role="rowgroup" className="hidden lg:block">
          <div role="row" className={`${GRID} border-b ${RULE}`}>
            <span role="columnheader" className="p-5"><span className="sr-only">Question</span></span>
            {columns.map((m, i) => (
              <span key={m.name} role="columnheader" className={`p-5 ${i === 0 ? EPIC : ''}`}>
                <span className={`block text-lg font-bold ${i === 0 ? ACCENT : HEAD}`}>{m.name}</span>
                <span className={`block text-xs font-medium uppercase tracking-[0.12em] ${MUTED}`}>{m.sub}</span>
              </span>
            ))}
          </div>
        </div>
        <div role="rowgroup">
          {rows.map((r) => (
            <div key={r.q} role="row" className={`${GRID} border-b last:border-b-0 ${RULE}`}>
              <span role="rowheader" className={`block px-5 pt-5 pb-3 lg:p-5 font-semibold ${HEAD}`}>{r.q}</span>
              {r.a.map((ans, i) => (
                <span
                  key={columns[i].name}
                  role="cell"
                  className={`grid grid-cols-[7rem_minmax(0,1fr)] gap-3 px-5 py-2 last:pb-5 lg:block lg:p-5 ${i === 0 ? EPIC : ''}`}
                >
                  {/* model name beside the answer on smaller screens; the column header does this job on wide screens */}
                  <span className={`text-sm font-semibold lg:hidden ${i === 0 ? ACCENT : MUTED}`}>{columns[i].name}</span>
                  <Signal ans={ans} epic={i === 0} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
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
