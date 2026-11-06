'use client';

import { useRef } from 'react';
import Link from 'next/link';
import {
  Activity, ArrowDown, ArrowRight, Check, LayoutGrid, LineChart, RefreshCw, Shield, TrendingUp, UserRound, Users, Zap,
  type LucideIcon,
} from 'lucide-react';
import { MarkTable } from '@/app/components/home/SkimSections';
import { CARD, ICON_TILE } from '@/app/components/home/homeStyles';
import { StructuredData, getBreadcrumbSchema, getWebPageSchema } from '@/app/components/StructuredData';
import { CtaButton } from '@/app/components/CtaButton';
import { useScrollStory, type StoryExtra } from '@/app/components/story/useScrollStory';
import { ChapterMarker as KitChapterMarker, ChapterRail, PopLink } from '@/app/components/story/StoryKit';
import { ACCENT, BODY, CARD_HOVER, CHAPTER, H1, H2, H3, HEAD, INNER, LEAD, MUTED, PAGE_BG, QUIET_BUTTON } from '@/app/components/story/tokens';
import '@/app/components/story/story.css';
import { siteConfig } from '@/site/site-config';

/*
 * AI Intelligence page, redesigned Nov 6 (Brex) in five chapters: the claim beside a "what the system does" panel
 * (laid out like the homepage and Our Model heroes), the gap brands face (2x2 cards), how the system works (signals in,
 * Epic's three systems, actions out; the one lit moment), the old way vs Epic (the same check / X table as Home), and
 * the next step, which carries the old point-of-view line. Plain claims only, no hype, no made-up numbers.
 */

const CHAPTERS = [
  { id: 'intelligence-layer', label: 'The Epic intelligence layer' },
  { id: 'the-gap', label: 'The gap' },
  { id: 'how-it-works', label: 'How the system works' },
  { id: 'the-shift', label: 'The old way vs Epic' },
  { id: 'next', label: 'Next step' },
] as const;

function ChapterMarker({ n }: { n: number }) {
  return <KitChapterMarker n={n} label={CHAPTERS[n - 1].label} />;
}

/** Hero panel: the kinds of tasks the systems run (an illustration, no figures). The first one is lit. */
const SYSTEM_TASKS: { icon: LucideIcon; title: string; detail: string }[] = [
  { icon: Zap, title: 'Price checked on Amazon', detail: 'Kept within your MAP' },
  { icon: Shield, title: 'Unauthorized seller flagged', detail: 'Removal started' },
  { icon: TrendingUp, title: 'Demand shift spotted', detail: 'Stock moved to where it sells' },
  { icon: LayoutGrid, title: 'Listing updated on every marketplace', detail: 'One change, all channels' },
];

const gap: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: LayoutGrid, title: 'Every marketplace works differently', description: 'Listings, ads, inventory and rules differ on each one.' },
  { icon: RefreshCw, title: 'Prices and sellers change daily', description: 'Competitors reprice and unauthorized sellers appear faster than weekly meetings can react.' },
  { icon: LineChart, title: 'Reporting takes real data work', description: 'One view across marketplaces and countries needs data engineering, not spreadsheets.' },
  { icon: Users, title: 'Tools still need a team', description: 'Most software needs people to run it. Epic runs the system for you.' },
];

/** The three systems, one plain line each: what the software does, not how impressive it is. */
const intelligencePillars = [
  { icon: TrendingUp, title: 'Demand forecasting', description: 'Forecasts demand by marketplace and region, so stock sits where it sells.' },
  { icon: Zap, title: 'Pricing, listings and ads', description: 'Adjusts prices, listings and ad spend across marketplaces as conditions change.' },
  { icon: Shield, title: 'Brand protection', description: 'Spots unauthorized sellers, price violations and hijacked listings early, so we act fast.' },
];

const SIGNALS = ['Prices and Buy Box', 'Sales and demand', 'New sellers', 'Ads and rankings'];
const ACTIONS = ['Reprice within MAP', 'Move stock', 'Adjust ads', 'Remove sellers'];

const SHIFT = [
  { q: 'Channel management', epic: 'One system updates every marketplace', old: 'Manual updates, one platform at a time' },
  { q: 'Pricing', epic: 'Watched every day, kept within your MAP', old: 'Reviewed every quarter by a team' },
  { q: 'Brand protection', epic: 'Daily monitoring, fast enforcement', old: 'Monthly audits, after the damage' },
  { q: 'Inventory', epic: 'Forecasts place stock before demand shifts', old: "Last year's data and gut feel" },
];

