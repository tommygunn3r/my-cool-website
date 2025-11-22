// ===== GUNNER COINS SYSTEM =====
// Embed this in every casino game BEFORE the game logic

class GunnerCoinsManager {
    constructor() {
        this.INITIAL_COINS = 5000;
        this.MIN_BET = 10;
        this.playerName = localStorage.getItem('playerName') || this.generatePlayerName();
        this.coins = this.loadCoins();
    }

    generatePlayerName() {
        const adjectives = ['Swift', 'Mighty', 'Epic', 'Legendary', 'Brave', 'Noble', 'Quick', 'Bold', 'Lucky', 'Golden'];
        const nouns = ['Gambler', 'Player', 'Ace', 'Champion', 'Master', 'Legend', 'Pro', 'Shark', 'Winner', 'High Roller'];
        const name = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${Math.floor(Math.random() * 999)}`;
        localStorage.setItem('playerName', name);
        return name;
    }

    loadCoins() {
        const saved = localStorage.getItem('gunnerCoins');
        if (saved === null) {
            // First time player - give initial coins
            this.saveCoins(this.INITIAL_COINS);
            return this.INITIAL_COINS;
        }
        return parseInt(saved) || 0;
    }

    saveCoins(amount) {
        localStorage.setItem('gunnerCoins', amount.toString());
        this.coins = amount;
    }

    getCoins() {
        return this.coins;
    }

    canBet(amount) {
        return this.coins >= amount && amount >= this.MIN_BET;
    }

    placeBet(amount) {
        if (!this.canBet(amount)) {
            return false;
        }
        this.coins -= amount;
        this.saveCoins(this.coins);
        return true;
    }

    winBet(amount) {
        this.coins += amount;
        this.saveCoins(this.coins);
    }

    isBroke() {
        return this.coins < this.MIN_BET;
    }

    formatCoins(amount = this.coins) {
        return amount.toLocaleString();
    }

    // Display helpers
    updateDisplay(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = this.formatCoins();
        }
    }

    showBrokeMessage() {
        return `You're out of Gunner Coins! You had a great run, ${this.playerName}!`;
    }

    // Reset coins (for testing or special events)
    resetCoins() {
        this.saveCoins(this.INITIAL_COINS);
        return this.INITIAL_COINS;
    }
}

// Initialize the coins manager
const coinsManager = new GunnerCoinsManager();

// Helper functions for common patterns
function checkCanPlay() {
    if (coinsManager.isBroke()) {
        alert(coinsManager.showBrokeMessage());
        return false;
    }
    return true;
}

function updateCoinsDisplay() {
    coinsManager.updateDisplay('coinsDisplay');
}

// ===== END GUNNER COINS SYSTEM =====

/*
HOW TO USE IN YOUR CASINO GAMES:

1. Add coins display to your HTML:
   <div id="coinsDisplay">5000</div>

2. Check if player can play:
   if (!checkCanPlay()) return;

3. When player places bet:
   if (coinsManager.placeBet(betAmount)) {
       // Bet placed successfully
       updateCoinsDisplay();
   } else {
       alert('Not enough coins!');
   }

4. When player wins:
   coinsManager.winBet(winAmount);
   updateCoinsDisplay();

5. Always update display after any coin change:
   updateCoinsDisplay();

EXAMPLE GAME FLOW:

function playRound(betAmount) {
    // Check if player has enough coins
    if (!coinsManager.canBet(betAmount)) {
        alert('Not enough Gunner Coins! You have ' + coinsManager.formatCoins());
        return;
    }
    
    // Place the bet
    if (!coinsManager.placeBet(betAmount)) {
        return;
    }
    updateCoinsDisplay();
    
    // Play the game...
    const playerWins = playGame();
    
    if (playerWins) {
        const winnings = betAmount * 2; // Example: 2x payout
        coinsManager.winBet(winnings);
        alert('You won ' + coinsManager.formatCoins(winnings) + ' Gunner Coins!');
    }
    
    updateCoinsDisplay();
    
    // Check if player is broke
    if (coinsManager.isBroke()) {
        alert(coinsManager.showBrokeMessage());
        // Disable betting controls
    }
}
*/
