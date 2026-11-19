'use client';

import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, BarChart3, Cpu, Database, Factory, Globe2, Package, Search, Shield, ShoppingCart, Store, X } from 'lucide-react';
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

/** What Epic runs day to day (moved here from the homepage, Nov 5; Nov 19 wording): one line each. */
const CAPABILITIES: { icon: typeof ShoppingCart; title: string; description: string; strong?: string }[] = [
  { icon: ShoppingCart, title: 'Marketplace Operations', description: 'Amazon-first selling across Walmart, eBay and approved international marketplaces.' },
  { icon: Globe2, title: 'International Marketplace Expansion', description: 'Marketplace launches, regional catalog adaptation and local execution.' },
  { icon: Search, title: 'Product Listings & Brand Content', description: 'Keyword research, product titles, images, A+ content and storefronts, tested and improved over time.' },
  { icon: BarChart3, title: 'Marketplace Advertising', description: 'Campaign strategy, bidding, creative and performance optimization funded by Epic.' },
  { icon: Package, title: 'Inventory & Demand Planning', description: 'Forecasting, replenishment, stock availability and fulfillment coordination.' },
  { icon: Shield, title: 'Brand Protection', description: 'Offer monitoring, catalog protection and appropriate enforcement coordination.' },
  { icon: Database, title: 'Marketplace Intelligence & Reporting', description: 'Sales, advertising, inventory and demand trends that guide marketplace decisions.' },
  { icon: Cpu, title: 'Systems & Automation', description: 'Marketplace teams supported by automation, operating workflows and ongoing performance monitoring.' },
];

const CHAPTERS = [
  { id: 'what-we-do', label: 'What we do' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'what-we-run', label: 'What we run' },
  { id: 'compare', label: 'How we compare' },
  { id: 'who-its-for', label: "Who it's for" },
  { id: 'direct-selling', label: 'Direct-selling brands' },
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
  { who: 'You', lead: 'You keep the brand.', body: 'You retain your trademarks and Brand Registry. Epic operates on authorized listings within your agreed brand and pricing strategy.' },
];

const STEPS = [
  { title: 'Buy: We Purchase Your Inventory', body: 'Epic purchases inventory outright at a negotiated wholesale price and takes ownership of the products purchased.' },
  { title: 'Sell: We Operate Your Marketplace Channel', body: 'Epic sells through its authorized third-party seller accounts, managing listings, pricing, inventory and fulfillment across approved marketplaces. Most fulfillment is handled through Amazon FBA.' },
  { title: 'Advertise: We Fund Marketplace Growth', body: 'Epic pays advertising, marketplace selling fees and fulfillment costs on the inventory it purchases.' },
  { title: 'Protect: We Monitor and Defend Your Brand', body: 'Epic monitors unauthorized offers, catalog issues and pricing activity, coordinating evidence-based reporting and appropriate enforcement.' },
  { title: 'Report: You Stay Informed', body: 'Brand partners have a shared dashboard from day one, receive monthly reporting and participate in quarterly business reviews.' },
];

/**
 * Direct-selling brands (Nov 18; Brex picked option C of four): one sentence on the problem, then a single card with the
 * statement, one line on how it works and the brand -> Epic -> Amazon flow. No brand names, no removal counts, no
 * promises about distributor sales or exclusivity (those need approval first).
 */
function DsFlow({ className = '' }: { className?: string }) {
  const side = `flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/15 light:border-gray-300 orange:border-[#101828]/20 px-4 py-2.5 text-sm font-semibold ${HEAD}`;
  return (
    <ol aria-label="Wholesale inventory flow" className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 ${className}`}>
      <li className={side}><Factory className="w-4 h-4" aria-hidden="true" /> Your brand</li>
      <li aria-hidden="true" className={`self-center ${ACCENT}`}><ArrowRight className="w-5 h-5 rotate-90 sm:rotate-0" /></li>
      <li className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-[var(--pop)] px-4 py-2.5 text-sm font-bold tracking-[0.14em] uppercase shadow-[0_0_20px_-6px_var(--pop)] ${HEAD}`}>
        <Image src={epicMark} alt="" className="w-4 h-4 object-contain" /> Epic Global
      </li>
      <li aria-hidden="true" className={`self-center ${ACCENT}`}><ArrowRight className="w-5 h-5 rotate-90 sm:rotate-0" /></li>
      <li className={side}><Store className="w-4 h-4" aria-hidden="true" /> Amazon</li>
    </ol>
  );
}

