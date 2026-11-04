'use client';

/**
 * About page scroll story (desktop only).
 *
 * Split of work, per the scrollytelling skill:
 * - Native CSS scroll timelines (about-story.css, 0 KB of JS): the chapter rail fill, chapter rules drawing in,
 *   the map rising into place and the closing call to action.
 * - GSAP ScrollTrigger (this file): the two pinned chapters (hero, "not an agency"), the scrubbed quote,
 *   the bio step highlight and the chapter rail's active state.
 *
 * GSAP is loaded with a dynamic import only on screens 900px+ wide (any OS animation setting, per the house
 * motion rule), so phones never download it. All text stays in the server HTML; without this hook the page is the
 * plain static layout.
 */
import { useEffect, type RefObject } from 'react';

const STORY_QUERY = '(min-width: 900px)';

type Gsap = typeof import('gsap').gsap;
type ScrollTriggerType = typeof import('gsap/ScrollTrigger').ScrollTrigger;

export function useAboutScrollStory(rootRef: RefObject<HTMLElement | null>) {
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
      // matchMedia + scope: builds the story while the query matches, reverts every tween, pin and inline
      // style when it stops matching (window narrowed, window resized) or on unmount.
      const mm = gsap.matchMedia(root);
      mm.add(STORY_QUERY, () => {
        root.dataset.story = 'on';
        build(gsap, ScrollTrigger, root);
        return () => {
          delete root.dataset.story;
        };
      });
      document.fonts?.ready.then(() => !cancelled && ScrollTrigger.refresh());
      revert = () => mm.revert();
    };

    const onChange = () => mq.matches && start();
    if (mq.matches) start();
    mq.addEventListener('change', onChange);
    return () => {
      cancelled = true;
      mq.removeEventListener('change', onChange);
      revert?.();
    };
  }, [rootRef]);
}

function build(gsap: Gsap, ScrollTrigger: ScrollTriggerType, root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const one = (sel: string) => root.querySelector<HTMLElement>(sel);

  // Chapter rail: light up the chapter you're in (created per chapter below, in page order).
  const railFor = (chapter: HTMLElement | null) => {
    if (!chapter?.id) return;
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
  };

  /* Chapter 1, hero: pins for a short beat while the four facts underline one by one. Then, as the founder
     chapter rises into view, the opening recedes behind it (a scrubbed hand-off, not a hard cut). */
  const hero = one('[data-chapter="hero"]');
  const founder = one('[data-chapter="founder"]');
  if (hero) {
    gsap
      .timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: hero, start: 'top top', end: '+=45%', pin: true, scrub: 0.6 },
      })
      .from(q('[data-story="fact-bar"]'), { scaleX: 0, transformOrigin: 'left center', duration: 1, stagger: 0.6 })
      .to({}, { duration: 0.4 }); // hold the finished facts for a moment
    if (founder) {
      gsap.to(q('[data-story="hero-inner"]'), {
        opacity: 0.2,
        y: -40,
        scale: 0.97,
        transformOrigin: 'left top',
        ease: 'none',
        scrollTrigger: { trigger: founder, start: 'top bottom', end: 'top 25%', scrub: 0.6 },
      });
    }
  }
  railFor(hero);

  /* Chapter 2, founder: the portrait column is CSS-sticky; the paragraph you're reading is lit, a meter beside
     the portrait fills as you read, and the quote fills word by word. */
  const bio =one('[data-story="bio"]');
  if (bio) {
    gsap.fromTo(
      q('[data-story="bio-meter"]'),
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', transformOrigin: 'left center', scrollTrigger: { trigger: bio, start: 'top 60%', end: 'bottom 60%', scrub: true } },
    );
  }
  q('[data-story="bio-step"]').forEach((step) => {
    ScrollTrigger.create({ trigger: step, start: 'top 68%', end: 'bottom 38%', toggleClass: 'is-lit' });
  });
  const quote = one('[data-story="quote"]');
  if (quote) {
    gsap.fromTo(
      q('[data-story="quote-word"]'),
      { opacity: 0.18 },
      { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: quote, start: 'top 80%', end: 'bottom 50%', scrub: 0.4 } },
    );
  }
  railFor(founder);

  /* Chapter 3, reach: the map's rise is a native CSS view() timeline (about-story.css). Only the rail here. */
  railFor(one('[data-chapter="reach"]'));

  /* Chapter 4, "not an agency": pins while the word "agency" is struck through and the three differences step
     in one at a time, with a rail that fills as you go. */
  const diff = one('[data-chapter="different"]');
  if (diff) {
    const items = q('[data-story="diff-item"]');
    gsap
      .timeline({
        defaults: { ease: 'power1.out' },
        scrollTrigger: { trigger: diff, start: 'top top', end: '+=140%', pin: true, scrub: 0.6 },
      })
      .addLabel('strike')
      .from(q('[data-story="strike"]'), { scaleX: 0, transformOrigin: 'left center', duration: 1, ease: 'none' }, 'strike')
      .addLabel('steps', '+=0.2')
      .from(items, { opacity: 0.15, x: 32, duration: 1, stagger: 1 }, 'steps')
      .from(q('[data-story="diff-meter"]'), { scaleY: 0, transformOrigin: 'top center', ease: 'none', duration: items.length }, 'steps')
      .to({}, { duration: 0.6 }); // a short hold on the finished state before the pin releases
  }
  railFor(diff);

  /* Chapter 5, next step: CSS view() reveal. */
  railFor(one('[data-chapter="next"]'));
}
