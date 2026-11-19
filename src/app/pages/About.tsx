'use client';

import image_7827c6003ae306e0f9f630e11162a9aa55ffdd3f from '@/assets/7827c6003ae306e0f9f630e11162a9aa55ffdd3f.png';
import Image from 'next/image';
import { useRef } from 'react';
import { Box, Calendar, Flag, Globe2, Linkedin, MapPin, Megaphone, Star, Warehouse, type LucideIcon } from 'lucide-react';
import { CARD, ICON_TILE } from '@/app/components/home/homeStyles';
import { StructuredData, founderSchema, getWebPageSchema, organizationSchema, organizationRef } from '@/app/components/StructuredData';
import { GlobalReachMap } from '@/app/components/GlobalReachMap';
import { useScrollStory, type StoryExtra } from '@/app/components/story/useScrollStory';
import { ChapterMarker as KitChapterMarker, ChapterRail, PopLink, StepList, WordFill } from '@/app/components/story/StoryKit';
import { ACCENT, ACCENT_BG, BODY, CHAPTER, H2, HEAD, INNER, MUTED, PAGE_BG } from '@/app/components/story/tokens';
import '@/app/components/story/story.css';
import { siteConfig } from '@/site/site-config';

/*
 * About page as one scroll story in five chapters. Each chapter opens with a numbered marker whose rule draws in
 * as it arrives, and a chapter rail on the right (wide screens) shows where you are. On desktop the hero and the
 * "Why Epic" chapter pin while their beats play; the founder chapter keeps the portrait in place while the
 * bio scrolls past it. Phones get the same text as a calm static page.
 */

const CHAPTERS = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'founder', label: 'Our founder' },
  { id: 'global-reach', label: 'Where we operate' },
  { id: 'how-we-work', label: 'Why Epic' },
  { id: 'next', label: 'See the work' },
] as const;

const QUOTE =
  "A company that doesn't just advise brands on how to grow, but invests alongside them and takes responsibility for making that growth happen.";

function ChapterMarker({ n, accent }: { n: number; accent?: string }) {
  return <KitChapterMarker n={n} label={CHAPTERS[n - 1].label} accent={accent} />;
}

/**
 * About's one-off beat: the founder bio's reading meter. (Nov 19: the hero no longer dims as the founder chapter
 * rises; with the shorter hero the founder chapter is on screen at load, so the hero started out faded.)
 */
const aboutBeats: StoryExtra = (gsap, _ScrollTrigger, root) => {
  const one = (sel: string) => root.querySelector<HTMLElement>(sel);
  const bio = one('[data-story="bio"]');
  if (bio) {
    gsap.fromTo(one('[data-story="bio-meter"]'), { scaleX: 0 }, {
      scaleX: 1, ease: 'none', transformOrigin: 'left center',
      scrollTrigger: { trigger: bio, start: 'top 60%', end: 'bottom 60%', scrub: true },
    });
  }
};

