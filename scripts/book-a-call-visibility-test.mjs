import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const read = (file) => readFile(path.resolve(file), 'utf8');

const [
  environment,
  siteConfig,
  navbar,
  ctaButton,
  siteShell,
  contact,
  leadCaptureForm,
  contactMetadata,
  structuredData,
  llms,
] = await Promise.all([
  read('.env.example'),
  read('src/site/site-config.ts'),
  read('src/app/components/Navbar.tsx'),
  read('src/app/components/CtaButton.tsx'),
  read('src/site/SiteShell.tsx'),
  read('src/app/pages/Contact.tsx'),
  read('src/app/components/LeadCaptureForm.tsx'),
  read('app/contact/page.tsx'),
  read('src/app/components/StructuredData.tsx'),
  read('public/llms.txt'),
]);

assert.match(environment, /^NEXT_PUBLIC_BOOK_A_CALL_ENABLED=false$/m);
assert.match(
  siteConfig,
  /bookACallEnabled:\s*process\.env\.NEXT_PUBLIC_BOOK_A_CALL_ENABLED === 'true'/,
);
assert.match(ctaButton, /if \(!siteConfig\.bookACallEnabled\) \{\s*return null;/);
assert.ok(
  (navbar.match(/siteConfig\.bookACallEnabled/g) ?? []).length >= 5,
  'Navbar booking links, modal, storage, and analytics should all be gated.',
);
assert.match(
  siteShell,
  /showBookingPrompts = !isCampaignLandingPage && siteConfig\.bookACallEnabled/,
);
assert.match(contact, /showScheduler=\{showBookACall\}/);
assert.match(
  leadCaptureForm,
  /showScheduler \? <CopperlineScheduler prefill=\{submittedLead\} \/> : null/,
);
assert.doesNotMatch(contactMetadata, /book a call/i);
assert.doesNotMatch(structuredData, /book a call/i);
assert.doesNotMatch(llms, /book a call/i);

console.log(
  'Booking visibility tests passed: global booking prompts are gated, ordinary contact submissions do not open the scheduler, and public contact metadata is booking-free.',
);
