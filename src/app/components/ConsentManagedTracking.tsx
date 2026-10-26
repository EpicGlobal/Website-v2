'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { isWebsitePreview } from '@/site/preview-mode';
import { usePathname } from 'next/navigation';
import {
  GOOGLE_ADS_ID,
  GOOGLE_ADS_PRIMARY_CONVERSION_ID,
  GOOGLE_ANALYTICS_ID,
  LINKEDIN_PARTNER_ID,
  META_PIXEL_ID,
} from '@/site/analytics-config';
import {
  hasGlobalPrivacyControl,
  PRIVACY_PREFERENCE_EVENT,
  readPrivacyPreference,
  writePrivacyPreference,
  type PrivacyPreference,
} from '@/site/privacy-preferences';

export function ConsentManagedTracking() {
  const pathname = usePathname();
  const [preference, setPreference] = useState<PrivacyPreference>('unset');

  useEffect(() => {
    const syncPreference = () => setPreference(readPrivacyPreference());
    if (hasGlobalPrivacyControl()) {
      writePrivacyPreference('denied');
      setPreference('denied');
    } else {
      syncPreference();
    }

    window.addEventListener(PRIVACY_PREFERENCE_EVENT, syncPreference);
    return () => window.removeEventListener(PRIVACY_PREFERENCE_EVENT, syncPreference);
  }, []);

  if (isWebsitePreview || preference !== 'granted') return null;

  const hasLinkedInPartnerId = LINKEDIN_PARTNER_ID.length > 0;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="consented-google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted'
          });
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ANALYTICS_ID}', { send_page_view: true });
          gtag('config', '${GOOGLE_ADS_ID}');
          window.gtag_report_conversion = function(url) {
            var callback = function () {
              if (typeof(url) !== 'undefined') window.location = url;
            };
            gtag('event', 'conversion', {
              send_to: '${GOOGLE_ADS_PRIMARY_CONVERSION_ID}',
              event_callback: callback
            });
            return false;
          };
        `}
      </Script>
      <Script id="consented-meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('consent', 'grant');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      {hasLinkedInPartnerId ? (
        <Script id="consented-linkedin-insight" strategy="afterInteractive">
          {`
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push('${LINKEDIN_PARTNER_ID}');
            (function(l) {
              if (!l) {
                window.lintrk = function(a,b){window.lintrk.q.push([a,b]);};
                window.lintrk.q = [];
              }
              var s = document.getElementsByTagName('script')[0];
              var b = document.createElement('script');
              b.type = 'text/javascript';
              b.async = true;
              b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      ) : null}
      {pathname.startsWith('/campaigns/marketplace-assessment') ? (
        <Script
          id="consented-copperline-pixel"
          src="https://crm.epicglobalinc.com/public/copperline.js"
          data-workspace="epicglobalinc"
          data-site="epicglobalinc.com"
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
