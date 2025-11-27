/**
 * GunnersGames Multiplayer Infrastructure
 * Reusable Firebase-based multiplayer system for casino games
 */

class MultiplayerGame {
    constructor(config) {
        this.config = {
            roomId: config.roomId,
            gameType: config.gameType,
            maxPlayers: config.maxPlayers || 4,
            minPlayers: config.minPlayers || 2,
            turnTimeout: config.turnTimeout || 30000, // 30 seconds
            ...config
        };

        this.firebase = firebase;
        this.database = firebase.database();
        this.auth = firebase.auth();
        
        this.currentUser = null;
        this.roomRef = null;
        this.gameStateRef = null;
        this.playersRef = null;
        
        this.localPlayerData = null;
        this.allPlayers = {};
        this.gameState = {};
        this.isHost = false;
        
        this.listeners = [];
        this.turnTimer = null;
        
        // Callbacks
        this.onPlayerJoined = config.onPlayerJoined || (() => {});
        this.onPlayerLeft = config.onPlayerLeft || (() => {});
        this.onGameStateUpdate = config.onGameStateUpdate || (() => {});
        this.onGameStart = config.onGameStart || (() => {});
        this.onGameEnd = config.onGameEnd || (() => {});
        this.onPlayerAction = config.onPlayerAction || (() => {});
        this.onTurnChange = config.onTurnChange || (() => {});
        this.onChatMessage = config.onChatMessage || (() => {});
    }

