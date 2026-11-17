/**
 * Home chapter 03, "At a glance". Nov 17 2026: rebuilt from the ChatGPT mockup Brex picked. "Epic at a Glance" heading
 * and one line under it; four wide cards (icon on the left, big lime number, a bold word and a short line) joined by
 * thin lines to the lime rating ring in the middle; "Founded in 2014. Selling on Amazon since 2015." between two rules
 * at the bottom. Hovering (or focusing) a card lifts it with the pop glow and opens a longer description.
 * Every number and description is real text in the server HTML.
 *
 * Earlier: design R1 (Nov 13), option A of three (Nov 16): cards in the four corners around the ring.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Boxes, CalendarDays, Globe2, Layers, ShieldCheck, Star, type LucideIcon } from 'lucide-react';
import { CountUp } from '@/app/components/scroll/ScrollEffects';
import { TrustLogosMarquee, type MarqueeBrand } from '@/app/components/TrustLogosMarquee';
import { ACCENT, BODY, H2, HEAD, LEAD, MUTED } from '@/app/components/story/tokens';
import { CARD } from './homeStyles';
import { COUNTRY_COUNT, MARKETPLACE_COUNT } from '@/app/data/markets';

type Brand = MarqueeBrand;

const RATING = 4.8;
// Nov 17 2026 (Brex, from Jake's Seller Central sheet): every Epic Amazon seller account, Univera included.
const RATING_COUNT = '265,000+';

/** word + line read together as the label: "Brands we buy from and sell for". */
type Stat = { value: ReactNode; word: string; line: string; more: string; icon: LucideIcon };
const STATS: Stat[] = [
  {
    value: <CountUp value={50} suffix="+" />,
    word: 'Brands',
    line: 'we buy from and sell for',
    more: 'Established brands, typically doing $1M+ a year, in health, beauty, home, auto parts and more. Each sells through Epic as its wholesale partner.',
    icon: Boxes,
  },
  {
    value: <CountUp value={MARKETPLACE_COUNT} />,
    word: 'Marketplaces',
    line: 'where we sell your products',
    more: 'Amazon first, plus Walmart, Target, eBay, TikTok Shop, Temu and international marketplaces. Macy’s, Nordstrom, Lowe’s and Kohl’s are planned for 2027.',
    icon: Layers,
  },
  {
    value: <CountUp value={COUNTRY_COUNT} />,
    word: 'Countries',
    line: 'your brand can reach through us',
    more: 'Across North America, South America, Europe and Asia-Pacific. We handle the listings, compliance and fulfillment for each market.',
    icon: Globe2,
  },
  {
    value: '8–20',
    word: 'Weeks',
    line: 'we typically take to clear unauthorized sellers',
    more: 'We monitor unauthorized offers, document potential violations and pursue platform-approved enforcement where eligible.',
    icon: ShieldCheck,
  },
];

/** Connector lines: from just outside the ring (r 104) to r 158, at 28 degrees above and below the horizontal. */
const LINES = [-152, -28, 28, 152].map((deg) => {
  const a = (deg * Math.PI) / 180;
  const pt = (r: number) => [+(100 + r * Math.cos(a)).toFixed(1), +(100 + r * Math.sin(a)).toFixed(1)];
  return [...pt(104), ...pt(158)];
});

/**
 * The rating ring. Server HTML draws it full (works with no JS, and with reduced motion). On the client the lime ring
 * is tied to the scroll (Brex, Nov 16): it starts empty as the ring comes up from the bottom of the screen and draws
 * in as you scroll, reaching the rating when the ring is a little above the middle. Scrolling back up un-draws it.
 */
function RatingRing() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(1);
  const R = 88;
  const C = 2 * Math.PI * R;
  const share = RATING / 5;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = r.top + r.height / 2;
      // 0 when the ring's center enters at the bottom of the screen, 1 when it reaches 45% from the top.
      const p = Math.min(1, Math.max(0, (vh - center) / (vh * 0.55)));
      setProgress((prev) => (Math.abs(prev - p) < 0.002 ? prev : p)); // React skips the render when nothing moved
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div ref={ref} className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 lg:w-[21rem] lg:h-[21rem]">
      {/* Soft dark disc behind the ring so the text reads over the lines and background */}
      <div aria-hidden="true" className="absolute inset-[6%] rounded-full bg-black/25 orange:bg-white/40 light:bg-white/60 soft-dark:bg-white/60 leaf:bg-white/40 water:bg-white/40" />
      <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 w-full h-full -rotate-90 overflow-visible">
        <circle cx="100" cy="100" r={R} fill="none" strokeWidth="9" className="stroke-white/10 orange:stroke-[#101828]/10 light:stroke-gray-200" />
        <circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
          stroke="var(--pop)"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - share * progress)}
          opacity={progress > 0.01 ? 1 : 0}
          style={{ transition: 'stroke-dashoffset 120ms linear', filter: 'drop-shadow(0 0 6px var(--pop))' }}
        />
      </svg>
      {/* Thin connector lines from the ring out toward the four cards (wide screens only) */}
      <svg aria-hidden="true" viewBox="0 0 200 200" className="hidden lg:block absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        <g className="stroke-white/25 orange:stroke-[#101828]/25 light:stroke-gray-300" strokeWidth="1">
          {LINES.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
        <span aria-hidden="true" className={`flex gap-1 mb-3 ${ACCENT}`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="w-5 h-5 lg:w-6 lg:h-6 fill-current" />
          ))}
        </span>
        <span className={`text-5xl sm:text-6xl font-bold tracking-tight tabular-nums whitespace-nowrap ${HEAD}`}>
          <CountUp value={RATING} decimals={1} /> / 5
        </span>
        <span className={`mt-3 text-sm sm:text-base leading-snug ${BODY}`}>
          from {RATING_COUNT}
          <br />
          Amazon seller ratings
        </span>
      </div>
    </div>
  );
}

