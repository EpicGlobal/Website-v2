'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import iconLogo from '@/assets/89c6c6b033fa0f92c4e3c1a320826a96a86b5469.png';
import wordmarkLogo from '@/assets/008bdb4c58b9b740867427493f73689a3f551b75.png';
import { useEffect } from 'react';
import { ACCENT_BG, INNER, LEAD, PAGE_BG } from '@/app/components/story/tokens';
import { PopLink } from '@/app/components/story/StoryKit';
import { PANEL, UTIL_H1, UTIL_TOP } from '@/app/components/utility/ui';

export function ThankYouRedirect() {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      window.location.assign('/');
    }, 4000);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className={`${PAGE_BG} ${UTIL_TOP}`}>
      <section className={`${INNER} flex min-h-[calc(100vh-13rem)] items-center`}>
        <div className={`${PANEL} w-full max-w-3xl p-6 sm:p-10`}>
          <div className="mb-10 flex items-center gap-3">
            <Image src={iconLogo} alt="" className="h-12 w-12" priority />
            <Image src={wordmarkLogo} alt="Epic Global Inc." className="h-14 w-auto" priority />
          </div>

          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--pop)] text-[var(--on-pop)] shadow-lg shadow-black/10">
            <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
          </div>

          <h1 className={UTIL_H1}>
            Your strategy call is booked
          </h1>

          <p className={`mt-5 max-w-2xl ${LEAD}`}>
            A calendar invitation is on its way with the meeting details. We will send you back to Epic Global in a few seconds.
          </p>

          <div className="mt-8 h-1.5 max-w-sm overflow-hidden rounded-full bg-black/10 dark:bg-white/15">
            <div className={`h-full w-full ${ACCENT_BG}`} />
          </div>

          <PopLink href="/" className="mt-8">
            Return to Epic Global
          </PopLink>
        </div>
      </section>
    </div>
  );
}
