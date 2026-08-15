import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const read = (file) => readFile(path.resolve(file), 'utf8');
const exists = async (file) => {
  try {
    await access(path.resolve(file));
    return true;
  } catch {
    return false;
  }
};

const [
  environment,
  siteConfig,
  navbar,
  footer,
  ctaButton,
  siteShell,
  contact,
  leadCaptureForm,
  sitemap,
  structuredData,
  privacy,
  articleContent,
  knowledgeIndex,
  llms,
  contactRouteExists,
] = await Promise.all([
  read('.env.example'),
  read('src/site/site-config.ts'),
  read('src/app/components/Navbar.tsx'),
  read('src/app/components/Footer.tsx'),
  read('src/app/components/CtaButton.tsx'),
  read('src/site/SiteShell.tsx'),
  read('src/app/pages/Contact.tsx'),
  read('src/app/components/LeadCaptureForm.tsx'),
  read('app/sitemap.ts'),
  read('src/app/components/StructuredData.tsx'),
  read('src/app/pages/Privacy.tsx'),
  read('src/app/data/articleContent.tsx'),
  read('public/knowledge-index.html'),
  read('public/llms.txt'),
  exists('app/contact/page.tsx'),
]);

assert.match(environment, /^NEXT_PUBLIC_BOOK_A_CALL_ENABLED=false$/m);
assert.match(
  siteConfig,
  /bookACallEnabled:\s*process\.env\.NEXT_PUBLIC_BOOK_A_CALL_ENABLED === 'true'/,
);
assert.doesNotMatch(siteConfig, /contactPath:\s*['"]\/contact['"]/);
assert.doesNotMatch(siteConfig, /primaryCtaHref:\s*['"]\/contact/);
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
assert.equal(contactRouteExists, false, 'The public /contact route should not exist.');
assert.doesNotMatch(navbar, /to:\s*['"]\/contact['"]/);
assert.doesNotMatch(footer, /href=['"]\/contact['"]/);
assert.doesNotMatch(sitemap, /path:\s*['"]\/contact['"]/);
assert.doesNotMatch(privacy, /siteConfig\.contactPath|epicglobalinc\.com\/contact|contact form/i);
assert.doesNotMatch(articleContent, /href=['"]\/contact['"]/);
assert.doesNotMatch(knowledgeIndex, /href=['"]\/contact['"]/);
assert.doesNotMatch(llms, /\/contact\b/);
assert.doesNotMatch(
  structuredData,
  /contactType:\s*['"]Sales['"][\s\S]{0,200}siteConfig\.contactPath/,
);
assert.doesNotMatch(structuredData, /book a call/i);

console.log(
  'Public contact removal tests passed: booking prompts remain gated, /contact is absent, and navigation, sitemap, policy, article, and crawler references no longer link to it.',
);
