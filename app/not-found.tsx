import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Its own title and a single robots rule, instead of the home page's title and "index, follow".
export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

const WAYS_IN = [
  { href: '/', label: 'Home', note: 'Start from the top' },
  { href: '/our-model', label: 'Our Model', note: 'How the wholesale model works' },
  { href: '/intelligence', label: 'AI Intelligence', note: 'Data, forecasting and reporting' },
  { href: '/case-studies', label: 'Case Studies', note: 'Results from real brands' },
  { href: '/knowledge-base', label: 'Knowledge Base', note: 'Guides and checklists' },
  { href: '/faq', label: 'FAQ', note: 'Common questions' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-white bg-gradient-to-br from-cyan-950 via-slate-900 to-black">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-gray-300">
          <span className="text-[var(--pop)]">404</span> &nbsp;Page not found
        </p>
        <h1 className="mb-4 text-4xl sm:text-5xl font-bold tracking-tight">This page doesn&apos;t exist.</h1>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-300">
          The link may be old or mistyped. These pages are a good place to pick up.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WAYS_IN.map((w) => (
            <li key={w.href}>
              <Link
                href={w.href}
                className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.06] p-5 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_var(--pop),0_18px_40px_-22px_var(--pop)] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--pop)]"
              >
                <span>
                  <span className="block font-semibold">{w.label}</span>
                  <span className="block text-sm text-gray-400">{w.note}</span>
                </span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--pop)] transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
