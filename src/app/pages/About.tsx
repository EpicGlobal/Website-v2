'use client';

import image_7827c6003ae306e0f9f630e11162a9aa55ffdd3f from '@/assets/7827c6003ae306e0f9f630e11162a9aa55ffdd3f.png';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { Linkedin } from 'lucide-react';
import { StructuredData, founderSchema, getBreadcrumbSchema, getWebPageSchema, organizationSchema, organizationRef } from '@/app/components/StructuredData';
import { SEO } from '@/app/components/SEO';
import { GlobalReachMap } from '@/app/components/GlobalReachMap';
import { useAboutScrollStory } from '@/app/components/about/useAboutScrollStory';
import '@/app/components/about/about-story.css';
import { siteConfig } from '@/site/site-config';

/*
 * About page as one scroll story in five chapters. Each chapter opens with a numbered marker whose rule draws in
 * as it arrives, and a chapter rail on the right (wide screens) shows where you are. On desktop the hero and the
 * "not an agency" chapter pin while their beats play; the founder chapter keeps the portrait in place while the
 * bio scrolls past it. Phones and reduced-motion visitors get the same text as a calm static page.
 */

const HEAD = 'text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900';
const BODY = 'text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700';
const MUTED = 'text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700';
const RULE = 'border-white/15 dark:border-white/15 soft-dark:border-gray-300 light:border-gray-200 orange:border-[#101828]/20 leaf:border-gray-400/40 water:border-gray-400/40';
/** Accent text: the pop color, except in the orange theme where pop orange is too light for small text. */
const ACCENT = 'text-[var(--pop)] orange:text-orange-800';
const ACCENT_BG = 'bg-[var(--pop)] orange:bg-[#101828]';

const CHAPTERS = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'founder', label: 'Who runs Epic' },
  { id: 'global-reach', label: 'Where we operate' },
  { id: 'how-we-work', label: 'How we are different' },
  { id: 'next', label: 'See the work' },
] as const;

const QUOTE =
  "A company that doesn't just advise brands on how to grow, but invests alongside them and takes responsibility for making that growth happen.";

