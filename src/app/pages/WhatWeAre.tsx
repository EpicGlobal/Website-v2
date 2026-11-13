'use client';

import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';
import { BarChart3, Cpu, Database, Globe2, Package, Search, Shield, ShoppingCart, X } from 'lucide-react';
import epicMark from '@/assets/89c6c6b033fa0f92c4e3c1a320826a96a86b5469.png';
import { CARD, ICON_TILE } from '@/app/components/home/homeStyles';
import { ScrollTimeline } from '@/app/components/scroll/ScrollEffects';
import { StructuredData, getWebPageSchema, serviceSchemas } from '@/app/components/StructuredData';
import { CtaButton } from '@/app/components/CtaButton';
import { QuickAnswers } from '@/app/components/QuickAnswers';
import { CompareTable } from '@/app/components/ourmodel/CompareTable';
import { FitColumns } from '@/app/components/home/SkimSections';
import { useScrollStory, type StoryExtra } from '@/app/components/story/useScrollStory';
import { ChapterMarker as KitChapterMarker, ChapterRail, PopLink, WordFill } from '@/app/components/story/StoryKit';
import { ACCENT, BODY, CARD_HOVER, CHAPTER, H1, H2, H3, HEAD, INNER, LEAD, MUTED, PAGE_BG, QUIET_BUTTON } from '@/app/components/story/tokens';
import '@/app/components/story/story.css';
import { siteConfig } from '@/site/site-config';

/*
 * Our Model, redesigned Nov 6 (Brex): the detailed version of the homepage, in the same order of thought.
 * 01 the model in four lines beside the title, laid out like the homepage hero (Epic's two lines lit), 02 the five steps lighting up
 * as you scroll, 03 what we run day to day, 04 how we compare (table, then what we don't do), 05 who it's for,
 * 06 questions. Cards use the site-wide hover glow; Epic's lines in the hero are the one lit (pop) moment.
 * The rail (wide screens) shows where you are. Phones get the same text as a calm static page.
 */

/** What Epic runs day to day (moved here from the homepage, Nov 5): one line each. */
const CAPABILITIES = [
  { icon: ShoppingCart, title: 'Marketplace Management', description: 'Amazon first, plus Walmart, eBay and international.' },
  { icon: Globe2, title: 'Global Expansion', description: 'Launch new marketplaces and countries.' },
  { icon: Search, title: 'Listing Optimization', description: 'Titles, keywords and creative that convert.' },
  { icon: BarChart3, title: 'Advertising Operations', description: 'Campaigns, bids and creative, paid by Epic.' },
  { icon: Package, title: 'Inventory + Forecasting', description: 'Demand planning and reorders.' },
  { icon: Shield, title: 'Brand Protection & MAP Monitoring', description: 'Act on unauthorized sellers, protect MAP pricing.' },
  { icon: Database, title: 'Data + Reporting Layer', description: 'Shared dashboard and monthly reports.' },
  { icon: Cpu, title: 'Execution Engine', description: 'Automation that keeps catalogs clean and fast.' },
];

const CHAPTERS = [
  { id: 'what-we-do', label: 'What we do' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'what-we-run', label: 'What we run' },
  { id: 'compare', label: 'How we compare' },
  { id: 'who-its-for', label: "Who it's for" },
  { id: 'questions', label: 'Questions' },
] as const;

function ChapterMarker({ n, accent }: { n: number; accent?: string }) {
  return <KitChapterMarker n={n} label={CHAPTERS[n - 1].label} accent={accent} />;
}

/**
 * The model in four lines (hero, right column). Epic's two lines are lit and stand alone (How it works explains
 * them); your two lines are quieter and keep a short note, since nothing below covers them.
 */
const MODEL_LINES: { who: 'You' | 'Epic'; lead: string; body?: string }[] = [
  { who: 'You', lead: 'You make it.', body: 'You build the product and the brand.' },
  { who: 'Epic', lead: 'buy' },
  { who: 'Epic', lead: 'sell' },
  { who: 'You', lead: 'You keep the brand.', body: 'Brand Registry, listings and reviews stay yours, and we enforce your MAP.' },
];

