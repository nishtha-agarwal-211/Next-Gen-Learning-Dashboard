/**
 * Supabase server-side client factory.
 * Creates a Supabase client for use in Server Components.
 * Environment variables are read securely on the server — never exposed to the client bundle.
 */
import { createClient } from '@supabase/supabase-js';

/**
 * Create a Supabase client for server-side usage (Server Components, Route Handlers).
 * Uses the service-level anon key for read access to public tables.
 */
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. ' +
        'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}