function ChapterMarker({ n, accent = ACCENT }: { n: number; accent?: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className={`text-sm font-semibold tabular-nums ${accent}`}>{String(n).padStart(2, '0')}</span>
      <span className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] ${BODY}`}>{CHAPTERS[n - 1].label}</span>
      <span aria-hidden="true" data-story="rule" className={`flex-1 border-t ${RULE}`} />
    </div>
  );
}

export function About() {
  const rootRef = useRef<HTMLDivElement>(null);
  useAboutScrollStory(rootRef);

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
    description: "Epic Global Inc. is a wholesale trade partner and global marketplace operator led by Glen Jensen: we buy brands' inventory at wholesale and sell it on Amazon, Walmart and other marketplaces, paying for the advertising, fees and fulfillment.",
    mainEntity: organizationRef,
  });

  return (
    <div ref={rootRef} className="min-h-screen text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 bg-gradient-to-br dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:from-lime-500 water:via-lime-100 water:to-white orange:from-[#F68932] orange:via-orange-100 orange:to-white">
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
      <nav aria-label="About page chapters" className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:block print:hidden">
        <div aria-hidden="true" className="absolute right-[5px] top-3 bottom-3 w-0.5 rounded-full bg-gray-400/35 overflow-hidden">
          <div data-story="rail-fill" className={`h-full w-full rounded-full ${ACCENT_BG}`} />
        </div>
        <ol className="relative space-y-5">
          {CHAPTERS.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                data-rail-link={c.id}
                className={`group flex items-center justify-end gap-3 py-1 text-xs font-semibold ${HEAD}`}
              >
                <span className="whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 2xl:group-aria-[current=step]:opacity-100">
                  {c.label}
                </span>
                <span className="h-3 w-3 shrink-0 rounded-full border-2 border-current transition-colors duration-300 group-aria-[current=step]:bg-current" />
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* 01 Who we are: answer first, then the facts people check. Pins briefly on desktop. */}
      <section id="who-we-are" data-chapter="hero" className="scroll-mt-20 min-h-[100svh] flex items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div data-story="hero-inner" className="max-w-5xl mx-auto w-full">
          <ChapterMarker n={1} accent="text-[var(--pop)] orange:text-[#101828]" />
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.08] max-w-4xl ${HEAD}`}>
            We run marketplace growth like operations, not marketing.
          </h1>
          <p className={`text-lg sm:text-xl leading-relaxed max-w-3xl mb-5 ${BODY}`}>
            Epic Global Inc. is a wholesale trade partner and global marketplace operator. We buy your inventory upfront at wholesale, run your marketplace storefronts end to end, pay for the advertising, marketplace fees and fulfillment, and protect your brand. We own the inventory, so the retail execution risk is ours.
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
      <section id="founder" data-chapter="founder" className="scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
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
              <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${HEAD}`}>Glen Jensen</h2>
              <p className={`mt-1 mb-8 text-lg ${MUTED}`}>Founder &amp; CEO</p>
              <p data-story="bio-step" className={`leading-relaxed mb-5 ${BODY}`}>
                {"Glen Jensen is the founder and CEO of Epic Global Inc., a wholesale trade partner and global marketplace operator. Epic buys brands' inventory and sells it on Amazon, Walmart, TikTok Shop and other leading marketplaces, so brands can grow without running those marketplaces themselves."}
              </p>
              <p data-story="bio-step" className={`leading-relaxed mb-5 ${BODY}`}>
                {"Instead of following the agency model, Glen built Epic on a wholesale partnership that ties Epic's success to the brand's. Epic buys the inventory upfront, invests its own capital, and takes responsibility for marketplace advertising, logistics and day-to-day execution. Brands reach more marketplaces without carrying that financial and operational load."}
              </p>
              <p data-story="bio-step" className={`leading-relaxed mb-5 ${BODY}`}>
                {"Under Glen's leadership, Epic has grown into an international company operating in about 40 countries across North and South America, Europe and Asia-Pacific. Every partner's brand equity is protected: the brand keeps its Brand Registry, and Epic enforces its minimum advertised price and works to remove unauthorized sellers."}
              </p>
              <p data-story="bio-step" className={`leading-relaxed ${BODY}`}>
                {"Glen's approach centers on innovation, accountability and execution, with a forward-looking focus on technology and automation. His vision is simple:"}
              </p>
              <blockquote data-story="quote" className="mt-8">
                <p className={`text-2xl sm:text-3xl font-semibold leading-snug tracking-tight ${HEAD}`}>
                  <span aria-hidden="true" className="block text-6xl leading-none h-8 text-[var(--pop)]">&ldquo;</span>
                  {QUOTE.split(' ').map((word, i, words) => (
                    <span key={i} data-story="quote-word">
                      {i < words.length - 1 ? `${word} ` : word}
                    </span>
                  ))}
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Where we operate: the map rises into place (native CSS scroll timeline). It stays unpinned so its
          own wheel zoom and drag never fight the page scroll. */}
      <section id="global-reach" data-chapter="reach" className="scroll-mt-20 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ChapterMarker n={3} />
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${HEAD}`}>
            Global marketplace expansion for brands
          </h2>
          <p className={`text-lg leading-relaxed max-w-3xl mb-10 ${BODY}`}>
            Operating across multiple countries and marketplaces with integrated systems.
          </p>
          <div data-story="map-rise">
            <GlobalReachMap />
          </div>
        </div>
      </section>

      {/* 04 How we are different: pins on desktop while "agency" is struck out and the three differences step in. */}
      <section id="how-we-work" data-chapter="different" className="scroll-mt-20 min-h-[100svh] flex items-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto w-full">
          <ChapterMarker n={4} />
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${HEAD}`}>
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
            <div className="relative pl-8">
              <div aria-hidden="true" data-story-meter="" className="absolute left-0 top-1 bottom-1 w-[3px] overflow-hidden rounded-full bg-gray-400/30">
                <div data-story="diff-meter" className={`h-full w-full rounded-full ${ACCENT_BG}`} />
              </div>
              <ol className="space-y-8">
                {differentiators.map((item, i) => (
                  <li key={item.title} data-story="diff-item">
                    <span aria-hidden="true" className={`block text-sm font-semibold tabular-nums mb-1 ${ACCENT}`}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className={`text-xl font-semibold mb-2 ${HEAD}`}>{item.title}</h3>
                    <p className={`leading-relaxed ${BODY}`}>{item.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 05 See the work: the story hands off to the case studies. */}
      <section id="next" data-chapter="next" className="scroll-mt-20 pt-16 pb-28 px-4 sm:px-6 lg:px-8">
        <div data-story="cta-rise" className="max-w-5xl mx-auto">
          <ChapterMarker n={5} />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${HEAD}`}>
                See how we execute
              </h2>
              <p className={`text-lg leading-relaxed ${BODY}`}>
                From catalog rebuilds to multi-country expansion, explore real operations and real outcomes.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="shrink-0 self-start sm:self-auto px-8 py-3.5 rounded-lg bg-[var(--pop)] text-[var(--on-pop)] font-semibold hover:bg-[var(--pop-hover)] transition-colors shadow-lg shadow-black/20 text-base"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
