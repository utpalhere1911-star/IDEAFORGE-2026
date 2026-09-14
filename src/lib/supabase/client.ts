import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Public browser-safe Supabase client.
 * Uses ONLY public environment variables (NEXT_PUBLIC_*).
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
