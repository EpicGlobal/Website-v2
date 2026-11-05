'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { ScrollTimeline } from '@/app/components/scroll/ScrollEffects';
import { StructuredData, getBreadcrumbSchema, getWebPageSchema, serviceSchemas } from '@/app/components/StructuredData';
import { SEO } from '@/app/components/SEO';
import { CtaButton } from '@/app/components/CtaButton';
import { CompareTable } from '@/app/components/ourmodel/CompareTable';
import { useScrollStory, type StoryExtra } from '@/app/components/story/useScrollStory';
import { ChapterMarker as KitChapterMarker, ChapterRail, PopLink, WordFill } from '@/app/components/story/StoryKit';
import { ACCENT, ACCENT_BG, BODY, CHAPTER, H1, H2, H3, HEAD, INNER, LEAD, MUTED, PAGE_BG, QUIET_BUTTON } from '@/app/components/story/tokens';
import '@/app/components/story/story.css';
import { siteConfig } from '@/site/site-config';

/*
 * Our Model as one scroll story in six chapters: the detailed version of the homepage's Buy-Sell-Advertise-Protect.
 * The hero dims and lifts away as "Who it's for" arrives; the five steps light up one by one (ScrollTimeline) and
 * close on "We buy it. You profit." filling in word by word; "What we don't do" pins briefly while its points step
 * in. The rail (wide screens) shows where you are. Phones get the same text as a calm static page.
 */

const CHAPTERS = [
  { id: 'what-we-do', label: 'What we do' },
  { id: 'who-its-for', label: "Who it's for" },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'what-we-dont-do', label: "What we don't do" },
  { id: 'compare', label: 'How we compare' },
  { id: 'questions', label: 'Questions' },
] as const;

function ChapterMarker({ n, accent }: { n: number; accent?: string }) {
  return <KitChapterMarker n={n} label={CHAPTERS[n - 1].label} accent={accent} />;
}

const FOR_WHO = [
  "You're already selling on one or more marketplaces but need more control and better execution",
  "You want to expand into new regions but don't have the bandwidth or expertise internally",
  "You're tired of agencies that advise but don't execute or own outcomes",
  'You need a partner who takes responsibility for day-to-day operations, not just strategy',
];

const STEPS = [
  { title: 'Buy: we purchase your inventory at wholesale', body: 'You sell us inventory at an agreed wholesale price. We own the inventory and take on the retail execution risk.' },
  { title: 'Sell: we run Amazon, Walmart and other approved marketplaces', body: 'We manage listings, pricing, inventory allocation, fulfillment coordination and catalog integrity on Amazon, Walmart, eBay and international marketplaces.' },
  { title: 'Advertise: we fund the ads, fees and fulfillment', body: 'Marketplace fees, advertising spend and fulfillment costs are paid by us. This keeps incentives aligned: we only succeed when your brand grows profitably.' },
  { title: 'Protect: we guard your price and catalog', body: 'We protect your brand on every marketplace we operate: Brand Registry authorization, MAP enforcement, unauthorized-seller removal, and Buy Box and catalog monitoring.' },
  { title: 'You get visibility and control', body: 'You get a shared dashboard from day one, monthly reports with SKU-level sales, advertising and inventory, and quarterly business reviews. You stay informed and keep approval rights over major decisions.' },
];

const WE_DONT = [
  "We don't sell a la carte services or consulting packages",
  "We don't charge hourly rates or project fees",
  "We don't provide advice without executing the work",
  "We don't operate on a revenue share model without inventory ownership",
  "We don't work with brands that want to maintain day-to-day operational control internally",
];

/** The hero dims and lifts away as the next chapter rises over it (no pin: the page stays short). */
const ourModelBeats: StoryExtra = (gsap, _ScrollTrigger, root) => {
  const next = root.querySelector<HTMLElement>('#who-its-for');
  const heroInner = root.querySelector<HTMLElement>('[data-story="hero-inner"]');
  if (next && heroInner) {
    gsap.to(heroInner, {
      opacity: 0.2, y: -40, scale: 0.97, transformOrigin: 'left top', ease: 'none',
      scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 25%', scrub: 0.6 },
    });
  }
};

