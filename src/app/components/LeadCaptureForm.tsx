'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { HubSpotFormEmbed } from '@/app/components/HubSpotFormEmbed';
import { CopperlineScheduler } from '@/app/components/CopperlineScheduler';
import { leadSubmissionAttribution } from '@/site/lead-attribution';
import { isWebsitePreview } from '@/site/preview-mode';

type LeadCaptureProvider = 'hubspot' | 'copperline' | 'shadow';

interface LeadCaptureFormProps {
  className?: string;
  formId?: string;
  placementId?: string;
  showScheduler?: boolean;
  successTitle?: string;
  successMessage?: string;
}

const provider = (() => {
  const configured = String(process.env.NEXT_PUBLIC_LEAD_CAPTURE_PROVIDER ?? 'hubspot').toLowerCase();
  return ['hubspot', 'copperline', 'shadow'].includes(configured)
    ? configured as LeadCaptureProvider
    : 'hubspot';
})();

const leadGatewayUrl = String(process.env.NEXT_PUBLIC_LEAD_GATEWAY_URL ?? '/api/lead-capture').trim();
const turnstileSiteKey = String(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '').trim();

function fieldClass() {
  return 'mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200';
}

export function LeadCaptureForm({
  className = '',
  formId = 'book-a-call',
  placementId = 'book-a-call',
  showScheduler = true,
  successTitle = 'Thanks. Your request was submitted.',
  successMessage = 'Our team will review your information and follow up with the right next step.',
}: LeadCaptureFormProps) {
  const { trackFormStart, trackFormSubmit } = useAnalytics();
  const submissionRef = useRef<{ eventId: string; submittedAt: string } | null>(null);
  const analyticsFiredRef = useRef(false);
  const formStartedRef = useRef(false);
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetRef = useRef<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [receiptId, setReceiptId] = useState('');
  const [submittedLead, setSubmittedLead] = useState({ name: '', email: '', company: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [securityStatus, setSecurityStatus] = useState<'loading' | 'challenge' | 'ready' | 'error'>('loading');
  const [securityAttempt, setSecurityAttempt] = useState(0);

  useEffect(() => {
    if (isWebsitePreview || provider !== 'copperline') return undefined;
    if (!turnstileSiteKey) {
      setSecurityStatus('error');
      return undefined;
    }
    let cancelled = false;
    let attempts = 0;
    const install = () => {
      attempts += 1;
      if (cancelled || turnstileWidgetRef.current || !turnstileContainerRef.current) return;
      if (!window.turnstile) {
        if (attempts >= 200) setSecurityStatus('error');
        return;
      }
      setSecurityStatus('challenge');
      try {
        turnstileWidgetRef.current = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: turnstileSiteKey,
          action: 'lead_capture',
          appearance: 'always',
          size: 'flexible',
          'response-field': false,
          callback: (token) => {
            if (cancelled) return;
            setTurnstileToken(token);
            setSecurityStatus('ready');
          },
          'expired-callback': () => {
            if (cancelled) return;
            setTurnstileToken('');
            setSecurityStatus('challenge');
            if (turnstileWidgetRef.current && window.turnstile) {
              window.turnstile.reset(turnstileWidgetRef.current);
            }
          },
          'error-callback': () => {
            if (cancelled) return;
            setTurnstileToken('');
            setSecurityStatus('error');
          },
          'timeout-callback': () => {
            if (cancelled) return;
            setTurnstileToken('');
            setSecurityStatus('error');
          },
        });
      } catch {
        setTurnstileToken('');
        setSecurityStatus('error');
      }
    };
    install();
    const interval = window.setInterval(install, 50);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
      if (turnstileWidgetRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetRef.current);
      }
      turnstileWidgetRef.current = null;
    };
  }, [securityAttempt]);

  const retrySecurityCheck = () => {
    setTurnstileToken('');
    setSecurityStatus('loading');
    if (turnstileWidgetRef.current && window.turnstile) {
      try {
        window.turnstile.remove(turnstileWidgetRef.current);
      } catch {
        // The retry cycle below will render a fresh widget even if the old one already disappeared.
      }
    }
    turnstileWidgetRef.current = null;
    setSecurityAttempt((current) => current + 1);
  };

  if (!isWebsitePreview && provider !== 'copperline') {
    return (
      <div data-lead-capture-provider={provider}>
        <HubSpotFormEmbed
          className={className}
          successTitle={successTitle}
          successMessage={successMessage}
        />
      </div>
    );
  }

  const startTracking = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackFormStart('Epic Book a Call Form', {
      form_id: formId,
      form_type: 'copperline_lead_capture',
      placement_id: placementId,
    });
  };

  const handleChangeAfterFailure = () => {
    startTracking();
    if (error) {
      submissionRef.current = null;
      setError('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isWebsitePreview) {
      setError('Development preview: no information is submitted.');
      return;
    }
    if (isSubmitting || isSubmitted) return;
    startTracking();
    const form = event.currentTarget;
    const values = new FormData(form);
    const attempt = submissionRef.current ?? {
      eventId: `lead-${crypto.randomUUID()}`,
      submittedAt: new Date().toISOString(),
    };
    submissionRef.current = attempt;
    setIsSubmitting(true);
    setError('');
    try {
      if (!turnstileToken) throw new Error('The security check is still loading. Please wait a moment and try again.');
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: attempt.eventId,
          submittedAt: attempt.submittedAt,
          formId,
          turnstileToken,
          websiteFax: String(values.get('websiteFax') || ''),
          lead: {
            firstName: String(values.get('firstName') || ''),
            lastName: String(values.get('lastName') || ''),
            email: String(values.get('email') || ''),
            company: String(values.get('company') || ''),
            website: String(values.get('website') || ''),
            phone: String(values.get('phone') || ''),
            amazonStorefront: String(values.get('amazonStorefront') || ''),
          },
          consent: {
            privacyAcknowledged: values.get('privacyAcknowledged') === 'on',
            marketing: values.get('marketing') === 'on',
            capturedAt: attempt.submittedAt,
          },
          attribution: leadSubmissionAttribution(),
          context: {
            placementId,
            locale: navigator.language || 'en-US',
          },
        }),
      };
      const response = await window.fetch(leadGatewayUrl, requestOptions);
      const result = await response.json().catch(() => ({})) as {
        accepted?: boolean;
        receiptId?: string;
      };
      if (!response.ok || result.accepted !== true || !result.receiptId) {
        throw new Error('Your request could not be saved yet. Please try again.');
      }
      setReceiptId(result.receiptId);
      setSubmittedLead({
        name: [String(values.get('firstName') || ''), String(values.get('lastName') || '')].filter(Boolean).join(' '),
        email: String(values.get('email') || ''),
        company: String(values.get('company') || ''),
      });
      if (turnstileWidgetRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetRef.current);
        turnstileWidgetRef.current = null;
      }
      setIsSubmitted(true);
      if (!analyticsFiredRef.current) {
        analyticsFiredRef.current = true;
        trackFormSubmit('Epic Book a Call Form', {
          form_id: formId,
          form_type: 'copperline_lead_capture',
          placement_id: placementId,
          submission_receipt: result.receiptId,
        });
        window.gtag_report_conversion?.();
        window.fbq?.('track', 'Lead', {
          content_name: formId,
          content_category: placementId,
        });
      }
      form.reset();
    } catch (submissionError) {
      setTurnstileToken('');
      setSecurityStatus('loading');
      if (turnstileWidgetRef.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetRef.current);
      }
      setError(submissionError instanceof Error
        ? submissionError.message
        : 'Your request could not be saved yet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`space-y-3 ${className}`}>
        <div
          className="flex items-start gap-3 rounded-xl border border-teal-700 bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 px-4 py-3.5 text-white shadow-lg"
          role="status"
        >
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-emerald-300/15">
            <CheckCircle2 className="h-5 w-5 text-emerald-300" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold sm:text-lg">{successTitle}</h3>
            <p className="mt-0.5 text-xs leading-5 text-slate-200 sm:text-sm">{successMessage}</p>
            <p className="mt-1 truncate text-[11px] text-teal-200" title={`Confirmation: ${receiptId}`}>
              Confirmation: {receiptId}
            </p>
          </div>
        </div>
        {showScheduler ? <CopperlineScheduler prefill={submittedLead} /> : null}
      </div>
    );
  }

  return (
    <form
      className={`space-y-4 rounded-xl bg-white p-1 text-slate-950 ${className}`}
      onChange={handleChangeAfterFailure}
      onFocusCapture={startTracking}
      onSubmit={handleSubmit}
      noValidate={false}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          First name <span aria-hidden="true">*</span>
          <input className={fieldClass()} name="firstName" autoComplete="given-name" maxLength={120} required />
        </label>
        <label className="text-sm font-medium">
          Last name <span aria-hidden="true">*</span>
          <input className={fieldClass()} name="lastName" autoComplete="family-name" maxLength={120} required />
        </label>
      </div>
      <label className="block text-sm font-medium">
        Work email <span aria-hidden="true">*</span>
        <input className={fieldClass()} name="email" type="email" autoComplete="email" maxLength={320} required />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Company <span aria-hidden="true">*</span>
          <input className={fieldClass()} name="company" autoComplete="organization" maxLength={240} required />
        </label>
        <label className="text-sm font-medium">
          Phone <span className="font-normal text-slate-500">(optional)</span>
          <input className={fieldClass()} name="phone" type="tel" autoComplete="tel" maxLength={80} />
        </label>
      </div>
      <label className="block text-sm font-medium">
        Company website <span aria-hidden="true">*</span>
        <input className={fieldClass()} name="website" type="url" inputMode="url" placeholder="https://example.com" maxLength={2048} required />
      </label>
      <label className="block text-sm font-medium">
        Amazon storefront <span className="font-normal text-slate-500">(optional)</span>
        <input className={fieldClass()} name="amazonStorefront" type="url" inputMode="url" placeholder="https://www.amazon.com/..." maxLength={2048} />
      </label>
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Website fax
          <input name="websiteFax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="flex items-start gap-3 text-sm leading-5 text-slate-700">
        <input className="mt-1 h-4 w-4 rounded border-slate-300" name="privacyAcknowledged" type="checkbox" required />
        <span>
          I acknowledge Epic Global&apos;s <a className="font-medium text-cyan-700 underline" href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and agree that my information may be used to respond to this request.
        </span>
      </label>
      <label className="flex items-start gap-3 text-sm leading-5 text-slate-700">
        <input className="mt-1 h-4 w-4 rounded border-slate-300" name="marketing" type="checkbox" />
        <span>I would also like to receive occasional marketing updates. This is optional and can be withdrawn at any time.</span>
      </label>
      <div ref={turnstileContainerRef} className="w-full" aria-label="Security verification" />
      {securityStatus === 'error' ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900" role="alert">
          <p>The security check could not finish. Please try it again.</p>
          <button className="mt-2 font-semibold text-cyan-800 underline" type="button" onClick={retrySecurityCheck}>
            Retry security check
          </button>
        </div>
      ) : null}
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
          {error}
        </div>
      ) : null}
      <button
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-70"
        type="submit"
        disabled={isWebsitePreview || isSubmitting || !turnstileToken}
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        {isWebsitePreview
          ? 'Preview only — submissions disabled'
          : isSubmitting
          ? 'Saving your request…'
          : securityStatus === 'loading'
            ? 'Preparing secure form…'
            : securityStatus === 'challenge'
              ? 'Complete security check above'
              : 'Submit request'}
      </button>
    </form>
  );
}
