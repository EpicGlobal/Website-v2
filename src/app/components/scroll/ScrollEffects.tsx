'use client';

/**
 * Scroll effects for the website (preview). Every effect keeps all text in the server HTML, so crawlers read the
 * page exactly as before. Phones, short screens and visitors who ask for reduced motion get the plain static layout.
 * Colors come from the theme's pop color (--pop in src/styles/theme.css).
 */
import React, { Children, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';

/** True on a desktop-sized screen (and tall enough to pin a section), with motion allowed. Starts false so the
 * server HTML and first paint are the static layout. */
function useScrollEffectsEnabled(minHeight = 0) {
  const reduce = useReducedMotion();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const check = () => setOk(mq.matches && window.innerHeight >= minHeight);
    check();
    mq.addEventListener('change', check);
    window.addEventListener('resize', check);
    return () => {
      mq.removeEventListener('change', check);
      window.removeEventListener('resize', check);
    };
  }, [minHeight]);
  const on = ok && !reduce;
  useEffect(() => {
    // Pinned sections change the page height; ask every scroll tracker to measure again.
    if (!on) return;
    const id = requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    return () => cancelAnimationFrame(id);
  }, [on]);
  return on;
}

/** Scroll progress (0-1) measured straight from the element's position on screen.
 * pinned: 0 when the element's top reaches the top of the screen, 1 when its bottom reaches the bottom.
 * enter: 0 when its top is at `from` of the screen height, 1 when it's at `to`. */
function useElementProgress(ref: React.RefObject<HTMLElement | null>, mode: 'pinned' | { from: number; to: number }) {
  const progress = useMotionValue(0);
  const { scrollY } = useScroll();
  const update = () => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    let v: number;
    if (mode === 'pinned') {
      const total = r.height - vh;
      v = total > 0 ? -r.top / total : 0;
    } else {
      v = (mode.from * vh - r.top) / ((mode.from - mode.to) * vh);
    }
    progress.set(Math.min(1, Math.max(0, v)));
  };
  useMotionValueEvent(scrollY, 'change', update);
  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  });
  return progress;
}


/** Pins `content` inside `wrapper`, centered on screen (below the nav), and sized to the content, so no empty
 * screen-height space is left above or below it. Returns the progress (0-1) through the pinned scroll, the sticky
 * top offset and the content height. */
const NAV_SPACE = 96;
function usePinnedProgress(wrapper: React.RefObject<HTMLElement | null>, content: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const progress = useMotionValue(0);
  const [box, setBox] = useState({ top: NAV_SPACE, height: 0 });
  const { scrollY } = useScroll();
  const update = () => {
    const w = wrapper.current;
    const c = content.current;
    if (!w || !c) return;
    const h = c.offsetHeight;
    const top = Math.max(NAV_SPACE, (window.innerHeight - h) / 2);
    if (h !== box.height || top !== box.top) setBox({ top, height: h });
    const r = w.getBoundingClientRect();
    const total = r.height - h;
    progress.set(total > 0 ? Math.min(1, Math.max(0, (top - r.top) / total)) : 0);
  };
  useMotionValueEvent(scrollY, 'change', update);
  useEffect(() => {
    if (!enabled) return;
    update();
    const ro = new ResizeObserver(update);
    if (content.current) ro.observe(content.current);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  });
  return { progress, top: box.top, height: box.height };
}

/* 1. Scroll highlight: the section pins and each scroll step lights up the next card. */
export function ScrollHighlightSteps({ header, cards, footer }: { header: ReactNode; cards: ReactNode[]; footer?: ReactNode }) {
  const enabled = useScrollEffectsEnabled(760);
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const { progress: scrollYProgress, top, height } = usePinnedProgress(ref, inner, enabled);
  const [active, setActive] = useState(0);
  const bar = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(cards.length - 1, Math.floor(v * cards.length * 0.999))));

  if (!enabled) {
    return (
      <div>
        {header}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">{cards}</div>
        {footer}
      </div>
    );
  }
  return (
    <div ref={ref} style={{ height: `calc(${height}px + ${cards.length * 45}vh)` }} className="relative">
      <div ref={inner} style={{ top }} className="sticky flex flex-col">
        {header}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {Children.map(cards, (card, i) => (
            <div
              data-active={i === active}
              className="rounded-2xl transition-all duration-500 ease-out data-[active=true]:-translate-y-2 data-[active=true]:shadow-[0_0_0_2px_var(--pop),0_20px_40px_-20px_var(--pop)] data-[active=false]:opacity-60"
            >
              {card}
            </div>
          ))}
        </div>
        <div className="mx-auto h-1 w-64 overflow-hidden rounded-full bg-black/10 dark:bg-white/10" aria-hidden="true">
          <motion.div className="h-full origin-left rounded-full bg-[var(--pop)]" style={{ scaleX: bar }} />
        </div>
        {footer ? <div className="mt-8">{footer}</div> : null}
      </div>
    </div>
  );
}

/* 2. Word reveal: words go from faint to full as the heading scrolls into view. */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

export function WordReveal({ lines, className }: { lines: string[]; className?: string }) {
  const enabled = useScrollEffectsEnabled();
  const ref = useRef<HTMLHeadingElement>(null);
  const scrollYProgress = useElementProgress(ref, { from: 0.95, to: 0.45 });
  const words = lines.map((l) => l.split(' '));
  const total = words.flat().length;
  let n = 0;
  return (
    <h2 ref={ref} className={className}>
      {words.map((line, li) => (
        <span key={li} className="block">
          {line.map((w, wi) => {
            const i = n++;
            const text = wi < line.length - 1 ? `${w} ` : w;
            return enabled ? (
              <Word key={wi} progress={scrollYProgress} range={[i / total, (i + 1) / total]}>{text}</Word>
            ) : (
              <span key={wi}>{text}</span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}

/* 3. Horizontal gallery: the section pins and scrolling down slides the cards sideways. */
export function HorizontalGallery({ header, children, staticClassName }: { header?: ReactNode; children: ReactNode[]; staticClassName: string }) {
  const enabled = useScrollEffectsEnabled(700);
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { progress: scrollYProgress, top, height } = usePinnedProgress(ref, inner, enabled);
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  useEffect(() => {
    if (!enabled || !track.current) return;
    const measure = () => setDistance(Math.max(0, track.current!.scrollWidth - track.current!.parentElement!.clientWidth));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [enabled]);

  if (!enabled) return <div>{header}<div className={staticClassName}>{children}</div></div>;
  return (
    // Scroll distance equals the sideways distance, so the cards move at the same speed as the page.
    <div ref={ref} style={{ height: height + distance }} className="relative">
      <div ref={inner} style={{ top }} className="sticky flex flex-col overflow-hidden">
        {header}
        <motion.div ref={track} style={{ x }} className="flex gap-6 will-change-transform">
          {Children.map(children, (c) => <div className="w-[340px] shrink-0">{c}</div>)}
        </motion.div>
      </div>
    </div>
  );
}

/* 4. Reading progress ring: a small circle in the corner that fills as you read. */
export function ReadingProgressRing() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [done, setDone] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setDone(v > 0.98));
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block print:hidden" aria-hidden="true">
      <svg width="48" height="48" viewBox="0 0 48 48" className="-rotate-90 drop-shadow">
        <circle cx="24" cy="24" r="20" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <motion.circle cx="24" cy="24" r="20" fill="none" stroke="var(--pop)" strokeWidth="4" strokeLinecap="round" style={{ pathLength: progress }} />
      </svg>
      {done ? <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[var(--pop)]">✓</span> : null}
    </div>
  );
}
