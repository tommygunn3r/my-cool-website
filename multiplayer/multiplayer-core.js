/**
 * GunnersGames Multiplayer Core
 * Backend: https://gunnersgames-backend.onrender.com
 * Transport: REST (fetch) + WebSockets
 *
 * Usage example:
 *
 * const game = new MultiplayerGame({
 *   roomId: 'room1',
 *   playerId: currentUserId,
 *   playerName: currentUserName,
 *   onLog: console.log,
 *   onError: console.error,
 *   onRoomUpdate: (room) => { ... },
 *   onStateUpdate: (state) => { ... },
 *   onAction: (action) => { ... },
 *   onChat: (chatMsg) => { ... }
 * });
 *
 * game.connect();   // joins room + opens websocket
 * game.sendAction('submitAnswer', { text: 'foo' });
 * game.sendChat('Hello table!');
 * game.setState({ ...gameState });
 * game.leave();
 */

(function(global) {
  'use strict';

  const BACKEND_HTTP = 'https://gunnersgames-backend.onrender.com';
  const BACKEND_WS   = 'wss://gunnersgames-backend.onrender.com';

  // Small helper to do JSON fetch with error handling
  async function jsonFetch(url, options = {}) {
    const finalOpts = {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    };

    if (finalOpts.body && typeof finalOpts.body !== 'string') {
      finalOpts.body = JSON.stringify(finalOpts.body);
    }

    const res = await fetch(url, finalOpts);
    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      // ignore parse errors for non-JSON responses
    }

    if (!res.ok) {
      const msg = (data && data.error) || res.statusText || 'Request failed';
      const err = new Error(msg);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  }

  class MultiplayerGame {
    /**
     * @param {Object} config
     * @param {string} config.roomId     - e.g. 'room1'
     * @param {string} config.playerId   - unique ID for this user
     * @param {string} config.playerName - display name
     * @param {string} [config.backendHttp] - override backend base URL
     * @param {string} [config.backendWs]   - override websocket URL
     *
     * Callbacks (all optional):
     * @param {function} [config.onConnected]
     * @param {function} [config.onDisconnected]
     * @param {function} [config.onRoomUpdate]     - (roomData) => {}
     * @param {function} [config.onStateUpdate]    - (state) => {}
     * @param {function} [config.onAction]         - (actionObj) => {}
     * @param {function} [config.onChat]           - (chatObj) => {}
     * @param {function} [config.onError]          - (error) => {}
     * @param {function} [config.onLog]            - (msg, extra) => {}
     */
    constructor(config) {
      if (!config || !config.roomId || !config.playerId || !config.playerName) {
        throw new Error('MultiplayerGame: roomId, playerId and playerName are required.');
      }

      this.roomId = config.roomId;
      this.playerId = config.playerId;
      this.playerName = config.playerName;

      this.backendHttp = config.backendHttp || BACKEND_HTTP;
      this.backendWs   = config.backendWs   || BACKEND_WS;

      // callbacks
      this.onConnected     = config.onConnected     || (() => {});
      this.onDisconnected  = config.onDisconnected  || (() => {});
      this.onRoomUpdate    = config.onRoomUpdate    || (() => {});
      this.onStateUpdate   = config.onStateUpdate   || (() => {});
      this.onAction        = config.onAction        || (() => {});
      this.onChat          = config.onChat          || (() => {});
      this.onError         = config.onError         || ((e) => console.error('[MultiplayerGame error]', e));
      this.onLog           = config.onLog           || ((msg, extra) => console.log('[MultiplayerGame]', msg, extra || ''));

      // internal state
      this.ws = null;
      this.connected = false;
      this.roomData = null;
      this.gameState = null;
      this.reconnectAttempts = 0;
      this.maxReconnectAttempts = 5;
      this.reconnectDelayMs = 2000;
      this._manualClose = false;
    }

    // ===== Public API =====

    /**
     * Join room (via REST) and then open WebSocket connection.
     */
    async connect() {
      this.onLog('Connecting: join room + open websocket...');

      try {
        // 1) REST: join the room (creates player row, may make us host)
        const joinedRoom = await this.joinRoomRest();
        this.roomData = joinedRoom;
        this.onRoomUpdate(joinedRoom);

        // 2) WebSocket: open live connection
        await this.openWebSocket();

        this.onLog('Connected successfully.');
      } catch (err) {
        this.onError(err);
      }
    }

    /**
     * Cleanly leave the room and close websocket.
     */
    async leave() {
      this.onLog('Leaving room and closing websocket...');
      this._manualClose = true;

      try {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.close();
        }
      } catch (e) {
        // ignore
      }

      try {
        await this.leaveRoomRest();
      } catch (err) {
        this.onError(err);
      }

      this.connected = false;
      this.onDisconnected({ reason: 'leave' });
    }

    /**
     * Host: update room settings (game type, max players, buy-in).
     */
    async updateRoomSettings({ gameType, maxPlayers, buyIn }) {
      try {
        const room = await jsonFetch(
          `${this.backendHttp}/rooms/${encodeURIComponent(this.roomId)}/settings`,
          {
            method: 'POST',
            body: {
              hostId: this.playerId,
              gameType,
              maxPlayers,
              buyIn: buyIn || 0
            }
          }
        );
        this.roomData = room;
        this.onRoomUpdate(room);
      } catch (err) {
        this.onError(err);
        throw err;
      }
    }

    /**
     * Host: set room status (e.g. 'waiting' or 'playing').
     */
    async setRoomStatus(status) {
      try {
        const room = await jsonFetch(
          `${this.backendHttp}/rooms/${encodeURIComponent(this.roomId)}/status`,
          {
            method: 'POST',
            body: {
              hostId: this.playerId,
              status
            }
          }
        );
        this.roomData = room;
        this.onRoomUpdate(room);
      } catch (err) {
        this.onError(err);
        throw err;
      }
    }

    /**
     * Get latest game state from backend (HTTP).
     */
    async fetchState() {
      try {
        const state = await jsonFetch(
          `${this.backendHttp}/rooms/${encodeURIComponent(this.roomId)}/state`,
          { method: 'GET' }
        );
        this.gameState = state;
        this.onStateUpdate(state);
        return state;
      } catch (err) {
        this.onError(err);
        throw err;
      }
    }

    /**
     * Set game state (HTTP + broadcast via server).
     * Typically host uses this, but your game can decide.
     */
    async setState(stateObj) {
      try {
        await jsonFetch(
          `${this.backendHttp}/rooms/${encodeURIComponent(this.roomId)}/state`,
          {
            method: 'POST',
            body: stateObj
          }
        );
        // Backend will broadcast a "stateUpdate" via WebSocket,
        // which will call onStateUpdate, so we don't have to here.
      } catch (err) {
        this.onError(err);
        throw err;
      }
    }

    /**
     * Send a game action over WebSocket.
     *
     * @param {string} actionType  - e.g. 'submitAnswer', 'vote', 'fold', etc.
     * @param {Object} payload     - arbitrary JSON serializable object
     */
    sendAction(actionType, payload = {}) {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        this.onLog('sendAction called but websocket is not open');
        return;
      }

      const msg = {
        type: 'action',
        actionType,
        payload
      };

      this.ws.send(JSON.stringify(msg));
    }

    /**
     * Send chat or emoji over WebSocket.
     */
    sendChat(message) {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        this.onLog('sendChat called but websocket is not open');
        return;
      }

      const msg = {
        type: 'chat',
        message: message
      };

      this.ws.send(JSON.stringify(msg));
    }

    /**
     * Whether we *think* we're connected.
     */
    isConnected() {
      return this.connected && this.ws && this.ws.readyState === WebSocket.OPEN;
    }

    // ===== Static helpers (for lobby, etc.) =====

    /**
     * Fetch list of rooms (for lobby UI).
     */
    static async fetchRooms(backendHttp = BACKEND_HTTP) {
      return jsonFetch(`${backendHttp}/rooms`, { method: 'GET' });
    }

    /**
     * Fetch a specific room (id = 'room1' etc.).
     */
    static async fetchRoom(roomId, backendHttp = BACKEND_HTTP) {
      return jsonFetch(`${backendHttp}/rooms/${encodeURIComponent(roomId)}`, { method: 'GET' });
    }

    // ===== Internal implementation =====

    async joinRoomRest() {
      this.onLog('Joining room via REST...', { roomId: this.roomId, playerId: this.playerId });
      const data = await jsonFetch(
        `${this.backendHttp}/rooms/${encodeURIComponent(this.roomId)}/join`,
        {
          method: 'POST',
          body: {
            playerId: this.playerId,
            playerName: this.playerName
          }
        }
      );
      this.onLog('Joined room.', data);
      return data;
    }

    async leaveRoomRest() {
      this.onLog('Leaving room via REST...', { roomId: this.roomId, playerId: this.playerId });
      const data = await jsonFetch(
        `${this.backendHttp}/rooms/${encodeURIComponent(this.roomId)}/leave`,
        {
          method: 'POST',
          body: {
            playerId: this.playerId
          }
        }
      );
      this.onLog('Left room.', data);
      return data;
    }

    async openWebSocket() {
      return new Promise((resolve, reject) => {
        const ws = new WebSocket(this.backendWs);

        this.ws = ws;
        this._manualClose = false;

        ws.onopen = () => {
          this.onLog('WebSocket opened, sending hello...');
          // identify ourselves: room + player
          ws.send(JSON.stringify({
            type: 'hello',
            roomId: this.roomId,
            playerId: this.playerId,
            playerName: this.playerName
          }));
        };

        ws.onmessage = (event) => {
          let msg;
          try {
            msg = JSON.parse(event.data);
          } catch (e) {
            this.onLog('WebSocket received invalid JSON', event.data);
            return;
          }

          switch (msg.type) {
            case 'helloAck':
              this.onLog('WebSocket helloAck received.');
              this.connected = true;
              this.reconnectAttempts = 0;
              this.onConnected();
              resolve();
              break;

            case 'roomUpdate':
              this.roomData = msg.room;
              this.onRoomUpdate(msg.room);
              break;

            case 'stateUpdate':
              this.gameState = msg.state;
              this.onStateUpdate(msg.state);
              break;

            case 'action':
              this.onAction({
                roomId: msg.roomId,
                playerId: msg.playerId,
                action: msg.action
              });
              break;

            case 'chat':
              this.onChat({
                roomId: msg.roomId,
                playerId: msg.playerId,
                message: msg.message,
                timestamp: msg.timestamp
              });
              break;

            case 'error':
              this.onError(new Error(msg.error || 'Unknown server error'));
              break;

            default:
              this.onLog('Unknown WebSocket message type', msg);
          }
        };

        ws.onerror = (event) => {
          this.onLog('WebSocket error', event);
          // we still rely on onclose to handle reconnect
        };

        ws.onclose = (event) => {
          this.onLog('WebSocket closed', event);
          const wasConnected = this.connected;
          this.connected = false;

          this.onDisconnected({
            reason: 'ws-close',
            code: event.code,
            wasConnected
          });

          if (!this._manualClose) {
            this.tryReconnect();
          }
        };
      });
    }

    async tryReconnect() {
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        this.onLog('Max reconnect attempts reached, giving up.');
        return;
      }

      this.reconnectAttempts++;
      const delay = this.reconnectDelayMs * this.reconnectAttempts;
      this.onLog(`Attempting reconnect #${this.reconnectAttempts} in ${delay}ms...`);

      setTimeout(async () => {
        try {
          // Re-join the room via REST (in case backend reset)
          const joinedRoom = await this.joinRoomRest();
          this.roomData = joinedRoom;
          this.onRoomUpdate(joinedRoom);

          await this.openWebSocket();
          this.onLog('Reconnected successfully.');
        } catch (err) {
          this.onError(err);
          this.tryReconnect();
        }
      }, delay);
    }
  }

  // Expose globally
  global.MultiplayerGame = MultiplayerGame;

})(window);
