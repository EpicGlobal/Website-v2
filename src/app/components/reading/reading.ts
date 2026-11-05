/**
 * Reading pages (Knowledge Base, articles, FAQ): the calm tier-3 look on top of the story kit tokens.
 * Cards, form fields and small meta text that read well in all six themes.
 */
import { RULE, CARD_HOVER } from '@/app/components/story/tokens';

/** A quiet surface for cards and panels: translucent on the dark theme, near-white on the light ones. */
export const SURFACE = `rounded-xl border ${RULE} bg-white/[0.04] dark:bg-white/[0.04] soft-dark:bg-white/70 light:bg-white orange:bg-white/70 leaf:bg-white/70 water:bg-white/70`;

/** A card that is a link: the border picks up the pop color on hover and focus. */
export const CARD_LINK = `group block p-6 ${SURFACE} ${CARD_HOVER}`;

/** Search box and filter selects. */
export const FIELD = `w-full rounded-lg border ${RULE} bg-white/5 dark:bg-white/5 soft-dark:bg-white/80 light:bg-white orange:bg-white/80 leaf:bg-white/80 water:bg-white/80 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 placeholder-gray-400 orange:placeholder-gray-600 light:placeholder-gray-500 leaf:placeholder-gray-600 water:placeholder-gray-600 soft-dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--pop)]/60 orange:focus:ring-[#0068B4]/50`;

/** Option list colors for the native selects (the dropdown itself is drawn by the browser). */
export const OPTIONS =
  '[&>option]:bg-gray-900 [&>option]:text-white soft-dark:[&>option]:bg-white soft-dark:[&>option]:text-gray-900 light:[&>option]:bg-white light:[&>option]:text-gray-900 orange:[&>option]:bg-white orange:[&>option]:text-gray-900 leaf:[&>option]:bg-white leaf:[&>option]:text-gray-900 water:[&>option]:bg-white water:[&>option]:text-gray-900';

/** The reading measure for long text (about 70 characters a line). */
export const MEASURE = 'max-w-[70ch]';
