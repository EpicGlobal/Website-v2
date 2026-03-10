import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

function AnimatedStat({ value, suffix = '', prefix = '', label, duration = 2 }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-b from-cyan-400 to-cyan-600 light:from-cyan-600 light:to-cyan-800 bg-clip-text text-transparent">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm sm:text-base text-gray-400 dark:text-gray-400 water:text-gray-500 light:text-gray-600 orange:text-gray-400">
        {label}
      </div>
    </motion.div>
  );
}

export function AnimatedStats() {
  const stats = [
    { value: 50, suffix: 'M+', label: 'Orders Processed', duration: 2.5 },
    { value: 25, suffix: '+', label: 'Countries Operating', duration: 2 },
    { value: 1000, suffix: '+', label: 'Brands Protected', duration: 2.5 },
    { value: 99, suffix: '%', label: 'Uptime Guarantee', duration: 2 },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-black via-cyan-950/10 to-black dark:from-black dark:via-cyan-950/10 dark:to-black water:from-slate-900 water:via-cyan-950/10 water:to-slate-900 light:from-gray-50 light:via-cyan-50 light:to-gray-50 orange:from-black orange:via-orange-950/20 orange:to-black">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white dark:text-white water:text-gray-100 light:text-gray-900 orange:text-white">
            Operating at scale, globally
          </h2>
          <p className="text-gray-400 dark:text-gray-400 water:text-gray-500 light:text-gray-600 orange:text-gray-400 max-w-2xl mx-auto">
            Real numbers from real operations across global marketplaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}