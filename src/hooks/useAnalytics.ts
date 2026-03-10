// Custom hook for Google Analytics tracking

export const useAnalytics = () => {
  // Track custom events
  const trackEvent = (
    eventName: string,
    eventParams?: Record<string, any>
  ) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    }
  };

  // Track page views
  const trackPageView = (pagePath: string, pageTitle: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  };

  // Track button/link clicks
  const trackClick = (
    elementName: string,
    elementType: string,
    additionalParams?: Record<string, any>
  ) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'click', {
        element_name: elementName,
        element_type: elementType,
        event_category: 'Engagement',
        ...additionalParams,
      });
    }
  };

  // Track form submissions
  const trackFormSubmit = (
    formName: string,
    additionalParams?: Record<string, any>
  ) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'form_submit', {
        form_name: formName,
        event_category: 'Conversion',
        ...additionalParams,
      });
    }
  };

  // Track downloads
  const trackDownload = (fileName: string, fileType: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'file_download', {
        file_name: fileName,
        file_type: fileType,
        event_category: 'Engagement',
      });
    }
  };

  // Track section views (for scroll tracking)
  const trackSectionView = (sectionName: string, pagePath: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'section_view', {
        section_name: sectionName,
        page_path: pagePath,
        event_category: 'Engagement',
      });
    }
  };

  // Track outbound links
  const trackOutboundLink = (url: string, linkText: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'outbound_link_click', {
        link_url: url,
        link_text: linkText,
        event_category: 'Engagement',
      });
    }
  };

  return {
    trackEvent,
    trackPageView,
    trackClick,
    trackFormSubmit,
    trackDownload,
    trackSectionView,
    trackOutboundLink,
  };
};
