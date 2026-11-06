import React from "react";
import Image, { type StaticImageData } from "next/image";

// Static imports, so next/image knows each logo's size and serves a small WebP/AVIF copy
// (the PNGs are 1,000+ px wide but shown at most 176 x 56 px).
type BrandLogo = StaticImageData;
/**
 * All logos show in one color (white on the dark theme, near-black on the light themes) so the strip reads as one
 * calm row. On mouse hover a logo pops (grows a little) and shows its real colors; the tone below only fixes those
 * real colors so they still read on the theme. A logo marked badge (a solid square badge that would become a blank
 * square in one color) goes grey instead, so its inner mark stays visible.
 *
 * Tone, used on hover only:
 * - light: a white or very pale logo, shown dark on the light themes (natural on dark).
 * - pale:  a light-colored logo, deepened on the light themes and brightened in the dark theme (keeps its colors).
 * - dark:  a black or grey logo, shown white in the dark theme (natural on light).
 * - deep:  a dark-colored logo, brightened in the dark theme (keeps its colors; natural on light).
 * Logos without a tone keep their own colors everywhere.
 */
export type LogoTone = "light" | "pale" | "dark" | "deep";

const PX_PER_SECOND = 80;
const MOMENTUM_DECAY_SECONDS = 0.22;
const MAX_RELEASE_VELOCITY = 520;

/**
 * Every logo gets the same visual area (not the same box), so a wide thin wordmark and a square badge read at the
 * same weight. Desktop and phone sizes go to CSS variables; caps stop very wide or tall logos from running away.
 */
function logoSize(logo: BrandLogo) {
  const ar = logo.width / logo.height || 3;
  const fit = (area: number, maxW: number, maxH: number) => {
    let w = Math.sqrt(area * ar);
    let h = w / ar;
    if (w > maxW) { w = maxW; h = w / ar; }
    if (h > maxH) { h = maxH; w = h * ar; }
    return [Math.round(w), Math.round(h)];
  };
  const [dw, dh] = fit(10000, 210, 76);
  const [mw, mh] = fit(6400, 150, 56);
  return { "--dw": `${dw}px`, "--dh": `${dh}px`, "--mw": `${mw}px`, "--mh": `${mh}px` } as React.CSSProperties;
}

function normalizeOffset(value: number, width: number) {
  if (!width) return value;

  let normalized = value % width;
  if (normalized > 0) normalized -= width;

  return normalized;
}

export type MarqueeBrand = { name: string; logo: BrandLogo; tone?: LogoTone; badge?: boolean };

