import { db } from './firebase-config.js';
import { collection, addDoc, query, where, orderBy, limit, getDocs, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

class GameScoreManager {
  constructor(gameName, hasScore = true) {
    this.gameName = gameName;
    this.hasScore = hasScore;
    this.playerName = this.getPlayerName();
    this.sessionStartTime = null;
  }

  // Get player name from localStorage
  getPlayerName() {
    let name = localStorage.getItem('gunners-player-name');
    if (!name) {
      name = this.promptForName();
    }
    return name;
  }

  // Prompt for player name (first visit)
  promptForName() {
    let name = prompt('Welcome to Gunner\'s Games! Enter your player name:');
    if (!name || name.trim() === '') {
      name = 'Anonymous';
    }
    localStorage.setItem('gunners-player-name', name);
    return name;
  }

  // Start tracking session
  startSession() {
    this.sessionStartTime = Date.now();
    console.log('Game session started');
  }

  // Get elapsed time in seconds
  getElapsedTime() {
    if (!this.sessionStartTime) return 0;
    return Math.floor((Date.now() - this.sessionStartTime) / 1000);
  }

  // Get elapsed time formatted as MM:SS
  getElapsedTimeFormatted() {
    const seconds = this.getElapsedTime();
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Submit game result to Firebase
  async submitGameResult(score = 0) {
    try {
      const timePlayed = this.getElapsedTime();
      
      const gameData = {
        playerName: this.playerName,
        gameName: this.gameName,
        timestamp: new Date().toISOString(),
        date: serverTimestamp(),
        timePlayed: timePlayed
      };

      // Add score if game has scoring
      if (this.hasScore) {
        gameData.score = score;
      }

      await addDoc(collection(db, 'scores'), gameData);
      console.log('Game result submitted!', gameData);
      return true;
    } catch (error) {
      console.error('Error submitting game result:', error);
      return false;
    }
  }

  // Get top scores for this game
  async getTopScores(limitNum = 10) {
    try {
      const scoresRef = collection(db, 'scores');
      const orderField = this.hasScore ? 'score' : 'timePlayed';
      
      const q = query(
        scoresRef,
        where('gameName', '==', this.gameName),
        orderBy(orderField, 'desc'),
        limit(limitNum)
      );

      const querySnapshot = await getDocs(q);
      const results = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        results.push({
          playerName: data.playerName,
          score: data.score,
          timePlayed: data.timePlayed,
          timestamp: data.timestamp
        });
      });

      return results;
    } catch (error) {
      console.error('Error getting scores:', error);
      return [];
    }
  }

  // Format time in seconds to readable format
  static formatTime(seconds) {
    if (!seconds) return '0s';
    
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}m ${secs}s`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${mins}m`;
    }
  }
}

export default GameScoreManager;
