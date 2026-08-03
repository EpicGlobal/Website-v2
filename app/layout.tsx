import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@/styles/index.css';
import { SiteShell } from '@/site/SiteShell';
import { ConsentManagedTracking } from '@/app/components/ConsentManagedTracking';
import { siteConfig } from '@/site/site-config';
import tabLogo from '@/assets/89c6c6b033fa0f92c4e3c1a320826a96a86b5469.png';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Zero-Risk Global Commerce Operator`,
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
    'zero risk ecommerce',
    'brand protection',
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      {
        url: tabLogo.src,
        type: 'image/png',
      },
    ],
    shortcut: [
      {
        url: tabLogo.src,
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: tabLogo.src,
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: `${siteConfig.name} | Zero-Risk Global Commerce Operator`,
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
    title: `${siteConfig.name} | Zero-Risk Global Commerce Operator`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
    <html lang="en" className="orange" suppressHydrationWarning>
      <body>
        {wafIntegrationUrl ? (
          <Script
            id="aws-waf-browser-challenge"
            src={`${wafIntegrationUrl}/challenge.js`}
            strategy="afterInteractive"
          />
        ) : null}
        {turnstileSiteKey ? (
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
                const saved = window.localStorage.getItem('epic-theme-v2');
                const theme = allowed.includes(saved) ? saved : 'orange';
                document.documentElement.classList.remove(...allowed);
                document.documentElement.classList.add(theme);
              } catch (error) {
                document.documentElement.classList.add('orange');
              }
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