export function WhatWeAre() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollStory(rootRef, ourModelBeats);

  return (
    <div ref={rootRef} className={PAGE_BG}>
      <SEO
        title="Our Model - How Epic's Wholesale Model Works"
        description="How Epic Global buys inventory upfront, runs marketplace storefronts end to end, pays for ads, fees and fulfillment, and protects brand equity."
        canonicalUrl={`${siteConfig.url}/our-model`}
        keywords="wholesale trade partner, marketplace operator business model, inventory purchase model, wholesale inventory purchase"
      />
      <StructuredData
        data={getWebPageSchema({
          name: 'Our Model',
          url: `${siteConfig.url}/our-model`,
          description: 'How Epic Global buys inventory upfront, runs marketplace storefronts end to end, pays for ads, fees and fulfillment, and protects brand equity.',
        })}
      />
      {serviceSchemas.map((s) => (
        <StructuredData key={s.name} data={s} />
      ))}
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: `${siteConfig.url}/` },
          { name: 'Our Model', url: `${siteConfig.url}/our-model` },
        ])}
      />

      {/* Chapter rail (wide screens): real links to each chapter; the line fills as you read. */}
      <ChapterRail chapters={CHAPTERS} label="Our Model page chapters" />

      {/* 01 What we do: the answer first, in plain language. */}
      <section id="what-we-do" data-chapter="hero" className="scroll-mt-20 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div data-story="hero-inner" className={INNER}>
          <ChapterMarker n={1} accent="text-[var(--pop)] orange:text-[#101828]" />
          <h1 className={`${H1} mb-6 max-w-4xl`}>Our Wholesale Trade Partner Model</h1>
          <p className={`${LEAD} max-w-3xl mb-14`}>Plain language. No buzzwords. Here&apos;s what Epic Global Inc. actually does.</p>

          <div className="grid md:grid-cols-[minmax(0,14rem)_1fr] gap-6 md:gap-14 items-start">
            <h2 className={`${H2} md:pt-1`}>What we do</h2>
            <div className="max-w-2xl">
              <p className={`text-lg leading-relaxed mb-5 ${BODY}`}>
                Epic Global Inc. is a wholesale trade partner and global marketplace operator: we buy a brand&apos;s inventory upfront at wholesale and sell it on Amazon, Walmart and other marketplaces, paying for the advertising, marketplace fees and fulfillment ourselves.
              </p>
              <p className={`text-lg leading-relaxed ${BODY}`}>
                We cover operating costs like advertising, marketplace fees, and fulfillment, so incentives stay aligned. We don&apos;t sell consulting packages or charge hourly rates. We buy inventory, then operate retail sales across approved marketplaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Who it's for: the brand recognizes itself before the mechanics. */}
      <section id="who-its-for" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={2} />
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className={`${H2} mb-4`}>Who it&apos;s for</h2>
              <p className={`text-lg leading-relaxed max-w-xl ${BODY}`}>
                Brands that want to scale on marketplaces without building an internal eCommerce operations team.
              </p>
            </div>
            <ul className="space-y-5">
              {FOR_WHO.map((item) => (
                <li key={item} data-story="lit-step" className={`flex items-start gap-3 text-lg leading-relaxed ${BODY}`}>
                  <CheckCircle2 aria-hidden="true" className={`w-5 h-5 mt-1.5 flex-shrink-0 ${ACCENT}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 03 How it works: the heart of the page. Buy, Sell, Advertise, Protect light up one by one as you scroll,
          then the homepage promise fills in word by word. */}
      <section id="how-it-works" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={3} />
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
            <WordFill text="We buy it. You profit." />
          </p>
        </div>
      </section>

      {/* 04 What we don't do: pins briefly on desktop while the five "don'ts" step in beside a filling meter. */}
      <section id="what-we-dont-do" data-chapter data-story-pin className={CHAPTER}>
        <div className={`${INNER} w-full`}>
          <ChapterMarker n={4} />
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className={`${H2} mb-4`}>What we don&apos;t do</h2>
              <p className={`text-lg leading-relaxed ${BODY}`}>To be clear about what we&apos;re not:</p>
            </div>
            <div className="relative min-[900px]:pl-8">
              <div aria-hidden="true" data-story-meter="" className="absolute left-0 top-1 bottom-1 w-[3px] overflow-hidden rounded-full bg-gray-400/30">
                <div data-story="steps-meter" className={`h-full w-full rounded-full ${ACCENT_BG}`} />
              </div>
              <ul className="space-y-5">
                {WE_DONT.map((item) => (
                  <li key={item} data-story="step" className={`flex items-start gap-3 text-lg leading-relaxed ${BODY}`}>
                    <X aria-hidden="true" className={`w-5 h-5 mt-1.5 flex-shrink-0 ${MUTED}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 05 How we compare: the table rises into place. */}
      <section id="compare" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={5} />
          <h2 className={`${H2} mb-4`}>Competitive landscape</h2>
          <p className={`text-lg leading-relaxed max-w-3xl mb-10 ${BODY}`}>
            How Epic Global compares to other marketplace operators and accelerators
          </p>
          <div data-story="rise">
            <CompareTable />
          </div>
        </div>
      </section>

      {/* 06 Questions: the story hands off to a conversation. */}
      <section id="questions" data-chapter className="scroll-mt-20 pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div data-story="fade-up" className={INNER}>
          <ChapterMarker n={6} />
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
