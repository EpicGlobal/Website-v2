/**
 * Home chapter 02, "At a glance" (design R1, Brex's pick Nov 13 2026 after Jake's review): the Amazon rating sits in a
 * lime ring in the center and four proof numbers sit around it in cards. The ring fills once as the section scrolls
 * into view. Hovering (or focusing) a card lifts it with the pop glow and opens a longer description. Every number
 * and description is real text in the server HTML.
 *
 * Nov 16: Brex picked option A of three mockups: cards in the four corners, joined to the ring by thin lines; the
 * description opens inside the card.
 *
 * Numbers are the ones already on the site. Jake's totals (ratings, offices, unauthorized sellers removed) replace
 * them in Phase 3, once confirmed.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Globe2, ShieldCheck, Star, Store, Users, type LucideIcon } from 'lucide-react';
import { CountUp } from '@/app/components/scroll/ScrollEffects';
import { TrustLogosMarquee, type MarqueeBrand } from '@/app/components/TrustLogosMarquee';
import { ACCENT, BODY, HEAD } from '@/app/components/story/tokens';
import { CARD, ICON_TILE } from './homeStyles';
import { COUNTRY_COUNT, MARKETPLACE_COUNT } from '@/app/data/markets';

type Brand = MarqueeBrand;

const RATING = 4.9;
const RATING_COUNT = '9,600+';

type Stat = { value: ReactNode; label: string; more: string; icon: LucideIcon; pop?: boolean };
const STATS: Stat[] = [
  {
    value: <CountUp value={50} suffix="+" />,
    label: 'Brands we buy from and sell for',
    more: 'Established brands, typically doing $1M+ a year, in health, beauty, home, auto parts and more. Each sells through Epic as its wholesale partner.',
    icon: Users,
  },
  {
    value: <CountUp value={MARKETPLACE_COUNT} />,
    label: 'Marketplaces where we sell your products',
    more: 'Amazon first, plus Walmart, Target, eBay, TikTok Shop, Temu and international marketplaces. Macy’s, Nordstrom, Lowe’s and Kohl’s are coming in 2027.',
    icon: Store,
  },
  {
    value: <CountUp value={COUNTRY_COUNT} />,
    label: 'Countries your brand can reach through us',
    more: 'Across North America, South America, Europe and Asia-Pacific. We handle the listings, compliance and fulfillment for each market.',
    icon: Globe2,
  },
  {
    value: '8–20',
    label: 'Weeks we typically take to clear unauthorized sellers',
    more: 'We document each violation and report it through your Brand Registry until Amazon acts on it. We always sell at or above your MAP.',
    icon: ShieldCheck,
    pop: true,
  },
];

/**
 * The rating ring. Server HTML draws it full (works with no JS, and with reduced motion). On the client the lime ring
 * is tied to the scroll (Brex, Nov 16): it starts empty as the ring comes up from the bottom of the screen and draws
 * in as you scroll, reaching 4.9/5 when the ring is a little above the middle. Scrolling back up un-draws it.
 */
function RatingRing({ size = 'md' }: { size?: 'md' | 'lg' }) {
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
    <div ref={ref} className={`relative mx-auto ${size === 'lg' ? 'w-64 h-64 sm:w-80 sm:h-80' : 'w-56 h-56 sm:w-64 sm:h-64'}`}>
      <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="100" cy="100" r={R} fill="none" strokeWidth="6" className="stroke-white/10" />
        <circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          stroke="var(--pop)"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - share * progress)}
          opacity={progress > 0.01 ? 1 : 0}
          style={{ transition: 'stroke-dashoffset 120ms linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span aria-hidden="true" className={`flex gap-0.5 mb-1 ${ACCENT}`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </span>
        <span className={`${size === 'lg' ? 'text-6xl sm:text-7xl' : 'text-5xl sm:text-6xl'} font-bold tracking-tight tabular-nums ${HEAD}`}>
          <CountUp value={RATING} decimals={1} />
        </span>
        <span className={`mt-1 text-sm leading-snug ${BODY}`}>
          out of 5 from {RATING_COUNT} ratings
          <br />
          <span aria-hidden="true">Amazon US seller rating</span>
        </span>
      </div>
    </div>
  );
}

