import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@/styles/index.css';
import { SiteShell } from '@/site/SiteShell';
import { siteConfig } from '@/site/site-config';

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
    icon: '/favicon.svg',
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
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-BGM7PRFBR7" strategy="afterInteractive" />
        <Script id="ga-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-BGM7PRFBR7');
          `}
        </Script>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-11008066442" strategy="afterInteractive" />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'AW-11008066442');
            window.gtag_report_conversion = function(url) {
              var callback = function () {
                if (typeof(url) !== 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-11008066442/uqbjCJTEovwbEIqHh4Ep',
                'event_callback': callback
              });
              return false;
            };
          `}
        </Script>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
