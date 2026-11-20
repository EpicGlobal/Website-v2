'use client';

import { useEffect, useState } from 'react';
import {
  hasGlobalPrivacyControl,
  PRIVACY_PREFERENCE_EVENT,
  readPrivacyPreference,
  writePrivacyPreference,
  type PrivacyPreference,
} from '@/site/privacy-preferences';
import { H1, H2, HEAD, INNER, LEAD, MUTED, PAGE_BG, POP_BUTTON, QUIET_BUTTON } from '@/app/components/story/tokens';
import { LEGAL_BODY, MEASURE, PANEL, UTIL_TOP } from '@/app/components/utility/ui';

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
    <main className={`${PAGE_BG} ${UTIL_TOP}`}>
      <div className={INNER}>
        <p className={`mb-3 text-sm font-medium ${MUTED}`}>Privacy</p>
        <h1 className={H1}>Your Privacy Choices</h1>
        <p className={`mt-5 ${MEASURE} ${LEAD}`}>
          Choose whether Epic Global may use nonessential analytics and advertising technologies
          on this website. Essential security, authentication, and requested form functions do not
          depend on this choice.
        </p>

        <section className={`mt-12 ${MEASURE} ${PANEL} p-6 sm:p-8`}>
          <p className={`text-sm ${MUTED}`}>Current status</p>
          <p className={`mt-2 text-2xl font-bold tracking-tight ${HEAD}`}>{statusLabel(preference, gpc)}</p>
          {gpc ? (
            <p className={`mt-4 ${LEGAL_BODY}`}>
              Your browser is sending Global Privacy Control. We treat that signal as a request to
              opt out of sale, sharing, and targeted advertising, so nonessential tracking remains
              disabled in this browser.
            </p>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => writePrivacyPreference('denied')}
                className={QUIET_BUTTON}
              >
                Reject nonessential
              </button>
              <button
                type="button"
                onClick={() => writePrivacyPreference('granted')}
                className={POP_BUTTON}
              >
                Allow analytics and ads
              </button>
            </div>
          )}
        </section>

        <section className={`mt-14 ${MEASURE} space-y-4 ${LEGAL_BODY}`}>
          <h2 className={H2}>What this controls</h2>
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
