import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* 🔥 YOUR REAL FIREBASE CONFIG */
const firebaseConfig = {
 apiKey: "AIzaSyDqB7Ig1rso8OEBIL6ad3OtciFqHIk9TdE",
 authDomain: "wanci-international-loge-43dd3.firebaseapp.com",
 projectId: "wanci-international-loge-43dd3",
 storageBucket: "wanci-international-loge-43dd3.appspot.com",
 messagingSenderId: "441258681939",
 appId: "1:441258681939:web:961697760d09b7234688a6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ===== AUTH CHECK ===== */

onAuthStateChanged(auth, async(user)=>{
if(!user){
window.location.href="index.html";
return;
}

const snap = await getDoc(doc(db,"users",user.email));

if(!snap.exists()){
alert("Role not assigned");
return;
}

const data = snap.data();

document.getElementById("welcomeText").innerText =
"Welcome " + data.name + " (" + data.role + ")";

loadDashboardData();
});

/* ===== LOAD DASHBOARD DATA ===== */

async function loadDashboardData(){
const roomsSnapshot = await getDocs(collection(db,"rooms"));
document.getElementById("totalRooms").innerText = roomsSnapshot.size;
}

/* ===== UI ANIMATION ===== */

window.toggleMenu = function(){
document.getElementById("sidebar").classList.toggle("collapsed");
document.querySelector(".main").classList.toggle("collapsed");
}

window.showPage = function(pageId){
document.querySelectorAll(".page").forEach(page=>{
page.classList.remove("active");
});
document.getElementById(pageId).classList.add("active");
}

/* ===== LOGOUT ===== */

window.logout = function(){
signOut(auth).then(()=>{
window.location.href="index.html";
});
}
