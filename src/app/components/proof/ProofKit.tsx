'use client';

/**
 * Proof-page stat cards (Tier 2).
 * - MetricValue: renders a stat string such as "+159%" or "-2.9%" exactly as written in the server HTML, and counts
 *   up to it once it scrolls into view. Strings that aren't a plain number (e.g. "6/6") render as they are.
 *   The count-up is the same behavior as CountUp in scroll/ScrollEffects.tsx, copied here so proof pages don't pull
 *   framer-motion (that module's other effects) into their first load.
 * - ProofMetrics: a row of stat cards; each card's small bar is the section's one pop moment.
 */
import { useEffect, useRef } from 'react';
import { ACCENT_BG, HEAD, MUTED } from '@/app/components/story/tokens';
import { CARD } from './proofTokens';

const NUMBER = /^([+-]?)(\d+(?:\.\d+)?)(%|\s\w+)?$/;

function CountUp({ value, decimals, prefix, suffix }: { value: number; decimals: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`;
  useEffect(() => {
    const el = ref.current;
    // Already on screen at load (or no observer support): keep the real number, no animation.
    if (!el || el.getBoundingClientRect().top < window.innerHeight || !('IntersectionObserver' in window)) return;
    el.textContent = format(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1200);
          el.textContent = format(value * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = format(value);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals, prefix, suffix]);
  return <span ref={ref} className="tabular-nums">{format(value)}</span>;
}

export function MetricValue({ value }: { value: string }) {
  const m = NUMBER.exec(value);
  if (!m) return <span className="tabular-nums">{value}</span>;
  const [, sign, num, suffix = ''] = m;
  const decimals = num.includes('.') ? num.split('.')[1].length : 0;
  return <CountUp value={Number(num)} decimals={decimals} prefix={sign} suffix={suffix} />;
}

export function ProofMetrics({ metrics }: { metrics: readonly { label: string; value: string; subtext: string }[] }) {
  return (
    <dl className={`grid grid-cols-2 gap-4 ${metrics.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
      {metrics.map((metric, i) => (
        // Two metrics can share a label (e.g. the same measure for two products), so the key adds the position.
        <div key={`${i}-${metric.label}`} className={`${CARD} p-5 flex flex-col`}>
          <dt className={`order-2 text-sm font-medium mt-2 ${HEAD}`}>{metric.label}</dt>
          <dd className="order-1">
            <span aria-hidden="true" className={`block h-[3px] w-10 mb-4 rounded-full ${ACCENT_BG}`} />
            <span className={`block text-3xl sm:text-4xl font-bold tracking-tight ${HEAD}`}>
              <MetricValue value={metric.value} />
            </span>
          </dd>
          <dd className={`order-3 text-xs mt-1 ${MUTED}`}>{metric.subtext}</dd>
        </div>
      ))}
    </dl>
  );
}
