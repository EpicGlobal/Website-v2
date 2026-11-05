'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, TrendingUp, Zap } from 'lucide-react';
import { StructuredData, getBreadcrumbSchema, getWebPageSchema } from '@/app/components/StructuredData';
import { CtaButton } from '@/app/components/CtaButton';
import { useScrollStory } from '@/app/components/story/useScrollStory';
import { ChapterMarker as KitChapterMarker, ChapterRail, PopLink, StepList, WordFill } from '@/app/components/story/StoryKit';
import { ACCENT, ACCENT_BG, BODY, CHAPTER, H1, H2, H3, HEAD, INNER, LEAD, MUTED, PAGE_BG, QUIET_BUTTON, RULE } from '@/app/components/story/tokens';
import '@/app/components/story/story.css';
import { siteConfig } from '@/site/site-config';

/*
 * AI Intelligence page as one scroll story in six chapters: the claim, the gap brands face (a short pinned list on
 * desktop), the shift from old to new, the three pillars, Epic's point of view (lit paragraphs and one word-fill
 * sentence), and the next step. Phones get the same text as a calm static page.
 */

const CHAPTERS = [
  { id: 'intelligence-layer', label: 'The Epic intelligence layer' },
  { id: 'the-gap', label: 'The gap' },
  { id: 'the-shift', label: 'The shift' },
  { id: 'pillars', label: 'The pillars' },
  { id: 'point-of-view', label: 'Our point of view' },
  { id: 'next', label: 'Next step' },
] as const;

function ChapterMarker({ n }: { n: number }) {
  return <KitChapterMarker n={n} label={CHAPTERS[n - 1].label} />;
}

const intelligencePillars = [
  {
    icon: TrendingUp,
    title: 'Predictive Demand Intelligence',
    description: 'AI determines where inventory should exist globally before demand materializes.',
    details: [
      'Cross-marketplace demand forecasting',
      'Regional inventory positioning',
      'Seasonal trend prediction',
      'SKU-level allocation optimization',
    ],
    impact: 'Inventory positioned where it converts, not where it sits.',
  },
  {
    icon: Zap,
    title: 'Autonomous Channel Optimization',
    description: 'AI adjusts pricing, listings, media, and supply in real time across all channels.',
    details: ['Dynamic pricing adjustments', 'Listing content optimization', 'Ad spend reallocation', 'Supply chain routing'],
    impact: 'Every marketplace adapts automatically to competitive conditions.',
  },
  {
    icon: Shield,
    title: 'Brand Protection Intelligence',
    description: 'AI detects unauthorized sellers and brand erosion before damage occurs.',
    details: ['Unauthorized seller detection', 'Pricing violation monitoring', 'Content hijacking alerts', 'Gray market identification'],
    impact: 'Brand equity protected at machine speed.',
  },
];

const traditionalVsEpic = [
  {
    aspect: 'Channel Management',
    traditional: 'Manual updates across platforms',
    epic: 'Unified intelligence layer syncs changes automatically',
  },
  {
    aspect: 'Pricing Strategy',
    traditional: 'Quarterly pricing reviews by team',
    epic: 'Real-time price optimization by AI',
  },
  {
    aspect: 'Brand Protection',
    traditional: 'Monthly audits, reactive enforcement',
    epic: 'Continuous monitoring, instant response',
  },
  {
    aspect: 'Inventory Allocation',
    traditional: 'Historical data + gut decisions',
    epic: 'Predictive positioning before demand shifts',
  },
];

const gap = [
  {
    title: 'Marketplace complexity multiplying',
    description:
      'Each marketplace has unique requirements for listings, ads, inventory, and compliance. Managing 5+ marketplaces requires 5+ different systems.',
  },
  {
    title: 'Speed requirements increasing',
    description: 'Competitors adjust prices hourly. Unauthorized sellers appear daily. Brands need real-time response, not weekly meetings.',
  },
  {
    title: 'Data infrastructure demands growing',
    description: 'Unified reporting across regions and marketplaces requires data engineering, not spreadsheets.',
  },
  {
    title: 'Operator layer needed',
    description: 'Brands need infrastructure that runs commerce, not tools that require teams to manage tools.',
  },
];

const ROW = 'grid md:grid-cols-[13rem_1fr_1fr] gap-x-8 gap-y-2';

