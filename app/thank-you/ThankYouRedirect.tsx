'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import iconLogo from '@/assets/89c6c6b033fa0f92c4e3c1a320826a96a86b5469.png';
import wordmarkLogo from '@/assets/008bdb4c58b9b740867427493f73689a3f551b75.png';
import { useEffect } from 'react';

export function ThankYouRedirect() {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      window.location.assign('/');
    }, 4000);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br px-4 pb-16 pt-28 text-white dark:from-cyan-950 dark:via-slate-900 dark:to-black dark:text-white soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white soft-dark:text-gray-900 light:text-gray-900 leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white leaf:text-gray-900 water:from-lime-500 water:via-lime-100 water:to-white water:text-gray-900 orange:from-[#F68932] orange:via-orange-100 orange:to-white orange:text-gray-900 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-11rem)] max-w-4xl items-center justify-center">
        <div className="w-full rounded-2xl border border-white/20 bg-white/75 p-6 text-center shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/10 soft-dark:bg-white/80 light:border-gray-200 light:bg-white orange:border-white/30 orange:bg-white/80 leaf:bg-white/80 water:bg-white/80 sm:p-10">
          <div className="mx-auto mb-8 flex items-center justify-center gap-3">
            <Image src={iconLogo} alt="" className="h-12 w-12" priority />
            <Image src={wordmarkLogo} alt="Epic Global Inc." className="h-14 w-auto" priority />
          </div>

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#7cb342] text-white shadow-lg shadow-[#7cb342]/25">
            <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
          </div>

          <h1 className="text-4xl font-bold leading-tight text-[#101828] sm:text-5xl">
            Your strategy call is booked
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg">
            A calendar invitation is on its way with the meeting details. We will send you back to Epic Global in a few seconds.
          </p>

          <div className="mx-auto mt-8 h-2 max-w-sm overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-full bg-gradient-to-r from-[#7cb342] via-[#ff8c42] to-[#1ca7d8]" />
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#7cb342] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#558b2f] focus:outline-none focus:ring-4 focus:ring-[#7cb342]/25"
          >
            Return to Epic Global
          </Link>
        </div>
      </section>
    </main>
  );
}
