import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const form = await readFile(path.resolve('src/app/components/LeadCaptureForm.tsx'), 'utf8');
const scheduler = await readFile(path.resolve('src/app/components/CopperlineScheduler.tsx'), 'utf8');
const contact = await readFile(path.resolve('src/app/pages/Contact.tsx'), 'utf8');
const modal = await readFile(path.resolve('src/app/components/HubSpotModal.tsx'), 'utf8');

assert.match(form, /setSubmittedLead\(\{[\s\S]*email:[\s\S]*company:/);
assert.match(form, /<CopperlineScheduler prefill=\{submittedLead\} \/>/);
assert.match(scheduler, /\/public\/embed\/meetings\/book/);
assert.match(scheduler, /safeSchedulerPath\(config\.submissionPath\)/);
assert.match(scheduler, /publicToken: config\.publicToken/);
assert.match(scheduler, /visitorId: attribution\.visitorId/);
assert.match(scheduler, /America\/Denver/);
assert.match(scheduler, /slotDateParts\(slot, timezone\)/);
assert.match(scheduler, /meeting is booked/i);
assert.match(scheduler, /sm:grid-cols-3/);
assert.match(scheduler, /Available meeting days/);
assert.match(scheduler, /Choose a time to continue/);
assert.match(scheduler, /aria-pressed=\{active\}/);
assert.match(scheduler, /schedulerDaysPerPage = 5/);
assert.match(scheduler, /schedulerTimesPerPage = 6/);
assert.match(scheduler, /Earlier available times/);
assert.match(scheduler, /Later available times/);
assert.match(scheduler, /visibleTimeSlots\.map/);
assert.doesNotMatch(scheduler, /<select[^>]+name="startsAt"/);
assert.match(scheduler, /from-teal-800 to-cyan-700/);
assert.match(scheduler, /Refresh times/);
assert.match(form, /from-slate-950 via-slate-900 to-teal-950/);
assert.match(modal, /max-w-4xl/);
assert.match(modal, /max-h-\[calc\(100vh-1rem\)\]/);
assert.match(contact, /choose an available meeting time right on this page/i);

console.log('Lead scheduler UI tests passed: successful Copperline leads preserve prefill data, group availability into accessible day and time buttons, book through the tokenized public endpoint, retain attribution, and expose recovery controls.');