const WE_DONT = [
  'Agency retainers or hourly consulting fees.',
  "The brand to fund Epic's marketplace advertising on purchased inventory.",
  'The brand to surrender its business or trademarks.',
  'The brand to manage day-to-day marketplace execution.',
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
          description: "How Epic Global's wholesale model works: Epic purchases inventory outright, funds advertising, selling fees and fulfillment, and manages Amazon and international marketplace sales.",
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
                Epic Global purchases inventory outright from established consumer brands and manages authorized marketplace sales across Amazon, Walmart and international markets. We fund advertising, selling fees and fulfillment for the inventory we buy. Brands retain ownership of their businesses and trademarks.
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
                      <p className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] ${HEAD} ${epic ? '' : 'opacity-75'}`}>
                        {epic ? (
                          <>
                            We <span className={ACCENT}>{line.lead}</span> it.
                          </>
                        ) : (
                          line.lead
                        )}
                      </p>
                      {line.body ? <p className={`mt-1.5 leading-relaxed ${BODY}`}>{line.body}</p> : null}
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
          <h2 className={`${H2} mb-4`}>The Marketplace Infrastructure Behind Your Brand</h2>
          <p className={`text-lg leading-relaxed max-w-3xl mb-8 ${BODY}`}>
            Epic purchases your inventory and operates your marketplace channels, so you can focus on your core business.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {CAPABILITIES.map(({ icon: Icon, title, strong, description }) => (
              <div key={title} className={`${CARD} ${CARD_HOVER} p-5`}>
                <span className={`${ICON_TILE} !w-9 !h-9 !rounded-lg mb-4`}>
                  <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                </span>
                <h3 className={`font-semibold mb-1 leading-snug ${HEAD}`}>{title}</h3>
                <p className={`text-sm leading-snug ${MUTED}`}>{strong ? <><strong className={`font-semibold ${HEAD}`}>{strong}</strong>{' '}</> : null}{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 How we compare: the table, then what we don't do (the same point from the other side). */}
      <section id="compare" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={4} />
          <h2 className={`${H2} mb-8`}>How Epic&apos;s Wholesale Model Compares</h2>
          <div data-story="rise">
            <CompareTable />
          </div>
          <h3 className={`${H3} mt-12 mb-5`}>Epic&apos;s Standard Wholesale Partnership Does Not Require:</h3>
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
          <h2 className={`${H2} mb-4`}>Is Epic&apos;s Wholesale Marketplace Model Right for Your Brand?</h2>
          <p className={`text-lg leading-relaxed max-w-2xl mb-8 ${BODY}`}>
            Epic typically partners with established consumer brands seeking a wholesale buyer and an accountable operator for
            Amazon and other marketplaces.
          </p>
          <FitColumns />
        </div>
      </section>

      {/* 06 Direct-selling brands: the problem in one sentence, then one card with the answer and the flow. */}
      <section id="direct-selling" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={6} />
          <h2 className={`${H2} mb-4`}>Bring Structure to Amazon for Direct-Selling Brands</h2>
          <p className={`${LEAD} mb-10 max-w-3xl`}>
            Direct-selling products can reach Amazon through distributor resale, excess inventory and arbitrage, creating
            inconsistent pricing and competition with existing distributor channels.
          </p>
          <div className={`${CARD} relative overflow-hidden p-7 sm:p-10 text-center`}>
            <span aria-hidden="true" className="pointer-events-none absolute left-1/2 -top-32 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-[var(--pop)]/[0.08] blur-3xl" />
            <p className={`relative text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${HEAD}`}>
              You keep the brand. <span className={`block sm:inline ${ACCENT}`}>Epic operates the channel.</span>
            </p>
            <p className={`relative mx-auto mt-4 max-w-2xl text-lg leading-relaxed ${BODY}`}>
              Epic purchases inventory outright, funds marketplace operations and manages authorized Amazon sales under an
              agreed channel strategy. Your business retains its trademarks, Brand Registry and distributor network.
            </p>
            <DsFlow className="relative mt-8 justify-center" />
          </div>
          {/* Shows only when booking is turned on (same rule as every other booking button). */}
          {siteConfig.bookACallEnabled ? (
            <div className="mt-12 flex justify-center">
              <CtaButton variant="primary" size="lg" location="What We Are Page - Direct Selling" />
            </div>
          ) : null}
        </div>
      </section>

      {/* 06 Questions: the story hands off to a conversation. */}
      <section id="questions" data-chapter className="scroll-mt-20 pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div data-story="fade-up" className={INNER}>
          <ChapterMarker n={7} />
          <QuickAnswers
            id="our-model-answers"
            questions={[
              "Will Epic buy my brand's inventory?",
              'Do you charge retainers, hourly rates or project fees?',
              'Do we keep our Brand Registry, listings and reviews?',
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
