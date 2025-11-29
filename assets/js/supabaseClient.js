// /assets/js/supabaseClient.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// TODO: replace with YOUR values from Supabase project settings
const SUPABASE_URL = "https://pknhslxhpohrzgsfkisr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
