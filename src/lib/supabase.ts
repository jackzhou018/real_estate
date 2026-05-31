import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

/**
 * Server-only Supabase client using the service-role key.
 * Created lazily so a missing env var never crashes module load / the build.
 * Never import this from a Client Component — the service-role key must stay
 * on the server.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return null;
  }

  cachedClient = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  return cachedClient;
}

export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "listing-images";
