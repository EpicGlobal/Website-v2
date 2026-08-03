'use client';

import { useEffect, useState } from 'react';
import {
  hasGlobalPrivacyControl,
  PRIVACY_PREFERENCE_EVENT,
  readPrivacyPreference,
  writePrivacyPreference,
  type PrivacyPreference,
} from '@/site/privacy-preferences';

function statusLabel(preference: PrivacyPreference, gpc: boolean) {
  if (gpc) return 'Opted out by Global Privacy Control';
  if (preference === 'granted') return 'Analytics and advertising allowed';
  if (preference === 'denied') return 'Nonessential tracking disabled';
  return 'No choice saved';
}

export function PrivacyChoices() {
  const [preference, setPreference] = useState<PrivacyPreference>('unset');
  const [gpc, setGpc] = useState(false);

  useEffect(() => {
    const sync = () => {
      setGpc(hasGlobalPrivacyControl());
      setPreference(readPrivacyPreference());
    };
    sync();
    window.addEventListener(PRIVACY_PREFERENCE_EVENT, sync);
    return () => window.removeEventListener(PRIVACY_PREFERENCE_EVENT, sync);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-20 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase text-cyan-300">Privacy</p>
        <h1 className="text-4xl font-bold sm:text-5xl">Your Privacy Choices</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
          Choose whether Epic Global may use nonessential analytics and advertising technologies
          on this website. Essential security, authentication, and requested form functions do not
          depend on this choice.
        </p>

        <section className="mt-10 border border-white/15 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Current status</p>
          <p className="mt-2 text-xl font-semibold">{statusLabel(preference, gpc)}</p>
          {gpc ? (
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Your browser is sending Global Privacy Control. We treat that signal as a request to
              opt out of sale, sharing, and targeted advertising, so nonessential tracking remains
              disabled in this browser.
            </p>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => writePrivacyPreference('denied')}
                className="border border-white/30 px-5 py-3 font-semibold hover:bg-white/10"
              >
                Reject nonessential
              </button>
              <button
                type="button"
                onClick={() => writePrivacyPreference('granted')}
                className="bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
              >
                Allow analytics and ads
              </button>
            </div>
          )}
        </section>

        <section className="mt-8 space-y-4 text-sm leading-6 text-slate-300">
          <h2 className="text-2xl font-semibold text-white">What this controls</h2>
          <p>
            Rejecting nonessential technologies prevents this website from loading Google
            Analytics and Ads, Meta Pixel, and LinkedIn Insight tracking. Your choice is stored in
            this browser for one year and can be changed here at any time.
          </p>
          <p>
            To exercise access, deletion, correction, or other privacy rights, email
            privacy@epicglobalinc.com with the subject line “Privacy Request.”
          </p>
        </section>
      </div>
    </main>
  );
}
