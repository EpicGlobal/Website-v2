import Link from 'next/link';
import { pickFaqs } from '@/app/data/faqs';
import { SURFACE } from '@/app/components/reading/reading';
import { ACCENT, BODY, HEAD, MUTED } from '@/app/components/story/tokens';

/**
 * Three answers from the FAQ, shown in full in the page HTML so readers and AI answer engines get the answer on the
 * page they're on. Text comes from src/app/data/faqs.ts, so it always matches /faq.
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
          <div key={f.question} className={`${SURFACE} p-5`}>
            <dt className={`font-semibold leading-snug mb-2 ${HEAD}`}>{f.question}</dt>
            <dd className={`text-sm leading-relaxed ${BODY}`}>{f.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
