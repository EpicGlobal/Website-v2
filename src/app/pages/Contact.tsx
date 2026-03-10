'use client';

import { CheckCircle2, Clock3, Globe2, Mail } from 'lucide-react';
import { StructuredData, contactPageSchema, getBreadcrumbSchema } from '@/app/components/StructuredData';
import { HubSpotFormEmbed } from '@/app/components/HubSpotFormEmbed';
import { useAnalytics } from '@/hooks/useAnalytics';
import { siteConfig } from '@/site/site-config';

export function Contact() {
  const { trackFormSubmit } = useAnalytics();

  return (
    <div className="min-h-screen bg-gradient-to-br text-white dark:from-cyan-950 dark:via-slate-900 dark:to-black dark:text-white soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white soft-dark:text-gray-900 light:text-gray-900 leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white leaf:text-gray-900 water:from-lime-500 water:via-lime-100 water:to-white water:text-gray-900 orange:from-[#F68932] orange:via-orange-100 orange:to-white orange:text-gray-900">
      <StructuredData data={contactPageSchema} />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: 'https://epicglobalinc.com/' },
          { name: 'Contact', url: 'https://epicglobalinc.com/contact' },
        ])}
      />

      <section className="bg-transparent px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-block rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold tracking-wide text-cyan-400 dark:bg-cyan-500/10 dark:text-cyan-400 soft-dark:bg-lime-600/20 soft-dark:text-lime-800 light:bg-cyan-100 light:text-cyan-700 orange:bg-orange-100 orange:text-orange-700 leaf:bg-cyan-600/20 leaf:text-cyan-900 water:bg-emerald-100 water:text-emerald-700">
            REQUEST AN ASSESSMENT
          </div>
          <h1 className="mb-8 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-white dark:to-gray-400 soft-dark:from-gray-900 soft-dark:to-gray-700 light:from-gray-900 light:to-gray-600 sm:text-5xl lg:text-6xl">
            Contact
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-[#101828] sm:text-xl">
            Tell us what you are trying to accomplish and where you are stuck. If there is a fit, we will map the fastest path to a controlled, scalable marketplace operating system.
          </p>
          <p className="mt-6 text-sm text-cyan-300 dark:text-cyan-300 soft-dark:text-lime-700 light:text-cyan-700 orange:text-orange-700 leaf:text-cyan-800 water:text-emerald-700 sm:text-base">
            Prefer email? Reach us at{' '}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="font-semibold underline underline-offset-4 transition-colors hover:text-white dark:hover:text-white soft-dark:hover:text-gray-900 light:hover:text-cyan-800 orange:hover:text-[#101828]"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
        </div>
      </section>

      <section
        id="request-assessment"
        className="scroll-mt-32 bg-transparent px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-xl dark:border-white/10 dark:from-white/5 dark:to-white/[0.02] soft-dark:border-white/20 soft-dark:from-white/70 soft-dark:to-white/60 light:border-gray-200 light:bg-white orange:border-white/20 orange:from-white/70 orange:to-white/60 leaf:border-white/20 leaf:from-white/70 leaf:to-white/60 water:border-white/20 water:from-white/70 water:to-white/60">
              <h2 className="mb-4 text-2xl font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-[#101828]">
                Book a Call
              </h2>
              <p className="mb-6 text-base leading-relaxed text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-[#101828]">
                Use the form below if you want Epic Global Inc. to evaluate marketplace fit, inventory readiness, channel performance, or international expansion requirements.
              </p>

              <HubSpotFormEmbed
                onFormSubmit={() => {
                  trackFormSubmit('HubSpot Contact Form');
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl dark:border-white/10 dark:from-white/5 dark:to-white/[0.02] soft-dark:border-white/20 soft-dark:from-white/70 soft-dark:to-white/60 light:border-gray-200 light:bg-white orange:border-white/20 orange:from-white/70 orange:to-white/60 leaf:border-white/20 leaf:from-white/70 leaf:to-white/60 water:border-white/20 water:from-white/70 water:to-white/60">
              <h3 className="mb-4 text-lg font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-[#101828]">
                What to expect
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700" />
                  <p className="text-sm leading-relaxed text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-[#101828]">
                    We assess marketplace fit, inventory readiness, channel health, and international expansion potential.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700" />
                  <p className="text-sm leading-relaxed text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-[#101828]">
                    If there is a fit, we typically reply within 2 business days with next steps and scheduling.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Globe2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700" />
                  <p className="text-sm leading-relaxed text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-[#101828]">
                    Epic operates a buy, sell, advertise, protect model across Amazon, Walmart, eBay, and select international marketplaces.
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-6 dark:border-white/10 soft-dark:border-gray-300 light:border-gray-200 orange:border-white/20 leaf:border-white/20 water:border-white/20">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700" />
                  <div>
                    <p className="text-sm font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-[#101828]">
                      Direct email
                    </p>
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="text-sm text-cyan-300 underline underline-offset-4 transition-colors hover:text-white dark:text-cyan-300 dark:hover:text-white soft-dark:text-lime-700 soft-dark:hover:text-gray-900 light:text-cyan-700 light:hover:text-cyan-800 orange:text-orange-700 orange:hover:text-[#101828]"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
