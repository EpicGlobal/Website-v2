/**
 * Proof-page surfaces (Tier 2: Case Studies, campaign pages), built on the story kit tokens. Plain strings with no
 * client code, so any page can use them without adding JavaScript.
 */
import { HEAD, RULE } from '@/app/components/story/tokens';

/** A real card surface in every theme (stats, tables, results). */
export const CARD = `rounded-2xl border ${RULE} bg-white/5 dark:bg-white/5 soft-dark:bg-white/60 light:bg-white orange:bg-white/70 leaf:bg-white/60 water:bg-white/60`;
/** A quieter inset surface inside a chapter. */
export const CARD_SOFT = `rounded-xl border ${RULE} bg-white/[0.03] dark:bg-white/[0.03] soft-dark:bg-white/40 light:bg-gray-50 orange:bg-white/50 leaf:bg-white/40 water:bg-white/40`;
/** Small neutral tag (pillar labels). */
export const TAG = `inline-block px-3 py-1 text-xs font-semibold rounded-full border ${RULE} ${HEAD}`;