export function TrustLogosMarquee({ brands }: { brands: MarqueeBrand[] }) {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const groupRef = React.useRef<HTMLDivElement | null>(null);
  const groupWidthRef = React.useRef(0);
  const offsetRef = React.useRef(0);
  const isDraggingRef = React.useRef(false);
  const dragPointerIdRef = React.useRef<number | null>(null);
  const dragStartXRef = React.useRef(0);
  const dragStartOffsetRef = React.useRef(0);
  const dragLastXRef = React.useRef(0);
  const dragLastTimeRef = React.useRef(0);
  const dragVelocityRef = React.useRef(0);
  const releaseVelocityRef = React.useRef(0);
  const reducedMotionRef = React.useRef(false);
  const [isDragging, setIsDragging] = React.useState(false);
  // The first logos (Bucked Up, Young Living...) hold still and fully visible for a moment before the strip moves.
  const HOLD_MS = 3000;
  const [moving, setMoving] = React.useState(false);
  const [centeredView, setCenteredView] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setMoving(true), HOLD_MS); return () => clearTimeout(t); }, []);

  const applyOffset = React.useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    wrap.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  }, []);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const group = groupRef.current;
    if (!wrap || !group) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotionPreference = () => {
      reducedMotionRef.current = reducedMotionQuery.matches;
    };

    let centered = false;
    const measure = () => {
      const width = group.scrollWidth;
      if (!width) return;

      groupWidthRef.current = width;
      // Desktop: start with the first logo in the middle of the strip (the logos before it are the end of the list).
      if (!centered && window.innerWidth >= 1024) {
        const view = wrap.parentElement?.clientWidth ?? 0;
        const first = group.firstElementChild as HTMLElement | null;
        if (view && first?.offsetWidth) {
          offsetRef.current = view / 2 - first.offsetWidth / 2 - width;
          centered = true;
          setCenteredView(true);
        }
      }
      offsetRef.current = normalizeOffset(offsetRef.current, width);
      applyOffset();
    };

    updateReducedMotionPreference();
    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener("change", updateReducedMotionPreference);
    } else {
      reducedMotionQuery.addListener(updateReducedMotionPreference);
    }

    const ro = new ResizeObserver(measure);
    ro.observe(group);

    const imgs = Array.from(group.querySelectorAll("img"));
    const pendingImgs = imgs.filter((img) => !(img as HTMLImageElement).complete);

    pendingImgs.forEach((img) => {
      img.addEventListener("load", measure);
      img.addEventListener("error", measure);
    });

    let frameId = 0;
    let lastTime = performance.now();
    const startAt = performance.now() + HOLD_MS;

    const tick = (now: number) => {
      const width = groupWidthRef.current;
      const elapsedSeconds = Math.min((now - lastTime) / 1000, 0.08);
      lastTime = now;

      if (width && now > startAt && !isDraggingRef.current && !reducedMotionRef.current) {
        const releaseVelocity = releaseVelocityRef.current;
        const speed = -PX_PER_SECOND + releaseVelocity;

        offsetRef.current = normalizeOffset(offsetRef.current + speed * elapsedSeconds, width);
        releaseVelocityRef.current *= Math.exp(-elapsedSeconds / MOMENTUM_DECAY_SECONDS);

        if (Math.abs(releaseVelocityRef.current) < 2) {
          releaseVelocityRef.current = 0;
        }

        applyOffset();
      }

      frameId = requestAnimationFrame(tick);
    };

    measure();
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      pendingImgs.forEach((img) => {
        img.removeEventListener("load", measure);
        img.removeEventListener("error", measure);
      });

      if (reducedMotionQuery.removeEventListener) {
        reducedMotionQuery.removeEventListener("change", updateReducedMotionPreference);
      } else {
        reducedMotionQuery.removeListener(updateReducedMotionPreference);
      }
    };
  }, [applyOffset]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const wrap = wrapRef.current;
    const width = groupWidthRef.current;
    if (!wrap || !width) return;

    event.preventDefault();
    isDraggingRef.current = true;
    dragPointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    dragLastXRef.current = event.clientX;
    dragLastTimeRef.current = event.timeStamp || performance.now();
    dragVelocityRef.current = 0;
    releaseVelocityRef.current = 0;
    setIsDragging(true);

    try {
      wrap.setPointerCapture(event.pointerId);
    } catch {
      // Pointer capture can fail if the pointer is already released.
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || dragPointerIdRef.current !== event.pointerId) return;

    const width = groupWidthRef.current;
    if (!width) return;

    const now = event.timeStamp || performance.now();
    const elapsedSeconds = Math.max((now - dragLastTimeRef.current) / 1000, 0.001);
    const deltaX = event.clientX - dragLastXRef.current;

    dragVelocityRef.current = deltaX / elapsedSeconds;
    dragLastXRef.current = event.clientX;
    dragLastTimeRef.current = now;

    offsetRef.current = normalizeOffset(dragStartOffsetRef.current + event.clientX - dragStartXRef.current, width);
    applyOffset();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || dragPointerIdRef.current !== event.pointerId) return;

    const wrap = wrapRef.current;

    isDraggingRef.current = false;
    dragPointerIdRef.current = null;
    releaseVelocityRef.current = Math.max(
      -MAX_RELEASE_VELOCITY,
      Math.min(MAX_RELEASE_VELOCITY, dragVelocityRef.current)
    );
    setIsDragging(false);

    if (wrap?.hasPointerCapture(event.pointerId)) {
      wrap.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className="relative overflow-hidden py-2"
      aria-label="Brand logo carousel"
      style={{
        // Soft fade at both ends so logos glide in and out. Phones hold the first logos at the left edge with no left fade.
        maskImage: moving || centeredView ? "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)" : "linear-gradient(to right, #000 88%, transparent)",
        WebkitMaskImage: moving || centeredView ? "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)" : "linear-gradient(to right, #000 88%, transparent)",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div ref={wrapRef} className={`marquee${isDragging ? " is-dragging" : ""}`}>
        <div ref={groupRef} className="marquee__group">
          {brands.map((brand, index) => (
            <div key={`g1-${index}`} className="logo" data-tone={brand.tone} data-badge={brand.badge ? "" : undefined} style={logoSize(brand.logo)}>
              <Image src={brand.logo} alt={brand.name} title={brand.name} sizes="240px" className="object-contain" />
            </div>
          ))}
        </div>

        <div className="marquee__group" aria-hidden="true">
          {brands.map((brand, index) => (
            <div key={`g2-${index}`} className="logo" data-tone={brand.tone} data-badge={brand.badge ? "" : undefined} style={logoSize(brand.logo)}>
              <Image src={brand.logo} alt="" sizes="240px" className="object-contain" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee{
          display:flex;
          width:max-content;
          will-change:transform;
          cursor:grab;
          touch-action:pan-y;
          user-select:none;
        }
        .marquee.is-dragging{
          cursor:grabbing;
        }
        .marquee__group{
          display:flex;
          align-items:center;
          gap:3.5rem;
          padding-right:3.5rem; /* matches the gap so spacing stays even at the loop point */
        }
        .logo{
          flex:0 0 auto;
          display:flex;
          align-items:center;
          justify-content:center;
          height:5.5rem;
          transition: transform 250ms ease;
        }
        /* Phones: smaller logos and gaps so the first two (Bucked Up, Young Living) fit side by side. */
        @media (max-width: 639px){
          .marquee__group{ gap:1.5rem; padding-right:1.5rem; }
          .logo{ height:4rem; }
          .marquee .logo img{ width:var(--mw); height:var(--mh); }
        }
        /* One color: white on the dark theme, near-black on the light themes. */
        .logo img{ transition: filter 300ms, opacity 300ms; }
        .dark .logo img{ filter: brightness(0) invert(1); opacity: .85; }
        html:not(.dark) .logo img{ filter: brightness(0); opacity: .75; }
        .dark .marquee .logo[data-badge] img{ filter: grayscale(1) brightness(1.6) contrast(1.1); }
        :where(html:not(.dark)) .marquee .logo[data-badge] img{ filter: grayscale(1) brightness(0.5) contrast(1.4); }
        /* Mouse hover: the logo pops out a little and shows its real colors (tone keeps them readable on the theme). */
        @media (hover: hover){
          .marquee:not(.is-dragging) .logo:hover{ transform: scale(1.12); }
          .marquee:not(.is-dragging) .logo:hover img{ filter: none; opacity: 1; }
          html:not(.dark) .marquee:not(.is-dragging) .logo[data-tone="light"]:hover img{ filter: brightness(0); }
          html:not(.dark) .marquee:not(.is-dragging) .logo[data-tone="pale"]:hover img{ filter: brightness(0.6) saturate(1.4); }
          .dark .marquee:not(.is-dragging) .logo[data-tone="dark"]:hover img{ filter: brightness(0) invert(1); }
          .dark .marquee:not(.is-dragging) .logo[data-tone="pale"]:hover img,
          .dark .marquee:not(.is-dragging) .logo[data-tone="deep"]:hover img{ filter: brightness(1.7) saturate(1.1); }
        }
        @media (prefers-reduced-motion: reduce){
          .marquee .logo:hover{ transform: none; }
        }
        .logo img{
          width:var(--dw);
          height:var(--dh);
          pointer-events:none;
          user-select:none;
        }
      `}</style>
    </div>
  );
}
