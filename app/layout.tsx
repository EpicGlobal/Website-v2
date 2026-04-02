import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@/styles/index.css';
import { SiteShell } from '@/site/SiteShell';
import {
  GOOGLE_ADS_ID,
  GOOGLE_ADS_PRIMARY_CONVERSION_ID,
  GOOGLE_ANALYTICS_ID,
  META_PIXEL_ID,
} from '@/site/analytics-config';
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
  return (
    <html lang="en" className="orange" suppressHydrationWarning>
      <body>
        <Script id="meta-pixel-base" strategy="beforeInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
          `}
        </Script>
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
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}', { send_page_view: false });
            gtag('config', '${GOOGLE_ADS_ID}');
            window.gtag_report_conversion = function(url) {
              var callback = function () {
                if (typeof(url) !== 'undefined') {
                  window.location = url;
                }
              };
              if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
                console.debug('[gtag:conversion]', '${GOOGLE_ADS_PRIMARY_CONVERSION_ID}');
              }
              gtag('event', 'conversion', {
                'send_to': '${GOOGLE_ADS_PRIMARY_CONVERSION_ID}',
                'event_callback': callback
              });
              return false;
            };
          `}
        </Script>
        <noscript>
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
