/**
 * Shared look for every page (the "story kit"). Use these class strings instead of writing theme variants by hand,
 * so all 6 themes (orange default, dark, soft-dark, light, leaf, water) stay consistent site-wide.
 */

/** Page background: the theme gradient used behind every page. */
export const PAGE_BG =
  'min-h-screen text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 bg-gradient-to-br dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:from-lime-500 water:via-lime-100 water:to-white orange:from-[#F68932] orange:via-orange-100 orange:to-white';

/** Headings. */
export const HEAD =
  'text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900';
/** Body text. */
export const BODY =
  'text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700';
/** Secondary text: captions, labels, supporting lines. */
export const MUTED =
  'text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-gray-700';
/** Hairlines and dividers. */
export const RULE =
  'border-white/15 dark:border-white/15 soft-dark:border-gray-300 light:border-gray-200 orange:border-[#101828]/20 leaf:border-gray-400/40 water:border-gray-400/40';
/** Accent text: the pop color, except in the orange theme where pop orange is too light for small text. */
export const ACCENT = 'text-[var(--pop)] orange:text-orange-800';
/** Accent fills (bars, meters, rail). */
export const ACCENT_BG = 'bg-[var(--pop)] orange:bg-[#101828]';

/** Type scale. */
export const H1 = `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] ${HEAD}`;
export const H2 = `text-3xl sm:text-4xl font-bold tracking-tight ${HEAD}`;
export const H3 = `text-xl font-semibold ${HEAD}`;
export const LEAD = `text-lg sm:text-xl leading-relaxed ${BODY}`;

/** Layout: every chapter uses the same width, side padding and rhythm. */
export const CHAPTER = 'scroll-mt-20 py-20 px-4 sm:px-6 lg:px-8';
export const INNER = 'max-w-5xl mx-auto';

/** The one main button style (pop color). */
export const POP_BUTTON =
  'inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[var(--pop)] text-[var(--on-pop)] font-semibold hover:bg-[var(--pop-hover)] transition-colors shadow-lg shadow-black/20 text-base';
/** Secondary button: outlined, same size. */
export const QUIET_BUTTON = `inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border font-semibold transition-colors text-base ${RULE} ${HEAD} hover:bg-white/10 orange:hover:bg-[#101828]/5 light:hover:bg-gray-100 leaf:hover:bg-white/50 water:hover:bg-white/50 soft-dark:hover:bg-white/50`;

/**
 * Hover for every card that is a link (and only those, so a lift always means "you can click this"): it lifts and
 * lights up with the same pop-colored outline and soft glow as the lit card in Home's Buy-Sell-Advertise-Protect
 * chapter (ScrollTimeline). Keyboard focus shows the same. CSS only, no JavaScript.
 */
export const CARD_HOVER =
  'transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_0_0_2px_var(--pop),0_20px_40px_-20px_var(--pop)] focus-visible:-translate-y-1.5 focus-visible:shadow-[0_0_0_2px_var(--pop),0_20px_40px_-20px_var(--pop)] focus-visible:outline-none';
