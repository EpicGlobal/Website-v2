import Link from 'next/link';
import { type MouseEvent, useEffect, useRef, useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { HubSpotModal } from '@/app/components/HubSpotModal';
import { getDefaultCtaVariant, readOrCreateCtaVariant } from '@/site/cta-variant';
import { siteConfig } from '@/site/site-config';

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
  const { trackClick, trackCtaButtonClick } = useAnalytics();
  const [buttonText, setButtonText] = useState(getDefaultCtaVariant());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);
  const ctaStateRef = useRef({
    buttonText: getDefaultCtaVariant(),
    location,
    variant,
    trackClick,
    trackCtaButtonClick,
  });

  useEffect(() => {
    if (!siteConfig.bookACallEnabled) return;
    setButtonText(readOrCreateCtaVariant());
  }, []);

  useEffect(() => {
    ctaStateRef.current = {
      buttonText,
      location,
      variant,
      trackClick,
      trackCtaButtonClick,
    };
  }, [buttonText, location, trackClick, trackCtaButtonClick, variant]);

  const sizeClasses = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-8 py-3.5 text-base',
  };

  const variantClasses = {
    primary: `bg-[linear-gradient(90deg,var(--pop),var(--pop-hi),var(--pop))] text-[var(--on-pop)] font-semibold hover:bg-[linear-gradient(90deg,var(--pop-hover),var(--pop-hover),var(--pop-hover))] shadow-lg shadow-black/20 ${!isHovering ? 'animate-shimmer-ltr' : ''}`,
    secondary:
      'bg-white/5 dark:bg-white/5 leaf:bg-white/10 water:bg-white/10 light:bg-gray-100 orange:bg-white/5 text-white dark:text-white leaf:text-gray-800 water:text-gray-800 light:text-gray-900 orange:text-white hover:bg-white/10 leaf:hover:bg-white/20 water:hover:bg-white/20 light:hover:bg-gray-200 orange:hover:bg-white/10 border border-white/10 dark:border-white/10 leaf:border-sky-600/30 water:border-emerald-600/30 light:border-gray-300 orange:border-white/10',
    outline:
      'bg-transparent border-2 border-cyan-500 dark:border-cyan-500 leaf:border-sky-600 water:border-emerald-600 light:border-cyan-500 orange:border-orange-600 text-cyan-500 dark:text-cyan-500 leaf:text-sky-700 water:text-emerald-800 light:text-cyan-500 orange:text-orange-700 hover:bg-cyan-500 dark:hover:bg-cyan-500 leaf:hover:bg-sky-600 water:hover:bg-emerald-600 light:hover:bg-cyan-500 orange:hover:bg-orange-600 hover:text-white',
  };

  const openModal = () => {
    const {
      buttonText: currentButtonText,
      location: currentLocation,
      variant: currentVariant,
      trackClick: currentTrackClick,
      trackCtaButtonClick: currentTrackCtaButtonClick,
    } = ctaStateRef.current;

    setIsModalOpen(true);
    currentTrackClick(currentButtonText, 'CTA Button A/B Test', {
      location: currentLocation,
      variant: currentButtonText,
      button_style: currentVariant,
    });
    currentTrackCtaButtonClick(currentButtonText, {
      location: currentLocation,
      variant: currentButtonText,
      button_style: currentVariant,
    });
  };

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    openModal();
  };

  useEffect(() => {
    if (isHovering) {
      hasTriggeredRef.current = false;

      const startTime = performance.now();
      const duration = 1000;

      const updateProgress = () => {
        const elapsed = performance.now() - startTime;
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
  }, [isHovering]);

  if (!siteConfig.bookACallEnabled) {
    return null;
  }

  return (
    <>
      <Link
        href={siteConfig.primaryCtaHref}
        data-primary-cta="true"
        aria-haspopup="dialog"
        onClick={handleAnchorClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      >
        <span className="relative z-0">{buttonText}</span>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 rounded-lg bg-black/15 transition-[width] duration-0 ease-linear"
          style={{
            width: `${progress}%`,
            transformOrigin: 'left',
          }}
        />
      </Link>

      <HubSpotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
