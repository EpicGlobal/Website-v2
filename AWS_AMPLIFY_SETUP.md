# AWS Amplify deployment notes

This repo is ready to deploy to AWS Amplify Hosting as a Next.js SSR app.

## What was added

- `amplify.yml` in the repo root so Amplify uses the correct Next.js build settings.
- `.env.example` with `NEXT_PUBLIC_SITE_URL`.
- `src/site/site-config.ts` now reads `NEXT_PUBLIC_SITE_URL` so previews and production can use the correct canonical URL.

## Recommended AWS path

Use AWS Amplify Hosting for the website itself.

It is the closest AWS-managed fit for this codebase because the app uses Next.js SSR features and should not be deployed as a plain S3 static site.

## Amplify setup

1. In AWS Amplify, connect the GitHub repo `EpicGlobal/Website-v2`.
2. Deploy the `main` branch.
3. Set `NEXT_PUBLIC_SITE_URL`:
   - Production: `https://epicglobalinc.com`
   - Preview branches: use the Amplify preview domain for that branch
4. After the first successful deploy, connect the custom domain.

## Domain cutover notes

Current DNS snapshot on March 16, 2026:

- `epicglobalinc.com` -> `204.69.207.1`
- `www.epicglobalinc.com` -> `sites.figma.net`
- `insights.epicglobalinc.com` -> `db7acx48d9ew8.cloudfront.net`
- `warehouse.epicglobalinc.com` -> `d30dg8ho2fy4af.cloudfront.net`
- Nameservers are still Google Domains:
  - `ns-cloud-d1.googledomains.com`
  - `ns-cloud-d2.googledomains.com`
  - `ns-cloud-d3.googledomains.com`
  - `ns-cloud-d4.googledomains.com`

## Will this affect other subdomains?

Not if you only update the records for the website root domain and `www`.

`insights.epicglobalinc.com` and `warehouse.epicglobalinc.com` already point to their own CloudFront distributions, so they can stay exactly as they are.

It will affect them if you do either of these without recreating their records:

- Move the whole domain's nameservers to Route 53
- Add a wildcard subdomain such as `*.epicglobalinc.com`

## Safe cutover approach

If you keep DNS where it is today:

- update only the root/apex record for `epicglobalinc.com`
- update only the `www` CNAME
- leave `insights` and `warehouse` untouched

If you move DNS to Route 53:

1. Recreate all existing records first
2. Verify `insights` and `warehouse` resolve correctly in Route 53
3. Only then change the domain nameservers

## Auth follow-up after cutover

When production moves off Figma, update the auth provider settings too:

- Supabase site URL and redirect URLs
- Google OAuth authorized origins and redirect URLs

Add both the production domain and any preview/local URLs you plan to test.
