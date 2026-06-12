import React from "react";

type BrandLogo = string | { src: string };

const PX_PER_SECOND = 80;
const MOMENTUM_DECAY_SECONDS = 0.22;
const MAX_RELEASE_VELOCITY = 520;

function normalizeOffset(value: number, width: number) {
  if (!width) return value;

  let normalized = value % width;
  if (normalized > 0) normalized -= width;

  return normalized;
}

export function TrustLogosMarquee({ brands }: { brands: { name: string; logo: BrandLogo }[] }) {
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

    const measure = () => {
      const width = group.scrollWidth;
      if (!width) return;

      groupWidthRef.current = width;
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

    const tick = (now: number) => {
      const width = groupWidthRef.current;
      const elapsedSeconds = Math.min((now - lastTime) / 1000, 0.08);
      lastTime = now;

      if (width && !isDraggingRef.current && !reducedMotionRef.current) {
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
      className="relative overflow-hidden"
      aria-label="Brand logo carousel"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* Gradient Masks - now transparent to blend with background */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-transparent/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-transparent via-transparent/50 to-transparent z-10 pointer-events-none" />

      <div ref={wrapRef} className={`marquee${isDragging ? " is-dragging" : ""}`}>
        <div ref={groupRef} className="marquee__group">
          {brands.map((brand, index) => (
            <div key={`g1-${index}`} className="logo">
              <img src={typeof brand.logo === "string" ? brand.logo : brand.logo.src} alt={brand.name} className="max-h-20 max-w-full object-contain mix-blend-multiply" />
            </div>
          ))}
        </div>

        <div className="marquee__group" aria-hidden="true">
          {brands.map((brand, index) => (
            <div key={`g2-${index}`} className="logo">
              <img src={typeof brand.logo === "string" ? brand.logo : brand.logo.src} alt={brand.name} className="max-h-20 max-w-full object-contain mix-blend-multiply" />
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
          gap:3rem; /* 48px - even tighter spacing */
          padding-right:3rem; /* Add padding to match gap, ensuring consistent spacing at the loop point */
        }
        .logo{
          flex:0 0 auto;
          display:flex;
          align-items:center;
          justify-content:center;
          height:6rem;  /* 96px - smaller container */
          width:12rem;   /* 192px - smaller container */
          opacity:0.70;
          transition: opacity 300ms, filter 300ms;
        }
        /* Grayscale effect only on dark/moon theme */
        .dark .logo {
          filter: grayscale(100%) brightness(1.2);
        }
        .dark .logo:hover {
          filter: grayscale(0%) brightness(1);
        }
        .logo:hover{
          opacity:1;
        }
        .logo img{
          pointer-events:none;
          user-select:none;
        }
      `}</style>
    </div>
  );
}
