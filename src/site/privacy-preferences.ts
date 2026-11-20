import { isWebsitePreview } from './preview-mode';

export const PRIVACY_PREFERENCE_KEY = 'epic.privacy.nonessential';
export const PRIVACY_PREFERENCE_EVENT = 'epic:privacy-preference';

export type PrivacyPreference = 'granted' | 'denied' | 'unset';

type NavigatorWithGpc = Navigator & { globalPrivacyControl?: boolean };

export function hasGlobalPrivacyControl() {
  return typeof navigator !== 'undefined' &&
    (navigator as NavigatorWithGpc).globalPrivacyControl === true;
}

function cookiePreference(): PrivacyPreference {
  if (typeof document === 'undefined') return 'unset';
  const prefix = `${PRIVACY_PREFERENCE_KEY}=`;
  const value = document.cookie
    .split(';')
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(prefix))
    ?.slice(prefix.length);
  return value === 'granted' || value === 'denied' ? value : 'unset';
}

export function readPrivacyPreference(): PrivacyPreference {
  if (typeof window === 'undefined') return 'unset';
  if (hasGlobalPrivacyControl()) return 'denied';

  try {
    const stored = window.localStorage.getItem(PRIVACY_PREFERENCE_KEY);
    if (stored === 'granted' || stored === 'denied') return stored;
  } catch {
    // Fall back to the first-party cookie when storage is unavailable.
  }

  return cookiePreference();
}

function clearFirstPartyTrackingCookies() {
  if (typeof document === 'undefined') return;
  const names = ['_ga', '_gid', '_gat', '_gcl_au', '_fbp', 'li_gc', 'AnalyticsSyncHistory'];
  const hostname = window.location.hostname;
  const domains = ['', hostname, `.${hostname}`, '.epicglobalinc.com'];

  for (const name of names) {
    for (const domain of domains) {
      const domainPart = domain ? `; domain=${domain}` : '';
      document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax${domainPart}`;
    }
  }
}

function applyRuntimeConsent(preference: Exclude<PrivacyPreference, 'unset'>) {
  if (isWebsitePreview || typeof window === 'undefined') return;
  const granted = preference === 'granted';

  window[`ga-disable-G-BGM7PRFBR7`] = !granted;
  window.gtag?.('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
  });
  window.fbq?.('consent', granted ? 'grant' : 'revoke');

  if (!granted) clearFirstPartyTrackingCookies();
}

export function writePrivacyPreference(preference: Exclude<PrivacyPreference, 'unset'>) {
  if (typeof window === 'undefined') return;
  const effectivePreference = hasGlobalPrivacyControl() ? 'denied' : preference;

  try {
    window.localStorage.setItem(PRIVACY_PREFERENCE_KEY, effectivePreference);
  } catch {
    // The cookie remains available when storage is blocked.
  }

  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${PRIVACY_PREFERENCE_KEY}=${effectivePreference}; path=/; max-age=31536000; SameSite=Lax${secure}`;
  applyRuntimeConsent(effectivePreference);
  window.dispatchEvent(new CustomEvent(PRIVACY_PREFERENCE_EVENT, {
    detail: effectivePreference,
  }));
}

export function allowsNonEssentialTracking() {
  return !isWebsitePreview && readPrivacyPreference() === 'granted';
}
