// /assets/js/supabaseClient.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// TODO: replace with YOUR values from Supabase project settings
const SUPABASE_URL = "https://YOUR-PROJECT-ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_PUBLIC_ANON_KEY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
