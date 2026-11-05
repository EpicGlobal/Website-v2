'use client';

import type { StaticImageData } from 'next/image';
import { useRef } from 'react';
import Link from 'next/link';
import { ShoppingCart, Globe2, Search, BarChart3, Package, Shield, Database, Cpu, ArrowRight } from 'lucide-react';
import { Globe } from '@/app/components/Globe';
import { type LogoTone } from '@/app/components/TrustLogosMarquee';
import { BrandsProof } from '@/app/components/home/BrandsProof';
import { ParticlesBackground } from '@/app/components/ParticlesBackground';
import { StructuredData, founderSchema, getWebPageSchema, organizationSchema, serviceSchemas, websiteSchema } from '@/app/components/StructuredData';
import { SEO } from '@/app/components/SEO';
import { CtaButton } from '@/app/components/CtaButton';
import { CountUp, HorizontalGallery, ScrollHighlightSteps, WordReveal } from '@/app/components/scroll/ScrollEffects';
import { DeferredMount } from '@/app/components/DeferredMount';
import { useScrollStory, type StoryExtra } from '@/app/components/story/useScrollStory';
import { ChapterMarker as KitChapterMarker, ChapterRail } from '@/app/components/story/StoryKit';
import { ACCENT, BODY, CHAPTER, H2, H3, HEAD, INNER, LEAD, MUTED, PAGE_BG, POP_BUTTON, QUIET_BUTTON, RULE } from '@/app/components/story/tokens';
import '@/app/components/story/story.css';
import { CARD, CARD_LINK, ICON_TILE } from '@/app/components/home/homeStyles';
import { useAnalytics } from '@/hooks/useAnalytics';
import { siteConfig } from '@/site/site-config';
import activationLogo from '@/assets/11ff501713732b442477ea6dc6d2ee5695107009.png';
import ageLOCLogo from '@/assets/5cef0eca7ed4e33201516cb198f51116d8fc8260.png';
import ap24Logo from '@/assets/e0b5aa7b1a7ae0ea4d602bfa40a1f28c69508679.png';
import ambrGroupLogo from '@/assets/9d7ed059f58ee9d2d6939faeeaab4f60c3c7ee67.png';
import bonaBotanicaLogo from '@/assets/0c3cf0d40d92c09708e347151b005f3e5596072d.png';
import buckedUpLogo from '@/assets/43335a8bbd39ae86c6992eb00ce2751179d44ceb.png';
import beautyFocusLogo from '@/assets/16be2a2697022ec318fc5dffab604ec08c6ea110.png';
import botalabLogo from '@/assets/22e8e47e93878bd055f3f0784ad51324a14e2e86.png';
import bodeProLogo from '@/assets/dd52d621b52abc573986f37f46a1c4defdf9e2e1.png';
import epochLogo from '@/assets/1a51400c847b43ceb652f7b37844917910e49662.png';
import doctorsBestLogo from '@/assets/986dd0a0a85aa440a5b4d8924b7bdef2acd069ce.png';
import gentlemenRepublicLogo from '@/assets/41f6e55df1fa2c29fdc640f9ef5481334f819ad5.png';
import h2oCardioLogo from '@/assets/6e83860a8e1e07bf9143171faaa89952db9fd600.png';
import iceElementsLogo from '@/assets/398340e50590d80a267db4420b16873a69c96d3c.png';
import incelldermLogo from '@/assets/d7d83b3aba9e9324d0971b91c01187787a9373d2.png';
import lifeningLogo from '@/assets/7050cfcd254a8e6b35a5e7eae127ccf0431d032f.png';
import healthyHomeLogo from '@/assets/c0c4994bde7fe0a435eabb1839c2db5ae0216b51.png';
import heroineMakeLogo from '@/assets/ba0e3491f303ef8e07257a25c46835bd5dba4666.png';
import kLogo from '@/assets/89a47228c49eea9be03629d307026d29fb10245d.png';
import kingsLogo from '@/assets/ddb35a678bf18d6c48db81488df2c1a687976f18.png';
import lifeCiderLogo from '@/assets/55a30c6511b44c8a17c8aff06f5280397091adc5.png';
import makeWellnessLogo from '@/assets/0fd1df88bd92404824795387f70ccee691cd1b04.png';
import novexBiotechLogo from '@/assets/4fd949eb8c616f3359384cec575169ba872f082a.png';
import muscleMooseLogo from '@/assets/911cd3b70129bc626e8a2e32e49c28ce2d0780a8.png';
import midisemLogo from '@/assets/d5bd0fe2ac7d6d0378bc37edf5c072031109480f.png';
import lionStrikeLogo from '@/assets/b818b6f69f5a38c79a1acd6f6d4fc30300fe8a4a.png';
import neumiLogo from '@/assets/80f32a538c28c693808c45eac479be8b6e62adc9.png';
import mixhersLogo from '@/assets/81018778351755f2626aa9ec670f8c62da761311.png';
import madeLogo from '@/assets/96fbb37ae09cd392e4834ec967b0824a22cbedab.png';
import livePureLogo from '@/assets/eef3afdcff3f4eee2911c341c057822192f87ebe.png';
import nowLogo from '@/assets/b4b898dbe9fdbd902dfe9ec3cb4013399a7a6fcb.png';
import phoneSoapLogo from '@/assets/926eb7b011c9ced870fb1fa1a10dc4e82df9fa85.png';
import radiansomeLogo from '@/assets/952b70825f76279daf633b749f52f1eeb7305689.png';
import perfectPressLogo from '@/assets/012ff1bc223010a71f1ed759ebf1618f606042a4.png';
import plexusLogo from '@/assets/56a41e768ec1c8cf98a6c6962f504e0a3e5dba67.png';
import pureFuelLogo from '@/assets/d67ca1954efd70528ba0a525762f054428302858.png';
import pharmanexLogo from '@/assets/21fb64a9aee9200a3ba0b9e6615bba9e7b4d4c5a.png';
import nutricientialsLogo from '@/assets/6210ed77610d27a5f3abdd2bbc3872b72b4a11df.png';
import organoLogo from '@/assets/e1a2b5126b39c8bafb6e331307cdb83cf21fe64e.png';
import nuSkinLogo from '@/assets/5f1a49c0a0b32f372b4ee6beb26a48631d147029.png';
import seroVitalLogo from '@/assets/1f4eed43c7961e335dc19e64a0f05334073cd6e2.png';
import suteraLogo from '@/assets/967c8426adebcc2a86cafe0b4d49f813b966b007.png';
import thriveLogo from '@/assets/6ad188b6a295f7b6d96be106d8d12fdd6566ebdd.png';
import tranontLogo from '@/assets/3efbc93baa925523f1affbf3643d8d528af7d0d7.png';
import simmtronicsLogo from '@/assets/9ca3201fd54a521494c7b90bc2f6e0221727094f.png';
import thinkSmarterProductsLogo from '@/assets/b1e2ea523335f184b5f55c9775f5ada284f6b125.png';
import truvyLogo from '@/assets/3197f3ef0c1a8b4d9a4dc10ca2db8bc2093cc26f.png';
import reuzelLogo from '@/assets/883f18fa753a7106216503ca3c6ef72d1178fcf1.png';
import relacoreLogo from '@/assets/960c114fb5ef207b865b392e3414a92fa2a538e7.png';
import rfLogo from '@/assets/7df4db1a84b40fbea8116e0deab0bac19dd891bf.png';
import youngLivingLogo from '@/assets/Young-Living-logo.png';
import youniqueLogo from '@/assets/7762de3ef51cb8cc05069238ad5ebc05c432ec99.png';
import zantrexLogo from '@/assets/a02203de0f65132ee8277243eb83905610259bc6.png';
import ziveLogo from '@/assets/bac9c727078929bc5f7386af4f562d2fe9fefe30.png';

