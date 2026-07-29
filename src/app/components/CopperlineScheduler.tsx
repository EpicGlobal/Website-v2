'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { CalendarDays, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import { leadSubmissionAttribution } from '@/site/lead-attribution';

interface CopperlineSchedulerProps {
  prefill: {
    name: string;
    email: string;
    company: string;
  };
}

interface SchedulerSlot {
  value: string;
  label: string;
}

interface SchedulerConfig {
  publicToken: string;
  submissionPath: string;
  owner: string;
  meetingType: string;
  meetingTypeLabel: string;
  minimumNoticeLabel: string;
  slots: SchedulerSlot[];
  timezones: string[];
}

interface BookingConfirmation {
  calendarStatus: string;
}

const copperlinePublicUrl = String(
  process.env.NEXT_PUBLIC_COPPERLINE_PUBLIC_URL ?? 'https://crm.epicglobalinc.com',
).replace(/\/+$/, '');
const copperlineWorkspace = String(
  process.env.NEXT_PUBLIC_COPPERLINE_WORKSPACE ?? 'epicglobalinc',
).trim();
const schedulerTimeZones: Record<string, string> = {
  'Mountain Time': 'America/Denver',
  'Eastern Time': 'America/New_York',
  'Central Time': 'America/Chicago',
  'Pacific Time': 'America/Los_Angeles',
};

function schedulerFieldClass() {
  return 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-200';
}

function safeSchedulerPath(path: string) {
  if (!path.startsWith('/public/')) throw new Error('The booking service returned an invalid path.');
  return `${copperlinePublicUrl}${path}`;
}

function slotLabel(slot: SchedulerSlot, timezone: string) {
  const date = new Date(slot.value);
  if (Number.isNaN(date.getTime())) return slot.label;
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: schedulerTimeZones[timezone] || 'America/Denver',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(date);
  } catch {
    return slot.label;
  }
}

