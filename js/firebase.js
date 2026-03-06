// Firebase Core
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Firebase Services
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBqy09XKcUvin-qZ4cCruS0sYOvlx9a09U",
  authDomain: "wancii-international-loge.firebaseapp.com",
  projectId: "wancii-international-loge",
  storageBucket: "wancii-international-loge.firebasestorage.app",
  messagingSenderId: "846003193691",
  appId: "1:846003193691:web:46d8a0138d3c41f4d33c7e",
  measurementId: "G-GK0SCZMESL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);

// Export services
export { auth, db };