export function Intelligence() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollStory(rootRef);

  return (
    <div ref={rootRef} className={PAGE_BG}>
      <StructuredData data={getWebPageSchema({
        name: 'The Epic Intelligence Layer',
        url: `${siteConfig.url}/intelligence`,
        description: 'Marketplace commerce is becoming machine-run. Epic Global Inc. operates the intelligence layer that orchestrates global marketplace execution.',
        mainEntity: {
          '@type': 'Thing',
          name: 'Epic Intelligence Layer',
          description: 'Epic Global Inc. uses predictive demand intelligence, marketplace automation, and brand protection systems to operate ecommerce channels.',
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
              <h2 className={`${H2} mb-4`}>Why brands cannot keep up</h2>
              <p className={`text-lg leading-relaxed max-w-xl ${BODY}`}>The infrastructure gap is widening</p>
            </div>
            <StepList items={gap} />
          </div>
        </div>
      </section>

      {/* 03 The shift: old way against the Epic way, row by row. */}
      <section id="the-shift" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={3} />
          <h2 className={`${H2} mb-4`}>What commerce used to be</h2>
          <p className={`text-lg leading-relaxed max-w-3xl mb-10 ${BODY}`}>vs. what AI is changing</p>
          <div data-story="rise">
            <div aria-hidden="true" className={`hidden md:grid ${ROW} pb-3 border-b text-sm font-semibold ${RULE}`}>
              <span />
              <span className={MUTED}>Traditional</span>
              <span className={ACCENT}>Epic</span>
            </div>
            {traditionalVsEpic.map((item) => (
              <div key={item.aspect} className={`${ROW} py-5 border-b ${RULE}`}>
                <h3 className={`font-semibold ${HEAD}`}>{item.aspect}</h3>
                <p className={`leading-relaxed ${MUTED}`}>
                  <span className="md:sr-only text-sm">Traditional: </span>
                  {item.traditional}
                </p>
                <p className={`leading-relaxed font-medium ${HEAD}`}>
                  <span className={`md:sr-only text-sm ${ACCENT}`}>Epic: </span>
                  {item.epic}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 The pillars: the three systems rise into place together. */}
      <section id="pillars" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={4} />
          <h2 className={`${H2} mb-4`}>Three intelligence pillars</h2>
          <p className={`text-lg leading-relaxed max-w-3xl mb-12 ${BODY}`}>
            Epic&apos;s authority in AI commerce stands on these three systems
          </p>
          <div data-story="rise" className="grid md:grid-cols-3 gap-10 md:gap-8">
            {intelligencePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="flex flex-col">
                  <span aria-hidden="true" className={`block h-[3px] w-12 mb-6 rounded-full ${ACCENT_BG}`} />
                  <Icon aria-hidden="true" className={`w-6 h-6 mb-4 ${HEAD}`} />
                  <h3 className={`${H3} mb-3`}>{pillar.title}</h3>
                  <p className={`leading-relaxed mb-5 ${BODY}`}>{pillar.description}</p>
                  <ul className="space-y-2 mb-6">
                    {pillar.details.map((detail) => (
                      <li key={detail} className={`flex items-start gap-2 text-sm ${MUTED}`}>
                        <ArrowRight aria-hidden="true" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-auto pt-4 border-t text-sm font-semibold italic ${RULE} ${HEAD}`}>{pillar.impact}</p>
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
          <h2 className={`${H2} mb-2`}>The Epic AI Point of View</h2>
          <p className={`text-lg mb-10 ${MUTED}`}>Our thesis on the future of marketplace commerce</p>
          <div className="max-w-3xl">
            <p data-story="lit-step" className={`text-xl sm:text-2xl font-semibold leading-snug mb-6 ${HEAD}`}>
              The future of global commerce will not be managed by teams. It will be orchestrated by intelligence layers.
            </p>
            <p data-story="lit-step" className={`text-lg leading-relaxed mb-5 ${BODY}`}>
              Brands cannot keep up. Every marketplace has unique requirements. Every region has different demand patterns. Every competitor moves prices daily. Every unauthorized seller erodes margin hourly.
            </p>
            <p data-story="lit-step" className={`text-lg leading-relaxed mb-10 ${BODY}`}>
              Building internal capability is no longer viable. The infrastructure required - data pipelines, automation systems, real-time monitoring, and multi-marketplace integrations - exceeds the capacity of brand teams.
            </p>
            <p className={`text-2xl sm:text-3xl font-semibold leading-snug tracking-tight ${HEAD}`}>
              <WordFill text="Epic removes the need for brands to build this capability. We are the intelligence layer." />
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
              <h2 className={`${H2} mb-4`}>Stop managing complexity. Start operating with intelligence.</h2>
              <p className={`text-lg leading-relaxed ${BODY}`}>
                Epic replaces marketplace complexity with infrastructure.
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
