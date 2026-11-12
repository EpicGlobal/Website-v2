'use client';

import image_7827c6003ae306e0f9f630e11162a9aa55ffdd3f from '@/assets/7827c6003ae306e0f9f630e11162a9aa55ffdd3f.png';
import Image from 'next/image';
import { useRef } from 'react';
import { Calendar, Globe2, Linkedin, MapPin, Star, UserRound, type LucideIcon } from 'lucide-react';
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
 * "not an agency" chapter pin while their beats play; the founder chapter keeps the portrait in place while the
 * bio scrolls past it. Phones get the same text as a calm static page.
 */

const CHAPTERS = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'founder', label: 'Who runs Epic' },
  { id: 'global-reach', label: 'Where we operate' },
  { id: 'how-we-work', label: 'How we are different' },
  { id: 'next', label: 'See the work' },
] as const;

const QUOTE =
  "A company that doesn't just advise brands on how to grow, but invests alongside them and takes responsibility for making that growth happen.";

function ChapterMarker({ n, accent }: { n: number; accent?: string }) {
  return <KitChapterMarker n={n} label={CHAPTERS[n - 1].label} accent={accent} />;
}

/** About's one-off beats: the hero dims and lifts away as the founder chapter rises over it. */
const aboutBeats: StoryExtra = (gsap, _ScrollTrigger, root) => {
  const one = (sel: string) => root.querySelector<HTMLElement>(sel);
  const hero = one('[data-chapter="hero"]');
  const founder = one('#founder');
  if (hero && founder) {
    gsap.to(one('[data-story="hero-inner"]'), {
      opacity: 0.2, y: -40, scale: 0.97, transformOrigin: 'left top', ease: 'none',
      scrollTrigger: { trigger: founder, start: 'top bottom', end: 'top 25%', scrub: 0.6 },
    });
  }
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

  const differentiators = [
    {
      title: 'Operator-first',
      description: 'We run the work, track it, and keep it clean.',
    },
    {
      title: 'System-driven',
      description: 'Repeatable cycles replace ad hoc heroics.',
    },
    {
      title: 'Global by design',
      description: 'Expansion is built into our data and execution model.',
    },
  ];

  // Who Epic is, as cards from the first paint (same look as the homepage's At a glance). Brands and marketplaces stay
  // on the homepage so the two pages don't repeat each other; the rating is the one proof worth repeating (lit, wide).
  const facts: { label: string; value: string; icon: LucideIcon; lit?: boolean }[] = [
    { label: 'On Amazon since', value: '2015', icon: Calendar },
    { label: 'Headquarters', value: 'Lindon, Utah', icon: MapPin },
    { label: 'Founder & CEO', value: 'Glen Jensen', icon: UserRound },
    { label: 'Countries', value: '42', icon: Globe2 },
    { label: 'Amazon US seller rating (9,600+ ratings)', value: '4.9/5', icon: Star, lit: true },
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
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.08] max-w-4xl ${HEAD}`}>
            We run marketplace growth like operations, not marketing.
          </h1>
          <p className={`text-lg sm:text-xl leading-relaxed max-w-3xl mb-12 ${BODY}`}>
            Epic Global Inc. is an Amazon-first wholesale trade partner that also runs Walmart and international marketplaces. We buy your inventory upfront and pay the ads, fees and fulfillment, for U.S. growth or selling abroad.
          </p>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
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
              <p className={`mt-1 mb-8 text-lg ${MUTED}`}>Founder &amp; CEO</p>
              <p data-story="lit-step" className={`leading-relaxed mb-5 ${BODY}`}>
                {"Glen Jensen is the founder and CEO of Epic Global Inc., an Amazon-first wholesale trade partner and marketplace operator. An entrepreneur who loves building businesses and challenging traditional industry models, he founded Epic on a simple principle: brands deserve a better way to succeed in ecommerce."}
              </p>
              <p data-story="lit-step" className={`leading-relaxed mb-5 ${BODY}`}>
                {"Rather than follow the agency model, Glen built a wholesale partnership that ties Epic's success to its brand partners'. Epic buys the inventory, invests its own capital, and takes on the advertising, logistics and day-to-day execution, so brands grow on Amazon, Walmart, TikTok Shop and other marketplaces without carrying that load."}
              </p>
              <p data-story="lit-step" className={`leading-relaxed ${BODY}`}>
                {"Under Glen, Epic has grown to 42 countries. He believes strong partnerships come from sharing the opportunity, owning the results and committing for the long term, and he keeps moving Epic forward in technology, automation and new markets. His vision is simple:"}
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
            Global marketplace expansion for brands
          </h2>
          <p className={`text-lg leading-relaxed max-w-3xl mb-10 ${BODY}`}>
            Operating across multiple countries and marketplaces with integrated systems.
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
              <h2 className={`${H2} mb-4`}>
                A wholesale trade partner, not an{' '}
                <span className="relative inline-block">
                  agency
                  <span aria-hidden="true" data-story="strike" className={`absolute left-[-4%] right-[-4%] top-[55%] h-[3px] rounded-full ${ACCENT_BG}`} />
                </span>
              </h2>
              <p className={`text-lg leading-relaxed max-w-xl ${BODY}`}>
                We&apos;re not a marketing agency. We&apos;re a wholesale trade partner: we buy the inventory and run the execution ourselves, with repeatable systems instead of one-off projects.
              </p>
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
                See how we execute
              </h2>
              <p className={`text-lg leading-relaxed ${BODY}`}>
                From catalog rebuilds to multi-country expansion, explore real operations and real outcomes.
              </p>
            </div>
            <PopLink href="/case-studies" className="shrink-0 self-start sm:self-auto">
              View Case Studies
            </PopLink>
          </div>
        </div>
      </section>
    </div>
  );
}
