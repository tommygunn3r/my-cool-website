// /assets/js/supabaseClient.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// TODO: replace with YOUR values from Supabase project settings
const SUPABASE_URL = "https://pknhslxhpohrzgsfkisr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrbmhzbHhocG9ocnpnc2ZraXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MzQzNjEsImV4cCI6MjA4MDAxMDM2MX0.W3TtsZu0296QKS_k_nNCakh8woCCnERa_Nj_pmVNtwY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