export function About() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollStory(rootRef, aboutBeats);

  // The four things Epic runs, shown beside the globe in the "Why Epic" chapter.
  const ops: { label: string; icon: LucideIcon }[] = [
    { label: 'Inventory', icon: Box },
    { label: 'Advertising', icon: Megaphone },
    { label: 'Fulfillment', icon: Warehouse },
    { label: 'Global Markets', icon: Globe2 },
  ];

  const differentiators = [
    {
      title: 'Capital committed',
      description: 'Epic purchases inventory outright and funds marketplace operations on the products it buys.',
    },
    {
      title: 'Operational accountability',
      description: 'Our teams manage catalog, advertising, inventory and fulfillment through an ongoing operating cadence.',
    },
    {
      title: 'Global execution',
      description: 'Epic extends its wholesale operating model across approved marketplaces and international markets.',
    },
  ];

  // Who Epic is, as four even cards from the first paint (Nov 18: founding year added so 2015 isn't read as it; Glen
  // moves to his own chapter and the rating stays on the homepage, so the About page is about identity).
  const facts: { label: string; value: string; icon: LucideIcon; lit?: boolean }[] = [
    { label: 'Founded', value: '2014', icon: Flag },
    { label: 'Selling on Amazon since', value: '2015', icon: Calendar },
    { label: 'Headquarters', value: 'Lindon, Utah', icon: MapPin },
    { label: 'Countries in our marketplace reach', value: '42', icon: Globe2 },
  ];

  const aboutPageSchema = getWebPageSchema({
    '@type': 'AboutPage',
    name: 'About Epic Global Inc.',
    url: `${siteConfig.url}/about`,
    description: "Epic Global Inc. is an Amazon-first wholesale trade partner led by Glen Jensen: we buy brands' inventory at wholesale and sell it on Amazon, plus Walmart and international marketplaces, paying for the advertising, fees and fulfillment.",
    mainEntity: organizationRef,
  });

  return (
    <div ref={rootRef} className={PAGE_BG}>
      <StructuredData data={organizationSchema} />
      <StructuredData data={founderSchema} />
      <StructuredData data={aboutPageSchema} />

      {/* Chapter rail (wide screens): real links to each chapter; the line fills as you read. */}
      <ChapterRail chapters={CHAPTERS} label="About page chapters" />

      {/* 01 Who we are: answer first, then the facts people check, as cards. */}
      <section id="who-we-are" data-chapter="hero" className="scroll-mt-20 pt-28 lg:pt-36 pb-6 px-4 sm:px-6 lg:px-8">
        <div data-story="hero-inner" className="max-w-5xl mx-auto w-full">
          <ChapterMarker n={1} accent="text-[var(--pop)] orange:text-[#101828]" />
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.08] max-w-4xl ${HEAD}`}>
            About Epic Global
          </h1>
          <p className={`text-xl sm:text-2xl font-semibold tracking-tight max-w-3xl mb-6 ${ACCENT}`}>
            A founder-led wholesale trade partner for global marketplaces
          </p>
          <p className={`text-lg sm:text-xl leading-relaxed max-w-3xl mb-12 ${BODY}`}>
            Founded in 2014, Epic Global Inc. purchases inventory from established brands and manages authorized marketplace sales across Amazon, Walmart and international markets. Epic funds advertising, marketplace fees and fulfillment for the inventory it buys, while brand owners retain ownership of their businesses.
          </p>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {facts.map(({ label, value, icon: Icon, lit }) => (
              <div
                key={label}
                className={`${CARD} flex flex-col-reverse justify-end p-4 sm:p-5 ${lit ? 'col-span-2 !shadow-[0_0_0_2px_var(--pop),0_20px_40px_-20px_var(--pop)]' : ''}`}
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
                  <span className={`block text-2xl sm:text-3xl font-bold tracking-tight tabular-nums ${HEAD}`}>{value}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 02 Who runs Epic: the portrait holds its place while the bio scrolls past it. */}
      <section id="founder" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={2} />
          <div className="grid md:grid-cols-[minmax(0,15rem)_1fr] gap-10 md:gap-14 items-start">
            <div className="max-w-[15rem] mx-auto md:mx-0 w-full md:sticky md:top-28">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)]">
                <Image
                  src={image_7827c6003ae306e0f9f630e11162a9aa55ffdd3f}
                  alt="Glen Jensen, founder and CEO of Epic Global Inc."
                  sizes="240px"
                  className="w-full h-full object-cover"
                />
              </div>
              <div aria-hidden="true" data-story-meter="" className="mt-5 h-[3px] w-full overflow-hidden rounded-full bg-gray-400/30">
                <div data-story="bio-meter" className={`h-full w-full rounded-full ${ACCENT_BG}`} />
              </div>
              <a
                href={siteConfig.founderLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 decoration-1 hover:decoration-2 ${BODY}`}
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
                Glen on LinkedIn
              </a>
            </div>

            <div data-story="bio">
              <h2 className={H2}>Glen Jensen</h2>
              <p className={`mt-1 mb-8 text-lg ${MUTED}`}>Founder &amp; CEO, Epic Global Inc. &middot; Founded Epic in 2014</p>
              {/* Nov 18 draft bio (from the CEO's ChatGPT review). Needs Glen's OK before it goes live. */}
              <p data-story="lit-step" className={`leading-relaxed mb-5 ${BODY}`}>
                {"Glen Jensen founded Epic Global Inc. in 2014 around a simple belief: brands deserve a better way to grow on online marketplaces."}
              </p>
              <p data-story="lit-step" className={`leading-relaxed mb-5 ${BODY}`}>
                {"Rather than build a traditional marketplace agency, Glen developed a wholesale partnership model in which Epic purchases inventory, invests its own capital, and takes responsibility for advertising, fulfillment and day-to-day marketplace operations."}
              </p>
              <p data-story="lit-step" className={`leading-relaxed mb-5 ${BODY}`}>
                {"Under Glen's leadership, Epic has expanded its marketplace reach internationally while investing in the people, systems and infrastructure needed to support established consumer brands."}
              </p>
              <p data-story="lit-step" className={`leading-relaxed ${BODY}`}>
                {"His approach remains straightforward: build long-term partnerships, take ownership of execution and align Epic's success with the brands it serves."}
              </p>
              <blockquote className="mt-8">
                <p className={`text-2xl sm:text-3xl font-semibold leading-snug tracking-tight ${HEAD}`}>
                  <span aria-hidden="true" className="block text-6xl leading-none h-8 text-[var(--pop)]">&ldquo;</span>
                  <WordFill text={QUOTE} />
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Where we operate: the map rises into place (native CSS scroll timeline). It stays unpinned so its
          own wheel zoom and drag never fight the page scroll. */}
      <section id="global-reach" data-chapter className={CHAPTER}>
        <div className={INNER}>
          <ChapterMarker n={3} />
          <h2 className={`${H2} mb-4`}>
            Global Marketplace Operations, One Wholesale Partner
          </h2>
          <p className={`text-lg leading-relaxed max-w-3xl mb-10 ${BODY}`}>
            Epic supports brands across international marketplaces through coordinated catalog management, advertising, inventory planning and fulfillment.
          </p>
          <div data-story="rise">
            <GlobalReachMap />
          </div>
        </div>
      </section>

      {/* 04 How we are different: pins on desktop while "agency" is struck out and the three differences step in. */}
      <section id="how-we-work" data-chapter data-story-pin className={CHAPTER}>
        <div className={`${INNER} w-full`}>
          <ChapterMarker n={4} />
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              {/* Nov 18: the principles behind Epic, not another agency comparison (home and Our Model already make it). */}
              <h2 className={`${H2} mb-4`}>Built to Own the Work, Not Just Advise on It</h2>
              {/* Nov 19 (Brex's mockup): a dotted globe with the four things Epic runs beside it. The globe is a static,
                  decorative SVG (public/about-globe.svg, drawn from the same world-atlas data as the map); the four
                  labels are real text. Phones: globe on top, labels in a 2 x 2 grid below. */}
              <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center lg:justify-start sm:gap-0">
                <img
                  src="/about-globe.svg"
                  alt=""
                  aria-hidden="true"
                  width={440}
                  height={470}
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-[290px] sm:max-w-[320px] lg:max-w-[340px] h-auto"
                />
                <ul aria-label="What Epic runs" className="relative grid w-full grid-cols-2 gap-3 sm:w-auto sm:grid-cols-1 sm:-ml-8">
                  {ops.map(({ label, icon: Icon }) => (
                    <li
                      key={label}
                      className={`flex items-center gap-3 rounded-xl border border-white/15 light:border-gray-300 orange:border-[#101828]/20 bg-[#0b1422]/70 light:bg-white orange:bg-white/70 px-4 py-3 text-sm font-semibold shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur ${HEAD}`}
                    >
                      <Icon aria-hidden="true" className={`h-5 w-5 flex-shrink-0 ${ACCENT}`} />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <StepList items={differentiators} />
          </div>
        </div>
      </section>

      {/* 05 See the work: the story hands off to the case studies. */}
      <section id="next" data-chapter className="scroll-mt-20 pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div data-story="fade-up" className="max-w-5xl mx-auto">
          <ChapterMarker n={5} />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className={`${H2} mb-4`}>
                See Epic&apos;s Marketplace Model in Action
              </h2>
              <p className={`text-lg leading-relaxed ${BODY}`}>
                Explore real examples of how Epic manages marketplace operations, improves execution and supports established brands.
              </p>
            </div>
            <PopLink href="/case-studies" className="shrink-0 self-start sm:self-auto">
              Explore Case Studies
            </PopLink>
          </div>
        </div>
      </section>
    </div>
  );
}
