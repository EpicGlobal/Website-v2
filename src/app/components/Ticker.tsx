import { useEffect, useRef } from 'react';

const signals = [
  'Live Global Impact: Catalog health checks running',
  'Live Global Impact: Listing updates queued for publishing',
  'Live Global Impact: Inventory syncs across regions',
  'Live Global Impact: Unauthorized seller signals reviewed',
  'Live Global Impact: Pricing and margin rules enforced',
  'Live Global Impact: Ads and creative tests rotating',
  'Live Global Impact: Global shipments monitored',
];

export function Ticker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    // Clone the content for seamless loop
    const content = ticker.innerHTML;
    ticker.innerHTML = content + content;
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-cyan-950/20 via-cyan-900/10 to-cyan-950/20 dark:from-cyan-950/20 dark:via-cyan-900/10 dark:to-cyan-950/20 water:from-sky-700/20 water:via-sky-600/10 water:to-sky-700/20 leaf:from-lime-700/20 leaf:via-lime-600/10 leaf:to-lime-700/20 light:from-cyan-950/20 light:via-cyan-900/10 light:to-cyan-950/20 orange:from-cyan-950/20 orange:via-cyan-900/10 orange:to-cyan-950/20 border-y border-cyan-500/10 dark:border-cyan-500/10 water:border-sky-600/30 leaf:border-lime-600/30 light:border-cyan-500/10 orange:border-cyan-500/10 py-3">
      <div
        ref={tickerRef}
        className="flex animate-marquee whitespace-nowrap"
        style={{
          animation: 'marquee 40s linear infinite',
        }}
      >
        {[...signals, ...signals].map((signal, index) => (
          <span
            key={index}
            className="inline-flex items-center mx-8 text-sm text-cyan-400/80 dark:text-cyan-400/80 water:text-sky-900 leaf:text-lime-900 light:text-cyan-400/80 orange:text-cyan-400/80"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 dark:bg-cyan-400 water:text-sky-700 leaf:bg-lime-700 light:bg-cyan-400 orange:bg-cyan-400 mr-3 animate-pulse"></span>
            {signal}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}