/** The lift: bigger than the site's usual hover (scale 1.12 vs a border change), with the pop glow. */
const LIFT =
  'relative transition-[transform,box-shadow] duration-300 ease-out hover:z-20 focus-visible:z-20 lg:hover:scale-[1.12] lg:focus-visible:scale-[1.12] hover:shadow-[0_0_0_2px_var(--pop),0_0_60px_-6px_var(--pop)] focus:shadow-[0_0_0_2px_var(--pop),0_0_60px_-6px_var(--pop)] outline-none';

/** One card: the description opens inside the card on hover or keyboard focus. */
function StatCard({ s, open, className = '' }: { s: Stat; open: 'inline'; className?: string }) {
  const Icon = s.icon;
  return (
    <div tabIndex={0} className={`group flex flex-col ${CARD} ${LIFT} p-5 text-left ${className}`}>
      <span aria-hidden="true" className={`${ICON_TILE} !w-9 !h-9 !rounded-lg mb-3 order-0`}>
        <Icon className="w-[18px] h-[18px]" />
      </span>
      {/* dt first in the HTML (valid list), shown under the number */}
      <dt className={`order-2 mt-1 text-sm font-medium leading-snug ${HEAD}`}>{s.label}</dt>
      <dd className={`order-1 text-3xl sm:text-4xl font-bold tracking-tight tabular-nums ${s.pop ? ACCENT : HEAD}`}>{s.value}</dd>
      {open === 'inline' ? (
        <dd className="order-3 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr] transition-[grid-template-rows] duration-300">
          <span className={`overflow-hidden text-sm leading-relaxed ${BODY}`}>
            <span className="block pt-2">{s.more}</span>
          </span>
        </dd>
      ) : null}
    </div>
  );
}

function Lines() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none">
      <g className="stroke-white/25" strokeWidth="1" vectorEffect="non-scaling-stroke">
        <line x1="30" y1="25" x2="41" y2="38" vectorEffect="non-scaling-stroke" />
        <line x1="70" y1="25" x2="59" y2="38" vectorEffect="non-scaling-stroke" />
        <line x1="30" y1="75" x2="41" y2="62" vectorEffect="non-scaling-stroke" />
        <line x1="70" y1="75" x2="59" y2="62" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

function RingItem({ size }: { size?: 'md' | 'lg' }) {
  return (
    <>
      <dt className="sr-only">Amazon US seller rating</dt>
      <dd>
        <RatingRing size={size} />
      </dd>
    </>
  );
}

/** A: cards in the four corners, thin lines to the ring; the description opens inside the card. */
function Corners() {
  const [a, b, c, d] = STATS;
  return (
    <div className="relative max-w-6xl mx-auto">
      <Lines />
      <dl className="relative grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-[minmax(0,17rem)_1fr_minmax(0,17rem)] lg:grid-rows-2 lg:gap-x-10 lg:gap-y-12 lg:items-start">
        <div className="col-span-2 mb-4 lg:mb-0 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
          <RingItem />
        </div>
        <StatCard s={a} open="inline" className="lg:col-start-1 lg:row-start-1" />
        <StatCard s={b} open="inline" className="lg:col-start-3 lg:row-start-1" />
        <StatCard s={c} open="inline" className="lg:col-start-1 lg:row-start-2" />
        <StatCard s={d} open="inline" className="lg:col-start-3 lg:row-start-2" />
      </dl>
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
    <>
      {/* Even spacing: the gap under the marker (mb-20) matches the gap to How it works (its pt-20). */}
      <div className={`${inner} mb-20`}>{marker}</div>
      {logos ? (
        <div className="max-w-6xl mx-auto mb-10">
          <TrustLogosMarquee brands={brands} />
        </div>
      ) : null}
      <Corners />
    </>
  );
}
