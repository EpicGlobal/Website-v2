export interface LeadAttributionTouch {
  url: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  fbclid: string;
  msclkid: string;
  capturedAt: string;
}

interface LeadAttributionContext {
  href: string;
  referrer: string;
  localStorage: Pick<Storage, 'getItem' | 'setItem'>;
  sessionStorage: Pick<Storage, 'getItem' | 'setItem'>;
  randomUUID: () => string;
  now: () => Date;
}

const VISITOR_KEY = 'epic.lead.visitor';
const SESSION_KEY = 'epic.lead.session';
const FIRST_TOUCH_KEY = 'epic.lead.first-touch';

function browserContext(): LeadAttributionContext {
  return {
    href: window.location.href,
    referrer: document.referrer || '',
    localStorage: window.localStorage,
    sessionStorage: window.sessionStorage,
    randomUUID: () => crypto.randomUUID(),
    now: () => new Date(),
  };
}

function storageId(
  storage: Pick<Storage, 'getItem' | 'setItem'>,
  key: string,
  prefix: string,
  randomUUID: () => string,
) {
  const existing = storage.getItem(key);
  if (existing) return existing;
  const created = `${prefix}-${randomUUID()}`;
  storage.setItem(key, created);
  return created;
}

function touch(context: LeadAttributionContext): LeadAttributionTouch {
  const query = new URL(context.href).searchParams;
  return {
    url: context.href,
    referrer: context.referrer,
    utmSource: query.get('utm_source') || '',
    utmMedium: query.get('utm_medium') || '',
    utmCampaign: query.get('utm_campaign') || '',
    utmTerm: query.get('utm_term') || '',
    utmContent: query.get('utm_content') || '',
    gclid: query.get('gclid') || '',
    fbclid: query.get('fbclid') || '',
    msclkid: query.get('msclkid') || '',
    capturedAt: context.now().toISOString(),
  };
}

function storedFirstTouch(context: LeadAttributionContext, fallback: LeadAttributionTouch) {
  const stored = context.localStorage.getItem(FIRST_TOUCH_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Partial<LeadAttributionTouch>;
      if (parsed && typeof parsed.url === 'string' && typeof parsed.capturedAt === 'string') {
        return parsed as LeadAttributionTouch;
      }
    } catch {
      // Replace malformed client-side state with a valid, bounded first touch.
    }
  }
  context.localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(fallback));
  return fallback;
}

export function captureLeadAttribution(context: LeadAttributionContext = browserContext()) {
  const landingTouch = touch(context);
  try {
    return {
      visitorId: storageId(context.localStorage, VISITOR_KEY, 'visitor', context.randomUUID),
      sessionId: storageId(context.sessionStorage, SESSION_KEY, 'session', context.randomUUID),
      firstTouch: storedFirstTouch(context, landingTouch),
    };
  } catch {
    // Strict privacy modes can disable browser storage. Keep this visit usable
    // with ephemeral identifiers without weakening the intake contract.
    return {
      visitorId: `visitor-${context.randomUUID()}`,
      sessionId: `session-${context.randomUUID()}`,
      firstTouch: landingTouch,
    };
  }
}

export function leadSubmissionAttribution(context: LeadAttributionContext = browserContext()) {
  const captured = captureLeadAttribution(context);
  return {
    ...captured,
    lastTouch: touch(context),
  };
}

export type { LeadAttributionContext };
