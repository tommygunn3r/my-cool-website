// /assets/js/supabaseClient.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// TODO: replace with YOUR values from Supabase project settings
const SUPABASE_URL = "https://pknhslxhpohrzgsfkisr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_-zZw-pi_3q1sdNGhITKuhQ_ECyDARzc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
