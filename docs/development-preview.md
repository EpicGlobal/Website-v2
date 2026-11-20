# Website development preview

The authenticated development branch uses `NEXT_PUBLIC_WEBSITE_PREVIEW=true`
at build time. Production leaves this setting absent. Preview builds disable
contact submissions (including direct POSTs), HubSpot embeds, Copperline booking,
Supabase authentication and nonessential tracking even after consent. Contact
fields remain visible for layout review; their submit button is disabled. A
preview-only content security policy also blocks production API/script/frame
destinations, and robots metadata/headers prevent indexing.

Build from the current remote main in an isolated checkout. Never publish an
unrelated local working tree. Enable Amplify branch password protection before
the first build; store the random password in the dedicated secret manager,
never source, build variables, logs or Slack. Confirm anonymous requests receive
401 and authenticated requests receive 200 before sharing the URL. This preview
does not change production domains, environment variables or the main branch.

The repository is public and its Amplify app uses SSR with a service role, so
native automatic PR previews are not currently available. An explicitly connected
development branch provides an authenticated review URL; reviewers should compare
its exact deployed commit to the PR. A later per-PR deployment design must retain
the same authentication, isolation and deployment-source checks.

Functional lead testing requires a separate staging origin and CRM source policy;
never enable production lead intake or tracking simply to test the preview.
Existing production log and CRM access is not conferred by repository write access.

Validation: `npm run test:preview`, `npx tsc --noEmit`, and a production-mode
preview build with `NEXT_PUBLIC_WEBSITE_PREVIEW=true npm run build`. The focused
test uses local HTTP fixtures only and asserts no intake calls are made.
