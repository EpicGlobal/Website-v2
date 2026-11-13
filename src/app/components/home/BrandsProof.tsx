/**
 * Home chapter 02, "Brands we work with": the logo strip, then four compact proof cards in one row (Brex's pick, Nov 5,
 * from four options). Each card has an icon tile, the number and its label; the rating card carries the pop outline,
 * glow and small stars, the section's one pop moment. Every number is real text in the server HTML and counts up once
 * on screen (CountUp). Only facts already on the site are used.
 */
import type { ReactNode } from 'react';
import { Globe2, Star, Store, Users, type LucideIcon } from 'lucide-react';
import { CountUp } from '@/app/components/scroll/ScrollEffects';
import { TrustLogosMarquee, type MarqueeBrand } from '@/app/components/TrustLogosMarquee';
import { ACCENT, BODY, HEAD, INNER } from '@/app/components/story/tokens';
import { CARD, ICON_TILE } from './homeStyles';
import { COUNTRY_COUNT, MARKETPLACE_COUNT } from '@/app/data/markets';

type Brand = MarqueeBrand;

const brandsStat = { value: 50, suffix: '+' };
const countriesStat = { value: COUNTRY_COUNT };
const marketsStat = { value: MARKETPLACE_COUNT };
const ratingStat = { value: 4.9, decimals: 1, suffix: '/5' };

const Num = ({ s }: { s: { value: number; decimals?: number; prefix?: string; suffix?: string } }) => (
  <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
);

export function BrandsProof({ brands, marker, logos = true }: { brands: Brand[]; marker: ReactNode; logos?: boolean }) {
  return <CompactCards brands={brands} marker={marker} logos={logos} />;
}

/* Compact cards */
function CompactCards({ brands, marker, logos }: { brands: Brand[]; marker: ReactNode; logos: boolean }) {
  const stats: { label: string; s: { value: number; decimals?: number; prefix?: string; suffix?: string }; icon: LucideIcon; lit?: boolean }[] = [
    { label: 'Brands we work with', s: brandsStat, icon: Users },
    { label: 'Countries', s: countriesStat, icon: Globe2 },
    { label: 'Marketplaces', s: marketsStat, icon: Store },
    { label: 'Amazon US seller rating (9,600+ ratings)', s: ratingStat, icon: Star, lit: true },
  ];
  return (
    <>
      <div className={INNER}>{marker}</div>
      {logos ? (
        <div className="max-w-6xl mx-auto">
          <TrustLogosMarquee brands={brands} />
        </div>
      ) : null}
      <dl className={`${INNER} ${logos ? 'mt-10' : ''} grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4`}>
        {stats.map(({ label, s, icon: Icon, lit }) => (
          <div
            key={label}
            className={`${CARD} flex flex-col-reverse justify-end p-5 ${lit ? '!shadow-[0_0_0_2px_var(--pop),0_20px_40px_-20px_var(--pop)]' : ''}`}
          >
            <dt className={`text-sm mt-1 leading-snug ${BODY}`}>{label}</dt>
            <dd>
              <span className="flex items-center justify-between mb-3">
                <span aria-hidden="true" className={`${ICON_TILE} !w-9 !h-9 !rounded-lg`}>
                  <Icon className="w-[18px] h-[18px]" />
                </span>
                {lit ? (
                  <span aria-hidden="true" className={`flex gap-0.5 ${ACCENT}`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </span>
                ) : null}
              </span>
              <span className={`block text-3xl sm:text-4xl font-bold tracking-tight tabular-nums ${HEAD}`}>
                <Num s={s} />
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