/*
 * Homepage as one scroll story, in the order from the brand rules: hero ("We Buy It. You Profit.") -> trust logos
 * and proof strip -> capabilities -> Buy-Sell-Advertise-Protect -> case studies -> company facts -> final CTA.
 * Each chapter opens with a numbered marker and the chapter rail (wide screens) shows where you are. The page's
 * two pins are Brex's approved effects (HorizontalGallery for the capabilities, ScrollHighlightSteps for the
 * model); the story kit adds no pins of its own here. Phones get the same text as a calm static page.
 */

const CHAPTERS = [
  { id: 'wholesale-trade-partner', label: 'Wholesale trade partner' },
  { id: 'brands', label: 'Brands we work with' },
  { id: 'capabilities', label: 'What we run' },
  { id: 'model', label: 'Buy, Sell, Advertise, Protect' },
  { id: 'case-studies', label: 'How we execute' },
  { id: 'company-facts', label: 'Company facts' },
  { id: 'next-step', label: 'Next step' },
] as const;

type ChapterId = (typeof CHAPTERS)[number]['id'];

/** The final call-to-action chapter only exists while booking a call is switched on. */
const VISIBLE_CHAPTERS = CHAPTERS.filter((c) => c.id !== 'next-step' || siteConfig.bookACallEnabled);

