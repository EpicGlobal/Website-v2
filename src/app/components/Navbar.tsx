import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { useTheme } from '@/app/context/ThemeContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { HubSpotModal } from '@/app/components/HubSpotModal';
import { getDefaultCtaVariant, readOrCreateCtaVariant } from '@/site/cta-variant';
import logo from '@/assets/89c6c6b033fa0f92c4e3c1a320826a96a86b5469.png';
import epicLogo from '@/assets/008bdb4c58b9b740867427493f73689a3f551b75.png';
import epicLogoDark from '@/assets/68e949a3afd2d5c92b966261b04168a3d4cfacfb.png';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/our-model', label: 'Our Model' },
    { to: '/intelligence', label: 'AI Intelligence' },
    { to: '/case-studies', label: 'Case Studies' },
    { to: '/knowledge-base', label: 'Knowledge Base' },
  ];
  const [ctaButtonText, setCtaButtonText] = useState(getDefaultCtaVariant());

  useEffect(() => {
    setCtaButtonText(readOrCreateCtaVariant());
  }, []);

  // Track the button variant with Google Analytics on mount
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'cta_button_variant_shown', {
        button_text: ctaButtonText,
        event_category: 'A/B Test',
        event_label: ctaButtonText,
      });
    }
  }, [ctaButtonText]);

  // Handle CTA button click tracking
  const handleCtaClick = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'cta_button_click', {
        button_text: ctaButtonText,
        event_category: 'Conversion',
        event_label: ctaButtonText,
      });
    }
  };

  // Progress bar effect
  useEffect(() => {
    if (isHovering) {
      // Reset triggered flag when starting a new hover
      hasTriggeredRef.current = false;
      
      const startTime = Date.now();
      const duration = 1000; // 1 second to auto-trigger

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);

        if (newProgress < 100) {
          timerRef.current = requestAnimationFrame(updateProgress);
        } else if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setIsModalOpen(true);
          handleCtaClick();
          setIsHovering(false);
        }
      };

      timerRef.current = requestAnimationFrame(updateProgress);
    } else {
      // Stop and reset immediately when not hovering
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

  // Determine which logo to show based on theme
  const getLogoForTheme = () => {
    if (theme === 'water') {
      return epicLogoDark.src; // Black logo for water/lime green theme
    }
    return epicLogo.src; // White/green gradient logo for all other themes
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cyan-900/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/20 leaf:bg-sky-600/80 leaf:border-sky-400/20 leaf:shadow-sky-400/20 water:bg-lime-600/80 water:border-lime-400/20 water:shadow-lime-400/20 orange:bg-orange-800/80 orange:border-orange-500/20 orange:shadow-orange-500/20'
          : 'bg-cyan-950/50 backdrop-blur-md leaf:bg-sky-700/50 water:bg-lime-700/50 orange:bg-orange-900/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <img 
              src={logo.src} 
              alt="Epic Global Inc." 
              className="w-11 h-11 transition-transform group-hover:scale-105" 
            />
            <img 
              src={getLogoForTheme()} 
              alt="Epic" 
              className="h-32 transition-transform group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                className={`px-5 py-3 text-sm font-medium transition-colors rounded-md ${
                  pathname === link.to
                    ? 'text-cyan-400 leaf:text-sky-700 water:text-lime-800 orange:text-orange-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 leaf:text-gray-700 leaf:hover:text-black leaf:hover:bg-white/10 water:text-gray-700 water:hover:text-black water:hover:bg-white/10 orange:text-orange-200 orange:hover:text-white orange:hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            
            {/* User Profile / Logout */}
            {user && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg">
                {user.picture ? (
                  <img src={user.picture} alt={user.name} className="w-6 h-6 rounded-full" />
                ) : (
                  <User className="w-4 h-4 text-gray-300" />
                )}
                <span className="text-sm text-gray-300">{user.name}</span>
                <button
                  onClick={logout}
                  className="ml-1 p-1 hover:bg-white/10 rounded transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 text-gray-300 hover:text-white" />
                </button>
              </div>
            )}
            
            <button
              type="button"
              data-primary-cta="true"
              onClick={() => {
                setIsModalOpen(true);
                handleCtaClick();
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`relative px-5 py-2 bg-gradient-to-r from-cyan-500 via-cyan-300 to-cyan-500 orange:from-orange-500 orange:via-orange-300 orange:to-orange-500 leaf:from-sky-500 leaf:via-sky-400 leaf:to-sky-500 water:from-emerald-600 water:via-emerald-400 water:to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-cyan-600 hover:to-cyan-700 orange:hover:from-orange-600 orange:hover:to-orange-700 leaf:hover:from-sky-600 leaf:hover:to-sky-700 water:hover:from-emerald-700 water:hover:to-emerald-700 transition-all shadow-lg shadow-cyan-500/20 orange:shadow-orange-500/20 leaf:shadow-sky-500/20 water:shadow-emerald-500/20 hover:shadow-cyan-500/30 orange:hover:shadow-orange-500/30 leaf:hover:shadow-sky-500/30 water:hover:shadow-emerald-500/30 overflow-hidden ${!isHovering ? 'animate-shimmer-ltr' : ''}`}
            >
              {/* Button text - behind progress bar */}
              <span className="relative z-0">{ctaButtonText}</span>
              
              {/* Progress bar - on top of text */}
              <div 
                className="absolute inset-y-0 left-0 bg-white/30 dark:bg-white/30 leaf:bg-sky-700/40 water:bg-emerald-800/40 light:bg-cyan-700/40 orange:bg-orange-800/40 z-10 rounded-lg transition-[width] duration-0 ease-linear"
                style={{ 
                  width: `${progress}%`,
                  transformOrigin: 'left'
                }}
              />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                  pathname === link.to
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-white/10 flex flex-col gap-3">
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
              <button
                type="button"
                data-primary-cta="true"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsOpen(false);
                  handleCtaClick();
                }}
                className="block px-5 py-2.5 bg-gradient-to-r from-cyan-500 via-cyan-300 to-cyan-500 orange:from-orange-500 orange:via-orange-300 orange:to-orange-500 leaf:from-cyan-600 leaf:via-cyan-400 leaf:to-cyan-600 water:from-emerald-500 water:via-emerald-300 water:to-emerald-500 text-white text-sm font-semibold text-center rounded-lg shadow-lg shadow-cyan-500/20 orange:shadow-orange-500/20 leaf:shadow-cyan-500/20 water:shadow-emerald-500/20 active:scale-95 transition-transform animate-shimmer-ltr"
              >
                {ctaButtonText}
              </button>
            </div>
          </div>
        </div>
      )}

      <HubSpotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}
