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
import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
serverTimestamp,
updateDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ===============================
Create Food Order
=============================== */

window.createFoodOrder = async function(){

const guestName=document.getElementById("guestName").value;
const foodItem=document.getElementById("foodItem").value;
const quantity=document.getElementById("quantity").value;
const price=document.getElementById("price").value;

if(!guestName || !foodItem){
alert("Fill all fields");
return;
}

await addDoc(collection(db,"food_orders"),{

guestName,
foodItem,
quantity:Number(quantity),
price:Number(price),
status:"pending",
createdAt:serverTimestamp()

});

alert("Food Order Sent");

loadFoodOrders();

};

/* ===============================
Load Food Orders
=============================== */

async function loadFoodOrders(){

const list=document.getElementById("foodOrderList");

if(!list) return;

const snap=await getDocs(collection(db,"food_orders"));

list.innerHTML="";

snap.forEach(docSnap=>{

const data=docSnap.data();

list.innerHTML+=`

<div class="card">

<h3>${data.foodItem}</h3>

<p>Guest: ${data.guestName}</p>
<p>Quantity: ${data.quantity}</p>
<p>Price: ${data.price}</p>
<p>Status: ${data.status}</p>

</div>
`;

});

}

/* Auto Load */

window.addEventListener("load",()=>{
setTimeout(loadFoodOrders,800);
});
import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ===============================
Create Drink Order
=============================== */

window.createDrinkOrder = async function(){

const guestName=document.getElementById("guestName").value;
const drinkItem=document.getElementById("drinkItem").value;
const quantity=document.getElementById("quantity").value;
const price=document.getElementById("price").value;

if(!guestName || !drinkItem){
alert("Fill all fields");
return;
}

await addDoc(collection(db,"drink_orders"),{

guestName,
drinkItem,
quantity:Number(quantity),
price:Number(price),
status:"pending",
createdAt:serverTimestamp()

});

alert("Drink Order Sent");

loadDrinkOrders();

};

/* ===============================
Load Drink Orders
=============================== */

async function loadDrinkOrders(){

const list=document.getElementById("drinkOrderList");

if(!list) return;

const snap=await getDocs(collection(db,"drink_orders"));

list.innerHTML="";

snap.forEach(docSnap=>{

const data=docSnap.data();

list.innerHTML+=`

<div class="card">

<h3>${data.drinkItem}</h3>

<p>Guest: ${data.guestName}</p>
<p>Quantity: ${data.quantity}</p>
<p>Price: ${data.price}</p>
<p>Status: ${data.status}</p>

</div>
`;

});

}

/* Auto Load */

window.addEventListener("load",()=>{
setTimeout(loadDrinkOrders,800);
});
  
