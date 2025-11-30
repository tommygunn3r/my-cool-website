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
// Utility: Wait for dynamically injected elements (playerbar.html)
// ---------------------------------------------------------
function waitForElement(id, callback) {
    const check = () => {
        const el = document.getElementById(id);
        if (el) callback(el);
        else requestAnimationFrame(check);
    };
    check();
}

// ---------------------------------------------------------
//  START AUTH SYSTEM AFTER DOM AVAILABLE
// ---------------------------------------------------------
function startAuthSystem() {

    // We fetch elements ONLY when they exist
    const loggedOutView    = document.getElementById("loggedOutView");
    const loggedInView     = document.getElementById("loggedInView");

    const displayNameEl    = document.getElementById("displayName");
    const displayBalanceEl = document.getElementById("displayBalance");

    const loginError       = document.getElementById("loginError");
    const signupError      = document.getElementById("signupError");

    const regName          = document.getElementById("regName");
    const regEmail         = document.getElementById("regEmail");
    const regPass          = document.getElementById("regPass");

    const loginEmail       = document.getElementById("loginEmail");
    const loginPass        = document.getElementById("loginPass");

    const resetError       = document.getElementById("resetError");
    const resetSuccess     = document.getElementById("resetSuccess");
    const resetEmail       = document.getElementById("resetEmail");

    const nameChangeError  = document.getElementById("nameChangeError");
    const newPlayerName    = document.getElementById("newPlayerName");

    // ---------------------------------------------------------
    // UI HELPERS
    // ---------------------------------------------------------
    function unlockGamesUI() {
        if (window.enableGames) window.enableGames();
    }

    function lockGamesUI() {
        if (window.disableGames) window.disableGames();
    }

    function updateProfileUI(profile) {
        const name  = (profile?.player_name || "PLAYER").toUpperCase();
        const coins = Number(profile?.gunnercoins ?? 0);

        if (displayNameEl)    displayNameEl.textContent = name;
        if (displayBalanceEl) displayBalanceEl.textContent = coins.toLocaleString();

        try {
            localStorage.setItem("playerName", name);
            localStorage.setItem("gunnercoins", coins);
        } catch {}
    }

    // ---------------------------------------------------------
    // FETCH OR CREATE PROFILE
    // ---------------------------------------------------------
    async function fetchOrCreateProfile(user) {
        const { data: existing } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (existing) return existing;

        const STARTING_COINS = 5000;

        const { data, error } = await supabase
            .from("profiles")
            .insert({
                id: user.id,
                player_name: user.user_metadata.display_name ?? "Player",
                gunnercoins: STARTING_COINS
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // ---------------------------------------------------------
    // DAILY & STREAK BONUS
    // ---------------------------------------------------------
    async function applyDailyRewards(profile, user) {
        const today = new Date().toISOString().split("T")[0];
        const last  = profile.last_login;

        let streak = profile.streak ?? 0;
        let reward = 0;

        if (!last) {
            streak = 1;
            reward = 250;
        } else {
            const diff = Math.floor(
                (new Date(today) - new Date(last)) / (1000*60*60*24)
            );

            if (diff === 0) return;
            if (diff === 1) streak++;
            if (diff > 1)  streak = 1;

            reward =
                streak === 1 ? 250 :
                streak === 2 ? 350 :
                streak === 3 ? 500 :
                streak === 4 ? 750 :
                streak === 5 ? 1000 :
                streak === 6 ? 1500 :
                2000;
        }

        const { data, error } = await supabase
            .from("profiles")
            .update({
                gunnercoins: (profile.gunnercoins ?? 0) + reward,
                last_login: today,
                streak
            })
            .eq("id", user.id)
            .select()
            .single();

        if (error) return;

        updateProfileUI(data);

        if (window.showDailyRewardPopup)
            window.showDailyRewardPopup(reward, streak);
    }

    // ---------------------------------------------------------
    // AUTH STATE
    // ---------------------------------------------------------
    async function initAuthState() {
        const {
            data: { session }
        } = await supabase.auth.getSession();

        if (!session) {
            if (loggedOutView) loggedOutView.style.display = "flex";
            if (loggedInView)  loggedInView.style.display  = "none";
            lockGamesUI();
            return;
        }

        const user = session.user;

        if (loggedOutView) loggedOutView.style.display = "none";
        if (loggedInView)  loggedInView.style.display  = "flex";

        let profile = await fetchOrCreateProfile(user);

        await applyDailyRewards(profile, user);

        const { data: refreshed } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        updateProfileUI(refreshed || profile);
        unlockGamesUI();
    }

    // ---------------------------------------------------------
    // LOGIN (binds when btnLogin EXISTS)
    // ---------------------------------------------------------
    waitForElement("btnLogin", (btnLogin) => {
        btnLogin.addEventListener("click", async () => {
            if (loginError) loginError.style.display = "none";

            const email    = loginEmail.value.trim();
            const password = loginPass.value;

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                loginError.style.display = "block";
                loginError.textContent   = error.message;
                return;
            }

            if (window.closeModal) window.closeModal();
            await initAuthState();
        });
    });

    // ---------------------------------------------------------
    // SIGNUP
    // ---------------------------------------------------------
    waitForElement("btnSignup", (btnSignup) => {
        btnSignup.addEventListener("click", async () => {
            if (signupError) signupError.style.display = "none";

            const name  = regName.value.trim();
            const email = regEmail.value.trim();
            const pass  = regPass.value;

            if (name.length < 3) {
                signupError.style.display="block";
                signupError.textContent="Name must be at least 3 characters.";
                return;
            }

            try {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password: pass,
                    options: { data: { display_name: name } }
                });

                if (error) throw error;

                const user = data.user;
                if (!user) {
                    signupError.style.display="block";
                    signupError.textContent="Check your email to confirm.";
                    return;
                }

                const profile = await fetchOrCreateProfile(user);
                updateProfileUI(profile);

                if (window.closeModal) window.closeModal();
                await initAuthState();
            }
            catch (err) {
                signupError.style.display="block";
                signupError.textContent = err.message;
            }
        });
    });

    // ---------------------------------------------------------
    // RESET PASSWORD
    // ---------------------------------------------------------
    window.sendPasswordReset = async function () {
        resetError.style.display   = "none";
        resetSuccess.style.display = "none";

        const email = resetEmail.value.trim();

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "https://www.gunnersgames.com/reset-complete.html"
        });

        if (error) {
            resetError.style.display   = "block";
            resetError.textContent     = error.message;
        } else {
            resetSuccess.style.display = "block";
            resetSuccess.textContent   = "Reset link sent!";
        }
    };

    // ---------------------------------------------------------
    // CHANGE PLAYER NAME
    // ---------------------------------------------------------
    window.changePlayerName = async function () {
        nameChangeError.style.display = "none";

        const name = newPlayerName.value.trim();
        if (name.length < 3) {
            nameChangeError.style.display="block";
            nameChangeError.textContent="Name must be at least 3 characters.";
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();

        await supabase.auth.updateUser({
            data: { display_name: name }
        });

        const { data, error } = await supabase
            .from("profiles")
            .update({ player_name: name })
            .eq("id", user.id)
            .select()
            .single();

        if (error) {
            nameChangeError.style.display="block";
            nameChangeError.textContent = error.message;
            return;
        }

        updateProfileUI(data);
        if (window.closeChangeName) window.closeChangeName();
    };

    // ---------------------------------------------------------
    // LOGOUT
    // ---------------------------------------------------------
    window.handleLogout = async function () {
        await supabase.auth.signOut();

        if (loggedOutView) loggedOutView.style.display = "flex";
        if (loggedInView)  loggedInView.style.display  = "none";

        lockGamesUI();
    };

    // ---------------------------------------------------------
    // STARTUP
    // ---------------------------------------------------------
    initAuthState();
}

// Run Startup (module-safe)
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startAuthSystem);
} else {
    startAuthSystem();
}
