import { useEffect, useRef, useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { HubSpotModal } from '@/app/components/HubSpotModal';
import { getDefaultCtaVariant, readOrCreateCtaVariant } from '@/site/cta-variant';

interface CtaButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  location: string;
  className?: string;
}

export function CtaButton({
  variant = 'primary',
  size = 'md',
  location,
  className = '',
}: CtaButtonProps) {
  const { trackClick } = useAnalytics();
  const [buttonText, setButtonText] = useState(getDefaultCtaVariant());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    setButtonText(readOrCreateCtaVariant());
  }, []);

  const sizeClasses = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-8 py-3.5 text-base',
  };

  const variantClasses = {
    primary: `bg-gradient-to-r from-cyan-500 via-cyan-300 to-cyan-500 dark:from-cyan-500 dark:via-cyan-300 dark:to-cyan-500 leaf:from-sky-500 leaf:via-sky-400 leaf:to-sky-500 water:from-emerald-600 water:via-emerald-400 water:to-emerald-600 light:from-cyan-500 light:via-cyan-300 light:to-cyan-500 orange:from-orange-500 orange:via-orange-400 orange:to-orange-500 text-white leaf:text-white water:text-white hover:from-cyan-600 hover:to-cyan-700 dark:hover:from-cyan-600 dark:hover:to-cyan-700 leaf:hover:from-sky-600 leaf:hover:to-sky-700 water:hover:from-emerald-700 water:hover:to-emerald-700 light:hover:from-cyan-600 light:hover:to-cyan-700 orange:hover:from-orange-700 orange:hover:to-orange-800 shadow-lg shadow-cyan-500/25 dark:shadow-cyan-500/25 leaf:shadow-sky-500/25 water:shadow-emerald-500/25 light:shadow-cyan-500/25 orange:shadow-orange-500/25 hover:shadow-cyan-500/40 dark:hover:shadow-cyan-500/40 leaf:hover:shadow-sky-500/40 water:hover:shadow-emerald-500/40 light:hover:shadow-cyan-500/40 orange:hover:shadow-orange-500/40 ${!isHovering ? 'animate-shimmer-ltr' : ''}`,
    secondary:
      'bg-white/5 dark:bg-white/5 leaf:bg-white/10 water:bg-white/10 light:bg-gray-100 orange:bg-white/5 text-white dark:text-white leaf:text-gray-800 water:text-gray-800 light:text-gray-900 orange:text-white hover:bg-white/10 leaf:hover:bg-white/20 water:hover:bg-white/20 light:hover:bg-gray-200 orange:hover:bg-white/10 border border-white/10 dark:border-white/10 leaf:border-sky-600/30 water:border-emerald-600/30 light:border-gray-300 orange:border-white/10',
    outline:
      'bg-transparent border-2 border-cyan-500 dark:border-cyan-500 leaf:border-sky-600 water:border-emerald-600 light:border-cyan-500 orange:border-orange-600 text-cyan-500 dark:text-cyan-500 leaf:text-sky-700 water:text-emerald-700 light:text-cyan-500 orange:text-orange-700 hover:bg-cyan-500 dark:hover:bg-cyan-500 leaf:hover:bg-sky-600 water:hover:bg-emerald-600 light:hover:bg-cyan-500 orange:hover:bg-orange-600 hover:text-white',
  };

  const openModal = () => {
    setIsModalOpen(true);
    trackClick(buttonText, 'CTA Button A/B Test', {
      location,
      variant: buttonText,
      buttonStyle: variant,
    });
  };

  useEffect(() => {
    if (isHovering) {
      hasTriggeredRef.current = false;

      const startTime = Date.now();
      const duration = 1000;

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);

        if (newProgress < 100) {
          timerRef.current = requestAnimationFrame(updateProgress);
        } else if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          openModal();
          setIsHovering(false);
        }
      };

      timerRef.current = requestAnimationFrame(updateProgress);
    } else {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }
      setProgress(0);
    }

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [buttonText, isHovering, location, trackClick, variant]);

  return (
    <>
      <button
        type="button"
        data-primary-cta="true"
        onClick={openModal}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      >
        <span className="relative z-20">{buttonText}</span>
        <div
          className="absolute inset-y-0 left-0 z-10 rounded-lg bg-white/20 transition-[width] duration-0 ease-linear dark:bg-white/20 leaf:bg-sky-700/30 water:bg-emerald-700/30 light:bg-cyan-700/30 orange:bg-orange-800/30"
          style={{
            width: `${progress}%`,
            transformOrigin: 'left',
          }}
        />
      </button>

      <HubSpotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
