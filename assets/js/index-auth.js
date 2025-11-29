// /assets/js/index-auth.js
import { supabase } from "./supabaseClient.js";

// UI references
const modal = document.getElementById("authModal");
const loggedOutView = document.getElementById("loggedOutView");
const loggedInView = document.getElementById("loggedInView");
const displayNameEl = document.getElementById("displayName");
const displayBalanceEl = document.getElementById("displayBalance");
const gameLinks = document.querySelectorAll(".game-card a");

// Forms
const loginEmail = document.getElementById("loginEmail");
const loginPass = document.getElementById("loginPass");
const loginError = document.getElementById("loginError");

const regName = document.getElementById("regName");
const regEmail = document.getElementById("regEmail");
const regPass = document.getElementById("regPass");
const signupError = document.getElementById("signupError");

const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");

let profileSubscription = null;

// --- UTIL: enable/disable game links ---
function enableGames(enabled) {
    gameLinks.forEach((link) => {
        const card = link.closest(".game-card");
        if (enabled) {
            link.style.pointerEvents = "auto";
            link.style.opacity = "1";
            if (card) card.onclick = null;
        } else {
            link.style.pointerEvents = "none";
            link.style.opacity = "0.5";
            if (card) {
                card.onclick = (e) => {
                    e.preventDefault();
                    openModal("login");
                };
            }
        }
    });
}

// --- UI updates from profile data ---
function updateProfileUI(profile) {
    const name = (profile?.display_name || profile?.playerName || "Player").toUpperCase();
    const coins = profile?.gunnercoins ?? 0;

    displayNameEl.textContent = name;
    displayBalanceEl.textContent = Number(coins).toLocaleString();

    // Sync to localStorage for games to use
    localStorage.setItem("playerName", name);
    localStorage.setItem("gunnercoins", coins);
}

// --- Fetch or create profile row for user ---
async function fetchOrCreateProfile(user) {
    // Adjust table/column names to match your actual "profiles" schema
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

    if (error) {
        console.error("Error fetching profile:", error);
        return null;
    }

    if (data) {
        return data;
    }

    // If no profile yet, create one with 5000 starting coins
    const defaultProfile = {
        id: user.id,
        email: user.email,
        display_name: user.user_metadata?.display_name || user.email?.split("@")[0] || "Player",
        gunnercoins: 5000,
        created_at: new Date().toISOString()
    };

    const { data: inserted, error: insertError } = await supabase
        .from("profiles")
        .insert(defaultProfile)
        .select()
        .single();

    if (insertError) {
        console.error("Error creating profile:", insertError);
        return defaultProfile; // fall back to default for UI
    }

    return inserted;
}

// --- Subscribe to realtime changes on this user's profile ---
function subscribeToProfile(userId) {
    if (profileSubscription) {
        supabase.removeChannel(profileSubscription);
        profileSubscription = null;
    }

    profileSubscription = supabase
        .channel("profiles-changes-" + userId)
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "profiles", filter: `id=eq.${userId}` },
            (payload) => {
                if (payload.new) {
                    updateProfileUI(payload.new);
                }
            }
        )
        .subscribe();
}

// --- Auth state init ---
async function initAuthState() {
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (user) {
        loggedOutView.style.display = "none";
        loggedInView.style.display = "flex";
        enableGames(true);

        const profile = await fetchOrCreateProfile(user);
        updateProfileUI(profile);
        subscribeToProfile(user.id);
    } else {
        loggedOutView.style.display = "block";
        loggedInView.style.display = "none";
        enableGames(false);
        localStorage.removeItem("gunnercoins");
        localStorage.removeItem("playerName");
    }
}

// --- LOGIN ---
btnLogin.addEventListener("click", async () => {
    loginError.style.display = "none";

    const email = loginEmail.value.trim();
    const pass = loginPass.value;

    try {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: pass
        });

        if (error) {
            throw error;
        }

        // Refresh state
        await initAuthState();
        closeModal();
    } catch (err) {
        loginError.style.display = "block";
        loginError.textContent = "Invalid login: " + err.message;
    }
});

// --- SIGN UP ---
btnSignup.addEventListener("click", async () => {
    signupError.style.display = "none";

    const name = regName.value.trim();
    const email = regEmail.value.trim();
    const pass = regPass.value;

    if (name.length < 3) {
        signupError.style.display = "block";
        signupError.textContent = "Name must be at least 3 chars.";
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
            // If email confirmation is on, user may be null at this point
            signupError.style.display = "block";
            signupError.textContent = "Check your email to confirm your account.";
            return;
        }

        // Create / ensure profile
        const profile = await fetchOrCreateProfile(user);
        updateProfileUI(profile);
        subscribeToProfile(user.id);

        await initAuthState();
        closeModal();
    } catch (err) {
        signupError.style.display = "block";
        signupError.textContent = err.message;
    }
});

// --- Logout (exposed globally for inline onclick) ---
window.handleLogout = async () => {
    if (profileSubscription) {
        supabase.removeChannel(profileSubscription);
        profileSubscription = null;
    }
    await supabase.auth.signOut();
    await initAuthState();
};

// --- Modal helpers (global for inline handlers) ---
window.openModal = (type = "login") => {
    modal.style.display = "flex";
    switchForm(type);
};

window.closeModal = () => {
    modal.style.display = "none";
};

window.switchForm = (type) => {
    loginError.style.display = "none";
    signupError.style.display = "none";

    if (type === "login") {
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("signupForm").style.display = "none";
    } else {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("signupForm").style.display = "block";
    }
};

// Close modal when clicking outside
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Banner fallback if image fails
const bannerImage = document.querySelector(".banner-image");
if (bannerImage) {
    bannerImage.addEventListener("error", function () {
        this.style.display = "none";
        const placeholder = document.querySelector(".banner-placeholder");
        if (placeholder) placeholder.style.display = "flex";
    });
}

// Init on load
document.addEventListener("DOMContentLoaded", initAuthState);
