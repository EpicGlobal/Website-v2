// Set only on the authenticated development branch, before its build.
// Static NEXT_PUBLIC access keeps server and browser behavior identical.
export const isWebsitePreview = process.env.NEXT_PUBLIC_WEBSITE_PREVIEW === 'true';
