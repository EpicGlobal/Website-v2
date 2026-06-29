'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, CheckCircle2, Globe2, Package, ShieldCheck } from 'lucide-react';
import { HubSpotFormEmbed } from '@/app/components/HubSpotFormEmbed';

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
    <main className="min-h-screen bg-[#f6f7f9] text-[#101828]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm font-semibold tracking-[0.18em] text-slate-950">
            EPIC GLOBAL INC.
          </Link>
          <a
            href="#assessment-form"
            className="inline-flex items-center gap-2 rounded-md bg-[#101828] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#24324a]"
          >
            Request Assessment
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-orange-700">
              Marketplace Assessment
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Find out if Epic can operate and scale your marketplace channel.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Epic Global Inc. evaluates marketplace fit, catalog readiness, channel performance,
              and expansion requirements before recommending an operating path.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#assessment-form"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700"
              >
                Request an Assessment
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link
                href="/our-model"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                View the Model
              </Link>
            </div>

            <div className="mt-8 space-y-3">
              {proofPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
                  <p className="text-sm leading-6 text-slate-700">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              {assessmentAreas.map((area) => {
                const Icon = area.icon;

                return (
                  <div key={area.title} className="border border-slate-200 bg-white p-5">
                    <Icon className="mb-4 h-6 w-6 text-orange-600" />
                    <h2 className="text-base font-semibold text-slate-950">{area.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{area.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <aside className="lg:sticky lg:top-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">
              What You Get
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950">
              A practical fit check before either side commits.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              The assessment is intended for brands that want a marketplace operator, not another
              agency handoff. We look at the operating requirements, economics, and channel control
              needed to make the model work.
            </p>
          </aside>

          <div id="assessment-form" className="scroll-mt-8 border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-2xl font-semibold text-slate-950">Request the assessment</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Share a few details and our team will follow up with the right next step.
              </p>
            </div>
            <HubSpotFormEmbed />
          </div>
        </div>
      </section>
    </main>
  );
}
