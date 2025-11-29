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
const loggedInView  = document.getElementById("loggedInView");

const displayNameEl    = document.getElementById("displayName");
const displayBalanceEl = document.getElementById("displayBalance");

const loginError  = document.getElementById("loginError");
const signupError = document.getElementById("signupError");

const regName = document.getElementById("regName");
const regEmail = document.getElementById("regEmail");
const regPass = document.getElementById("regPass");

const loginEmail = document.getElementById("loginEmail");
const loginPass  = document.getElementById("loginPass");

const btnLogin  = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");

// Reset modal
const resetError   = document.getElementById("resetError");
const resetSuccess = document.getElementById("resetSuccess");
const resetEmail   = document.getElementById("resetEmail");

// Change name modal
const nameChangeError = document.getElementById("nameChangeError");
const newPlayerName   = document.getElementById("newPlayerName");


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
    const name = (profile?.player_name || "PLAYER").toUpperCase();
    const coins = Number(profile?.gunnercoins ?? 0);

    displayNameEl.textContent = name;
    displayBalanceEl.textContent = coins.toLocaleString();

    localStorage.setItem("playerName", name);
    localStorage.setItem("gunnercoins", coins);
}


// ---------------------------------------------------------
//  FETCH OR CREATE PROFILE
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

    if (error) {
        console.error("Error creating profile:", error);
        throw error;
    }

    return data;
}


// ---------------------------------------------------------
//  DAILY & STREAK BONUS
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
        const diff = Math.floor(
            (new Date(today) - new Date(last)) / (1000 * 60 * 60 * 24)
        );

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
        console.error("Daily reward error:", error);
        return;
    }

    updateProfileUI(data);

    if (window.showDailyRewardPopup) {
        window.showDailyRewardPopup(reward, streak);
    }
}


// ---------------------------------------------------------
//  AUTH STATE
// ---------------------------------------------------------
let profileSubscription = null;

async function initAuthState() {
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
        loggedOutView.style.display = "flex";
        loggedInView.style.display  = "none";
        lockGamesUI();
        return;
    }

    const user = session.user;

    loggedOutView.style.display = "none";
    loggedInView.style.display  = "flex";

    let profile = await fetchOrCreateProfile(user);

    await applyDailyRewards(profile, user);

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
//  REALTIME PROFILE SUBSCRIPTION
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
            payload => updateProfileUI(payload.new)
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


// ---------------------------------------------------------
//  RESET PASSWORD
// ---------------------------------------------------------
window.sendPasswordReset = async function () {
    resetError.style.display = "none";
    resetSuccess.style.display = "none";

    const email = resetEmail.value.trim();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://www.gunnersgames.com/reset-complete.html"
    });

    if (error) {
        resetError.style.display="block";
        resetError.textContent = error.message;
    } else {
        resetSuccess.style.display="block";
        resetSuccess.textContent = "Reset link sent! Check your email.";
    }
};


// ---------------------------------------------------------
//  CHANGE PLAYER NAME
// ---------------------------------------------------------
window.changePlayerName = async function () {
    nameChangeError.style.display = "none";

    const name = newPlayerName.value.trim();

    if (name.length < 3) {
        nameChangeError.style.display="block";
        nameChangeError.textContent="Name must be at least 3 characters.";
        return;
    }

    const {
        data: { user }
    } = await supabase.auth.getUser();

    // Update auth metadata
    await supabase.auth.updateUser({
        data: { display_name: name }
    });

    // Update profile table
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
//  DELETE ACCOUNT  (CONFIRMATION INCLUDED)
// ---------------------------------------------------------
window.confirmDeleteAccount = async function () {
    const really = confirm(
        "⚠ WARNING ⚠\n\nThis will permanently delete your entire account,\ncoins, stats, and profile.\n\nThis CANNOT be undone.\n\nAre you 100% sure?"
    );

    if (!really) return;

    const {
        data: { user }
    } = await supabase.auth.getUser();

    // Delete profile rows
    await supabase.from("profiles").delete().eq("id", user.id);

    // Delete stats if used
    await supabase.from("stats").delete().eq("user_id", user.id);

    // Delete supabase auth user (safe browser method)
    const session = (await supabase.auth.getSession()).data.session;

    await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        method:"DELETE",
        headers:{
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": "Bearer " + session.access_token
        }
    });

    alert("Your account has been deleted.");

    await supabase.auth.signOut();
    location.reload();
};


// ---------------------------------------------------------
//  LOGOUT
// ---------------------------------------------------------
window.handleLogout = async function () {
    await supabase.auth.signOut();

    loggedOutView.style.display="flex";
    loggedInView.style.display ="none";

    lockGamesUI();
};


// ---------------------------------------------------------
//  ON PAGE LOAD
// ---------------------------------------------------------
initAuthState();
