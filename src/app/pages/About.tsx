'use client';

import image_7827c6003ae306e0f9f630e11162a9aa55ffdd3f from '@/assets/7827c6003ae306e0f9f630e11162a9aa55ffdd3f.png';
import Image from 'next/image';
import { useRef } from 'react';
import { Linkedin } from 'lucide-react';
import { StructuredData, founderSchema, getBreadcrumbSchema, getWebPageSchema, organizationSchema, organizationRef } from '@/app/components/StructuredData';
import { SEO } from '@/app/components/SEO';
import { GlobalReachMap } from '@/app/components/GlobalReachMap';
import { useScrollStory, type StoryExtra } from '@/app/components/story/useScrollStory';
import { ChapterMarker as KitChapterMarker, ChapterRail, PopLink, StepList, WordFill } from '@/app/components/story/StoryKit';
import { ACCENT_BG, BODY, CHAPTER, H2, HEAD, INNER, MUTED, PAGE_BG } from '@/app/components/story/tokens';
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

/** About's one-off beats: the hero pins while the facts underline, then hands off to the founder chapter. */
const aboutBeats: StoryExtra = (gsap, _ScrollTrigger, root) => {
  const one = (sel: string) => root.querySelector<HTMLElement>(sel);
  const hero = one('[data-chapter="hero"]');
  const founder = one('#founder');
  if (hero) {
    gsap
      .timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: hero, start: 'top top', end: '+=25%', pin: true, scrub: 0.6 } })
      .from(root.querySelectorAll('[data-story="fact-bar"]'), { scaleX: 0, transformOrigin: 'left center', duration: 1, stagger: 0.6 })
      .to({}, { duration: 0.4 });
    if (founder) {
      gsap.to(one('[data-story="hero-inner"]'), {
        opacity: 0.2, y: -40, scale: 0.97, transformOrigin: 'left top', ease: 'none',
        scrollTrigger: { trigger: founder, start: 'top bottom', end: 'top 25%', scrub: 0.6 },
      });
    }
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

  const facts = [
    { label: 'On Amazon since', value: '2015' },
    { label: 'Headquarters', value: 'Lindon, Utah' },
    { label: 'Countries', value: '~40' },
    { label: 'Brands', value: '50+' },
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
      <SEO
        title="About Epic Global Inc. - Wholesale Trade Partner"
        description="Epic Global Inc. is a wholesale trade partner and global marketplace operator: we buy brands' inventory and run marketplace operations in about 40 countries."
        canonicalUrl={`${siteConfig.url}/about`}
        keywords="commerce operator, marketplace management, global ecommerce, operator-first approach, marketplace technology"
      />
      <StructuredData data={organizationSchema} />
      <StructuredData data={founderSchema} />
      <StructuredData data={aboutPageSchema} />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: `${siteConfig.url}/` },
          { name: 'About', url: `${siteConfig.url}/about` },
        ])}
      />

      {/* Chapter rail (wide screens): real links to each chapter; the line fills as you read. */}
      <ChapterRail chapters={CHAPTERS} label="About page chapters" />

      {/* 01 Who we are: answer first, then the facts people check. Pins briefly on desktop. */}
      <section id="who-we-are" data-chapter="hero" className="scroll-mt-20 pt-28 lg:pt-36 pb-6 px-4 sm:px-6 lg:px-8">
        <div data-story="hero-inner" className="max-w-5xl mx-auto w-full">
          <ChapterMarker n={1} accent="text-[var(--pop)] orange:text-[#101828]" />
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.08] max-w-4xl ${HEAD}`}>
            We run marketplace growth like operations, not marketing.
          </h1>
          <p className={`text-lg sm:text-xl leading-relaxed max-w-3xl mb-5 ${BODY}`}>
            Epic Global Inc. is an Amazon-first wholesale trade partner that also runs Walmart and international marketplaces. We buy your inventory upfront at wholesale, run your storefronts end to end, pay for the advertising, marketplace fees and fulfillment, and protect your brand. We own the inventory, so the retail execution risk is ours.
          </p>
          <p className={`text-lg leading-relaxed max-w-3xl mb-12 ${MUTED}`}>
            The same model works for U.S. growth and international expansion: whether a brand is underperforming in the United States, losing margin to fees, or getting ready to sell abroad.
          </p>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className={`text-sm ${MUTED}`}>
                  <span aria-hidden="true" data-story="fact-bar" className={`block h-[3px] w-12 mb-4 rounded-full ${ACCENT_BG}`} />
                  {f.label}
                </dt>
                <dd className={`text-2xl font-semibold mt-1 tabular-nums ${HEAD}`}>{f.value}</dd>
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
                {"Glen Jensen is the founder and CEO of Epic Global Inc., an Amazon-first wholesale trade partner. Epic buys brands' inventory and sells it on Amazon, plus Walmart, TikTok Shop and other leading marketplaces, so brands can grow without running those marketplaces themselves."}
              </p>
              <p data-story="lit-step" className={`leading-relaxed mb-5 ${BODY}`}>
                {"Instead of following the agency model, Glen built Epic on a wholesale partnership that ties Epic's success to the brand's. Epic buys the inventory upfront, invests its own capital, and takes responsibility for marketplace advertising, logistics and day-to-day execution. Brands reach more marketplaces without carrying that financial and operational load."}
              </p>
              <p data-story="lit-step" className={`leading-relaxed mb-5 ${BODY}`}>
                {"Under Glen's leadership, Epic has grown into an international company operating in about 40 countries across North and South America, Europe and Asia-Pacific. Every partner's brand equity is protected: the brand keeps its Brand Registry, and Epic enforces its minimum advertised price and works to remove unauthorized sellers."}
              </p>
              <p data-story="lit-step" className={`leading-relaxed ${BODY}`}>
                {"Glen's approach centers on innovation, accountability and execution, with a forward-looking focus on technology and automation. His vision is simple:"}
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
