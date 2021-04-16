import { createClient, SupabaseClient } from "@supabase/supabase-js";

let instance: SupabaseClient;

export function Supabase() {
  if (instance == null) {
    instance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_CLIENT_KEY
    );
  }

  return instance;
}
