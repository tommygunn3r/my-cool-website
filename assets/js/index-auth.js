// ---------------------------------------------------------
//  Gunner's Games - Supabase Auth + Profile Management
// ---------------------------------------------------------

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ---------------------------------------------------------
//  CONFIG
// ---------------------------------------------------------
const SUPABASE_URL = "https://pknhslxhpohrzgsfkisr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_-zZw-pi_3q1sdNGhITKuhQ_ECyDARzc";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabase = supabase;


// ---------------------------------------------------------
//  Wait for dynamically loaded elements
// ---------------------------------------------------------
function waitFor(id) {
    return new Promise(resolve => {
        const check = () => {
            const el = document.getElementById(id);
            if (el) resolve(el);
            else requestAnimationFrame(check);
        };
        check();
    });
}


// ---------------------------------------------------------
//  Main initialization
// ---------------------------------------------------------
async function start() {

    // 🌟 Wait for modal elements (loaded in index.html)
    const btnLogin      = await waitFor("btnLogin");
    const btnSignup     = await waitFor("btnSignup");

    const loginEmail    = await waitFor("loginEmail");
    const loginPass     = await waitFor("loginPass");

    const regName       = await waitFor("regName");
    const regEmail      = await waitFor("regEmail");
    const regPass       = await waitFor("regPass");

    const loginError    = await waitFor("loginError");
    const signupError   = await waitFor("signupError");

    // All other needed modal elements auto-exist now.

    // ---------------------------------------------------------
    //  UI HELPERS
    // ---------------------------------------------------------
    function unlockGamesUI() {
        if (window.enableGames) window.enableGames();
    }

    function lockGamesUI() {
        if (window.disableGames) window.disableGames();
    }

    function updateProfileUI(profile) {
        const nameEl = document.getElementById("pb-player-name");
        const coinEl = document.getElementById("pb-player-coins");

        if (nameEl) nameEl.textContent = profile.player_name?.toUpperCase() ?? "PLAYER";
        if (coinEl) coinEl.textContent = profile.gunnercoins ?? 0;
    }


    // ---------------------------------------------------------
    //  FETCH/CREATE PROFILE
    // ---------------------------------------------------------
    async function fetchOrCreateProfile(user) {
        const { data: existing } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (existing) return existing;

        const { data, error } = await supabase
            .from("profiles")
            .insert({
                id: user.id,
                player_name: user.user_metadata.display_name || "Player",
                gunnercoins: 5000
            })
            .select()
            .single();

        return data;
    }


    // ---------------------------------------------------------
    //  DAILY REWARD (unchanged)
    // ---------------------------------------------------------
    async function applyDailyRewards(profile, user) {
        const today = new Date().toISOString().split("T")[0];

        const last = profile.last_login;
        let streak = profile.streak ?? 0;
        let reward = 0;

        if (!last) {
            streak = 1;
            reward = 250;
        } else {
            const diff = Math.floor((new Date(today) - new Date(last)) / (86400000));

            if (diff === 0) return;
            if (diff === 1) streak++;
            if (diff > 1) streak = 1;

            reward =
                streak === 1 ? 250 :
                streak === 2 ? 350 :
                streak === 3 ? 500 :
                streak === 4 ? 750 :
                streak === 5 ? 1000 :
                streak === 6 ? 1500 :
                2000;
        }

        const { data } = await supabase
            .from("profiles")
            .update({
                gunnercoins: (profile.gunnercoins ?? 0) + reward,
                last_login: today,
                streak: streak
            })
            .eq("id", user.id)
            .select()
            .single();

        updateProfileUI(data);
    }


    // ---------------------------------------------------------
    //  AUTH STATE
    // ---------------------------------------------------------
    async function initAuthState() {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            lockGamesUI();
            return;
        }

        const user = session.user;

        let profile = await fetchOrCreateProfile(user);
        updateProfileUI(profile);

        await applyDailyRewards(profile, user);

        unlockGamesUI();
    }


    // ---------------------------------------------------------
    //  LOGIN
    // ---------------------------------------------------------
    btnLogin.addEventListener("click", async () => {

        loginError.style.display = "none";

        const email = loginEmail.value.trim();
        const pass  = loginPass.value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: pass
        });

        if (error) {
            loginError.style.display = "block";
            loginError.textContent = error.message;
            return;
        }

        if (window.closeModal) window.closeModal();
        await initAuthState();
    });


    // ---------------------------------------------------------
    //  SIGNUP
    // ---------------------------------------------------------
    btnSignup.addEventListener("click", async () => {

        signupError.style.display = "none";

        const name  = regName.value.trim();
        const email = regEmail.value.trim();
        const pass  = regPass.value;

        if (name.length < 3) {
            signupError.style.display = "block";
            signupError.textContent = "Name must be at least 3 characters.";
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password: pass,
            options: { 
                data: { display_name: name },
                emailRedirectTo: window.location.origin
            }
        });

        if (error) {
            signupError.style.display = "block";
            signupError.textContent = error.message;
            return;
        }

        // Check if email confirmation is required
        if (data.user && !data.session) {
            // Email confirmation required
            signupError.style.display = "block";
            signupError.style.color = "#e94560";
            signupError.textContent = "✓ Account created! Check your email to verify your account.";
            
            // Clear form
            regName.value = "";
            regEmail.value = "";
            regPass.value = "";
            return;
        }

        // Auto-confirmed (email confirmation disabled)
        if (window.closeModal) window.closeModal();
        await initAuthState();
    });



    // Load current session state
    await initAuthState();
}


// ---------------------------------------------------------
// START SYSTEM (module safe)
// ---------------------------------------------------------
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
} else {
    start();
}