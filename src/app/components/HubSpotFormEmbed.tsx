'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface HubSpotFormEmbedProps {
  className?: string;
  onFormSubmit?: () => void;
}

declare global {
  interface Window {
    hbspt?: {
      forms?: {
        create: (config: Record<string, unknown>) => void;
      };
    };
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

const HUBSPOT_FORM_CONFIG = {
  region: 'na2',
  portalId: '244950859',
  formId: 'a64f78bf-cba5-4405-a838-8f47ed387470',
};

export function HubSpotFormEmbed({
  className = '',
  onFormSubmit,
}: HubSpotFormEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetIdRef = useRef(`hubspot-form-target-${Math.random().toString(36).slice(2, 10)}`);
  const submitHandlerRef = useRef(onFormSubmit);
  const [isFormLoading, setIsFormLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    submitHandlerRef.current = onFormSubmit;
  }, [onFormSubmit]);

  useEffect(() => {
    let isCancelled = false;
    let pollingTimer: number | null = null;

    const safeSetLoading = (value: boolean) => {
      if (!isCancelled) {
        setIsFormLoading(value);
      }
    };

    const safeSetError = (value: string | null) => {
      if (!isCancelled) {
        setFormError(value);
      }
    };

    const createForm = () => {
      const container = containerRef.current;

      if (!container) {
        safeSetError('Form container not ready.');
        safeSetLoading(false);
        return;
      }

      if (!window.hbspt?.forms) {
        safeSetError('HubSpot form library is unavailable.');
        safeSetLoading(false);
        return;
      }

      container.innerHTML = '';

      try {
        window.hbspt.forms.create({
          ...HUBSPOT_FORM_CONFIG,
          target: `#${targetIdRef.current}`,
          onFormReady: () => {
            safeSetLoading(false);
          },
          onFormSubmit: () => {
            submitHandlerRef.current?.();

            if (typeof window.gtag_report_conversion === 'function') {
              window.gtag_report_conversion();
            }
          },
        });
      } catch (error) {
        console.error('Error creating HubSpot form:', error);
        safeSetError('Error loading form.');
        safeSetLoading(false);
      }
    };

    const waitForScript = () => {
      let attempts = 0;
      const maxAttempts = 100;

      pollingTimer = window.setInterval(() => {
        attempts += 1;

        if (window.hbspt?.forms) {
          if (pollingTimer !== null) {
            window.clearInterval(pollingTimer);
            pollingTimer = null;
          }
          createForm();
          return;
        }

        if (attempts >= maxAttempts) {
          if (pollingTimer !== null) {
            window.clearInterval(pollingTimer);
            pollingTimer = null;
          }
          safeSetError('HubSpot form timed out. Please refresh and try again.');
          safeSetLoading(false);
        }
      }, 100);
    };

    safeSetLoading(true);
    safeSetError(null);

    if (window.hbspt?.forms) {
      window.setTimeout(createForm, 100);
    } else {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://js.hsforms.net/forms/embed/v2.js"]'
      );

      if (existingScript) {
        waitForScript();
      } else {
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/embed/v2.js';
        script.charset = 'utf-8';
        script.type = 'text/javascript';
        script.async = true;
        script.onload = () => {
          window.setTimeout(createForm, 200);
        };
        script.onerror = () => {
          safeSetError('Failed to load the HubSpot form. Please check your connection.');
          safeSetLoading(false);
        };
        document.body.appendChild(script);
      }
    }

    return () => {
      isCancelled = true;

      if (pollingTimer !== null) {
        window.clearInterval(pollingTimer);
      }

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className={className}>
      {formError ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {formError}
        </div>
      ) : null}

      {isFormLoading ? (
        <div className="mb-4 flex min-h-[56px] items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-gray-300">
          <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
          <span>Loading form...</span>
        </div>
      ) : null}

      <div
        id={targetIdRef.current}
        ref={containerRef}
        className={isFormLoading ? 'min-h-[420px]' : undefined}
      />
    </div>
  );
}