/** Lift on hover/focus with the pop glow; at rest a soft lime glow along the bottom edge (the mockup's look). */
const CARD_FX =
  'relative overflow-hidden transition-[transform,box-shadow] duration-300 ease-out outline-none hover:z-20 focus-visible:z-20 lg:hover:-translate-y-1 lg:focus-visible:-translate-y-1 hover:shadow-[0_0_0_2px_var(--pop),0_0_48px_-8px_var(--pop)] focus:shadow-[0_0_0_2px_var(--pop),0_0_48px_-8px_var(--pop)]';

/** One card: icon on the left; number, word and line on the right. The longer description opens on hover/focus. */
function StatCard({ s, className = '' }: { s: Stat; className?: string }) {
  const Icon = s.icon;
  return (
    <div tabIndex={0} className={`group flex items-start gap-5 ${CARD} ${CARD_FX} p-6 sm:p-7 text-left ${className}`}>
      {/* the lime line on the bottom edge, brightest at the left like the mockup */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--pop)]/[0.09] to-transparent" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[var(--pop)]/80 via-[var(--pop)]/35 to-[var(--pop)]/5" />
      <span aria-hidden="true" className="pointer-events-none absolute left-0 inset-y-0 w-0.5 bg-gradient-to-t from-[var(--pop)]/60 via-[var(--pop)]/10 to-transparent" />
      <span aria-hidden="true" className={`shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-white/10 orange:bg-[#101828]/[0.06] light:bg-gray-100 soft-dark:bg-gray-100 leaf:bg-white water:bg-white ${HEAD}`}>
        <Icon className="w-7 h-7" strokeWidth={1.75} />
      </span>
      <div className="flex min-w-0 flex-col">
        {/* dt first in the HTML (valid list), shown under the number */}
        <dt className="order-2 mt-2">
          <span className={`block text-lg sm:text-xl font-bold leading-tight ${HEAD}`}>{s.word}</span>{' '}
          <span className={`block mt-1 text-sm sm:text-base leading-snug ${BODY}`}>{s.line}</span>
        </dt>
        <dd className={`order-1 text-4xl sm:text-5xl font-bold tracking-tight leading-none tabular-nums ${ACCENT}`}>{s.value}</dd>
        <dd className="order-3 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
          <span className={`overflow-hidden text-sm leading-relaxed ${MUTED}`}>
            <span className="block pt-3">{s.more}</span>
          </span>
        </dd>
      </div>
    </div>
  );
}

function RingItem() {
  return (
    <>
      <dt className="sr-only">Amazon seller rating across all Epic stores</dt>
      <dd>
        <RatingRing />
      </dd>
    </>
  );
}

/** Cards in the four corners, the ring in the middle. Phones: ring on top, cards stacked; tablets: two columns. */
function Corners() {
  const [a, b, c, d] = STATS;
  return (
    <div className="relative">
      <dl className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)_minmax(0,1fr)] lg:grid-rows-2 lg:gap-x-20 lg:gap-y-10 lg:items-stretch">
        <div className="mb-6 sm:col-span-2 lg:mb-0 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
          <RingItem />
        </div>
        <StatCard s={a} className="lg:col-start-1 lg:row-start-1" />
        <StatCard s={b} className="lg:col-start-3 lg:row-start-1" />
        <StatCard s={c} className="lg:col-start-1 lg:row-start-2" />
        <StatCard s={d} className="lg:col-start-3 lg:row-start-2" />
      </dl>
    </div>
  );
}

/** "Founded in 2014. Selling on Amazon since 2015." between two thin rules. */
function Founded() {
  return (
    <div className="mt-14 flex items-center justify-center gap-4 sm:gap-6">
      <span aria-hidden="true" className="hidden lg:block h-px w-40 bg-gradient-to-r from-transparent to-white/25 orange:to-[#101828]/25 light:to-gray-300" />
      <p className={`flex items-center justify-center gap-3 text-center text-base sm:text-lg ${HEAD}`}>
        <CalendarDays className={`w-6 h-6 shrink-0 ${ACCENT}`} aria-hidden="true" />
        Founded in 2014. Selling on Amazon since 2015.
      </p>
      <span aria-hidden="true" className="hidden lg:block h-px w-40 bg-gradient-to-l from-transparent to-white/25 orange:to-[#101828]/25 light:to-gray-300" />
    </div>
  );
}

export function BrandsProof({
  brands,
  marker,
  logos = true,
  inner = 'max-w-7xl mx-auto',
}: {
  brands: Brand[];
  marker: ReactNode;
  logos?: boolean;
  inner?: string;
}) {
  return (
    <div className={inner}>
      {marker}
      <h2 className={`${H2} mb-3`}>Epic at a Glance</h2>
      <p className={`${LEAD} mb-12 lg:mb-14`}>A proven wholesale partner for global marketplace growth.</p>
      {logos ? (
        <div className="mb-10">
          <TrustLogosMarquee brands={brands} />
        </div>
      ) : null}
      <Corners />
      <Founded />
    </div>
  );
}
