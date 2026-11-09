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
const rows: { q: string; epic: Cell; agency: Cell; aggregator: Cell }[] = [
  { q: 'Buys your inventory upfront', epic: { ok: true, text: 'Yes' }, agency: { ok: false, text: 'No' }, aggregator: { ok: false, text: 'Buys your whole company' } },
  { q: 'Pays for ads, fees and fulfillment', epic: { ok: true, text: 'Yes' }, agency: { ok: false, text: 'No, you do' }, aggregator: { ok: true, text: 'Yes' } },
  { q: 'No retainers or % of ad spend', epic: { ok: true, text: 'Yes' }, agency: { ok: false, text: 'Usually charges' }, aggregator: { ok: true, text: 'Yes' } },
  { q: 'You keep your brand', epic: { ok: true, text: 'Yes' }, agency: { ok: true, text: 'Yes' }, aggregator: { ok: false, text: 'No, they own it' } },
  { q: 'Paid only when your products sell', epic: { ok: true, text: 'Yes' }, agency: { ok: false, text: 'No, fees either way' }, aggregator: { ok: false, text: 'No, a one-time buyout' } },
];

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
      <table className={`w-full text-left text-sm sm:text-base ${columns.length > 3 ? 'min-w-[48rem]' : 'min-w-[38rem]'}`}>
        <thead>
          <tr className={`border-b ${RULE}`}>
            <th scope="col" className="p-4"><span className="sr-only">Question</span></th>
            {columns.map((c, i) => (
              <th key={c} scope="col" className={`p-4 font-semibold ${i === 0 ? `${ACCENT} ${EPIC}` : HEAD}`}>{c}</th>
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

export function CompareTable() {
  return (
    <MarkTable
      columns={['Epic', 'Agency', 'Aggregator']}
      rows={rows.map((r) => ({ q: r.q, cells: [r.epic, r.agency, r.aggregator] }))}
    />
  );
}

export function FitColumns() {
  const fit = [
    'You already have demand: typically $50K+ a month',
    'You want Amazon to run as a system, not a side project',
    'You would rather sell at wholesale than fund ads and fees',
  ];
  const notFit = [
    'You are still early and experimenting',
    'You want to keep every operation in-house',
    'You only need à la carte help',
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
    </div>
  );
}

/** Short answers to what a brand owner asks first; the full list lives on /faq. Answers trimmed from the FAQ page. */
export const HOME_FAQ = [
  {
    q: 'Will Epic buy my inventory?',
    a: 'Yes. We buy it upfront at an agreed wholesale price and own it from then on. The opening order is usually about 60 to 90 days of stock, then monthly replenishment.',
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
    a: 'Amazon is our main marketplace: we have sold on Amazon since 2015. We also run Walmart, eBay and select international marketplaces in 40 countries.',
  },
  {
    q: 'Who sets the retail price?',
    a: 'Epic sets it on the marketplaces we run, at or above your minimum advertised price (MAP), and we enforce MAP against other sellers.',
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
