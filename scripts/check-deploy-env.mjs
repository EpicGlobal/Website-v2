/**
 * Branch-aware deploy guard, run by Amplify before every build (amplify.yml preBuild).
 *
 *   main (production)  NEXT_PUBLIC_WEBSITE_PREVIEW must NOT be "true" (that would put noindex, the preview banner
 *                      and disabled forms on the live site), and NEXT_PUBLIC_SITE_URL, if set, must be the
 *                      epicglobalinc.com domain (anything else would point every canonical at another host).
 *   any other branch   NEXT_PUBLIC_WEBSITE_PREVIEW must be exactly "true", so a preview can never be indexable.
 *
 * Amplify sets AWS_BRANCH. Without it (a laptop, CI) the guard only reports, unless DEPLOY_GUARD_BRANCH is given.
 * It reads settings only; it never changes them, and it doesn't look at booking or lead-capture settings.
 */
const PRODUCTION_BRANCH = 'main';
const branch = process.env.DEPLOY_GUARD_BRANCH ?? process.env.AWS_BRANCH;
const preview = process.env.NEXT_PUBLIC_WEBSITE_PREVIEW;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

if (!branch) {
  console.log('Deploy guard: no AWS_BRANCH (not an Amplify build), nothing to check.');
  process.exit(0);
}

const problems = [];
if (branch === PRODUCTION_BRANCH) {
  if (preview === 'true') {
    problems.push('NEXT_PUBLIC_WEBSITE_PREVIEW is "true" on the production branch. That would make the live site noindex, show the preview banner and disable forms. Remove it from the main branch environment variables.');
  }
  if (siteUrl) {
    let host = '';
    try {
      host = new URL(siteUrl).hostname;
    } catch {
      problems.push(`NEXT_PUBLIC_SITE_URL "${siteUrl}" is not a valid address.`);
    }
    if (host && host !== 'www.epicglobalinc.com' && host !== 'epicglobalinc.com') {
      problems.push(`NEXT_PUBLIC_SITE_URL is "${siteUrl}" on the production branch; canonicals must point at https://www.epicglobalinc.com.`);
    }
  }
} else if (preview !== 'true') {
  problems.push(`Branch "${branch}" is not production, but NEXT_PUBLIC_WEBSITE_PREVIEW is ${preview === undefined ? 'not set' : `"${preview}"`}. Set it to "true" for this branch so the preview stays noindex with forms and tracking off.`);
}

if (problems.length) {
  console.error(`\nDeploy guard stopped the build for branch "${branch}":\n  - ${problems.join('\n  - ')}\n`);
  process.exit(1);
}
console.log(`Deploy guard: branch "${branch}" is ${branch === PRODUCTION_BRANCH ? 'production (indexable, no preview flag)' : 'a preview (noindex flag set)'}. OK.`);
