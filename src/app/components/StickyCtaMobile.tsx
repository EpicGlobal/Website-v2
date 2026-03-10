import { useEffect, useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { HubSpotModal } from '@/app/components/HubSpotModal';
import { getDefaultCtaVariant, readOrCreateCtaVariant } from '@/site/cta-variant';

export function StickyCtaMobile() {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [buttonText, setButtonText] = useState(getDefaultCtaVariant());
  const { trackClick } = useAnalytics();

  useEffect(() => {
    setButtonText(readOrCreateCtaVariant());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        const scrollPosition = window.scrollY;
        const hasScrolled = scrollPosition > 400;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrolledToBottom = scrollPosition + windowHeight >= documentHeight - 150;

        setIsVisible(hasScrolled && !anyVisible && !scrolledToBottom);
      },
      {
        threshold: 0.2,
        rootMargin: '100px 0px 250px 0px',
      }
    );

    const ctaButtons = document.querySelectorAll(
      '[data-primary-cta="true"], button[class*="bg-gradient-to-r"]'
    );
    const footer = document.querySelector('footer');

    ctaButtons.forEach((button) => {
      if (!button.closest('[class*="fixed bottom-0"]')) {
        observer.observe(button);
      }
    });

    if (footer) {
      observer.observe(footer);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const hasScrolled = scrollPosition > 400;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrolledToBottom = scrollPosition + windowHeight >= documentHeight - 150;

      if (!hasScrolled || scrolledToBottom) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    trackClick(buttonText, 'CTA Button A/B Test', {
      location: 'Mobile Sticky CTA',
      variant: buttonText,
      buttonStyle: 'primary',
    });
    setShowModal(true);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-black via-black/95 to-transparent dark:from-black dark:via-black/95 dark:to-transparent orange:from-orange-900/50 orange:via-orange-900/40 orange:to-transparent water:from-emerald-900/50 water:via-emerald-900/40 water:to-transparent leaf:from-sky-900/50 leaf:via-sky-900/40 leaf:to-transparent soft-dark:from-lime-900/50 soft-dark:via-lime-900/40 soft-dark:to-transparent light:from-gray-200/50 light:via-gray-200/40 light:to-transparent md:hidden">
        <button
          type="button"
          data-primary-cta="true"
          onClick={handleClick}
          className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 via-cyan-300 to-cyan-500 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 active:scale-95 animate-shimmer-ltr dark:from-cyan-500 dark:via-cyan-300 dark:to-cyan-500 dark:shadow-cyan-500/25 leaf:from-sky-500 leaf:via-sky-400 leaf:to-sky-500 leaf:text-white leaf:shadow-sky-500/25 water:from-emerald-600 water:via-emerald-400 water:to-emerald-600 water:text-white water:shadow-emerald-500/25 light:from-cyan-500 light:via-cyan-300 light:to-cyan-500 light:shadow-cyan-500/25 orange:from-orange-500 orange:via-orange-400 orange:to-orange-500 orange:shadow-orange-500/25"
        >
          {buttonText}
        </button>
      </div>

      <HubSpotModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
