import { createClient } from "@supabase/supabase-js";

/**
 * Shared Supabase client instance.
 * Reads configuration from environment variables with hardcoded fallbacks
 * to ensure the app remains functional during local development.
 */
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ??
  "https://hsxelnigsofldxlwufri.supabase.co";

const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzeGVsbmlnc29mbGR4bHd1ZnJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwOTk4MTcsImV4cCI6MjA5OTY3NTgxN30.WpWy67huH0Bp7vtKW4aTvSe9X_JY9De8D_LUdRqyDYQ";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);