'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface HubSpotFormEmbedProps {
  className?: string;
  successTitle?: string;
  successMessage?: string;
}

const HUBSPOT_FORM_SCRIPT_URL = 'https://js-na2.hsforms.net/forms/embed/244950859.js';
const HUBSPOT_FORM_ID = '113833da-c5e2-4a8e-8147-a7c6bb394c60';
const HUBSPOT_PORTAL_ID = '244950859';
const HUBSPOT_REGION = 'na2';

let formScriptPromise: Promise<void> | null = null;

function ensureHubSpotFormScript() {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (formScriptPromise) {
    return formScriptPromise;
  }

  formScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${HUBSPOT_FORM_SCRIPT_URL}"]`
    );

    if (existingScript?.dataset.loaded === 'true') {
      resolve();
      return;
    }

    const script = existingScript ?? document.createElement('script');
    let timeoutId: number | null = null;

    const cleanup = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }

      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };

    const handleLoad = () => {
      script.dataset.loaded = 'true';
      cleanup();
      resolve();
    };

    const handleError = () => {
      formScriptPromise = null;
      cleanup();
      reject(new Error('Failed to load the HubSpot form embed script.'));
    };

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });

    timeoutId = window.setTimeout(() => {
      if (existingScript) {
        script.dataset.loaded = 'true';
        cleanup();
        resolve();
        return;
      }

      handleError();
    }, 10000);

    if (!existingScript) {
      script.src = HUBSPOT_FORM_SCRIPT_URL;
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return formScriptPromise;
}

export function HubSpotFormEmbed({
  className = '',
  successTitle = 'Thanks. Your request was submitted.',
  successMessage = 'Our team will review your information and follow up with the right next step.',
}: HubSpotFormEmbedProps) {
  const { trackFormStart } = useAnalytics();
  const reactId = useId().replace(/:/g, '');
  const instanceId = `epic-book-call-${reactId}`;
  const frameRef = useRef<HTMLDivElement>(null);
  const hasTrackedFormStartRef = useRef(false);
  const [isEmbedLoading, setIsEmbedLoading] = useState(true);
  const [embedError, setEmbedError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    let frameObserver: MutationObserver | null = null;
    let loadingTimeout: number | null = null;

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

    const markLoaded = () => {
      if (loadingTimeout !== null) {
        window.clearTimeout(loadingTimeout);
        loadingTimeout = null;
      }

      safeSetLoading(false);
    };

    const watchForRenderedFrame = () => {
      const frame = frameRef.current;

      if (!frame) {
        safeSetError('HubSpot form container not ready.');
        safeSetLoading(false);
        return;
      }

      const renderedFrame = frame.querySelector('iframe');

      if (renderedFrame instanceof HTMLIFrameElement) {
        renderedFrame.addEventListener('load', markLoaded, { once: true });
        markLoaded();
        return;
      }

      if (frame.childElementCount > 0) {
        markLoaded();
        return;
      }

      frameObserver = new MutationObserver(() => {
        if (!frame.childElementCount) {
          return;
        }

        frameObserver?.disconnect();
        frameObserver = null;
        markLoaded();
      });

      frameObserver.observe(frame, {
        childList: true,
        subtree: true,
      });
    };

    const renderForm = async () => {
      safeSetLoading(true);
      safeSetError(null);
      watchForRenderedFrame();

      try {
        await ensureHubSpotFormScript();
      } catch (error) {
        console.error('Error loading HubSpot form embed:', error);
        safeSetError('Failed to load the form. Please refresh and try again.');
        safeSetLoading(false);
      }
    };

    loadingTimeout = window.setTimeout(() => {
      safeSetError('The form is taking longer than expected to load. Please refresh and try again.');
      safeSetLoading(false);
    }, 15000);

    void renderForm();

    return () => {
      isCancelled = true;
      frameObserver?.disconnect();

      if (loadingTimeout !== null) {
        window.clearTimeout(loadingTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const handleSubmissionSuccess = (event: Event) => {
      const detail = (event as CustomEvent<{ formId?: string; instanceId?: string }>).detail;

      if (detail?.formId !== HUBSPOT_FORM_ID || detail?.instanceId !== instanceId) {
        return;
      }

      hasTrackedFormStartRef.current = true;
      setIsEmbedLoading(false);
      setEmbedError(null);
      setIsSubmitted(true);

      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion();
      }
    };

    window.addEventListener('hs-form-event:on-submission:success', handleSubmissionSuccess);

    return () => {
      window.removeEventListener('hs-form-event:on-submission:success', handleSubmissionSuccess);
    };
  }, [instanceId]);

  useEffect(() => {
    const frame = frameRef.current;

    if (!frame || embedError || isEmbedLoading) {
      return;
    }

    const trackFormInteraction = () => {
      if (hasTrackedFormStartRef.current) {
        return;
      }

      hasTrackedFormStartRef.current = true;

      trackFormStart('HubSpot Book a Call Form', {
        form_destination: HUBSPOT_FORM_SCRIPT_URL,
        form_id: HUBSPOT_FORM_ID,
        form_type: 'hubspot_form',
      });

      if (typeof window.gtag_report_conversion === 'function') {
        window.gtag_report_conversion();
      }
    };

    const handleFocusIn = () => {
      trackFormInteraction();
    };

    const handleWindowBlur = () => {
      window.setTimeout(() => {
        const activeElement = document.activeElement;

        if (activeElement instanceof HTMLIFrameElement && frame.contains(activeElement)) {
          trackFormInteraction();
        }
      }, 0);
    };

    frame.addEventListener('focusin', handleFocusIn);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      frame.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [embedError, isEmbedLoading, trackFormStart]);

  return (
    <div className={`hubspot-form-container ${className}`}>
      {embedError ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {embedError}
        </div>
      ) : null}

      {isSubmitted ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950">
          <h3 className="text-xl font-semibold">{successTitle}</h3>
          <p className="mt-2 text-sm leading-6">{successMessage}</p>
        </div>
      ) : null}

      {isEmbedLoading ? (
        <div className="mb-4 flex min-h-[56px] items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-gray-300">
          <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
          <span>Loading form...</span>
        </div>
      ) : null}

      {isSubmitted ? null : (
        <div
          ref={frameRef}
          className="hs-form-frame min-h-[420px] w-full overflow-hidden rounded-xl bg-white"
          data-region={HUBSPOT_REGION}
          data-form-id={HUBSPOT_FORM_ID}
          data-portal-id={HUBSPOT_PORTAL_ID}
          data-instance-id={instanceId}
        />
      )}
    </div>
  );
}
