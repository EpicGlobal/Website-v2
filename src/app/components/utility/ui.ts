/**
 * Utility pages (legal, privacy choices, sign-in, reset password, thank-you): the shared story-kit look only.
 * Built from the kit tokens so every theme follows along; no scroll effects on these pages.
 */
import { ACCENT, BODY, HEAD, MUTED, RULE } from '@/app/components/story/tokens';

/** Page top: clears the fixed header, then the normal chapter side padding. */
export const UTIL_TOP = 'pt-32 pb-20 px-4 sm:px-6 lg:px-8';

/** Smaller H1 for card pages (sign-in, reset password, thank-you), same family as the kit H1. */
export const UTIL_H1 = `text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] ${HEAD}`;

/** Reading column for long legal text (about 75 characters per line). */
export const MEASURE = 'max-w-[75ch]';

/** Numbered legal section heading (h2): kit heading color, sized for a long document. */
export const LEGAL_H2 = `text-2xl font-bold tracking-tight ${HEAD}`;
/** Sub-heading inside a legal section (h3). */
export const LEGAL_H3 = `text-lg font-semibold ${HEAD}`;

/** Each legal section opens on a hairline so the long page reads in clear steps. */
export const LEGAL_SECTION = `border-t pt-8 ${RULE}`;

/** Body copy for legal and utility pages. */
export const LEGAL_BODY = `text-base leading-relaxed ${BODY}`;

/** Inline text link. */
export const TEXT_LINK = `${ACCENT} underline underline-offset-2 hover:opacity-80`;

/** Bullets use the pop accent for the marker only. */
export const BULLETS = 'list-disc space-y-2 pl-6 marker:text-[var(--pop)] orange:marker:text-orange-800';

/** Accent rule on the left of a callout. */
export const ACCENT_BORDER = 'border-l-4 border-[var(--pop)] orange:border-orange-800';

/** Surface for a form, status box or callout: one panel style for every theme. */
export const PANEL = `rounded-2xl border ${RULE} bg-white/5 dark:bg-white/5 soft-dark:bg-white/75 light:bg-white orange:bg-white/75 leaf:bg-white/75 water:bg-white/75 backdrop-blur-xl shadow-xl shadow-black/10`;

/** Flat callout with the accent rule (legal intro). */
export const CALLOUT = `${ACCENT_BORDER} rounded-r-xl px-6 py-5 bg-white/5 dark:bg-white/5 soft-dark:bg-white/60 light:bg-white orange:bg-white/60 leaf:bg-white/60 water:bg-white/60`;

/** Form labels and small captions. */
export const LABEL = `block text-sm font-medium ${HEAD}`;
export const CAPTION = `text-sm ${MUTED}`;