function ChapterMarker({ id, accent }: { id: ChapterId; accent?: string }) {
  const n = VISIBLE_CHAPTERS.findIndex((c) => c.id === id) + 1;
  return <KitChapterMarker n={n} label={CHAPTERS.find((c) => c.id === id)!.label} accent={accent} />;
}

/** Homepage's one-off beat: the hero dims and lifts away as the brands chapter rises over it (no pin). */
const homeBeats: StoryExtra = (gsap, _ScrollTrigger, root) => {
  const hero = root.querySelector<HTMLElement>('#wholesale-trade-partner');
  const heroInner = root.querySelector<HTMLElement>('[data-story="hero-inner"]');
  if (!hero || !heroInner) return;
  gsap.to(heroInner, {
    opacity: 0.25, y: -40, scale: 0.97, transformOrigin: 'left top', ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom 15%', scrub: 0.6 },
  });
};

export function Home() {
  const { trackClick } = useAnalytics();
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollStory(rootRef, homeBeats);

  const brands: { name: string; logo: StaticImageData; tone?: LogoTone }[] = [
    { name: 'ACTIVATION', logo: activationLogo, tone: 'dark' },
    { name: 'ageLOC', logo: ageLOCLogo },
    { name: 'AP 24', logo: ap24Logo, tone: 'pale' },
    { name: 'Ambr Group', logo: ambrGroupLogo, tone: 'dark' },
    { name: 'BONA BOTANICA', logo: bonaBotanicaLogo, tone: 'dark' },
    { name: 'BUCKED UP', logo: buckedUpLogo },
    { name: 'BEAUTY FOCUS', logo: beautyFocusLogo },
    { name: 'botalab', logo: botalabLogo, tone: 'dark' },
    { name: 'bode PRO', logo: bodeProLogo, tone: 'deep' },
    { name: 'epoch', logo: epochLogo, tone: 'deep' },
    { name: "Doctor's BEST", logo: doctorsBestLogo, tone: 'pale' },
    { name: 'Gentlemen Republic', logo: gentlemenRepublicLogo, tone: 'dark' },
    { name: 'H2O CARDIO', logo: h2oCardioLogo, tone: 'dark' },
    { name: 'ICE ELEMENTS', logo: iceElementsLogo, tone: 'dark' },
    { name: 'INCELLDERM', logo: incelldermLogo, tone: 'dark' },
    { name: 'Lifening', logo: lifeningLogo, tone: 'dark' },
    { name: 'HEALTHY home', logo: healthyHomeLogo },
    { name: 'heroine make', logo: heroineMakeLogo, tone: 'light' },
    { name: 'K', logo: kLogo, tone: 'light' },
    { name: 'KINGS', logo: kingsLogo, tone: 'light' },
    { name: 'life cider', logo: lifeCiderLogo },
    { name: 'MAKE WELLNESS', logo: makeWellnessLogo, tone: 'light' },
    { name: 'Novex Biotech', logo: novexBiotechLogo, tone: 'dark' },
    { name: 'MUSCLE MOOSE', logo: muscleMooseLogo, tone: 'deep' },
    { name: 'MIDISEM', logo: midisemLogo },
    { name: 'lionstrike', logo: lionStrikeLogo, tone: 'dark' },
    { name: 'neumi', logo: neumiLogo, tone: 'dark' },
    { name: 'mixhers', logo: mixhersLogo },
    { name: 'made', logo: madeLogo, tone: 'dark' },
    { name: 'Live PURE', logo: livePureLogo, tone: 'dark' },
    { name: 'NOW Foods', logo: nowLogo, tone: 'deep' },
    { name: 'PHONESOAP', logo: phoneSoapLogo },
    { name: 'RADIANSOME', logo: radiansomeLogo, tone: 'dark' },
    { name: 'PERFECT PRESS', logo: perfectPressLogo, tone: 'dark' },
    { name: 'plexus', logo: plexusLogo },
    { name: 'PURE FUEL', logo: pureFuelLogo, tone: 'dark' },
    { name: 'PHARMANEX', logo: pharmanexLogo, tone: 'pale' },
    { name: 'NUTRICENTIALS', logo: nutricientialsLogo, tone: 'light' },
    { name: 'ORGANO', logo: organoLogo, tone: 'deep' },
    { name: 'NU SKIN', logo: nuSkinLogo, tone: 'deep' },
    { name: 'SeroVital', logo: seroVitalLogo, tone: 'dark' },
    { name: 'sutera', logo: suteraLogo, tone: 'dark' },
    { name: 'thrive', logo: thriveLogo, tone: 'deep' },
    { name: 'TRANONT', logo: tranontLogo, tone: 'dark' },
    { name: 'Simmtronics', logo: simmtronicsLogo, tone: 'dark' },
    { name: 'Think Smarter Products', logo: thinkSmarterProductsLogo, tone: 'deep' },
    { name: 'Truvy', logo: truvyLogo, tone: 'dark' },
    { name: 'REUZEL', logo: reuzelLogo, tone: 'dark' },
    { name: 'RELACORE', logo: relacoreLogo, tone: 'dark' },
    { name: 'Rodan + Fields', logo: rfLogo, tone: 'pale' },
    { name: 'Young Living', logo: youngLivingLogo, tone: 'pale' },
    { name: 'Younique', logo: youniqueLogo, tone: 'dark' },
    { name: 'Zantrex', logo: zantrexLogo, tone: 'dark' },
    { name: 'Zive', logo: ziveLogo, tone: 'dark' },
  ];

  const capabilities = [
    {
      icon: ShoppingCart,
      title: 'Marketplace Management',
      description: 'End-to-end operations across Amazon, Walmart, eBay, and international platforms.',
    },
    {
      icon: Globe2,
      title: 'Global Expansion',
      description: 'Repeatable launch system for new marketplaces: account setup, listing deployment, and go-live coordination.',
    },
    {
      icon: Search,
      title: 'Listing Optimization',
      description: 'Title structure, attribute mapping, keyword placement, and conversion-focused creative.',
    },
    {
      icon: BarChart3,
      title: 'Advertising Operations',
      description: 'Campaign architecture, bid management, creative rotation, and performance analysis.',
    },
    {
      icon: Package,
      title: 'Inventory + Forecasting',
      description: 'Demand planning, marketplace allocation, reorder triggers, and inventory health monitoring.',
    },
    {
      icon: Shield,
      title: 'Brand Protection & MAP Enforcement',
      description: 'Unauthorized seller removal, MAP enforcement, IP enforcement, catalog integrity, and marketplace policy monitoring.',
    },
    {
      icon: Database,
      title: 'Data + Reporting Layer',
      description: 'Unified dashboards, SKU-level attribution, regional performance, and actionable insights.',
    },
    {
      icon: Cpu,
      title: 'Execution Engine',
      description: 'We use internal systems, automation, and bulk operations to keep catalogs clean, changes consistent, and execution fast across marketplaces.',
    },
  ];

  const featuredCases = [
    {
      pillar: 'Sell · Advertise · Protect',
      title: 'Sutera: Lower Fees, Higher Conversion, Branded Search Won Back',
      marketplace: 'Amazon US',
      region: 'North America',
      objective: 'Cut FBA fees on 18 of 21 products, lift conversion 21% in A/B tests and win back branded search from competitors',
      link: '/case-studies#sutera',
    },
    {
      pillar: 'Buy · Sell',
      title: 'Auto Parts Brand: Amazon 1P vs Epic 3P',
      marketplace: 'Amazon US',
      region: 'North America',
      objective: 'Move from Amazon 1P to Epic 3P: the brand pays no Amazon fees and nets more per unit',
      link: '/case-studies#auto-parts-1p-vs-3p',
    },
  ];

  const entityFacts = [
    {
      label: 'Company',
      value: 'Epic Global Inc.',
      detail: 'Amazon-first wholesale trade partner for 50+ brands',
    },
    {
      label: 'Founder',
      value: 'Glen Jensen',
      detail: 'Founder and operator of the Epic model',
    },
    {
      label: 'Headquarters',
      value: 'Lindon, Utah, USA',
      detail: 'Built for North America and international expansion',
    },
    {
      label: 'Business model',
      value: 'Buy, Sell, Advertise, Protect',
      detail: 'Epic buys inventory, operates channels, funds ads, and protects brand equity',
    },
    {
      label: 'Market coverage',
      value: '~40 countries',
      detail: 'Operating in about 40 countries and growing',
    },
    {
      label: 'Primary marketplaces',
      value: 'Amazon, Walmart, eBay',
      detail: 'Plus select international platforms. 4.9/5 seller rating on Amazon US from 9,600+ ratings (Oct 2026)',
    },
  ];

  const model = [
    { icon: ShoppingCart, num: '01', title: 'Buy', desc: 'Epic buys your inventory upfront at an agreed wholesale price, turning it into cash for the brand. We own the inventory and take on the retail execution risk.', tagline: 'Cash now. We own the stock.' },
    { icon: Globe2, num: '02', title: 'Sell', desc: 'Epic operates listings and storefronts on Amazon first, plus Walmart and international marketplaces, using a unified operational framework.', tagline: 'One system. Every market.' },
    { icon: BarChart3, num: '03', title: 'Advertise', desc: 'Epic funds and manages all advertising in the U.S. and abroad. Campaigns are optimized for efficiency and profitability, not budget utilization.', tagline: 'We fund. We optimize.' },
    { icon: Shield, num: '04', title: 'Protect', desc: 'Through the Brand Protection Command Center, Epic enforces pricing integrity, removes unauthorized sellers, and defends branded search demand globally.', tagline: 'Your brand. Our defense.' },
  ];

  return (
    <div ref={rootRef} className={PAGE_BG}>
      <SEO
        title="Epic Global Inc. - Wholesale Trade Partner for Amazon Brands"
        description="Epic Global buys your inventory upfront at wholesale, sells it on Amazon, Walmart and more in about 40 countries, funds the ads and protects your brand."
        canonicalUrl={`${siteConfig.url}/`}
        keywords="global commerce operator, ecommerce operator, marketplace expansion, amazon FBA, international ecommerce, wholesale trade partner"
      />
      <StructuredData data={organizationSchema} />
      <StructuredData data={founderSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={getWebPageSchema('Home', `${siteConfig.url}`, 'Amazon-first wholesale trade partner that buys inventory and sells it on Amazon, plus Walmart and international marketplaces')} />
      {serviceSchemas.map((schema) => (
        <StructuredData key={schema['@id']} data={schema} />
      ))}

      {/* Chapter rail (wide screens): real links to each chapter; the line fills as you read. */}
      <ChapterRail chapters={VISIBLE_CHAPTERS} label="Homepage chapters" />

      {/* 01 Hero: the answer first. Dims and lifts away as the brands chapter rises over it (desktop). */}
      <section id="wholesale-trade-partner" data-chapter className="relative scroll-mt-20 pt-32 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative: loads after the text and buttons, when the browser is idle */}
        <DeferredMount>
          <ParticlesBackground />
        </DeferredMount>

        <div data-story="hero-inner" className={`relative z-10 ${INNER}`}>
          <ChapterMarker id="wholesale-trade-partner" accent="text-[var(--pop)] orange:text-[#101828]" />
          {/* Text and globe share one row, centered on each other (desktop). On phones the globe sits faintly behind the text. */}
          <div className="relative lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-center lg:gap-10">
            <div className="relative z-10">
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 ${HEAD}`}>
                We Buy It. You Profit.&trade;
              </h1>
              <p className={`${LEAD} max-w-3xl mb-10`}>
                Epic Global Inc. is a wholesale trade partner and <strong className={`font-semibold ${HEAD}`}>Zero-Risk Global Commerce Operator</strong>. We buy your inventory upfront at wholesale, run your storefronts on Amazon first, plus Walmart and international marketplaces, and pay for the advertising, marketplace fees and fulfillment ourselves. Buy. Sell. Advertise. Protect.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <CtaButton variant="primary" size="lg" location="Hero Section" />
                <Link
                  href="/case-studies"
                  onClick={() => trackClick('View Case Studies', 'CTA Button', { location: 'Hero Section' })}
                  className={siteConfig.bookACallEnabled ? QUIET_BUTTON : POP_BUTTON}
                >
                  View Case Studies
                </Link>
              </div>
            </div>
            {/* Decorative: loads after the text and buttons, when the browser is idle */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-30 lg:static lg:opacity-60 lg:aspect-square">
              <DeferredMount>
                <div className="relative h-full w-full animate-[fadeIn_1s_ease-out]">
                  <Globe darkerParticles={true} />
                </div>
              </DeferredMount>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Brands we work with: the trust logos, then the proof strip (real numbers in the HTML; they count up once on screen). */}
      <section id="brands" data-chapter aria-label="Epic Global Inc. at a glance" className={CHAPTER}>
        <BrandsProof brands={brands} marker={<ChapterMarker id="brands" />} />
      </section>

      {/* 03 What we run: the 8 capability cards slide sideways while the chapter is pinned (HorizontalGallery). */}
      <section id="capabilities" data-chapter className={CHAPTER}>
        <div className="max-w-7xl mx-auto">
          <HorizontalGallery
            staticClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            header={
              <div className="mb-8">
                <ChapterMarker id="capabilities" />
                <h2 className={`${H2} mb-4`}>Full-stack Amazon and Walmart marketplace operations</h2>
                <p className={`${LEAD} max-w-2xl`}>
                  Every capability required to run marketplaces as a system, not a collection of one-off tasks.
                </p>
              </div>
            }
          >
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <div key={capability.title} className={`${CARD} p-6 flex flex-col h-full min-h-[200px]`}>
                  <div className={`${ICON_TILE} mb-4`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${HEAD}`}>{capability.title}</h3>
                  <p className={`text-sm leading-relaxed ${BODY}`}>{capability.description}</p>
                </div>
              );
            })}
          </HorizontalGallery>
        </div>
      </section>

      {/* 04 Buy, Sell, Advertise, Protect: the chapter pins and each card lights up in turn (ScrollHighlightSteps). */}
      <section id="model" data-chapter className={CHAPTER}>
        <div className="max-w-7xl mx-auto">
          <ScrollHighlightSteps
            header={
              <>
                <ChapterMarker id="model" />
                <WordReveal
                  lines={['We own the inventory.', 'You keep the brand.']}
                  className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-5 pb-1 ${HEAD}`}
                />
                <p className={`${LEAD} max-w-3xl mb-8`}>
                  Epic operates through the Buy-Sell-Advertise-Protect model, which governs both U.S. and global execution. We assume inventory ownership, operate storefronts directly, fund advertising, and protect brand equity, all under one unified structure.
                </p>
              </>
            }
            cards={model.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className={`${CARD} relative h-full p-6`}>
                  <div aria-hidden="true" className={`absolute top-5 right-6 text-4xl font-bold tabular-nums opacity-20 ${HEAD}`}>
                    {card.num}
                  </div>
                  <div className={`${ICON_TILE} mb-6`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className={`${H3} mb-3`}>{card.title}</h3>
                  <p className={`mb-4 leading-relaxed ${BODY}`}>{card.desc}</p>
                  <p className={`text-sm font-semibold ${ACCENT}`}>{card.tagline}</p>
                </div>
              );
            })}
            footer={
              siteConfig.bookACallEnabled ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <CtaButton variant="secondary" size="md" location="Model Section" />
                </div>
              ) : null
            }
          />
        </div>
      </section>

      {/* 05 How we execute: two featured case studies settle in, then the way to all of them. */}
      <section id="case-studies" data-chapter className="scroll-mt-20 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className={INNER}>
          <ChapterMarker id="case-studies" />
          <h2 className={`${H2} mb-4`}>How we execute</h2>
          <p className={`${LEAD} max-w-2xl mb-10`}>
            Real outcomes from real operations, organized around the operating model behind our marketplace execution.
          </p>

          <div data-story="fade-up" className="grid md:grid-cols-2 gap-6 mb-10">
            {featuredCases.map((caseStudy) => (
              <Link key={caseStudy.link} href={caseStudy.link} className={`${CARD_LINK} group p-6 h-full`}>
                <p className={`text-sm font-semibold mb-3 ${ACCENT}`}>{caseStudy.pillar}</p>
                <h3 className={`text-lg font-semibold mb-3 ${HEAD}`}>{caseStudy.title}</h3>
                <div className={`space-y-1 mb-4 text-sm ${MUTED}`}>
                  <p>
                    <span className={`font-medium ${HEAD}`}>Marketplace:</span> {caseStudy.marketplace}
                  </p>
                  <p>
                    <span className={`font-medium ${HEAD}`}>Region:</span> {caseStudy.region}
                  </p>
                </div>
                <p className={`text-sm leading-relaxed mb-5 ${BODY}`}>{caseStudy.objective}</p>
                <span className={`inline-flex items-center gap-2 text-sm font-semibold ${ACCENT}`}>
                  View case study
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          <Link href="/case-studies" className={QUIET_BUTTON}>
            View all case studies
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 06 Company facts: the answer an AI assistant or analyst checks, in plain text. */}
      <section id="company-facts" data-chapter className="scroll-mt-20 pt-4 pb-20 px-4 sm:px-6 lg:px-8">
        <div className={INNER}>
          <ChapterMarker id="company-facts" />
          <h2 className={`${H2} mb-4`}>Company Facts</h2>
          <p className={`text-base sm:text-lg leading-relaxed max-w-3xl mb-10 ${BODY}`}>
            Epic Global Inc. is an Amazon-first wholesale trade partner and marketplace operator that buys inventory at wholesale, manages marketplace sales channels, funds advertising, and handles brand protection. The company is led by Glen Jensen, has sold on Amazon since 2015, and also operates on Walmart, eBay, and select international marketplaces with a system built around the Buy, Sell, Advertise, Protect model.
          </p>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entityFacts.map((fact) => (
              <div key={fact.label} className={`${CARD} p-5`}>
                <dt className={`text-sm mb-2 ${MUTED}`}>{fact.label}</dt>
                <dd>
                  <p className={`text-lg font-semibold mb-2 ${HEAD}`}>{fact.value}</p>
                  <p className={`text-sm leading-relaxed ${BODY}`}>{fact.detail}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 07 Next step: the closing call to action (only while booking a call is switched on). */}
      {siteConfig.bookACallEnabled ? (
        <section id="next-step" data-chapter className="scroll-mt-20 pt-16 pb-24 px-4 sm:px-6 lg:px-8">
          <div data-story="fade-up" className={INNER}>
            <ChapterMarker id="next-step" />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-5 ${HEAD}`}>
                  Ready for an operator model,<br />not another agency?
                </h2>
                <p className={`${LEAD}`}>
                  If you want execution that looks like a system, let&apos;s map your next 90 days.
                </p>
              </div>
              <CtaButton variant="primary" size="lg" location="Final CTA Section" className="shrink-0 self-start md:self-auto" />
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
