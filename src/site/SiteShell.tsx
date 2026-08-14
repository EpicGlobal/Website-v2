'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/app/context/ThemeContext';
import { AuthProvider } from '@/app/contexts/AuthContext';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { StickyCtaMobile } from '@/app/components/StickyCtaMobile';
import { ExitIntentPopup } from '@/app/components/ExitIntentPopup';
import { useAnalytics } from '@/hooks/useAnalytics';
import { captureLeadAttribution } from '@/site/lead-attribution';
import { PrivacyConsentBanner } from '@/app/components/PrivacyConsentBanner';
import { allowsNonEssentialTracking } from '@/site/privacy-preferences';
import { siteConfig } from '@/site/site-config';

function LeadAttributionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!allowsNonEssentialTracking()) return;
    captureLeadAttribution();
  }, [pathname]);

  return null;
}

function PageViewTracker() {
  const pathname = usePathname();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    if (!allowsNonEssentialTracking()) return;
    trackPageView(pathname, document.title);

    if (typeof window.fbq === 'function') {
      if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
        console.debug('[meta:track]', 'PageView', {
          page_location: window.location.href,
          page_path: pathname,
        });
      }

      window.fbq('track', 'PageView');
    }
  }, [pathname, trackPageView]);

  return null;
}

function AdsLifecycleTracker() {
  const pathname = usePathname();
  const {
    trackFirstVisit,
    trackScroll,
    trackSessionStart,
    trackUserEngagement,
  } = useAnalytics();

  useEffect(() => {
    if (typeof window === 'undefined' || !allowsNonEssentialTracking()) {
      return;
    }

    const pageParams = {
      page_path: pathname,
      page_title: document.title,
      page_location: window.location.href,
    };

    if (!window.sessionStorage.getItem('epic-ads-session-start-tracked')) {
      trackSessionStart(pageParams);
      window.sessionStorage.setItem('epic-ads-session-start-tracked', 'true');
    }

    if (!window.localStorage.getItem('epic-ads-first-visit-tracked')) {
      trackFirstVisit(pageParams);
      window.localStorage.setItem('epic-ads-first-visit-tracked', 'true');
    }
  }, [pathname, trackFirstVisit, trackSessionStart]);

  useEffect(() => {
    if (typeof window === 'undefined' || !allowsNonEssentialTracking()) {
      return;
    }

    let hasTracked = false;
    let timer: number | null = null;

    const clearTimer = () => {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
    };

    const queueTracking = () => {
      if (hasTracked || document.hidden || !document.hasFocus()) {
        return;
      }

      clearTimer();

      timer = window.setTimeout(() => {
        if (hasTracked || document.hidden || !document.hasFocus()) {
          return;
        }

        hasTracked = true;
        trackUserEngagement({
          page_path: pathname,
          page_title: document.title,
          page_location: window.location.href,
        });
      }, 1000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimer();
        return;
      }

      queueTracking();
    };

    queueTracking();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', queueTracking);
    window.addEventListener('blur', clearTimer);

    return () => {
      clearTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', queueTracking);
      window.removeEventListener('blur', clearTimer);
    };
  }, [pathname, trackUserEngagement]);

  useEffect(() => {
    if (typeof window === 'undefined' || !allowsNonEssentialTracking()) {
      return;
    }

    let hasTracked = false;

    const handleScroll = () => {
      if (hasTracked) {
        return;
      }

      const scrollDepth =
        (window.scrollY + window.innerHeight) /
        Math.max(document.documentElement.scrollHeight, 1);

      if (scrollDepth < 0.9) {
        return;
      }

      hasTracked = true;
      trackScroll({
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
        percent_scrolled: 90,
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, trackScroll]);

  return null;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCampaignLandingPage = pathname.startsWith('/campaigns/');
  const showBookingPrompts = !isCampaignLandingPage && siteConfig.bookACallEnabled;

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen">
          {isCampaignLandingPage ? null : <Navbar />}
          <LeadAttributionTracker />
          <PageViewTracker />
          <AdsLifecycleTracker />
          {children}
          {isCampaignLandingPage ? null : <Footer />}
          {showBookingPrompts ? <StickyCtaMobile /> : null}
          {showBookingPrompts ? <ExitIntentPopup /> : null}
          <PrivacyConsentBanner />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