    /**
     * Initialize the multiplayer system
     */
    async init() {
        return new Promise((resolve, reject) => {
            this.auth.onAuthStateChanged(async (user) => {
                if (!user) {
                    reject(new Error('User not authenticated'));
                    return;
                }

                this.currentUser = user;
                this.roomRef = this.database.ref(`rooms/${this.config.roomId}`);
                this.gameStateRef = this.roomRef.child('gameState');
                this.playersRef = this.roomRef.child('players');

                try {
                    // Check if room exists
                    const roomSnapshot = await this.roomRef.once('value');
                    if (!roomSnapshot.exists()) {
                        reject(new Error('Room not found'));
                        return;
                    }

                    const roomData = roomSnapshot.val();
                    this.isHost = roomData.hostId === user.uid;

                    // Set up listeners
                    this.setupListeners();

                    // Mark player as active
                    await this.setPlayerPresence(true);

                    // Set up disconnect handler
                    this.playersRef.child(user.uid).child('connected').onDisconnect().set(false);

                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    /**
     * Set up Firebase listeners for real-time sync
     */
    setupListeners() {
        // Listen for player changes
        const playerListener = this.playersRef.on('value', (snapshot) => {
            const players = snapshot.val() || {};
            
            // Check for new players
            Object.keys(players).forEach(playerId => {
                if (!this.allPlayers[playerId]) {
                    this.onPlayerJoined(playerId, players[playerId]);
                }
            });

            // Check for left players
            Object.keys(this.allPlayers).forEach(playerId => {
                if (!players[playerId] || !players[playerId].connected) {
                    this.onPlayerLeft(playerId, this.allPlayers[playerId]);
                }
            });

            this.allPlayers = players;
            
            // Update local player data
            if (players[this.currentUser.uid]) {
                this.localPlayerData = players[this.currentUser.uid];
            }
        });

        // Listen for game state changes
        const gameStateListener = this.gameStateRef.on('value', (snapshot) => {
            const newState = snapshot.val() || {};
            const oldState = this.gameState;
            this.gameState = newState;

            // Check for game start
            if (!oldState.started && newState.started) {
                this.onGameStart(newState);
            }

            // Check for game end
            if (!oldState.finished && newState.finished) {
                this.onGameEnd(newState);
            }

            // Check for turn change
            if (oldState.currentTurn !== newState.currentTurn) {
                this.onTurnChange(newState.currentTurn, newState);
                this.startTurnTimer();
            }

            this.onGameStateUpdate(newState, oldState);
        });

        // Listen for player actions
        const actionsListener = this.roomRef.child('actions').on('child_added', (snapshot) => {
            const action = snapshot.val();
            if (action.playerId !== this.currentUser.uid) {
                this.onPlayerAction(action);
            }
        });

        // Listen for chat messages
        const chatListener = this.roomRef.child('chat').limitToLast(50).on('child_added', (snapshot) => {
            const message = snapshot.val();
            this.onChatMessage(message);
        });

        this.listeners.push(
            { ref: this.playersRef, event: 'value', callback: playerListener },
            { ref: this.gameStateRef, event: 'value', callback: gameStateListener },
            { ref: this.roomRef.child('actions'), event: 'child_added', callback: actionsListener },
            { ref: this.roomRef.child('chat'), event: 'child_added', callback: chatListener }
        );
    }

    /**
     * Start turn timer
     */
    startTurnTimer() {
        if (this.turnTimer) clearTimeout(this.turnTimer);

        if (this.gameState.currentTurn === this.currentUser.uid) {
            this.turnTimer = setTimeout(() => {
                // Auto-fold/pass if player doesn't act
                this.submitAction({
                    type: 'timeout',
                    playerId: this.currentUser.uid,
                    timestamp: Date.now()
                });
            }, this.config.turnTimeout);
        }
    }

    /**
     * Update game state (host only for critical updates)
     */
    async updateGameState(updates, requireHost = false) {
        if (requireHost && !this.isHost) {
            throw new Error('Only host can perform this action');
        }

        return this.gameStateRef.update(updates);
    }

    /**
     * Set game state (complete replacement)
     */
    async setGameState(state, requireHost = false) {
        if (requireHost && !this.isHost) {
            throw new Error('Only host can perform this action');
        }

        return this.gameStateRef.set(state);
    }

    /**
     * Update player data
     */
    async updatePlayerData(playerId, updates) {
        if (playerId !== this.currentUser.uid && !this.isHost) {
            throw new Error('Can only update own player data');
        }

        return this.playersRef.child(playerId).update(updates);
    }

    /**
     * Submit player action
     */
    async submitAction(action) {
        const actionData = {
            ...action,
            playerId: this.currentUser.uid,
            timestamp: Date.now()
        };

        // Push to actions log
        await this.roomRef.child('actions').push(actionData);

        // Clear turn timer
        if (this.turnTimer) {
            clearTimeout(this.turnTimer);
            this.turnTimer = null;
        }

        return actionData;
    }

    /**
     * Send chat message (emoji)
     */
    async sendEmoji(emoji) {
        return this.roomRef.child('chat').push({
            playerId: this.currentUser.uid,
            playerName: this.localPlayerData.name,
            emoji: emoji,
            timestamp: Date.now()
        });
    }

    /**
     * Set player ready status
     */
    async setReady(ready = true) {
        await this.updatePlayerData(this.currentUser.uid, { ready });

        // If all players ready and host, start game
        if (this.isHost && ready) {
            const allReady = Object.values(this.allPlayers).every(p => p.ready);
            const enoughPlayers = Object.keys(this.allPlayers).length >= this.config.minPlayers;
            
            if (allReady && enoughPlayers) {
                await this.startGame();
            }
        }
    }

    /**
     * Start the game (host only)
     */
    async startGame() {
        if (!this.isHost) {
            throw new Error('Only host can start the game');
        }

        return this.updateGameState({
            started: true,
            startedAt: Date.now()
        }, true);
    }

    /**
     * End the game
     */
    async endGame(results) {
        if (!this.isHost) {
            throw new Error('Only host can end the game');
        }

        // Calculate winnings and update balances
        for (const [playerId, result] of Object.entries(results)) {
            if (result.winnings > 0) {
                await this.database.ref(`users/${playerId}/balance`).transaction(bal => {
                    return (bal || 0) + result.winnings;
                });
            }
        }

        await this.updateGameState({
            finished: true,
            finishedAt: Date.now(),
            results: results
        }, true);

        // Mark room as finished
        await this.roomRef.update({ status: 'finished' });
    }

    /**
     * Set player presence
     */
    async setPlayerPresence(connected) {
        return this.playersRef.child(this.currentUser.uid).update({
            connected,
            lastSeen: Date.now()
        });
    }

    /**
     * Leave room
     */
    async leaveRoom() {
        await this.setPlayerPresence(false);
        
        // If host, transfer host or close room
        if (this.isHost) {
            const otherPlayers = Object.keys(this.allPlayers).filter(id => id !== this.currentUser.uid);
            
            if (otherPlayers.length > 0) {
                // Transfer host to next player
                await this.roomRef.update({
                    hostId: otherPlayers[0],
                    hostName: this.allPlayers[otherPlayers[0]].name
                });
            } else {
                // No other players, mark room as finished
                await this.roomRef.update({ status: 'finished' });
            }
        }

        // Remove player from room
        await this.playersRef.child(this.currentUser.uid).remove();

        // Refund remaining chips
        if (this.localPlayerData && this.localPlayerData.chips > 0) {
            await this.database.ref(`users/${this.currentUser.uid}/balance`).transaction(bal => {
                return (bal || 0) + this.localPlayerData.chips;
            });
        }

        this.cleanup();
    }

    /**
     * Get player count
     */
    getPlayerCount() {
        return Object.keys(this.allPlayers).filter(id => this.allPlayers[id].connected).length;
    }

    /**
     * Get player by ID
     */
    getPlayer(playerId) {
        return this.allPlayers[playerId];
    }

    /**
     * Check if current player is active
     */
    isMyTurn() {
        return this.gameState.currentTurn === this.currentUser.uid;
    }

    /**
     * Get ordered list of players
     */
    getPlayerOrder() {
        return Object.entries(this.allPlayers)
            .filter(([_, p]) => p.connected)
            .sort(([_, a], [__, b]) => a.joinedAt - b.joinedAt)
            .map(([id, _]) => id);
    }

    /**
     * Clean up listeners
     */
    cleanup() {
        if (this.turnTimer) {
            clearTimeout(this.turnTimer);
        }

        this.listeners.forEach(({ ref, event, callback }) => {
            ref.off(event, callback);
        });

        this.listeners = [];
    }

    /**
     * Destroy multiplayer instance
     */
    destroy() {
        this.cleanup();
        this.currentUser = null;
        this.roomRef = null;
        this.gameStateRef = null;
        this.playersRef = null;
    }
}

// ====== UTILITY FUNCTIONS ======

/**
 * Generate unique action ID
 */
function generateActionId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Shuffle array (for deck shuffling, etc)
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Get URL parameter
 */
function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    return amount.toLocaleString();
}

/**
 * Delay helper
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Export for use in games
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MultiplayerGame, generateActionId, shuffleArray, getUrlParameter, formatCurrency, delay };
}
