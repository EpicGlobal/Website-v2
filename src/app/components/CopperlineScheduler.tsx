'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Loader2, RefreshCw } from 'lucide-react';
import { leadSubmissionAttribution } from '@/site/lead-attribution';
import { isWebsitePreview } from '@/site/preview-mode';

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
const schedulerDaysPerPage = 7;
const schedulerTimesPerPage = 6;

function schedulerFieldClass() {
  return 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-200';
}

function safeSchedulerPath(path: string) {
  if (!path.startsWith('/public/')) throw new Error('The booking service returned an invalid path.');
  return `${copperlinePublicUrl}${path}`;
}

function schedulerIanaTimezone(timezone: string) {
  return schedulerTimeZones[timezone] || timezone || 'America/Denver';
}

function schedulerTimezonesWithVisitor(timezones: string[]) {
  const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const friendlyMatch = Object.entries(schedulerTimeZones).find(([, ianaTimezone]) => (
    ianaTimezone === detected
  ))?.[0];
  if (friendlyMatch && timezones.includes(friendlyMatch)) return timezones;
  return detected && !timezones.includes(detected) ? [detected, ...timezones] : timezones;
}

function detectedSchedulerTimezone(timezones: string[]) {
  const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const exactMatch = timezones.find((timezone) => timezone === detected);
  if (exactMatch) return exactMatch;
  const friendlyMatch = Object.entries(schedulerTimeZones).find(([, ianaTimezone]) => (
    ianaTimezone === detected
  ))?.[0];
  return friendlyMatch && timezones.includes(friendlyMatch)
    ? friendlyMatch
    : timezones[0] || 'Mountain Time';
}

function timezoneLabelWithOffset(timezone: string, referenceDate: Date) {
  const timeZone = schedulerIanaTimezone(timezone);
  try {
    const displayName = schedulerTimeZones[timezone]
      ? timezone
      : new Intl.DateTimeFormat('en-US', {
          timeZone,
          timeZoneName: 'longGeneric',
        }).formatToParts(referenceDate).find((part) => part.type === 'timeZoneName')?.value || timezone;
    const offsetName = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'longOffset',
    }).formatToParts(referenceDate).find((part) => part.type === 'timeZoneName')?.value || 'GMT';
    if (offsetName === 'GMT') return `${displayName} (UTC)`;
    const match = offsetName.match(/^GMT([+-])(\d{1,2})(?::(\d{2}))?$/);
    if (!match) return displayName;
    const sign = match[1] === '-' ? '\u2212' : '+';
    const hours = String(Number(match[2]));
    const minutes = match[3] && match[3] !== '00' ? `:${match[3]}` : '';
    return `${displayName} (UTC${sign}${hours}${minutes})`;
  } catch {
    return timezone;
  }
}

function slotDateParts(slot: SchedulerSlot, timezone: string) {
  const date = new Date(slot.value);
  if (Number.isNaN(date.getTime())) {
    return { key: slot.value, weekday: 'Day', date: slot.label, fullDate: slot.label, time: slot.label };
  }
  const timeZone = schedulerIanaTimezone(timezone);
  const keyParts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const keyValue = (type: string) => keyParts.find((part) => part.type === type)?.value || '';
  return {
    key: `${keyValue('year')}-${keyValue('month')}-${keyValue('day')}`,
    weekday: new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short' }).format(date),
    date: new Intl.DateTimeFormat('en-US', { timeZone, month: 'short', day: 'numeric' }).format(date),
    fullDate: new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short', month: 'short', day: 'numeric' }).format(date),
    time: new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit' }).format(date),
  };
}

export function CopperlineScheduler(props: CopperlineSchedulerProps) {
  return isWebsitePreview
    ? <p role="status">Development preview: appointment booking is disabled.</p>
    : <LiveCopperlineScheduler {...props} />;
}

