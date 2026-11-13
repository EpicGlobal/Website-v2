/**
 * Story kit building blocks, shared by every page that tells a scroll story (see story.css and useScrollStory.ts).
 *
 * Page recipe:
 *   const CHAPTERS = [{ id: 'who-we-are', label: 'Who we are' }, ...];
 *   <div ref={rootRef} className={PAGE_BG}>
 *     <ChapterRail chapters={CHAPTERS} label="About page chapters" />
 *     <section id="who-we-are" data-chapter className={CHAPTER}>
 *       <div className={INNER}><ChapterMarker n={1} label="Who we are" /> ...</div>
 *     </section>
 *   </div>
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import { ACCENT, ACCENT_BG, BODY, HEAD, POP_BUTTON, RULE } from './tokens';

export type Chapter = { id: string; label: string };

/** "01  WHO WE ARE  ───" : the numbered chapter opener. Its rule draws in as the chapter arrives (story.css). */
export function ChapterMarker({ n, label, accent = ACCENT }: { n: number; label: string; accent?: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className={`text-sm font-semibold tabular-nums ${accent}`}>{String(n).padStart(2, '0')}</span>
      <span className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] ${BODY}`}>{label}</span>
      <span aria-hidden="true" data-story="rule" className={`flex-1 border-t ${RULE}`} />
    </div>
  );
}

/**
 * Chapter rail (screens 1280px+): real anchor links to each chapter. The line fills with page progress (CSS scroll
 * timeline) and useScrollStory marks the current chapter with aria-current. Use it on story pages with 4+ chapters.
 */
export function ChapterRail({ chapters, label }: { chapters: readonly Chapter[]; label: string }) {
  return (
    <nav aria-label={label} className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:block print:hidden">
      <div aria-hidden="true" className="absolute right-[5px] top-3 bottom-3 w-0.5 rounded-full bg-gray-400/35 overflow-hidden">
        <div data-story="rail-fill" className={`h-full w-full rounded-full ${ACCENT_BG}`} />
      </div>
      <ol className="relative space-y-5">
        {chapters.map((c) => (
          <li key={c.id}>
            <a href={`#${c.id}`} data-rail-link={c.id} className={`group flex items-center justify-end gap-3 py-1 text-xs font-semibold ${HEAD}`}>
              <span className="whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 2xl:group-aria-[current=step]:opacity-100">
                {c.label}
              </span>
              <span className="h-3 w-3 shrink-0 rounded-full border-2 border-current transition-colors duration-300 group-aria-[current=step]:bg-current" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * A short pinned list (desktop): the chapter pins briefly while its items step in one by one beside a filling meter.
 * Put it inside a <section data-chapter data-story-pin>. Items stay fully visible without JavaScript.
 */
export function StepList({ items }: { items: readonly { title: string; description: ReactNode }[] }) {
  return (
    <div className="relative pl-8">
      <div aria-hidden="true" data-story-meter="" className="absolute left-0 top-1 bottom-1 w-[3px] overflow-hidden rounded-full bg-gray-400/30">
        <div data-story="steps-meter" className={`h-full w-full rounded-full ${ACCENT_BG}`} />
      </div>
      <ol className="space-y-8">
        {items.map((item, i) => (
          <li key={item.title} data-story="step">
            <span aria-hidden="true" className={`block text-sm font-semibold tabular-nums mb-1 ${ACCENT}`}>{String(i + 1).padStart(2, '0')}</span>
            <h3 className={`text-xl font-semibold mb-2 ${HEAD}`}>{item.title}</h3>
            <div className={`leading-relaxed ${BODY}`}>{item.description}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** A sentence that fills in word by word as you scroll (desktop). Reads as one sentence in the HTML. */
export function WordFill({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <span data-story="words" className={className}>
      {words.map((word, i) => (
        <span key={i} data-story="word">
          {i < words.length - 1 ? `${word} ` : word}
        </span>
      ))}
    </span>
  );
}

/** The one main call-to-action button (pop color). */
export function PopLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`${POP_BUTTON} ${className}`}>
      {children}
    </Link>
  );
}
