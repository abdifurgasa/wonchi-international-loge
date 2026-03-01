// ✅ Modern Firebase Modular SDK (Recommended)

// Import Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔥 Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqB7Ig1rso8OEBIL6ad3OtciFqHIk9TdE"
  authDomain: "wanci-international-loge-43dd3.firebaseapp.com",
  projectId: "wanci-international-loge-43dd3",
  storageBucket: "wanci-international-loge-43dd3.appspot.com",
  messagingSenderId: "441258681939",
  appId: "1:441258681939:web:961697760d09b7234688a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
