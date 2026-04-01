'use client';

import { CheckCircle2, Clock3, Globe2 } from 'lucide-react';
import { StructuredData, contactPageSchema, getBreadcrumbSchema } from '@/app/components/StructuredData';
import { HubSpotFormEmbed } from '@/app/components/HubSpotFormEmbed';

export function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br text-white dark:from-cyan-950 dark:via-slate-900 dark:to-black dark:text-white soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white soft-dark:text-gray-900 light:text-gray-900 leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white leaf:text-gray-900 water:from-lime-500 water:via-lime-100 water:to-white water:text-gray-900 orange:from-[#F68932] orange:via-orange-100 orange:to-white orange:text-gray-900">
      <StructuredData data={contactPageSchema} />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: 'Home', url: 'https://epicglobalinc.com/' },
          { name: 'Contact', url: 'https://epicglobalinc.com/contact' },
        ])}
      />

      <section className="bg-transparent px-4 pb-6 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold leading-tight text-black drop-shadow-[0_4px_20px_rgba(15,23,42,0.18)] dark:text-white sm:text-5xl lg:text-6xl">
            Contact
          </h1>
        </div>
      </section>

      <section
        id="request-assessment"
        className="scroll-mt-32 bg-transparent px-4 pb-10 sm:px-6 lg:px-8 lg:pb-8"
      >
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl dark:border-white/10 dark:from-white/5 dark:to-white/[0.02] soft-dark:border-white/20 soft-dark:from-white/70 soft-dark:to-white/60 light:border-gray-200 light:bg-white orange:border-white/20 orange:from-white/70 orange:to-white/60 leaf:border-white/20 leaf:from-white/70 leaf:to-white/60 water:border-white/20 water:from-white/70 water:to-white/60 lg:flex lg:h-[calc(100vh-15rem)] lg:flex-col lg:overflow-hidden">
              <h2 className="mb-3 text-2xl font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-[#101828]">
                Book a Call
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-[#101828] sm:text-base">
                Use the scheduler below to book a call if you want Epic Global Inc. to evaluate marketplace fit, inventory readiness, channel performance, or international expansion requirements.
              </p>

              <HubSpotFormEmbed className="lg:flex lg:min-h-0 lg:flex-1 lg:flex-col" />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-5 backdrop-blur-xl dark:border-white/10 dark:from-white/5 dark:to-white/[0.02] soft-dark:border-white/20 soft-dark:from-white/70 soft-dark:to-white/60 light:border-gray-200 light:bg-white orange:border-white/20 orange:from-white/70 orange:to-white/60 leaf:border-white/20 leaf:from-white/70 leaf:to-white/60 water:border-white/20 water:from-white/70 water:to-white/60 lg:max-h-[calc(100vh-15rem)] lg:overflow-y-auto">
              <h3 className="mb-4 text-lg font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-[#101828]">
                What to expect
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700" />
                  <p className="text-sm leading-relaxed text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-[#101828]">
                    We assess marketplace fit, inventory readiness, channel health, and international expansion potential.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700" />
                  <p className="text-sm leading-relaxed text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-[#101828]">
                    Choose an available time directly in the calendar. If nothing fits, email us and we can coordinate manually.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Globe2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700" />
                  <p className="text-sm leading-relaxed text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-[#101828]">
                    Epic operates a buy, sell, advertise, protect model across Amazon, Walmart, eBay, and select international marketplaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
