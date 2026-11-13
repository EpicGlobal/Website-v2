'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import {
  hasGlobalPrivacyControl,
  PRIVACY_PREFERENCE_EVENT,
  readPrivacyPreference,
  writePrivacyPreference,
  type PrivacyPreference,
} from '@/site/privacy-preferences';

export function PrivacyConsentBanner() {
  const [preference, setPreference] = useState<PrivacyPreference>('unset');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const syncPreference = () => {
      setPreference(readPrivacyPreference());
      setReady(true);
    };
    syncPreference();
    window.addEventListener(PRIVACY_PREFERENCE_EVENT, syncPreference);
    return () => window.removeEventListener(PRIVACY_PREFERENCE_EVENT, syncPreference);
  }, []);

  // The banner is in the server HTML so it paints with the page (not late, after hydration). For visitors who already
  // chose (or send GPC), the epic-privacy-init script in app/layout.tsx marks <html data-privacy-set> before first
  // paint and the class below keeps it hidden until this effect removes it.
  if (ready && (preference !== 'unset' || hasGlobalPrivacyControl())) return null;

  return (
    <aside
      aria-label="Privacy choices"
      className="[html[data-privacy-set]_&]:hidden fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-slate-950/95 dark:border-white/25 dark:bg-slate-800/95 px-5 py-4 text-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] backdrop-blur sm:inset-x-6 sm:bottom-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-start gap-3">
          <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-slate-300" />
          <p className="text-sm leading-6 text-slate-200">
            We use optional analytics and ads cookies only with your permission. The site works fully if you decline.{' '}
            <Link href="/privacy" className="font-semibold text-white underline underline-offset-2 hover:text-slate-200">
              Privacy policy
            </Link>
          </p>
        </div>
        {/* Equal-weight choices: same size and shape, so declining is as easy as accepting. */}
        <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => writePrivacyPreference('denied')}
            className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white/10"
          >
            Reject nonessential
          </button>
          <button
            type="button"
            onClick={() => writePrivacyPreference('granted')}
            className="rounded-lg border border-white bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200"
          >
            Allow analytics and ads
          </button>
        </div>
      </div>
    </aside>
  );
}