function LiveCopperlineScheduler({ prefill }: CopperlineSchedulerProps) {
  const [config, setConfig] = useState<SchedulerConfig | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [dayPage, setDayPage] = useState(0);
  const [timePage, setTimePage] = useState(0);
  const [timezone, setTimezone] = useState('');
  const [bookingDetails, setBookingDetails] = useState(prefill);
  const [editingDetails, setEditingDetails] = useState(false);
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
      const supportedTimezones = timezones.length ? timezones : ['Mountain Time'];
      const nextConfig: SchedulerConfig = {
        publicToken: result.publicToken,
        submissionPath: result.submissionPath,
        owner: String(result.owner || 'our team'),
        meetingType: String(result.meetingType || 'standard'),
        meetingTypeLabel: String(result.meetingTypeLabel || 'Appointment'),
        minimumNoticeLabel: String(result.minimumNoticeLabel || ''),
        slots,
        timezones: schedulerTimezonesWithVisitor(supportedTimezones),
      };
      setConfig(nextConfig);
      setSelectedSlot((current) => (
        nextConfig.slots.some((slot) => slot.value === current)
          ? current
          : ''
      ));
      setSelectedDay('');
      setDayPage(0);
      setTimePage(0);
      setTimezone((current) => (
        nextConfig.timezones.includes(current) ? current : detectedSchedulerTimezone(nextConfig.timezones)
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

  const dayGroups = useMemo(() => {
    const groups = new Map<string, { key: string; weekday: string; date: string; fullDate: string; slots: SchedulerSlot[] }>();
    (config?.slots || []).forEach((slot) => {
      const parts = slotDateParts(slot, timezone);
      const group = groups.get(parts.key) || {
        key: parts.key,
        weekday: parts.weekday,
        date: parts.date,
        fullDate: parts.fullDate,
        slots: [],
      };
      group.slots.push(slot);
      groups.set(parts.key, group);
    });
    return Array.from(groups.values());
  }, [config?.slots, timezone]);
  const activeDay = dayGroups.some((group) => group.key === selectedDay)
    ? selectedDay
    : dayGroups[0]?.key || '';
  const selectedDayGroup = dayGroups.find((group) => group.key === activeDay);
  const dayPageCount = Math.max(1, Math.ceil(dayGroups.length / schedulerDaysPerPage));
  const safeDayPage = Math.min(dayPage, dayPageCount - 1);
  const visibleDayGroups = dayGroups.slice(
    safeDayPage * schedulerDaysPerPage,
    (safeDayPage + 1) * schedulerDaysPerPage,
  );
  const timePageCount = Math.max(1, Math.ceil((selectedDayGroup?.slots.length || 0) / schedulerTimesPerPage));
  const safeTimePage = Math.min(timePage, timePageCount - 1);
  const visibleTimeSlots = (selectedDayGroup?.slots || []).slice(
    safeTimePage * schedulerTimesPerPage,
    (safeTimePage + 1) * schedulerTimesPerPage,
  );
  const selectedSlotParts = selectedSlot
    ? slotDateParts(config?.slots.find((slot) => slot.value === selectedSlot) || { value: selectedSlot, label: selectedSlot }, timezone)
    : null;
  const timezoneReferenceDate = new Date(selectedSlot || config?.slots[0]?.value || Date.now());

  const chooseDay = (dayKey: string) => {
    setSelectedDay(dayKey);
    setSelectedSlot('');
    setTimePage(0);
  };

  const changeDayPage = (nextPage: number) => {
    const boundedPage = Math.max(0, Math.min(dayPageCount - 1, nextPage));
    const firstDay = dayGroups[boundedPage * schedulerDaysPerPage];
    setDayPage(boundedPage);
    setSelectedDay(firstDay?.key || '');
    setSelectedSlot('');
    setTimePage(0);
  };

  const changeTimePage = (nextPage: number) => {
    setTimePage(Math.max(0, Math.min(timePageCount - 1, nextPage)));
    setSelectedSlot('');
  };

  const handleBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!config || !selectedSlot || booking || booked) return;
    const cleanName = bookingDetails.name.trim();
    const cleanEmail = bookingDetails.email.trim();
    const cleanCompany = bookingDetails.company.trim();
    if (!cleanName || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      setEditingDetails(true);
      setError('Enter a valid name and email before booking.');
      return;
    }
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
          title: 'Discovery meeting',
          name: cleanName,
          email: cleanEmail,
          company: cleanCompany,
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
          <h3 id="schedule-heading" className="text-lg font-bold">Choose a time</h3>
          <p className="mt-0.5 text-xs leading-5 text-cyan-50 sm:text-sm">
            Your request is saved. Book a {config?.meetingTypeLabel?.toLowerCase() || 'meeting'} with {config?.owner || 'our team'}.
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
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
            <span>
              Booking for <strong className="text-slate-950">{bookingDetails.name || 'Guest'}</strong>
              {bookingDetails.company ? ` · ${bookingDetails.company}` : ''}
            </span>
            <button
              className="font-semibold text-teal-800 underline decoration-teal-300 underline-offset-2 hover:text-teal-950"
              type="button"
              aria-expanded={editingDetails}
              onClick={() => setEditingDetails((current) => !current)}
            >
              {editingDetails ? 'Done editing' : 'Edit details'}
            </button>
          </div>
          {editingDetails ? (
            <div className="grid gap-2 rounded-lg border border-slate-200 bg-white p-3 sm:grid-cols-3">
              <label className="block text-sm font-medium">
                Name
                <input
                  className={schedulerFieldClass()}
                  name="name"
                  value={bookingDetails.name}
                  onChange={(event) => setBookingDetails((current) => ({ ...current, name: event.target.value }))}
                  autoComplete="name"
                  maxLength={180}
                  required
                />
              </label>
              <label className="block text-sm font-medium">
                Email
                <input
                  className={schedulerFieldClass()}
                  name="email"
                  type="email"
                  value={bookingDetails.email}
                  onChange={(event) => setBookingDetails((current) => ({ ...current, email: event.target.value }))}
                  autoComplete="email"
                  maxLength={320}
                  required
                />
              </label>
              <label className="block text-sm font-medium">
                Company
                <input
                  className={schedulerFieldClass()}
                  name="company"
                  value={bookingDetails.company}
                  onChange={(event) => setBookingDetails((current) => ({ ...current, company: event.target.value }))}
                  autoComplete="organization"
                  maxLength={240}
                />
              </label>
            </div>
          ) : null}
          <div className="space-y-3 rounded-xl border border-slate-200 p-3">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <p className="text-xs text-slate-600">
                Times shown in your time zone. Minimum notice: {config.minimumNoticeLabel || '4 hours'}.
              </p>
              <label className="block min-w-52 text-xs font-semibold text-slate-700">
                Time zone
                <select
                  className={`${schedulerFieldClass()} py-1.5`}
                  name="timezone"
                  value={timezone}
                  onChange={(event) => {
                    setTimezone(event.target.value);
                    setSelectedDay('');
                    setSelectedSlot('');
                    setDayPage(0);
                    setTimePage(0);
                  }}
                >
                  {config.timezones.map((zone) => (
                    <option key={zone} value={zone}>{timezoneLabelWithOffset(zone, timezoneReferenceDate)}</option>
                  ))}
                </select>
              </label>
            </div>
            {dayGroups.length ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-600">Available dates</p>
                  {dayPageCount > 1 ? (
                    <div className="flex items-center gap-1" aria-label="More available dates">
                      <button
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 disabled:opacity-40"
                        type="button"
                        aria-label="Earlier available dates"
                        disabled={safeDayPage === 0}
                        onClick={() => changeDayPage(safeDayPage - 1)}
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <span className="px-1 text-xs font-semibold text-slate-600">More dates</span>
                      <button
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 disabled:opacity-40"
                        type="button"
                        aria-label="Later available dates"
                        disabled={safeDayPage >= dayPageCount - 1}
                        onClick={() => changeDayPage(safeDayPage + 1)}
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  ) : null}
                </div>
                <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-7" role="group" aria-label="Available meeting days">
                  {visibleDayGroups.map((group) => {
                    const active = group.key === activeDay;
                    return (
                      <button
                        className={`min-h-10 rounded-lg border px-2 py-1.5 text-center transition ${active
                          ? 'border-teal-700 bg-teal-700 text-white shadow-sm'
                          : 'border-slate-300 bg-white text-slate-800 hover:border-teal-500 hover:bg-teal-50'}`}
                        type="button"
                        key={group.key}
                        aria-pressed={active}
                        onClick={() => chooseDay(group.key)}
                      >
                        <span className={`block text-[10px] font-semibold uppercase tracking-wide ${active ? 'text-teal-100' : 'text-slate-500'}`}>{group.weekday}</span>
                        <span className="block text-xs font-bold sm:text-sm">{group.date}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
            <div className="space-y-1.5 border-t border-slate-200 pt-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                  {selectedDayGroup ? `Times for ${selectedDayGroup.fullDate}` : 'Available times'}
                </p>
                {timePageCount > 1 ? (
                  <div className="flex items-center gap-1" aria-label="More available times">
                    <button
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 disabled:opacity-40"
                      type="button"
                      aria-label="Earlier available times"
                      disabled={safeTimePage === 0}
                      onClick={() => changeTimePage(safeTimePage - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="px-1 text-xs font-semibold text-slate-600">More times</span>
                    <button
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 disabled:opacity-40"
                      type="button"
                      aria-label="Later available times"
                      disabled={safeTimePage >= timePageCount - 1}
                      onClick={() => changeTimePage(safeTimePage + 1)}
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6" role="group" aria-label={`Available times for ${selectedDayGroup?.fullDate || 'selected day'}`}>
                {visibleTimeSlots.map((slot) => {
                  const active = slot.value === selectedSlot;
                  return (
                    <button
                      className={`min-h-10 rounded-lg border px-2 py-1.5 text-sm font-bold transition ${active
                        ? 'border-teal-700 bg-teal-700 text-white shadow-sm'
                        : 'border-slate-300 bg-white text-slate-800 hover:border-teal-500 hover:bg-teal-50'}`}
                      type="button"
                      key={slot.value}
                      aria-pressed={active}
                      onClick={() => setSelectedSlot(slot.value)}
                    >
                      {slotDateParts(slot, timezone).time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
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
              {booking
                ? 'Booking meeting…'
                : selectedSlotParts
                  ? `Book ${selectedSlotParts.fullDate} at ${selectedSlotParts.time}`
                  : 'Select a time to continue'}
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
