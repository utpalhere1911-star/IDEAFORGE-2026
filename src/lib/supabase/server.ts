import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Creates a server-only privileged Supabase client using SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY).
 * This client must NEVER be imported or used in client components.
 */
export function getSupabaseServerClient(): SupabaseClient {
  console.log("[Supabase Server Config]", {
    urlPresent: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    publishableKeyPresent: Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ),
    serviceRoleKeyPresent: Boolean(
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ),
  });

  const supabaseUrl = (
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  )?.trim();

  // Prefer SUPABASE_SERVICE_ROLE_KEY with fallback to SUPABASE_SECRET_KEY
  const supabaseSecretKey = (
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY
  )?.trim();

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing. Please ensure NEXT_PUBLIC_SUPABASE_URL is defined in .env.local."
    );
  }

  if (!supabaseSecretKey) {
    throw new Error(
      "Supabase server key is missing. Please ensure SUPABASE_SERVICE_ROLE_KEY is defined in .env.local."
    );
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
