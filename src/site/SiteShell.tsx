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

function PageViewTracker() {
  const pathname = usePathname();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(pathname, document.title);
  }, [pathname, trackPageView]);

  return null;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen">
          <Navbar />
          <PageViewTracker />
          {children}
          <Footer />
          <StickyCtaMobile />
          <ExitIntentPopup />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
