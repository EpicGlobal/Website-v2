'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface HubSpotFormEmbedProps {
  className?: string;
}

declare global {
  interface Window {
    hbspt?: {
      meetings?: {
        create: (selector: string) => void;
      };
    };
  }
}

const HUBSPOT_MEETINGS_EMBED_URL =
  'https://meetings-na2.hubspot.com/unified-interface?embed=true';
const HUBSPOT_MEETINGS_SCRIPT_URL =
  'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';

let meetingsScriptPromise: Promise<void> | null = null;

function waitForMeetingsApi() {
  return new Promise<void>((resolve, reject) => {
    let attempts = 0;
    const maxAttempts = 100;

    const pollingTimer = window.setInterval(() => {
      attempts += 1;

      if (window.hbspt?.meetings?.create) {
        window.clearInterval(pollingTimer);
        resolve();
        return;
      }

      if (attempts >= maxAttempts) {
        window.clearInterval(pollingTimer);
        reject(new Error('HubSpot meetings embed timed out.'));
      }
    }, 100);
  });
}

function ensureMeetingsScript() {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (window.hbspt?.meetings?.create) {
    return Promise.resolve();
  }

  if (meetingsScriptPromise) {
    return meetingsScriptPromise;
  }

  meetingsScriptPromise = new Promise<void>((resolve, reject) => {
    const handleReady = () => {
      waitForMeetingsApi()
        .then(resolve)
        .catch((error) => {
          meetingsScriptPromise = null;
          reject(error);
        });
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${HUBSPOT_MEETINGS_SCRIPT_URL}"]`
    );

    if (existingScript) {
      handleReady();
      return;
    }

    const script = document.createElement('script');
    script.src = HUBSPOT_MEETINGS_SCRIPT_URL;
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = handleReady;
    script.onerror = () => {
      meetingsScriptPromise = null;
      reject(new Error('Failed to load the HubSpot meetings embed script.'));
    };

    document.body.appendChild(script);
  });

  return meetingsScriptPromise;
}

export function HubSpotFormEmbed({ className = '' }: HubSpotFormEmbedProps) {
  const { trackFormStart } = useAnalytics();
  const containerRef = useRef<HTMLDivElement>(null);
  const targetIdRef = useRef(`hubspot-meetings-target-${Math.random().toString(36).slice(2, 10)}`);
  const hasTrackedFormStartRef = useRef(false);
  const [isEmbedLoading, setIsEmbedLoading] = useState(true);
  const [embedError, setEmbedError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let iframeObserver: MutationObserver | null = null;
    let loadingFallbackTimer: number | null = null;
    let removeLoadHandler: (() => void) | null = null;

    const safeSetLoading = (value: boolean) => {
      if (!isCancelled) {
        setIsEmbedLoading(value);
      }
    };

    const safeSetError = (value: string | null) => {
      if (!isCancelled) {
        setEmbedError(value);
      }
    };

    const clearLoadingFallback = () => {
      if (loadingFallbackTimer !== null) {
        window.clearTimeout(loadingFallbackTimer);
        loadingFallbackTimer = null;
      }
    };

    const detachIframeListener = () => {
      removeLoadHandler?.();
      removeLoadHandler = null;
    };

    const watchForIframe = () => {
      const container = containerRef.current;

      if (!container) {
        safeSetError('Meeting scheduler container not ready.');
        safeSetLoading(false);
        return;
      }

      const attachIframeLoadHandler = (iframe: HTMLIFrameElement) => {
        detachIframeListener();
        clearLoadingFallback();

        const handleLoad = () => {
          safeSetLoading(false);
          clearLoadingFallback();
        };

        iframe.addEventListener('load', handleLoad, { once: true });
        removeLoadHandler = () => {
          iframe.removeEventListener('load', handleLoad);
        };

        loadingFallbackTimer = window.setTimeout(() => {
          safeSetLoading(false);
        }, 2500);
      };

      const existingIframe = container.querySelector('iframe');

      if (existingIframe) {
        attachIframeLoadHandler(existingIframe);
        return;
      }

      iframeObserver = new MutationObserver(() => {
        const iframe = container.querySelector('iframe');

        if (!iframe) {
          return;
        }

        iframeObserver?.disconnect();
        iframeObserver = null;
        attachIframeLoadHandler(iframe);
      });

      iframeObserver.observe(container, {
        childList: true,
      });
    };

    const renderMeetingsEmbed = async () => {
      const container = containerRef.current;

      if (!container) {
        safeSetError('Meeting scheduler container not ready.');
        safeSetLoading(false);
        return;
      }

      container.innerHTML = '';
      container.dataset.src = HUBSPOT_MEETINGS_EMBED_URL;
      container.dataset.title = 'Epic Global Inc. meeting scheduler';

      watchForIframe();

      try {
        await ensureMeetingsScript();

        if (isCancelled) {
          return;
        }

        if (!window.hbspt?.meetings?.create) {
          safeSetError('HubSpot meetings embed is unavailable.');
          safeSetLoading(false);
          return;
        }

        window.hbspt.meetings.create(`#${targetIdRef.current}`);
      } catch (error) {
        console.error('Error creating HubSpot meetings embed:', error);
        safeSetError('Failed to load the meeting scheduler. Please refresh and try again.');
        safeSetLoading(false);
      }
    };

    safeSetLoading(true);
    safeSetError(null);
    void renderMeetingsEmbed();

    return () => {
      isCancelled = true;
      iframeObserver?.disconnect();
      clearLoadingFallback();
      detachIframeListener();

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    if (isEmbedLoading || embedError || hasTrackedFormStartRef.current) {
      return;
    }

    const container = containerRef.current;
    const iframe = container?.querySelector('iframe');

    if (!container || !iframe) {
      return;
    }

    const trackSchedulerInteraction = () => {
      if (hasTrackedFormStartRef.current) {
        return;
      }

      hasTrackedFormStartRef.current = true;

      trackFormStart('HubSpot Meetings Scheduler', {
        form_destination: HUBSPOT_MEETINGS_EMBED_URL,
        form_type: 'hubspot_meetings',
      });

      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion();
      }
    };

    const handleWindowBlur = () => {
      window.setTimeout(() => {
        if (document.activeElement === iframe) {
          trackSchedulerInteraction();
        }
      }, 0);
    };

    iframe.addEventListener('focus', trackSchedulerInteraction);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      iframe.removeEventListener('focus', trackSchedulerInteraction);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [embedError, isEmbedLoading, trackFormStart]);

  return (
    <div className={className}>
      {embedError ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {embedError}
        </div>
      ) : null}

      {isEmbedLoading ? (
        <div className="mb-4 flex min-h-[56px] items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-gray-300">
          <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
          <span>Loading scheduler...</span>
        </div>
      ) : null}

      <div
        id={targetIdRef.current}
        ref={containerRef}
        className="meetings-iframe-container min-h-[615px] overflow-hidden rounded-2xl bg-white/5 lg:flex-1 lg:min-h-0 lg:overflow-y-auto"
        data-src={HUBSPOT_MEETINGS_EMBED_URL}
        data-title="Epic Global Inc. meeting scheduler"
      />
    </div>
  );
}
