import { useState, useEffect } from 'react';
import { CtaButton } from '@/app/components/CtaButton';
import { X } from 'lucide-react';

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const alreadyShown = sessionStorage.getItem('exitIntentShown');
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    let exitTimer: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect mouse leaving from top of viewport
      if (e.clientY <= 0 && !hasShown && window.scrollY > 500) {
        // Small delay to avoid false triggers
        exitTimer = setTimeout(() => {
          setIsVisible(true);
          setHasShown(true);
          sessionStorage.setItem('exitIntentShown', 'true');
        }, 100);
      }
    };

    const handleMouseEnter = () => {
      clearTimeout(exitTimer);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(exitTimer);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] animate-fade-in"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-lg animate-scale-in">
        <div className="bg-gradient-to-br from-gray-900 to-black dark:from-gray-900 dark:to-black soft-dark:from-lime-100 soft-dark:to-lime-200 light:from-gray-900 light:to-black orange:from-gray-900 orange:to-black border border-cyan-500/30 dark:border-cyan-500/30 soft-dark:border-lime-600/40 light:border-cyan-500/30 orange:border-cyan-500/30 rounded-2xl p-8 shadow-2xl shadow-cyan-500/20 soft-dark:shadow-lime-500/20 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/5 dark:bg-white/5 soft-dark:bg-white/20 light:bg-white/5 orange:bg-white/5 rounded-full flex items-center justify-center border border-white/10 dark:border-white/10 soft-dark:border-lime-600/30 light:border-white/10 orange:border-white/10 hover:bg-white/10 soft-dark:hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400 dark:text-gray-400 soft-dark:text-gray-800 light:text-gray-400 orange:text-gray-400" />
          </button>

          <div className="text-center">
            <div className="inline-block px-4 py-1.5 bg-cyan-500/10 dark:bg-cyan-500/10 soft-dark:bg-lime-600/20 light:bg-cyan-500/10 orange:bg-cyan-500/10 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-800 light:text-cyan-400 orange:text-cyan-400 rounded-full text-xs font-semibold mb-4">
              Wait! Before you go...
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-b from-white to-gray-400 dark:from-white dark:to-gray-400 soft-dark:from-gray-900 soft-dark:to-gray-700 light:from-white light:to-gray-400 orange:from-white orange:to-gray-400 bg-clip-text text-transparent">
              Zero Risk. Zero Inventory Cost.
            </h2>
            
            <p className="text-gray-300 dark:text-gray-300 soft-dark:text-gray-800 light:text-gray-300 orange:text-gray-300 mb-6 leading-relaxed">
              We purchase your inventory upfront, operate marketplaces end-to-end, and fund all advertising. You get profit share with zero operational lift.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <CtaButton 
                variant="primary" 
                size="lg" 
                location="Exit Intent Popup"
                className="w-full sm:w-auto"
              />
              <button
                onClick={handleClose}
                className="px-8 py-3 text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-400 orange:text-gray-400 hover:text-white soft-dark:hover:text-gray-900 transition-colors text-base font-medium"
              >
                Maybe Later
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-500 soft-dark:text-gray-700 light:text-gray-500 orange:text-gray-500">
              5-minute assessment. No commitment required.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}