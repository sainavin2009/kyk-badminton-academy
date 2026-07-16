import { createClient } from '@supabase/supabase-js';

// Accessing environment variables via Vite's import.meta.env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation to ensure the application doesn't run with missing configuration
if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Supabase environment variables. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment settings."
  );
}

/**
 * Shared Supabase client instance.
 * All authentication, database, and storage operations across the app
 * must import and use this single instance.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);