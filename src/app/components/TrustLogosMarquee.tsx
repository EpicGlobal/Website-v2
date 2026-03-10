import React from "react";

type BrandLogo = string | { src: string };

export function TrustLogosMarquee({ brands }: { brands: { name: string; logo: BrandLogo }[] }) {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const groupRef = React.useRef<HTMLDivElement | null>(null);

  // Tune this: higher = faster (pixels per second)
  const PX_PER_SECOND = 80;

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const group = groupRef.current;
    if (!wrap || !group) return;

    const setDuration = () => {
      // One group width (the distance we travel for a seamless loop)
      const w = group.scrollWidth;
      if (!w) return;

      const seconds = w / PX_PER_SECOND;
      wrap.style.setProperty("--marquee-duration", `${seconds}s`);
    };

    // Observe layout changes (responsive + font/image/layout)
    const ro = new ResizeObserver(() => setDuration());
    ro.observe(group);

    // Also run after images load (common reason widths are wrong at first)
    const imgs = Array.from(group.querySelectorAll("img"));
    let pending = imgs.length;

    if (pending === 0) setDuration();
    imgs.forEach((img) => {
      if ((img as HTMLImageElement).complete) {
        pending -= 1;
        if (pending === 0) setDuration();
      } else {
        img.addEventListener(
          "load",
          () => {
            pending -= 1;
            if (pending === 0) setDuration();
          },
          { once: true }
        );
      }
    });

    // Initial call (in case everything is already loaded)
    setDuration();

    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Gradient Masks - now transparent to blend with background */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-transparent/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-transparent via-transparent/50 to-transparent z-10 pointer-events-none" />

      <div ref={wrapRef} className="marquee">
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
          animation: marquee var(--marquee-duration, 22s) linear infinite;
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
        @keyframes marquee{
          0%{ transform: translateX(0); }
          100%{ transform: translateX(-50%); }
        }
        .marquee:hover{ animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce){
          .marquee{ animation:none; transform:none; }
        }
      `}</style>
    </div>
  );
}
