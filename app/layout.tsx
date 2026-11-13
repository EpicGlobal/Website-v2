import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@/styles/index.css';
import { SiteShell } from '@/site/SiteShell';
import { ConsentManagedTracking } from '@/app/components/ConsentManagedTracking';
import { siteConfig } from '@/site/site-config';
import { isWebsitePreview } from '@/site/preview-mode';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Wholesale Trade Partner That Buys Your Inventory`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  keywords: [
    'global commerce operator',
    'ecommerce operator',
    'marketplace expansion',
    'international ecommerce',
    'wholesale trade partner',
    'brand protection',
  ],
  // Fixed addresses (not build-hashed) so Google can keep showing Epic's icon next to search results.
  // 192px is a multiple of 48, as Google asks. Made from src/assets/89c6c6...png (the tab logo).
  icons: {
    icon: [
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: `${siteConfig.name} | Wholesale Trade Partner That Buys Your Inventory`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: 'en_US',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Wholesale Trade Partner That Buys Your Inventory`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: !isWebsitePreview,
    follow: !isWebsitePreview,
    googleBot: {
      index: !isWebsitePreview,
      follow: !isWebsitePreview,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f97316',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const wafIntegrationUrl = String(process.env.NEXT_PUBLIC_AWS_WAF_INTEGRATION_URL ?? '').replace(/\/$/, '');
  const turnstileSiteKey = String(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '').trim();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Short and full plain-text summaries of the site for AI assistants. */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="llms-full.txt" />
      </head>
      <body>
        {!isWebsitePreview && wafIntegrationUrl ? (
          <Script
            id="aws-waf-browser-challenge"
            src={`${wafIntegrationUrl}/challenge.js`}
            strategy="afterInteractive"
          />
        ) : null}
        {!isWebsitePreview && turnstileSiteKey ? (
          <Script
            id="cloudflare-turnstile"
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
          />
        ) : null}
        <Script id="epic-theme-init" strategy="beforeInteractive">
          {`
            (() => {
              try {
                const allowed = ['dark', 'leaf', 'water', 'light', 'orange'];
                const saved = window.localStorage.getItem('epic-theme-v3');
                const theme = allowed.includes(saved) ? saved : 'dark';
                document.documentElement.classList.remove(...allowed);
                document.documentElement.classList.add(theme);
              } catch (error) {
                document.documentElement.classList.add('dark');
              }
            })();
          `}
        </Script>
        <Script id="epic-privacy-init" strategy="beforeInteractive">
          {`
            (() => {
              try {
                const key = 'epic.privacy.nonessential';
                const ok = (v) => v === 'granted' || v === 'denied';
                let set = navigator.globalPrivacyControl === true;
                try { set = set || ok(window.localStorage.getItem(key)); } catch (e) {}
                set = set || document.cookie.split(';').some((c) => ok(c.trim().split(key + '=')[1]));
                if (set) document.documentElement.setAttribute('data-privacy-set', '');
              } catch (error) {}
            })();
          `}
        </Script>
        <Script id="epic-auth-recovery-init" strategy="beforeInteractive">
          {`
            (() => {
              try {
                const recoveryPath = '/reset-password';
                const currentPath = window.location.pathname;
                const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
                const searchParams = new URLSearchParams(window.location.search);
                const isRecoveryLink =
                  hashParams.get('type') === 'recovery' ||
                  searchParams.get('type') === 'recovery' ||
                  hashParams.has('access_token') ||
                  searchParams.has('token_hash');

                if (isRecoveryLink && currentPath !== recoveryPath) {
                  window.location.replace(recoveryPath + window.location.search + window.location.hash);
                }
              } catch (error) {
                // Ignore and allow the app to continue booting.
              }
            })();
          `}
        </Script>
        <ConsentManagedTracking />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
