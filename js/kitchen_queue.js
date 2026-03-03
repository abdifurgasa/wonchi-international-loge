import { db, auth } from "./firebase.js";

import {
collection,
getDocs,
updateDoc,
doc,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* Permission Check */
onAuthStateChanged(auth, user=>{
if(!user){
window.location.href="../index.html";
}
});

/* Real-time Queue Listener */
function loadKitchenQueue(){

let queue=document.getElementById("kitchenQueue");

onSnapshot(collection(db,"orders_food"), snapshot=>{

queue.innerHTML="";

snapshot.forEach(docData=>{

let order=docData.data();

let div=document.createElement("div");
div.className="card";

div.innerHTML=`
<h3>🍔 ${order.foodName}</h3>
<p>Quantity: ${order.quantity}</p>
<p>Status: ${order.status}</p>

<button onclick="serveFood('${docData.id}')">
✅ Mark Served
</button>
`;

queue.appendChild(div);

});

});

}

/* Mark Food Served */
window.serveFood = async function(orderId){

await updateDoc(doc(db,"orders_food",orderId),{
status:"served"
});

alert("Food Served");

}

/* Initialize */
loadKitchenQueue();
