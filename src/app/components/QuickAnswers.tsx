import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { faqSlug, pickFaqs } from '@/app/data/faqs';
import { SURFACE } from '@/app/components/reading/reading';
import { ACCENT, BODY, CARD_HOVER, HEAD, MUTED } from '@/app/components/story/tokens';

/**
 * Three answers from the FAQ, shown in full in the page HTML so readers and AI answer engines get the answer on the
 * page they're on. Text comes from src/app/data/faqs.ts, so it always matches /faq. Each card glows on hover like the
 * other cards and links to its question on /faq, which opens that answer (Nov 19).
 */
export function QuickAnswers({ questions, id }: { questions: string[]; id: string }) {
  const faqs = pickFaqs(questions);
  return (
    <div aria-labelledby={id} className="mb-14">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
        <h3 id={id} className={`text-xs font-bold uppercase tracking-[0.16em] ${MUTED}`}>Quick answers</h3>
        <Link href="/faq" className={`text-sm font-medium underline underline-offset-4 ${ACCENT}`}>
          See all questions
        </Link>
      </div>
      <dl className="grid gap-4 md:grid-cols-3">
        {faqs.map((f) => (
          <div key={f.question} className={`group relative flex flex-col ${SURFACE} ${CARD_HOVER} p-5`}>
            <dt className={`font-semibold leading-snug mb-2 ${HEAD}`}>{f.question}</dt>
            <dd className={`text-sm leading-relaxed ${BODY}`}>{f.answer}</dd>
            <dd className="mt-auto pt-4">
              {/* The whole card is the click target (the link stretches over it). */}
              <Link
                href={`/faq#${faqSlug(f.question)}`}
                className={`inline-flex items-center gap-1.5 text-sm font-semibold after:absolute after:inset-0 after:rounded-xl ${ACCENT}`}
              >
                Read on the FAQ page
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
