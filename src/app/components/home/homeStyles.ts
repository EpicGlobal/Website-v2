/**
 * Homepage-only surfaces, built on the story kit tokens. The kit has no card surface yet, so the homepage keeps
 * its one card style here: a quiet panel that stays readable in every theme (stat numbers and facts need a real
 * card on the light themes). Hover lifts the border to the pop color; the active Buy-Sell-Advertise-Protect card
 * gets its pop ring from ScrollHighlightSteps.
 */
import { HEAD } from '@/app/components/story/tokens';

export const CARD =
  'rounded-2xl border shadow-sm bg-white/[0.06] border-white/15 dark:bg-white/[0.06] dark:border-white/15 soft-dark:bg-white/80 soft-dark:border-gray-200 light:bg-white light:border-gray-200 orange:bg-white/75 orange:border-white/60 leaf:bg-white/75 leaf:border-white/60 water:bg-white/75 water:border-white/60';

/** Card that links somewhere: the border takes the pop color on hover and focus. */
export const CARD_LINK = `${CARD} block transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[var(--pop)] focus-visible:border-[var(--pop)]`;

/** Small icon tile inside a card (neutral, so the section's one pop moment stays the pop color). */
export const ICON_TILE = `w-11 h-11 rounded-xl flex items-center justify-center bg-white/10 orange:bg-[#101828]/[0.06] light:bg-gray-100 soft-dark:bg-gray-100 leaf:bg-white water:bg-white ${HEAD}`;
