import { chromium } from 'file:///C:/Users/Coppermind/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';

const baseUrl = process.env.PRIVACY_TEST_URL || 'http://127.0.0.1:3107';
const trackingHosts = [
  'googletagmanager.com',
  'google-analytics.com',
  'connect.facebook.net',
  'facebook.com/tr',
  'snap.licdn.com',
  'px.ads.linkedin.com',
  'crm.epicglobalinc.com/public/copperline.js',
];

function isTrackingRequest(url) {
  return trackingHosts.some((host) => url.includes(host));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function trackedContext(browser, options = {}) {
  const context = await browser.newContext(options);
  const trackingRequests = [];
  context.on('request', (request) => {
    if (isTrackingRequest(request.url())) trackingRequests.push(request.url());
  });
  return { context, trackingRequests };
}

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});

try {
  const rejected = await trackedContext(browser);
  const rejectedPage = await rejected.context.newPage();
  await rejectedPage.goto(baseUrl, { waitUntil: 'networkidle' });
  await rejectedPage.getByRole('complementary', { name: 'Privacy choices' }).waitFor();
  await rejectedPage.waitForTimeout(750);
  assert(rejected.trackingRequests.length === 0, `Tracking loaded before consent: ${rejected.trackingRequests.join(', ')}`);
  await rejectedPage.getByRole('button', { name: 'Reject nonessential' }).click();
  const rejectedValue = await rejectedPage.evaluate(() => localStorage.getItem('epic.privacy.nonessential'));
  assert(rejectedValue === 'denied', `Expected denied preference, received ${rejectedValue}`);
  await rejectedPage.goto(`${baseUrl}/privacy-choices`, { waitUntil: 'networkidle' });
  await rejectedPage.getByText('Nonessential tracking disabled', { exact: true }).waitFor();
  assert(rejected.trackingRequests.length === 0, `Tracking loaded after rejection: ${rejected.trackingRequests.join(', ')}`);
  await rejectedPage.screenshot({ path: 'privacy-choices-desktop.png', fullPage: true });
  await rejected.context.close();

  const allowed = await trackedContext(browser);
  const allowedPage = await allowed.context.newPage();
  await allowedPage.goto(baseUrl, { waitUntil: 'networkidle' });
  await allowedPage.getByRole('button', { name: 'Allow analytics and ads' }).click();
  await allowedPage.waitForTimeout(1500);
  const allowedValue = await allowedPage.evaluate(() => localStorage.getItem('epic.privacy.nonessential'));
  assert(allowedValue === 'granted', `Expected granted preference, received ${allowedValue}`);
  assert(allowed.trackingRequests.length > 0, 'Expected consented tracking requests after opt-in.');
  await allowed.context.close();

  const gpc = await trackedContext(browser, { viewport: { width: 390, height: 844 } });
  await gpc.context.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, 'globalPrivacyControl', {
      configurable: true,
      get: () => true,
    });
  });
  const gpcPage = await gpc.context.newPage();
  await gpcPage.goto(`${baseUrl}/privacy-choices`, { waitUntil: 'networkidle' });
  await gpcPage.getByText('Opted out by Global Privacy Control', { exact: true }).waitFor();
  await gpcPage.waitForTimeout(750);
  assert(gpc.trackingRequests.length === 0, `Tracking loaded under GPC: ${gpc.trackingRequests.join(', ')}`);
  await gpcPage.screenshot({ path: 'privacy-choices-mobile-gpc.png', fullPage: true });
  await gpc.context.close();

  console.log(JSON.stringify({
    passed: true,
    rejection: 'persisted',
    consentedTrackingRequests: allowed.trackingRequests.length,
    gpc: 'honored',
  }, null, 2));
} finally {
  await browser.close();
}
