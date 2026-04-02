'use client';

import { useCallback } from 'react';
import { GOOGLE_ADS_ID } from '@/site/analytics-config';

type AnalyticsParams = Record<string, unknown>;

function logAnalyticsEvent(eventName: string, eventParams?: AnalyticsParams) {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') {
    return;
  }

  console.debug('[gtag:event]', eventName, eventParams ?? {});
}

function fireAnalyticsEvent(
  eventName: string,
  eventParams?: AnalyticsParams,
  options?: { adsOnly?: boolean }
) {
  if (typeof window === 'undefined') {
    return;
  }

  const payload =
    options?.adsOnly
      ? { ...eventParams, send_to: GOOGLE_ADS_ID }
      : eventParams;

  logAnalyticsEvent(eventName, payload);

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }
}

export const useAnalytics = () => {
  const trackEvent = useCallback((eventName: string, eventParams?: AnalyticsParams) => {
    fireAnalyticsEvent(eventName, eventParams);
  }, []);

  const trackAdsEvent = useCallback((eventName: string, eventParams?: AnalyticsParams) => {
    fireAnalyticsEvent(eventName, eventParams, { adsOnly: true });
  }, []);

  const trackPageView = useCallback((pagePath: string, pageTitle: string) => {
    fireAnalyticsEvent('page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: typeof window !== 'undefined' ? window.location.href : undefined,
    });
  }, []);

  const trackClick = useCallback(
    (elementName: string, elementType: string, additionalParams?: AnalyticsParams) => {
      fireAnalyticsEvent('click', {
        element_name: elementName,
        element_type: elementType,
        event_category: 'Engagement',
        ...additionalParams,
      });
    },
    []
  );

  const trackCtaButtonVariantShown = useCallback(
    (buttonText: string, additionalParams?: AnalyticsParams) => {
      fireAnalyticsEvent('cta_button_variant_shown', {
        button_text: buttonText,
        event_category: 'A/B Test',
        event_label: buttonText,
        ...additionalParams,
      });
    },
    []
  );

  const trackCtaButtonClick = useCallback(
    (buttonText: string, additionalParams?: AnalyticsParams) => {
      fireAnalyticsEvent('cta_button_click', {
        button_text: buttonText,
        event_category: 'Conversion',
        event_label: buttonText,
        ...additionalParams,
      });
    },
    []
  );

  const trackFormStart = useCallback((formName: string, additionalParams?: AnalyticsParams) => {
    fireAnalyticsEvent('form_start', {
      form_name: formName,
      event_category: 'Conversion',
      ...additionalParams,
    });
  }, []);

  const trackFormSubmit = useCallback((formName: string, additionalParams?: AnalyticsParams) => {
    fireAnalyticsEvent('form_submit', {
      form_name: formName,
      event_category: 'Conversion',
      ...additionalParams,
    });
  }, []);

  const trackDownload = useCallback((fileName: string, fileType: string) => {
    fireAnalyticsEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      event_category: 'Engagement',
    });
  }, []);

  const trackSectionView = useCallback((sectionName: string, pagePath: string) => {
    fireAnalyticsEvent('section_view', {
      section_name: sectionName,
      page_path: pagePath,
      event_category: 'Engagement',
    });
  }, []);

  const trackOutboundLink = useCallback((url: string, linkText: string) => {
    fireAnalyticsEvent('outbound_link_click', {
      link_url: url,
      link_text: linkText,
      event_category: 'Engagement',
    });
  }, []);

  const trackSessionStart = useCallback((eventParams?: AnalyticsParams) => {
    fireAnalyticsEvent('session_start', eventParams, { adsOnly: true });
  }, []);

  const trackFirstVisit = useCallback((eventParams?: AnalyticsParams) => {
    fireAnalyticsEvent('first_visit', eventParams, { adsOnly: true });
  }, []);

  const trackUserEngagement = useCallback((eventParams?: AnalyticsParams) => {
    fireAnalyticsEvent('user_engagement', eventParams, { adsOnly: true });
  }, []);

  const trackScroll = useCallback((eventParams?: AnalyticsParams) => {
    fireAnalyticsEvent('scroll', eventParams, { adsOnly: true });
  }, []);

  return {
    trackAdsEvent,
    trackClick,
    trackCtaButtonClick,
    trackCtaButtonVariantShown,
    trackDownload,
    trackEvent,
    trackFirstVisit,
    trackFormStart,
    trackFormSubmit,
    trackOutboundLink,
    trackPageView,
    trackScroll,
    trackSectionView,
    trackSessionStart,
    trackUserEngagement,
  };
};
