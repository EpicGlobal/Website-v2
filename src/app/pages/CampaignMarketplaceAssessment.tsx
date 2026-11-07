'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, CheckCircle2, Globe2, Package, ShieldCheck } from 'lucide-react';
import { LeadCaptureForm } from '@/app/components/LeadCaptureForm';
import { ChapterMarker, PopLink } from '@/app/components/story/StoryKit';
import { BODY, CHAPTER, H1, H2, HEAD, INNER, LEAD, MUTED, PAGE_BG, QUIET_BUTTON, RULE } from '@/app/components/story/tokens';
import '@/app/components/story/story.css';
import { CARD } from '@/app/components/proof/proofTokens';

/*
 * Marketplace Assessment campaign (Tier 2 proof page, no site navbar). Three numbered chapters in the story-kit
 * layout: the offer, what we assess, and the request form. The form itself (LeadCaptureForm) is unchanged; it sits
 * on a white card in every theme because its fields are styled for a light surface. No pins, no rail, no GSAP.
 */

const proofPoints = [
  'Inventory purchasing model built to reduce brand-side channel risk',
  'Marketplace execution across Amazon, Walmart, eBay, and international channels',
  'Advertising, catalog operations, reporting, and brand protection under one operating cadence',
];

const assessmentAreas = [
  {
    icon: Package,
    title: 'Catalog Readiness',
    description: 'SKU structure, content gaps, fulfillment constraints, and marketplace launch requirements.',
  },
  {
    icon: BarChart3,
    title: 'Channel Performance',
    description: 'Advertising structure, conversion issues, inventory health, and marketplace operating signals.',
  },
  {
    icon: Globe2,
    title: 'Expansion Fit',
    description: 'Regional opportunity, platform sequencing, compliance considerations, and execution path.',
  },
  {
    icon: ShieldCheck,
    title: 'Brand Control',
    description: 'Unauthorized sellers, catalog integrity, policy exposure, and protection priorities.',
  },
];

export function CampaignMarketplaceAssessment() {
  return (
    <div className={PAGE_BG}>
      <header className={`border-b ${RULE} px-4 sm:px-6 lg:px-8`}>
        <div className={`${INNER} flex items-center justify-between gap-4 py-5`}>
          <Link href="/" className={`text-sm font-semibold tracking-[0.18em] ${HEAD}`}>
            EPIC GLOBAL INC.
          </Link>
          <a href="#assessment-form" className={`${QUIET_BUTTON} !px-4 !py-2 text-sm`}>
            Request Assessment
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* 01 The offer: answer first, one main action. */}
      <section id="assessment" className="scroll-mt-20 pt-16 pb-12 sm:pt-20 px-4 sm:px-6 lg:px-8">
        <div className={INNER}>
          <ChapterMarker n={1} label="Marketplace Assessment" />
          <h1 className={`${H1} max-w-4xl`}>
            Find out if Epic can operate and scale your marketplace channel.
          </h1>
          <p className={`${LEAD} mt-6 max-w-3xl`}>
            Epic Global Inc. evaluates marketplace fit, catalog readiness, channel performance,
            and expansion requirements before recommending an operating path.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PopLink href="#assessment-form">
              Request an Assessment
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </PopLink>
            <Link href="/our-model" className={QUIET_BUTTON}>
              View the Model
            </Link>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <li key={point} className={`flex items-start gap-3 border-t pt-4 ${RULE}`}>
                <CheckCircle2 className={`mt-0.5 h-5 w-5 flex-shrink-0 ${HEAD}`} aria-hidden="true" />
                <p className={`text-sm leading-6 ${BODY}`}>{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 What we assess: four areas, settling in as a group. */}
      <section id="assessment-areas" className={`${CHAPTER} !py-12`}>
        <div className={INNER}>
          <ChapterMarker n={2} label="What we assess" />
          <div data-story="fade-up" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {assessmentAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.title} className={`${CARD} p-5`}>
                  <Icon className={`mb-4 h-6 w-6 ${HEAD}`} aria-hidden="true" />
                  <h2 className={`text-base font-semibold ${HEAD}`}>{area.title}</h2>
                  <p className={`mt-2 text-sm leading-6 ${MUTED}`}>{area.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 What you get: the fit check, beside the request form. */}
      <section id="what-you-get" className={`${CHAPTER} !pt-12 !pb-24`}>
        <div className={INNER}>
          <ChapterMarker n={3} label="What You Get" />
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <aside className="lg:sticky lg:top-8">
              <h2 className={H2}>
                A practical fit check before either side commits.
              </h2>
              <p className={`mt-4 text-lg leading-relaxed ${BODY}`}>
                The assessment is intended for brands that want a marketplace operator, not another
                agency handoff. We look at the operating requirements, economics, and channel control
                needed to make the model work.
              </p>
            </aside>

            <div
              id="assessment-form"
              data-story="fade-up"
              className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-[#101828] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] sm:p-6"
            >
              <div className="mb-5">
                <h2 className="text-2xl font-semibold text-slate-950">Request the assessment</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Share a few details and our team will follow up with the right next step.
                </p>
              </div>
              <LeadCaptureForm
                formId="marketplace-assessment"
                placementId="marketplace-assessment-campaign"
                successTitle="Thanks. Your assessment request was submitted."
                successMessage="We will review your marketplace details and follow up with the right next step."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
