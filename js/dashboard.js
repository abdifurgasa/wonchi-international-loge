import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
doc,
getDoc,
collection,
getDocs,
addDoc,
deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getStorage,
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/* =============================
FIREBASE CONFIG
============================= */

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
const storage = getStorage(app);

/* =============================
AUTH CHECK
============================= */

onAuthStateChanged(auth, async (user)=>{

if(!user){
window.location.href="index.html";
return;
}

const snap = await getDoc(doc(db,"users",user.email));

if(!snap.exists()){
alert("Role is not assigned");
return;
}

const data = snap.data();

document.getElementById("welcomeText").innerText =
"Welcome " + data.name + " (" + data.role + ")";

loadDashboardData();
loadRooms();

});

/* =============================
DASHBOARD COUNTER
============================= */

async function loadDashboardData(){

const snapshot = await getDocs(collection(db,"rooms"));

document.getElementById("totalRooms").innerText =
snapshot.size;

}

/* =============================
AUTO PRICE SYSTEM
============================= */

window.setAutoPrice = function(){

const type = document.getElementById("roomType").value;
const priceInput = document.getElementById("roomPrice");

const prices = {
Single:800,
Double:1200,
Deluxe:2000,
Smart:2500,
VIP:5000
};

priceInput.value = prices[type] || "";

}

/* =============================
ADD ROOM
============================= */

window.addRoom = async function(){

const number = document.getElementById("roomNumber").value;
const type = document.getElementById("roomType").value;
const price = document.getElementById("roomPrice").value;
const photoFile = document.getElementById("roomPhoto").files[0];

if(!number || !type || !price){
alert("Fill all fields");
return;
}

let photoURL = "";

if(photoFile){
const storageRef = ref(storage,"rooms/"+Date.now()+"_"+photoFile.name);
await uploadBytes(storageRef,photoFile);
photoURL = await getDownloadURL(storageRef);
}

await addDoc(collection(db,"rooms"),{
number,
type,
price,
status:"Available",
photo:photoURL
});

alert("Room Added Successfully");

document.getElementById("roomNumber").value="";
document.getElementById("roomType").value="";
document.getElementById("roomPrice").value="";
document.getElementById("roomPhoto").value="";

loadRooms();
loadDashboardData();

}

/* =============================
LOAD ROOMS
============================= */

async function loadRooms(){

const snapshot = await getDocs(collection(db,"rooms"));
const roomList = document.getElementById("roomList");

if(!roomList) return;

roomList.innerHTML="";

snapshot.forEach(docSnap=>{

const data = docSnap.data();

roomList.innerHTML += `
<div class="room-card">
<img src="${data.photo || 'https://via.placeholder.com/250x150'}">
<h3>Room ${data.number}</h3>
<p>Type: ${data.type}</p>
<p>Price: $${data.price}</p>
<p class="room-status">${data.status}</p>
<button onclick="deleteRoom('${docSnap.id}')">Delete</button>
</div>
`;

});

}

/* =============================
DELETE ROOM
============================= */

window.deleteRoom = async function(id){

if(confirm("Delete this room?")){
await deleteDoc(doc(db,"rooms",id));
loadRooms();
loadDashboardData();
}

}

/* =============================
UI CONTROL
============================= */

window.toggleMenu = function(){

document.getElementById("sidebar")
.classList.toggle("collapsed");

document.querySelector(".main")
.classList.toggle("collapsed");

}

window.showPage = function(pageId){

document.querySelectorAll(".page")
.forEach(page=>{
page.classList.remove("active");
});

document.getElementById(pageId)
.classList.add("active");

}

/* =============================
LOGOUT
============================= */

window.logout = function(){
signOut(auth).then(()=>{
window.location.href="index.html";
});
}