const STEPS = [
  { title: 'Buy: we purchase your inventory at wholesale', body: 'You sell us inventory at an agreed wholesale price. We own it, and the retail risk.' },
  { title: 'Sell: we run Amazon, Walmart and other approved marketplaces', body: 'We run listings, pricing and inventory on Amazon, Walmart, eBay and international marketplaces.' },
  { title: 'Advertise: we fund the ads, fees and fulfillment', body: 'We pay the ad spend, marketplace fees and fulfillment, so we only win when you do.' },
  { title: 'Protect: we guard your price and catalog', body: 'Brand Registry authorization, MAP monitoring, action on unauthorized sellers, and Buy Box and catalog monitoring.' },
  { title: 'You get visibility and control', body: 'A shared dashboard from day one, monthly reports, quarterly reviews, and your approval on major decisions.' },
];

const WE_DONT = [
  'No à la carte services or consulting packages',
  'No hourly rates or project fees',
  'No advice without doing the work',
  'No revenue share without owning the inventory',
  'Not for brands that want to keep day-to-day control in-house',
];

/** The hero dims and lifts away as the next chapter rises over it (no pin: the page stays short). */
const ourModelBeats: StoryExtra = (gsap, _ScrollTrigger, root) => {
  const hero = root.querySelector<HTMLElement>('#what-we-do');
  const heroInner = root.querySelector<HTMLElement>('[data-story="hero-inner"]');
  if (hero && heroInner) {
    // Starts at the top of the page (fully bright) and only fades once the hero scrolls up out of view.
    gsap.to(heroInner, {
      opacity: 0.2, y: -40, scale: 0.97, transformOrigin: 'left top', ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
  }
};

export function WhatWeAre() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollStory(rootRef, ourModelBeats);

  return (
    <div ref={rootRef} className={PAGE_BG}>
      <StructuredData
        data={getWebPageSchema({
          name: 'Our Model',
          url: `${siteConfig.url}/our-model`,
          description: 'How Epic Global, an Amazon-first wholesale trade partner, buys inventory upfront, runs Amazon, Walmart and international storefronts, and pays the ads, fees and fulfillment.',
        })}
      />
      {serviceSchemas.map((s) => (
        <StructuredData key={s.name} data={s} />
      ))}

      {/* Chapter rail (wide screens): real links to each chapter; the line fills as you read. */}
      <ChapterRail chapters={CHAPTERS} label="Our Model page chapters" />

      {/* 01 What we do: the answer first, in plain language. */}
      <section id="what-we-do" data-chapter="hero" className="scroll-mt-20 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div data-story="hero-inner" className={INNER}>
          <ChapterMarker n={1} accent="text-[var(--pop)] orange:text-[#101828]" />
          {/* Laid out like the homepage hero: the answer on the left, the model in four lines on the right. */}
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:items-center">
            <div>
              <h1 className={`${H1} mb-6`}>Our wholesale trade partner model</h1>
              <p className={`${LEAD} mb-8`}>
                Epic Global Inc. is an Amazon-first wholesale trade partner: we buy your inventory upfront, sell it on Amazon, plus Walmart and international marketplaces, and pay the ads, fees and fulfillment.
              </p>
              <a href="#how-it-works" className={`text-base font-semibold underline-offset-4 hover:underline ${HEAD}`}>
                How it works &darr;
              </a>
            </div>
            <div>
              <h2 className="sr-only">The model in four lines</h2>
              <ol className="relative pl-7">
                {/* The rail: a faint line the full height; each Epic line lights its own stretch of it. */}
                <span aria-hidden="true" className={`absolute left-0 top-0 bottom-0 w-0.5 bg-current opacity-15 ${MUTED}`} />
                {MODEL_LINES.map((line) => {
                  const epic = line.who === 'Epic';
                  return (
                    <li key={line.lead} className="relative py-3.5">
                      {epic ? (
                        <span aria-hidden="true" className={`absolute -left-7 top-0 bottom-0 w-0.5 bg-current shadow-[0_0_14px_currentColor] ${ACCENT}`} />
                      ) : null}
                      <span className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] mb-1 ${epic ? ACCENT : MUTED}`}>
                        {epic ? <Image src={epicMark} alt="" className="w-4 h-4 object-contain" /> : null}
                        {line.who}
                      </span>
                      <p className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] ${HEAD} ${epic ? '' : 'opacity-45'}`}>
                        {epic ? (
                          <>
                            We <span className={ACCENT}>{line.lead}</span> it.
                          </>
                        ) : (
                          line.lead
                        )}
                      </p>
                      {line.body ? <p className={`mt-1.5 leading-relaxed ${MUTED}`}>{line.body}</p> : null}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 02 How it works: Buy, Sell, Advertise, Protect light up one by one as you scroll, then the homepage promise
          fills in word by word. */}
      <section id="how-it-works" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={2} />
          <h2 className={`${H2} mb-10`}>How our wholesale model works</h2>
          <div className="max-w-3xl">
            <ScrollTimeline
              numClass={ACCENT}
              titleClass={`${H3} mb-2`}
              bodyClass={`leading-relaxed ${BODY}`}
              steps={STEPS}
            />
          </div>
          <p className={`mt-16 text-4xl sm:text-5xl font-bold tracking-tight ${HEAD}`}>
            <WordFill text="We buy it. You profit.™" />
          </p>
        </div>
      </section>

      {/* 03 What we run: eight one-line cards with the site-wide hover glow. */}
      <section id="what-we-run" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={3} />
          <h2 className={`${H2} mb-8`}>What we run day to day</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {CAPABILITIES.map(({ icon: Icon, title, description }) => (
              <div key={title} className={`${CARD} ${CARD_HOVER} p-5`}>
                <span className={`${ICON_TILE} !w-9 !h-9 !rounded-lg mb-4`}>
                  <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                </span>
                <h3 className={`font-semibold mb-1 leading-snug ${HEAD}`}>{title}</h3>
                <p className={`text-sm leading-snug ${MUTED}`}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 How we compare: the table, then what we don't do (the same point from the other side). */}
      <section id="compare" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={4} />
          <h2 className={`${H2} mb-8`}>How Epic compares</h2>
          <div data-story="rise">
            <CompareTable />
          </div>
          <h3 className={`${H3} mt-12 mb-5`}>What we don&apos;t do</h3>
          {/* Plain lines, original spacing. On hover a line nudges right, its X lights up in the theme's pop color with a soft
              glow: the same hover language as the rest of the site, without the box. */}
          <ul className="grid gap-x-10 gap-y-3 md:grid-cols-2">
            {WE_DONT.map((item) => (
              <li
                key={item}
                className={`group flex items-start gap-3 leading-relaxed transition-transform duration-300 ease-out hover:translate-x-1 ${BODY}`}
              >
                <X
                  aria-hidden="true"
                  className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-[color,filter] duration-300 ${MUTED} group-hover:!text-[var(--pop)] group-hover:drop-shadow-[0_0_8px_var(--pop)]`}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 Who it's for: the same fit list as the homepage. */}
      <section id="who-its-for" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={5} />
          <h2 className={`${H2} mb-4`}>Who it&apos;s for</h2>
          <p className={`text-lg leading-relaxed max-w-2xl mb-8 ${BODY}`}>
            Brands that want to scale on marketplaces without building an internal eCommerce operations team.
          </p>
          <FitColumns />
        </div>
      </section>

      {/* 06 Questions: the story hands off to a conversation. */}
      <section id="questions" data-chapter className="scroll-mt-20 pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div data-story="fade-up" className={INNER}>
          <ChapterMarker n={6} />
          <QuickAnswers
            id="our-model-answers"
            questions={[
              "Will Epic buy my brand's inventory?",
              'Do you charge retainers, hourly rates or project fees?',
              'Do we keep our Brand Registry, listings, reviews and rank?',
            ]}
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className={`${H2} mb-4`}>Questions about how this works?</h2>
              <p className={`text-lg leading-relaxed ${BODY}`}>
                Let&apos;s walk through your catalog, marketplace presence, and growth goals. Or email{' '}
                <a href={`mailto:${siteConfig.contactEmail}`} className={`underline underline-offset-2 font-medium ${HEAD}`}>
                  {siteConfig.contactEmail}
                </a>
                .
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 self-start sm:self-auto">
              <CtaButton variant="primary" size="lg" location="What We Are Page - Final CTA" />
              {/* While booking is off, the FAQ is the page's main next step, so it takes the pop button. */}
              {siteConfig.bookACallEnabled ? (
                <Link href="/faq" className={QUIET_BUTTON}>
                  View FAQ
                </Link>
              ) : (
                <PopLink href="/faq">View FAQ</PopLink>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
