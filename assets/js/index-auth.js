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

// ---------------------------------------------------------
//  UI ELEMENTS
// ---------------------------------------------------------
const loggedOutView = document.getElementById("loggedOutView");
const loggedInView = document.getElementById("loggedInView");
const displayNameEl = document.getElementById("displayName");
const displayBalanceEl = document.getElementById("displayBalance");

const loginError = document.getElementById("loginError");
const signupError = document.getElementById("signupError");

const regName = document.getElementById("regName");
const regEmail = document.getElementById("regEmail");
const regPass = document.getElementById("regPass");

const loginEmail = document.getElementById("loginEmail");
const loginPass = document.getElementById("loginPass");

const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");

// ---------------------------------------------------------
//  GAME LOCK / UNLOCK (hooks into functions defined in index.html)
// ---------------------------------------------------------
function unlockGamesUI() {
    if (window.enableGames) window.enableGames();
}
function lockGamesUI() {
    if (window.disableGames) window.disableGames();
}

// ---------------------------------------------------------
//  UPDATE UI WITH PROFILE INFO
// ---------------------------------------------------------
function updateProfileUI(profile) {
    const name = (profile?.player_name || "PLAYER").toUpperCase();
    const coins = Number(profile?.gunnercoins ?? 0);

    displayNameEl.textContent = name;
    displayBalanceEl.textContent = coins.toLocaleString();

    // Sync local storage for games if needed later
    localStorage.setItem("playerName", name);
    localStorage.setItem("gunnercoins", coins);
}

// ---------------------------------------------------------
//  FETCH OR CREATE PROFILE (includes starting 5k coins)
// ---------------------------------------------------------
async function fetchOrCreateProfile(user) {
    // Try fetch existing
    const { data: existing } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (existing) return existing;

    // New profile with 5,000 starting coins
    const STARTING_COINS = 5000;

    const { data, error } = await supabase
        .from("profiles")
        .insert({
            id: user.id,
            player_name: user.user_metadata.display_name ?? "Player",
            gunnercoins: STARTING_COINS
            // last_login, streak will be handled by daily reward
        })
        .select()
        .single();

    if (error) {
        console.error("Error creating profile:", error);
        throw error;
    }

    return data;
}

// ---------------------------------------------------------
//  DAILY + STREAK REWARD SYSTEM
//  Columns expected in profiles:
//    last_login (date), streak (int), gunnercoins (int)
// ---------------------------------------------------------
async function applyDailyRewards(profile, user) {
    const today = new Date().toISOString().split("T")[0];
    const last = profile.last_login;

    let streak = profile.streak ?? 0;
    let reward = 0;

    if (!last) {
        // First login ever
        streak = 1;
        reward = 250;
    } else {
        // Calculate day delta
        const diff = Math.floor(
            (new Date(today) - new Date(last)) / (1000 * 60 * 60 * 24)
        );

        if (diff === 0) {
            // Already claimed today
            return;
        } else if (diff === 1) {
            // Continue streak
            streak++;
        } else if (diff > 1) {
            // Streak broken
            streak = 1;
        }

        // Streak reward ladder
        reward =
            streak === 1 ? 250 :
            streak === 2 ? 350 :
            streak === 3 ? 500 :
            streak === 4 ? 750 :
            streak === 5 ? 1000 :
            streak === 6 ? 1500 :
            2000; // Day 7+
    }

    const { data, error } = await supabase
        .from("profiles")
        .update({
            gunnercoins: (profile.gunnercoins ?? 0) + reward,
            last_login: today,
            streak: streak
        })
        .eq("id", user.id)
        .select()
        .single();

    if (error) {
        console.error("Error applying daily reward:", error);
        return;
    }

    // Update UI with new profile values
    updateProfileUI(data);

    // Use global helper from index.html for now
    if (window.showDailyRewardPopup) {
        window.showDailyRewardPopup(reward, streak);
    }
}

// ---------------------------------------------------------
//  AUTH STATE INIT
// ---------------------------------------------------------
let profileSubscription = null;

async function initAuthState() {
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
        // Logged OUT
        loggedOutView.style.display = "flex";
        loggedInView.style.display = "none";
        lockGamesUI();
        return;
    }

    const user = session.user;

    // Logged IN
    loggedOutView.style.display = "none";
    loggedInView.style.display = "flex";

    // Load/create profile
    let profile = await fetchOrCreateProfile(user);

    // Apply daily reward + streak bonuses
    await applyDailyRewards(profile, user);

    // Re-fetch profile after potential update
    const { data: refreshed } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    profile = refreshed || profile;

    updateProfileUI(profile);
    unlockGamesUI();

    subscribeToProfile(user.id);
}

// ---------------------------------------------------------
//  REALTIME SUBSCRIPTION - Live Profile Updates
// ---------------------------------------------------------
function subscribeToProfile(user_id) {
    if (profileSubscription) profileSubscription.unsubscribe();

    profileSubscription = supabase
        .channel("profile_changes")
        .on(
            "postgres_changes",
            {
                event: "UPDATE",
                schema: "public",
                table: "profiles",
                filter: `id=eq.${user_id}`
            },
            (payload) => {
                updateProfileUI(payload.new);
            }
        )
        .subscribe();
}

// ---------------------------------------------------------
//  LOGIN
// ---------------------------------------------------------
btnLogin.addEventListener("click", async () => {
    loginError.style.display = "none";

    const email = loginEmail.value.trim();
    const password = loginPass.value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        loginError.style.display = "block";
        loginError.textContent = error.message;
        return;
    }

    // On success
    if (window.closeModal) window.closeModal();
    await initAuthState();
});

// ---------------------------------------------------------
//  SIGN UP
// ---------------------------------------------------------
btnSignup.addEventListener("click", async () => {
    signupError.style.display = "none";

    const name = regName.value.trim();
    const email = regEmail.value.trim();
    const pass = regPass.value;

    if (name.length < 3) {
        signupError.style.display = "block";
        signupError.textContent = "Name must be at least 3 characters.";
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password: pass,
            options: {
                data: {
                    display_name: name
                }
            }
        });

        if (error) throw error;

        const user = data.user;

        if (!user) {
            signupError.style.display = "block";
            signupError.textContent =
                "Check your email to confirm your account.";
            return;
        }

        // Create matching DB profile with 5k starting coins
        const profile = await fetchOrCreateProfile(user);
        updateProfileUI(profile);

        if (window.closeModal) window.closeModal();
        await initAuthState();
    } catch (err) {
        signupError.style.display = "block";
        signupError.textContent = err.message;
    }
});

// ---------------------------------------------------------
//  LOGOUT
// ---------------------------------------------------------
window.handleLogout = async function () {
    await supabase.auth.signOut();
    loggedOutView.style.display = "flex";
    loggedInView.style.display = "none";
    lockGamesUI();
    // Clear local storage if you want
    // localStorage.removeItem("playerName");
    // localStorage.removeItem("gunnercoins");
};

// ---------------------------------------------------------
//  ON LOAD
// ---------------------------------------------------------
initAuthState();
