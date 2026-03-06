// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
apiKey: "AIzaSyDhwcN1ATAJmy4-zwps_n6nBhHdT-x_bOA",
authDomain: "wonchi-international-lodge.firebaseapp.com",
projectId: "wonchi-international-lodge",
storageBucket: "wonchi-international-lodge.firebasestorage.app",
messagingSenderId: "1094808203309",
appId: "1:1094808203309:web:2fbdf4a2b13e3d6c2588a4",
measurementId: "G-9WN54QG87G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Services
export { app, auth, db };
