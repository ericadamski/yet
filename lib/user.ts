import { AuthChangeEvent } from "@supabase/gotrue-js";
import { Supabase } from "utils/supabase";

export function signIn() {
  return Supabase().auth.signIn({ provider: "github" });
}

export function onAuthChange(cb: (event: AuthChangeEvent) => void) {
  return Supabase().auth.onAuthStateChange(cb);
}

export function signOut() {
  return Supabase().auth.signOut();
}

export function get() {
  return Supabase().auth.user();
}
