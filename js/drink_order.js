import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
updateDoc,
doc,
serverTimestamp,
query,
where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* Load Drink List */
async function loadDrinkOptions(){

let select=document.getElementById("drinkSelect");

let snap=await getDocs(collection(db,"drinks"));

snap.forEach(d=>{
let drink=d.data();

let option=document.createElement("option");
option.value=d.id;
option.innerText=drink.name+" - "+drink.price;

select.appendChild(option);
});

}

/* Order Drink Queue */
window.orderDrink = async function(){

let drinkId=document.getElementById("drinkSelect").value;
let quantity=document.getElementById("quantity").value;

let user=auth.currentUser;

if(!drinkId || !quantity){
alert("Fill order data");
return;
}

let drinkSnap=await getDocs(
query(collection(db,"drinks"), where("__name__","==",drinkId))
);

let drinkData;

drinkSnap.forEach(d=>{
drinkData=d.data();
});

await addDoc(collection(db,"orders_drink"),{
drinkId,
drinkName:drinkData.name,
quantity:Number(quantity),
userId:user.uid,
status:"pending",
createdAt:serverTimestamp()
});

alert("Drink Ordered");

}

/* Load Queue Orders */
async function loadOrders(){

let list=document.getElementById("orderList");

let snap=await getDocs(collection(db,"orders_drink"));

list.innerHTML="";

snap.forEach(docData=>{

let order=docData.data();

let div=document.createElement("div");
div.className="card";

div.innerHTML=`
<h3>${order.drinkName}</h3>
<p>Quantity: ${order.quantity}</p>
<p>Status: ${order.status}</p>
`;

list.appendChild(div);

});

}

/* Initialize */
loadDrinkOptions();
loadOrders();
