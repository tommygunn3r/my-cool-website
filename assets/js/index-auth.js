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
//  ENABLE / DISABLE GAME CARDS (index.html)
// ---------------------------------------------------------
function enableGames() {
    if (window.enableGames) window.enableGames();
}
function disableGames() {
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

    localStorage.setItem("playerName", name);
    localStorage.setItem("gunnercoins", coins);
}

// ---------------------------------------------------------
//  FETCH OR CREATE PROFILE
// ---------------------------------------------------------
async function fetchOrCreateProfile(user) {
    // Fetch existing profile
    const { data: existing } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (existing) return existing;

    // Create new profile
    const { data, error } = await supabase
        .from("profiles")
        .insert({
            id: user.id,
            player_name: user.user_metadata.display_name ?? "Player",
            gunnercoins: 0
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
//  AUTH STATE INIT
// ---------------------------------------------------------
async function initAuthState() {
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
        // Logged OUT
        loggedOutView.style.display = "flex";
        loggedInView.style.display = "none";
        disableGames();
        return;
    }

    // Logged IN
    loggedOutView.style.display = "none";
    loggedInView.style.display = "flex";

    const user = session.user;

    // Load or create profile
    const profile = await fetchOrCreateProfile(user);
    updateProfileUI(profile);
    enableGames();

    // Realtime updates
    subscribeToProfile(user.id);
}

// ---------------------------------------------------------
//  REALTIME SUBSCRIPTION - Live Coin & Name Updates
// ---------------------------------------------------------
let profileSubscription;
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

    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail.value.trim(),
        password: loginPass.value
    });

    if (error) {
        loginError.style.display = "block";
        loginError.textContent = error.message;
        return;
    }

    closeModal();
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
                    display_name: name // stored in auth.metadata
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

        // Create matching DB profile
        const profile = await fetchOrCreateProfile(user);
        updateProfileUI(profile);

        closeModal();
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
    disableGames();
};

// ---------------------------------------------------------
//  ON LOAD
// ---------------------------------------------------------
initAuthState();
