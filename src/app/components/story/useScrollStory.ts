'use client';

/**
 * Shared scroll story engine (desktop only). One hook for every story page.
 *
 * Split of work (scrollytelling skill):
 * - Native CSS scroll timelines (story.css, no JS): rail fill, chapter rules drawing in, [data-story="rise"] and
 *   [data-story="fade-up"] reveals.
 * - GSAP ScrollTrigger (here), driven by data attributes so pages need no animation code:
 *     section[data-chapter][id]        rail link for that chapter gets aria-current while you're in it
 *     [data-story-pin]                 chapter pins briefly (+=60%) while its [data-story="step"] items step in,
 *                                      [data-story="steps-meter"] fills and any [data-story="strike"] draws through
 *     [data-story="lit-step"]          the paragraph you're reading is lit, the others rest dimmed (story.css)
 *     [data-story="words"]             its [data-story="word"] spans fill in word by word
 * - `extra` lets a page add its own one-off beats (e.g. About's hero hand-off) with the same gsap instance.
 *
 * House rules: GSAP loads by dynamic import only on screens 900px+ wide, whatever the OS animation setting
 * (Brex's laptop has reduced motion on). Phones never download it. Everything is visible without JS; dimming only
 * applies after this hook sets data-story="on" on the page root. Keep pins short: the page should not feel long.
 */
import { useEffect, type RefObject } from 'react';

export const STORY_QUERY = '(min-width: 900px)';

export type Gsap = typeof import('gsap').gsap;
export type ScrollTriggerType = typeof import('gsap/ScrollTrigger').ScrollTrigger;
export type StoryExtra = (gsap: Gsap, ScrollTrigger: ScrollTriggerType, root: HTMLElement) => void;

export function useScrollStory(rootRef: RefObject<HTMLElement | null>, extra?: StoryExtra) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mq = window.matchMedia(STORY_QUERY);
    let revert: (() => void) | undefined;
    let loading = false;
    let cancelled = false;

    const start = async () => {
      if (loading || revert) return;
      loading = true;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      // matchMedia + scope: builds while the query matches; reverts every tween, pin and inline style when it
      // stops matching or on unmount.
      const mm = gsap.matchMedia(root);
      mm.add(STORY_QUERY, () => {
        root.dataset.story = 'on';
        extra?.(gsap, ScrollTrigger, root);
        buildShared(gsap, ScrollTrigger, root);
        return () => {
          delete root.dataset.story;
        };
      });
      document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh());
      // Re-measure when the page's height changes after load (an opened <details> list, late images), so pins
      // further down never sit on top of the content that pushed them.
      let lastHeight = root.offsetHeight;
      let timer: ReturnType<typeof setTimeout> | undefined;
      const ro = new ResizeObserver(() => {
        const h = root.offsetHeight;
        if (Math.abs(h - lastHeight) < 2) return;
        lastHeight = h;
        clearTimeout(timer);
        timer = setTimeout(() => {
          ScrollTrigger.refresh();
          lastHeight = root.offsetHeight;
        }, 120);
      });
      ro.observe(root);
      revert = () => {
        ro.disconnect();
        clearTimeout(timer);
        mm.revert();
      };
    };

    const onChange = () => mq.matches && start();
    if (mq.matches) start();
    mq.addEventListener('change', onChange);
    return () => {
      cancelled = true;
      mq.removeEventListener('change', onChange);
      revert?.();
    };
    // `extra` is a module-level function on every page; it never changes between renders.
  }, [rootRef]);
}

function buildShared(gsap: Gsap, ScrollTrigger: ScrollTriggerType, root: HTMLElement) {
  const all = <T extends HTMLElement = HTMLElement>(sel: string, scope: ParentNode = root) => Array.from(scope.querySelectorAll<T>(sel));

  // Short pinned step lists. Created in page order before the rail triggers so pin spacing is measured first.
  all('[data-story-pin]').forEach((chapter) => {
    const steps = all('[data-story="step"]', chapter);
    const tl = gsap.timeline({
      defaults: { ease: 'power1.out' },
      scrollTrigger: { trigger: chapter, start: 'center center', end: '+=60%', pin: true, scrub: 0.6 },
    });
    const strike = all('[data-story="strike"]', chapter);
    if (strike.length) tl.from(strike, { scaleX: 0, transformOrigin: 'left center', duration: 1, ease: 'none' }).addLabel('steps', '+=0.2');
    else tl.addLabel('steps');
    if (steps.length) {
      tl.from(steps, { opacity: 0.15, x: 32, duration: 1, stagger: 1 }, 'steps');
      const meter = all('[data-story="steps-meter"]', chapter);
      if (meter.length) tl.from(meter, { scaleY: 0, transformOrigin: 'top center', ease: 'none', duration: steps.length }, 'steps');
    }
    tl.to({}, { duration: 0.3 }); // a short hold on the finished state before the pin releases
  });

  // Paragraph you're reading is lit.
  all('[data-story="lit-step"]').forEach((step) => {
    ScrollTrigger.create({ trigger: step, start: 'top 68%', end: 'bottom 38%', toggleClass: 'is-lit' });
  });

  // Word-by-word fill.
  all('[data-story="words"]').forEach((sentence) => {
    gsap.fromTo(
      all('[data-story="word"]', sentence),
      { opacity: 0.18 },
      { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: sentence, start: 'top 80%', end: 'bottom 50%', scrub: 0.4 } },
    );
  });

  // Chapter rail: mark the chapter you're in.
  all('[data-chapter][id]').forEach((chapter) => {
    const link = root.querySelector<HTMLElement>(`[data-rail-link="${chapter.id}"]`);
    if (!link) return;
    ScrollTrigger.create({
      trigger: chapter,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (self.isActive) link.setAttribute('aria-current', 'step');
        else link.removeAttribute('aria-current');
      },
    });
  });
}
