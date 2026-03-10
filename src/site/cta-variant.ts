const CTA_BUTTON_OPTIONS = [
  'Book a Call',
  'Book a Strategy Call',
  "Let's Talk",
  'Get Started',
  'Contact Us',
  "Let's Global",
];

const STORAGE_KEY = 'ctaButtonVariant';

export function getDefaultCtaVariant() {
  return CTA_BUTTON_OPTIONS[0];
}

export function readOrCreateCtaVariant() {
  if (typeof window === 'undefined') {
    return getDefaultCtaVariant();
  }

  const existing = window.sessionStorage.getItem(STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const randomIndex = Math.floor(Math.random() * CTA_BUTTON_OPTIONS.length);
  const variant = CTA_BUTTON_OPTIONS[randomIndex];
  window.sessionStorage.setItem(STORAGE_KEY, variant);
  return variant;
}
