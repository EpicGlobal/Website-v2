import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '@/utils/supabase/info';
import { isWebsitePreview } from '@/site/preview-mode';

const supabaseUrl = `https://${projectId}.supabase.co`;

export const supabase = createClient(supabaseUrl, publicAnonKey, {
  auth: {
    autoRefreshToken: !isWebsitePreview,
    persistSession: !isWebsitePreview,
    detectSessionInUrl: !isWebsitePreview,
  },
  ...(isWebsitePreview ? { global: { fetch: async () => {
    throw new Error('Authentication is disabled in the development preview.');
  } } } : {}),
});