const CHIP = `${CARD} flex items-center gap-3 px-4 py-3 text-sm ${BODY}`;

function FlowColumn({ title, items, icon: Icon, step }: { title: string; items: string[]; icon: LucideIcon; step: 'in' | 'out' }) {
  return (
    <div>
      <h3 className={`text-xs font-bold uppercase tracking-[0.16em] mb-3 ${MUTED}`}>{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} data-flow={step} className={CHIP}>
            <Icon aria-hidden="true" className={`w-4 h-4 shrink-0 ${MUTED}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowArrow() {
  return (
    <div aria-hidden="true" data-flow="arrow" className={`flex justify-center ${MUTED}`}>
      <ArrowDown className="w-5 h-5 lg:hidden" />
      <ArrowRight className="w-5 h-5 hidden lg:block" />
    </div>
  );
}

/**
 * One beat for this page (desktop only, via useScrollStory): when "How it works" comes into view, the flow lights up
 * in order (signals, then Epic's three systems, then actions), once. No pin, no scrub. Everything is fully visible in
 * the HTML and on phones; GSAP only starts from a dimmed state after it loads.
 */
const intelBeats: StoryExtra = (gsap, _ScrollTrigger, root) => {
  const flow = root.querySelector<HTMLElement>('[data-story="flow"]');
  if (!flow) return;
  const q = (sel: string) => Array.from(flow.querySelectorAll<HTMLElement>(sel));
  const [toCore, toActions] = q('[data-flow="arrow"]');
  gsap
    .timeline({ defaults: { ease: 'power2.out' }, scrollTrigger: { trigger: flow, start: 'top 70%', once: true } })
    .from(q('[data-flow="in"]'), { opacity: 0.2, x: -16, duration: 0.45, stagger: 0.08 })
    .from(toCore, { opacity: 0, x: -8, duration: 0.3 }, '-=0.1')
    .from(q('[data-flow="core"]'), { opacity: 0.25, scale: 0.96, duration: 0.6 }, '-=0.05')
    .from(toActions, { opacity: 0, x: -8, duration: 0.3 }, '-=0.15')
    .from(q('[data-flow="out"]'), { opacity: 0.2, x: -16, duration: 0.45, stagger: 0.08 }, '-=0.05');
};

export function Intelligence() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollStory(rootRef, intelBeats);

  return (
    <div ref={rootRef} className={PAGE_BG}>
      <StructuredData data={getWebPageSchema({
        name: 'The Epic Intelligence Layer',
        url: `${siteConfig.url}/intelligence`,
        description: "Epic Global Inc. runs brands' marketplace operations, Amazon first, with its own software for demand forecasting, pricing, inventory placement and brand protection.",
        mainEntity: {
          '@type': 'Thing',
          name: 'Epic Intelligence Layer',
          description: 'Software Epic Global Inc. runs for demand forecasting, pricing, listings, ads and brand protection across Amazon, Walmart and international marketplaces.',
        },
      })} />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: `${siteConfig.url}/` },
          { name: 'AI Intelligence', url: `${siteConfig.url}/intelligence` },
        ])}
      />

      <ChapterRail chapters={CHAPTERS} label="AI Intelligence page chapters" />

      {/* 01 The claim, answer first, beside an illustration of what the system does day to day. */}
      <section id="intelligence-layer" data-chapter className="scroll-mt-20 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className={INNER}>
          <ChapterMarker n={1} />
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14 lg:items-center">
            <div>
              <h1 className={`${H1} mb-8`}>Marketplace commerce is becoming machine-run.</h1>
              <p className={`${LEAD} mb-5`}>
                Epic Global Inc. runs brands&apos; marketplace operations, Amazon first, plus Walmart and international marketplaces, with its own software for demand forecasting, pricing, inventory placement and brand protection, so brands grow without building that system themselves.
              </p>
              <p className={`text-lg leading-relaxed ${MUTED}`}>
                Where others add people to manage more complexity, Epic adds systems, and keeps its people on the decisions that need operator judgment.
              </p>
            </div>
            <figure className={`${CARD} p-5 sm:p-6`}>
              <div className="flex items-center justify-between gap-4 mb-2">
                <p className={`font-semibold ${HEAD}`}>What the system does</p>
                <p className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] ${ACCENT}`}>
                  <span aria-hidden="true" className="w-2 h-2 rounded-full bg-current shadow-[0_0_10px_currentColor]" />
                  Runs daily
                </p>
              </div>
              <ul>
                {SYSTEM_TASKS.map(({ icon: Icon, title, detail }, i) => (
                  <li key={title} className="flex items-start gap-3 py-3 border-t border-current/10">
                    <span
                      aria-hidden="true"
                      className={`${ICON_TILE} !w-8 !h-8 !rounded-lg shrink-0 ${i === 0 ? '!bg-[var(--pop)] !text-[var(--on-pop)]' : ''}`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span>
                      <span className={`block font-semibold text-[15px] ${HEAD}`}>{title}</span>
                      <span className={`block text-sm mt-0.5 ${MUTED}`}>{detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <figcaption className={`text-xs mt-2 ${MUTED}`}>Examples of the tasks Epic&apos;s systems run.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 02 The gap: four pressures as cards. */}
      <section id="the-gap" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={2} />
          <h2 className={`${H2} mb-8`}>Why brands can&apos;t keep up</h2>
          <div data-story="rise" className="grid sm:grid-cols-2 gap-4">
            {gap.map(({ icon: Icon, title, description }) => (
              <div key={title} className={`${CARD} ${CARD_HOVER} p-6`}>
                <span className={`${ICON_TILE} mb-5`}>
                  <Icon aria-hidden="true" className="w-5 h-5" />
                </span>
                <h3 className={`${H3} mb-2`}>{title}</h3>
                <p className={`leading-relaxed ${BODY}`}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 How the system works: signals in, Epic's three systems (the lit card), actions out; people on the big calls. */}
      <section id="how-it-works" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={3} />
          <h2 className={`${H2} mb-4`}>Signals in, decisions out</h2>
          <p className={`text-lg leading-relaxed max-w-2xl mb-10 ${BODY}`}>
            Epic&apos;s systems read what&apos;s happening on every marketplace, decide what to change, and do it. People make the big calls.
          </p>
          <div data-story="flow" className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_auto_minmax(0,1.6fr)_auto_minmax(0,0.8fr)] lg:items-center">
            <FlowColumn title="Marketplace signals" items={SIGNALS} icon={Activity} step="in" />
            <FlowArrow />
            <div data-flow="core" className={`${CARD} p-6 ring-2 ring-[var(--pop)] shadow-[0_30px_60px_-30px_var(--pop)]`}>
              <h3 className={`text-xs font-bold uppercase tracking-[0.16em] mb-2 ${ACCENT}`}>Epic&apos;s three systems</h3>
              <ul>
                {intelligencePillars.map(({ icon: Icon, title, description }) => (
                  <li key={title} className="flex items-start gap-4 py-4 border-t border-current/10 first:border-t-0">
                    <span aria-hidden="true" className={`${ICON_TILE} shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <span>
                      <span className={`block text-lg font-semibold ${HEAD}`}>{title}</span>
                      <span className={`block mt-1 leading-relaxed ${BODY}`}>{description}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <FlowArrow />
            <FlowColumn title="Actions" items={ACTIONS} icon={Check} step="out" />
          </div>
          <p className={`mt-5 flex items-start gap-3 rounded-2xl border border-dashed border-current/20 px-5 py-4 ${BODY}`}>
            <UserRound aria-hidden="true" className={`w-5 h-5 shrink-0 mt-0.5 ${ACCENT}`} />
            <span>
              <strong className={`font-semibold ${HEAD}`}>People make the big calls.</strong> Epic&apos;s team stays on the decisions that need operator judgment.
            </span>
          </p>
        </div>
      </section>

      {/* 04 The old way against the Epic way, row by row. */}
      <section id="the-shift" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={4} />
          <h2 className={`${H2} mb-8`}>The old way vs Epic</h2>
          <div data-story="rise">
            <MarkTable
              columns={['Epic', 'The old way']}
              rows={SHIFT.map((r) => ({ q: r.q, cells: [{ ok: true, text: r.epic }, { ok: false, text: r.old }] }))}
            />
          </div>
        </div>
      </section>

      {/* 05 Next step: the point-of-view line becomes the closing headline. */}
      <section id="next" data-chapter className="scroll-mt-20 pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div data-story="fade-up" className={INNER}>
          <ChapterMarker n={5} />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className={`${H2} mb-4`}>You don&apos;t build the system. Epic runs it for you.</h2>
              <p className={`text-lg leading-relaxed ${BODY}`}>
                We buy your inventory and run your marketplaces with these systems.
                {siteConfig.bookACallEnabled ? " Let's map what that looks like for your brand." : null}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              {siteConfig.bookACallEnabled ? (
                <CtaButton variant="primary" size="lg" location="Intelligence Page CTA" />
              ) : (
                <PopLink href="/our-model">See how our model works</PopLink>
              )}
              <Link href="/case-studies" className={QUIET_BUTTON}>
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
