import assert from 'node:assert/strict';
import {
  captureLeadAttribution,
  leadSubmissionAttribution,
} from '../src/site/lead-attribution.ts';

class MemoryStorage {
  values = new Map();

  getItem(key) {
    return this.values.has(key) ? this.values.get(key) : null;
  }

  setItem(key, value) {
    this.values.set(key, String(value));
  }
}

const localStorage = new MemoryStorage();
const sessionStorage = new MemoryStorage();
let uuid = 0;
const landing = {
  href: 'https://www.epicglobalinc.com/campaigns/assessment?utm_source=google&utm_medium=cpc&utm_campaign=growth&gclid=click-one',
  referrer: 'https://www.google.com/',
  localStorage,
  sessionStorage,
  randomUUID: () => `uuid-${++uuid}`,
  now: () => new Date('2026-07-27T12:00:00.000Z'),
};

const captured = captureLeadAttribution(landing);
assert.equal(captured.firstTouch.url, landing.href);
assert.equal(captured.firstTouch.utmSource, 'google');
assert.equal(captured.firstTouch.utmCampaign, 'growth');
assert.equal(captured.firstTouch.gclid, 'click-one');
assert.equal(captured.firstTouch.capturedAt, '2026-07-27T12:00:00.000Z');

const submission = leadSubmissionAttribution({
  ...landing,
  href: 'https://www.epicglobalinc.com/contact?utm_source=newsletter&utm_campaign=follow-up&fbclid=click-two',
  referrer: 'https://www.epicglobalinc.com/campaigns/assessment',
  now: () => new Date('2026-07-27T12:15:00.000Z'),
});

assert.deepEqual(submission.firstTouch, captured.firstTouch, 'The original landing touch must survive later navigation.');
assert.equal(submission.lastTouch.utmSource, 'newsletter');
assert.equal(submission.lastTouch.utmCampaign, 'follow-up');
assert.equal(submission.lastTouch.fbclid, 'click-two');
assert.equal(submission.lastTouch.capturedAt, '2026-07-27T12:15:00.000Z');
assert.equal(submission.visitorId, captured.visitorId, 'Visitor identity must remain stable.');
assert.equal(submission.sessionId, captured.sessionId, 'Session identity must remain stable.');

localStorage.setItem('epic.lead.first-touch', '{not-valid-json');
const repaired = captureLeadAttribution({
  ...landing,
  href: 'https://www.epicglobalinc.com/contact?msclkid=repair-click',
  now: () => new Date('2026-07-27T12:20:00.000Z'),
});
assert.equal(repaired.firstTouch.msclkid, 'repair-click', 'Malformed first-touch state must be replaced safely.');

const blockedStorage = {
  getItem() { throw new Error('storage blocked'); },
  setItem() { throw new Error('storage blocked'); },
};
const privateMode = leadSubmissionAttribution({
  ...landing,
  localStorage: blockedStorage,
  sessionStorage: blockedStorage,
  href: 'https://www.epicglobalinc.com/contact?utm_source=private',
});
assert.match(privateMode.visitorId, /^visitor-uuid-/);
assert.match(privateMode.sessionId, /^session-uuid-/);
assert.equal(privateMode.firstTouch.utmSource, 'private');
assert.equal(privateMode.lastTouch.utmSource, 'private');

console.log('Lead attribution tests passed: true landing touch, final submission touch, stable visitor/session identity, malformed-state repair, and privacy-mode fallback.');