export function CopperlineScheduler({ prefill }: CopperlineSchedulerProps) {
  const [config, setConfig] = useState<SchedulerConfig | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [timezone, setTimezone] = useState('Mountain Time');
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation>({ calendarStatus: '' });
  const [error, setError] = useState('');

  const loadAvailability = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const query = new URLSearchParams({
        workspace: copperlineWorkspace,
        site: window.location.hostname || 'www.epicglobalinc.com',
        meetingType: 'standard',
      });
      const response = await window.fetch(
        `${copperlinePublicUrl}/public/embed/meetings/book?${query.toString()}`,
        { method: 'GET', credentials: 'omit', cache: 'no-store' },
      );
      const result = await response.json().catch(() => ({})) as Partial<SchedulerConfig>;
      if (!response.ok || !result.publicToken || !result.submissionPath) {
        throw new Error('Live appointment availability could not be loaded.');
      }
      const slots = Array.isArray(result.slots)
        ? result.slots.filter((slot): slot is SchedulerSlot => (
          typeof slot?.value === 'string' && typeof slot?.label === 'string'
        ))
        : [];
      const timezones = Array.isArray(result.timezones)
        ? result.timezones.filter((zone): zone is string => typeof zone === 'string')
        : [];
      const nextConfig: SchedulerConfig = {
        publicToken: result.publicToken,
        submissionPath: result.submissionPath,
        owner: String(result.owner || 'our team'),
        meetingType: String(result.meetingType || 'standard'),
        meetingTypeLabel: String(result.meetingTypeLabel || 'Appointment'),
        minimumNoticeLabel: String(result.minimumNoticeLabel || ''),
        slots,
        timezones: timezones.length ? timezones : ['Mountain Time'],
      };
      setConfig(nextConfig);
      setSelectedSlot((current) => (
        nextConfig.slots.some((slot) => slot.value === current)
          ? current
          : nextConfig.slots[0]?.value || ''
      ));
      setTimezone((current) => (
        nextConfig.timezones.includes(current) ? current : nextConfig.timezones[0] || 'Mountain Time'
      ));
    } catch {
      setConfig(null);
      setSelectedSlot('');
      setError('Live appointment availability could not be loaded. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAvailability();
  }, [loadAvailability]);

  const handleBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!config || !selectedSlot || booking || booked) return;
    const values = new FormData(event.currentTarget);
    setBooking(true);
    setError('');
    try {
      const attribution = leadSubmissionAttribution();
      const touch = attribution.lastTouch;
      const response = await window.fetch(safeSchedulerPath(config.submissionPath), {
        method: 'POST',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicToken: config.publicToken,
          owner: config.owner,
          meetingType: config.meetingType,
          startsAt: selectedSlot,
          timezone,
          title: String(values.get('title') || 'Discovery meeting'),
          name: String(values.get('name') || ''),
          email: String(values.get('email') || ''),
          company: String(values.get('company') || ''),
          workspace: copperlineWorkspace,
          site: window.location.hostname || 'www.epicglobalinc.com',
          visitorId: attribution.visitorId,
          sessionId: attribution.sessionId,
          pageUrl: touch.url,
          path: window.location.pathname,
          titleText: document.title,
          referrer: touch.referrer,
          utmSource: touch.utmSource,
          utmMedium: touch.utmMedium,
          utmCampaign: touch.utmCampaign,
          utmContent: touch.utmContent,
          utmTerm: touch.utmTerm,
        }),
      });
      const result = await response.json().catch(() => ({})) as {
        error?: string;
        calendarWrite?: { calendarStatus?: string };
      };
      if (!response.ok) {
        throw new Error(result.error || 'That time could not be booked.');
      }
      setConfirmation({ calendarStatus: String(result.calendarWrite?.calendarStatus || '') });
      setBooked(true);
    } catch (bookingError) {
      setError(bookingError instanceof Error
        ? bookingError.message
        : 'That time could not be booked. Please choose another time.');
    } finally {
      setBooking(false);
    }
  };

  if (booked) {
    const calendarConfirmed = ['created', 'updated'].includes(confirmation.calendarStatus);
    return (
      <div className="flex items-start gap-3 rounded-xl border border-teal-700 bg-gradient-to-r from-teal-950 to-slate-950 p-5 text-white shadow-lg" role="status">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-emerald-300/15">
          <CheckCircle2 className="h-6 w-6 text-emerald-300" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-bold">Your meeting is booked.</h3>
          <p className="mt-1 text-sm leading-6 text-slate-200">
            {calendarConfirmed
              ? 'The appointment is in Copperline and Google Calendar. A calendar invitation will contain the meeting details.'
              : 'The appointment is saved in Copperline. Our team will follow up with the meeting details.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-950 shadow-lg" aria-labelledby="schedule-heading">
      <div className="flex items-start gap-3 bg-gradient-to-r from-teal-800 to-cyan-700 px-4 py-3 text-white">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white/15">
          <CalendarDays className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 id="schedule-heading" className="text-lg font-bold">Choose a meeting time</h3>
          <p className="mt-0.5 text-xs leading-5 text-cyan-50 sm:text-sm">
            Your request is saved. Pick a time below to reserve the conversation now.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="m-4 flex items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 p-4 text-sm text-slate-700" role="status">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Loading live calendar availability…
        </div>
      ) : null}

      {!loading && error && !config ? (
        <div className="m-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950" role="alert">
          <p>{error}</p>
          <button className="mt-2 inline-flex items-center gap-2 font-semibold text-cyan-800 underline" type="button" onClick={() => void loadAvailability()}>
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Retry availability
          </button>
        </div>
      ) : null}

      {!loading && config ? (
        <form className="space-y-3 p-4" onSubmit={handleBooking}>
          <div className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm text-cyan-950">
            Live availability for <strong>{config.owner}</strong>
            {config.minimumNoticeLabel ? ` · ${config.minimumNoticeLabel} minimum notice` : ''}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="block text-sm font-medium">
              Name
              <input className={schedulerFieldClass()} name="name" defaultValue={prefill.name} autoComplete="name" maxLength={180} required />
            </label>
            <label className="block text-sm font-medium">
              Email
              <input className={schedulerFieldClass()} name="email" type="email" defaultValue={prefill.email} autoComplete="email" maxLength={320} required />
            </label>
            <label className="block text-sm font-medium">
              Company
              <input className={schedulerFieldClass()} name="company" defaultValue={prefill.company} autoComplete="organization" maxLength={240} />
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <label className="block text-sm font-medium">
              Available time
              <select className={schedulerFieldClass()} name="startsAt" value={selectedSlot} onChange={(event) => setSelectedSlot(event.target.value)} required disabled={!config.slots.length}>
                {config.slots.length ? config.slots.map((slot) => (
                  <option key={slot.value} value={slot.value}>{slotLabel(slot, timezone)}</option>
                )) : <option value="">No appointments are currently available</option>}
              </select>
            </label>
            <label className="block text-sm font-medium">
              Timezone
              <select className={schedulerFieldClass()} name="timezone" value={timezone} onChange={(event) => setTimezone(event.target.value)}>
                {config.timezones.map((zone) => <option key={zone} value={zone}>{zone}</option>)}
              </select>
            </label>
          </div>
          <input name="title" type="hidden" value="Discovery meeting" readOnly />
          {!config.slots.length ? (
            <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950" role="status">
              No appointments are available right now. Your request is saved, and the team can still follow up with you directly.
            </p>
          ) : null}
          {error ? <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">{error}</p> : null}
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <button
              className="flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={booking || !selectedSlot}
            >
              {booking ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
              {booking ? 'Booking meeting…' : 'Book this meeting'}
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50" type="button" onClick={() => void loadAvailability()} disabled={booking}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Refresh times
            </button>
          </div>
        </form>
      ) : null}
    </section>
  );
}
