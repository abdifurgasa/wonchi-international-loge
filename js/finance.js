import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getAuth 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { 
getFirestore 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { 
getStorage 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/* 🔥 Firebase Config */

const firebaseConfig = {
apiKey:"AlzaSyDqB7Igrso8OEBIL6ad3OtciFqHIk9TdE",
authDomain:"wanci-international-loge.firebaseapp.com",
projectId:"wanci-international-loge",
storageBucket:"wanci-international-loge.appspot.com",
messagingSenderId:"441258681939",
appId:"1:441258681939:web:961697760d09b7234688a6"
};

/* Initialize */

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
