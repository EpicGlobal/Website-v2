/**
 * Home chapter 02, "At a glance" (design R1, Brex's pick Nov 13 2026 after Jake's review): the Amazon rating sits in a
 * lime ring in the center and four proof numbers sit in the corners, joined to it by thin lines. The ring fills once
 * as the section scrolls into view; every number is real text in the server HTML (CountUp only animates what is
 * already there). Phones: the ring on top, the four numbers in a 2x2 grid below.
 *
 * Numbers are the ones already on the site. Jake's totals (ratings, offices, unauthorized sellers removed) replace
 * them in Phase 3, once confirmed.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Star } from 'lucide-react';
import { CountUp } from '@/app/components/scroll/ScrollEffects';
import { TrustLogosMarquee, type MarqueeBrand } from '@/app/components/TrustLogosMarquee';
import { ACCENT, BODY, HEAD, INNER } from '@/app/components/story/tokens';
import { COUNTRY_COUNT, MARKETPLACE_COUNT } from '@/app/data/markets';

type Brand = MarqueeBrand;

const RATING = 4.9;
const RATING_COUNT = '9,600+';

type Corner = { label: string; value: ReactNode; pop?: boolean };
const CORNERS: Corner[] = [
  { label: 'Brands we work with', value: <CountUp value={50} suffix="+" /> },
  { label: 'Marketplaces', value: <CountUp value={MARKETPLACE_COUNT} /> },
  { label: 'Countries', value: <CountUp value={COUNTRY_COUNT} /> },
  { label: 'Weeks to clear unauthorized sellers', value: '8–20', pop: true },
];

/** The rating ring. Server HTML draws it full (works with no JS); on the client it empties and fills once in view. */
function RatingRing() {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(true);
  const R = 88;
  const C = 2 * Math.PI * R;
  const share = RATING / 5;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8) return; // already on screen: leave it full
    setFilled(false);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        requestAnimationFrame(() => setFilled(true));
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64">
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
          strokeDashoffset={filled ? C * (1 - share) : C}
          style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span aria-hidden="true" className={`flex gap-0.5 mb-1 ${ACCENT}`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </span>
        <span className={`text-5xl sm:text-6xl font-bold tracking-tight tabular-nums ${HEAD}`}>
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

function CornerStat({ c, align, className = '' }: { c: Corner; align: 'left' | 'right'; className?: string }) {
  return (
    <div className={`flex flex-col-reverse justify-end ${align === 'right' ? 'text-right' : ''} ${className}`}>
      <dt className={`mt-1 text-sm leading-snug ${BODY}`}>{c.label}</dt>
      <dd className={`text-3xl sm:text-4xl font-bold tracking-tight tabular-nums ${c.pop ? ACCENT : HEAD}`}>{c.value}</dd>
    </div>
  );
}

export function BrandsProof({ brands, marker, logos = true }: { brands: Brand[]; marker: ReactNode; logos?: boolean }) {
  const [tl, tr, bl, br] = CORNERS;
  return (
    <>
      <div className={INNER}>{marker}</div>
      {logos ? (
        <div className="max-w-6xl mx-auto">
          <TrustLogosMarquee brands={brands} />
        </div>
      ) : null}

      <div className={`max-w-4xl mx-auto relative ${logos ? 'mt-10' : ''}`}>
        {/* Thin lines from each corner to the ring (desktop only; decoration). */}
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none">
          <g className="stroke-white/25" strokeWidth="1">
            <line x1="21" y1="22" x2="39" y2="36" vectorEffect="non-scaling-stroke" />
            <line x1="79" y1="22" x2="61" y2="36" vectorEffect="non-scaling-stroke" />
            <line x1="21" y1="78" x2="39" y2="64" vectorEffect="non-scaling-stroke" />
            <line x1="79" y1="78" x2="61" y2="64" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>

        <dl className="relative grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-2 lg:gap-x-12 lg:gap-y-16 lg:items-center">
          <div className="col-span-2 mb-2 lg:mb-0 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <dt className="sr-only">Amazon US seller rating</dt>
            <dd>
              <RatingRing />
            </dd>
          </div>
          <CornerStat c={tl} align="left" className="lg:col-start-1 lg:row-start-1" />
          <CornerStat c={tr} align="right" className="lg:col-start-3 lg:row-start-1" />
          <CornerStat c={bl} align="left" className="lg:col-start-1 lg:row-start-2" />
          <CornerStat c={br} align="right" className="lg:col-start-3 lg:row-start-2" />
        </dl>
      </div>
    </>
  );
}
