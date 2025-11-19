// Firebase Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// YOUR CONFIG HERE - Replace this entire object with your config from Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDjdo3U9qg_h4TKvplsFoZgxVNepAbCpFA",
  authDomain: "gunners-games.firebaseapp.com",
  projectId: "gunners-games",
  storageBucket: "gunners-games.firebasestorage.app",
  messagingSenderId: "644077315462",
  appId: "1:644077315462:web:431dd985426f3dbe02f807",
  measurementId: "G-RWNL900X43"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };