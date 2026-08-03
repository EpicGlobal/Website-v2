'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
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

  if (!ready || preference !== 'unset' || hasGlobalPrivacyControl()) return null;

  return (
    <aside
      aria-label="Privacy choices"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-4xl border border-white/20 bg-slate-950 px-5 py-4 text-white shadow-2xl sm:inset-x-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-slate-200">
          We use optional analytics and advertising technologies only with your permission.
          Essential website functions remain available when you decline.{' '}
          <Link href="/privacy" className="font-semibold text-cyan-300 hover:text-cyan-200">
            Read our privacy policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => writePrivacyPreference('denied')}
            className="border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white/10"
          >
            Reject nonessential
          </button>
          <button
            type="button"
            onClick={() => writePrivacyPreference('granted')}
            className="bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Allow analytics and ads
          </button>
        </div>
      </div>
    </aside>
  );
}
