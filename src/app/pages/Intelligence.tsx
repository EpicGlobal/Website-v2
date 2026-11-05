'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Shield, TrendingUp, Zap } from 'lucide-react';
import { MarkTable } from '@/app/components/home/SkimSections';
import { CARD, ICON_TILE } from '@/app/components/home/homeStyles';
import { StructuredData, getBreadcrumbSchema, getWebPageSchema } from '@/app/components/StructuredData';
import { CtaButton } from '@/app/components/CtaButton';
import { useScrollStory } from '@/app/components/story/useScrollStory';
import { ChapterMarker as KitChapterMarker, ChapterRail, PopLink, StepList, WordFill } from '@/app/components/story/StoryKit';
import { BODY, CARD_HOVER, CHAPTER, H1, H2, H3, HEAD, INNER, LEAD, MUTED, PAGE_BG, QUIET_BUTTON } from '@/app/components/story/tokens';
import '@/app/components/story/story.css';
import { siteConfig } from '@/site/site-config';

/*
 * AI Intelligence page as one scroll story in six chapters: the claim, the gap brands face (a short pinned list on
 * desktop), the old way vs Epic (the same check / X table as Home), the three systems (one line each), Epic's point
 * of view (lit paragraphs and one word-fill sentence), and the next step. Plain claims only, no hype (Nov 5). Phones get the same text as a calm static page.
 */

const CHAPTERS = [
  { id: 'intelligence-layer', label: 'The Epic intelligence layer' },
  { id: 'the-gap', label: 'The gap' },
  { id: 'the-shift', label: 'The shift' },
  { id: 'pillars', label: 'The systems' },
  { id: 'point-of-view', label: 'Our point of view' },
  { id: 'next', label: 'Next step' },
] as const;

function ChapterMarker({ n }: { n: number }) {
  return <KitChapterMarker n={n} label={CHAPTERS[n - 1].label} />;
}

/** The three systems, one plain line each: what the software does, not how impressive it is. */
const intelligencePillars = [
  { icon: TrendingUp, title: 'Demand forecasting', description: 'Forecasts demand by marketplace and region, so stock sits where it sells.' },
  { icon: Zap, title: 'Pricing, listings and ads', description: 'Adjusts prices, listings and ad spend across marketplaces as conditions change.' },
  { icon: Shield, title: 'Brand protection', description: 'Spots unauthorized sellers, price violations and hijacked listings early, so we act fast.' },
];

const SHIFT = [
  { q: 'Channel management', epic: 'One system updates every marketplace', old: 'Manual updates, one platform at a time' },
  { q: 'Pricing', epic: 'Watched every day, kept within your MAP', old: 'Reviewed every quarter by a team' },
  { q: 'Brand protection', epic: 'Daily monitoring, fast enforcement', old: 'Monthly audits, after the damage' },
  { q: 'Inventory', epic: 'Forecasts place stock before demand shifts', old: "Last year's data and gut feel" },
];

const gap = [
  { title: 'Every marketplace works differently', description: 'Listings, ads, inventory and rules differ on each one.' },
  { title: 'Prices and sellers change daily', description: 'Competitors reprice and unauthorized sellers appear faster than weekly meetings can react.' },
  { title: 'Reporting takes real data work', description: 'One view across marketplaces and countries needs data engineering, not spreadsheets.' },
  { title: 'Tools still need a team', description: 'Most software needs people to run it. Epic runs the system for you.' },
];

export function Intelligence() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollStory(rootRef);

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

      {/* 01 The claim, answer first. */}
      <section id="intelligence-layer" data-chapter className="scroll-mt-20 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className={INNER}>
          <ChapterMarker n={1} />
          <h1 className={`${H1} mb-8 max-w-4xl`}>Marketplace commerce is becoming machine-run.</h1>
          <p className={`${LEAD} max-w-3xl mb-5`}>
            Epic Global Inc. runs brands&apos; marketplace operations, Amazon first, plus Walmart and international marketplaces, with its own software for demand forecasting, pricing, inventory placement and brand protection, so brands grow without building that system themselves.
          </p>
          <p className={`text-lg leading-relaxed max-w-3xl ${MUTED}`}>
            Where others add people to manage more complexity, Epic adds systems, and keeps its people on the decisions that need operator judgment.
          </p>
        </div>
      </section>

      {/* 02 The gap: pins briefly on desktop while the four pressures step in. */}
      {/* Sized to fit a 1366x657 laptop while pinned: the marker sits in the left column and the list gets the wider one. */}
      <section id="the-gap" data-chapter data-story-pin className="scroll-mt-20 py-20 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className={`${INNER} w-full`}>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-12 lg:gap-16 items-start">
            <div>
              <ChapterMarker n={2} />
              <h2 className={`${H2}`}>Why brands can&apos;t keep up</h2>
            </div>
            <StepList items={gap} />
          </div>
        </div>
      </section>

      {/* 03 The shift: old way against the Epic way, row by row. */}
      <section id="the-shift" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={3} />
          <h2 className={`${H2} mb-8`}>The old way vs Epic</h2>
          <div data-story="rise">
            <MarkTable
              columns={['Epic', 'The old way']}
              rows={SHIFT.map((r) => ({ q: r.q, cells: [{ ok: true, text: r.epic }, { ok: false, text: r.old }] }))}
            />
          </div>
        </div>
      </section>

      {/* 04 The pillars: the three systems rise into place together. */}
      <section id="pillars" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={4} />
          <h2 className={`${H2} mb-10`}>Three systems Epic runs for you</h2>
          <div data-story="rise" className="grid md:grid-cols-3 gap-4">
            {intelligencePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className={`${CARD} ${CARD_HOVER} p-6`}>
                  <span className={`${ICON_TILE} mb-5`}>
                    <Icon aria-hidden="true" className="w-5 h-5" />
                  </span>
                  <h3 className={`${H3} mb-2`}>{pillar.title}</h3>
                  <p className={`leading-relaxed ${BODY}`}>{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05 Our point of view: the paragraph you're reading is lit; the closing line fills word by word. */}
      <section id="point-of-view" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={5} />
          <h2 className={`${H2} mb-10`}>Our point of view</h2>
          <div className="max-w-3xl">
            <p data-story="lit-step" className={`text-xl sm:text-2xl font-semibold leading-snug mb-6 ${HEAD}`}>
              Marketplaces now move too fast, and there are too many of them, for a brand team to run by hand.
            </p>
            <p data-story="lit-step" className={`text-lg leading-relaxed mb-10 ${BODY}`}>
              Data pipelines, automation, daily monitoring and links to every marketplace take more than most brand teams can build. Epic already runs that system.
            </p>
            <p className={`text-2xl sm:text-3xl font-semibold leading-snug tracking-tight ${HEAD}`}>
              <WordFill text="You don't build the system. Epic runs it for you." />
            </p>
          </div>
        </div>
      </section>

      {/* 06 Next step: the closing call to action settles in. */}
      <section id="next" data-chapter className="scroll-mt-20 pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div data-story="fade-up" className={INNER}>
          <ChapterMarker n={6} />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className={`${H2} mb-4`}>Let Epic run the system</h2>
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
