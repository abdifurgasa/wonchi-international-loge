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
