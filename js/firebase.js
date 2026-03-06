// ================================
// Wonchi International Lodge
// Firebase Initialization
// ================================

// Firebase Core
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Firebase Services
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ================================
// Firebase Config
// ================================
const firebaseConfig = {
  apiKey: "AIzaSyDhwcN1ATAJmy4-zwps_n6nBhHdT-x_bOA",
  authDomain: "wonchi-international-lodge.firebaseapp.com",
  projectId: "wonchi-international-lodge",
  storageBucket: "wonchi-international-lodge.firebasestorage.app",
  messagingSenderId: "1094808203309",
  appId: "1:1094808203309:web:2fbdf4a2b13e3d6c2588a4",
  measurementId: "G-9WN54QG87G"
};

// ================================
// Initialize Firebase App
// ================================
const app = initializeApp(firebaseConfig);

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);

// ================================
// Export Auth and Firestore
// ================================
export { auth, db };
