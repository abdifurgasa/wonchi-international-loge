import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
serverTimestamp,
deleteDoc,
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

/* Add Transaction */
window.addTransaction = async function(){

let type=document.getElementById("financeType").value;
let amount=document.getElementById("amount").value;
let description=document.getElementById("description").value;

if(!amount){
alert("Enter amount");
return;
}

await addDoc(collection(db,"finance"),{
type,
amount:Number(amount),
description,
createdAt:serverTimestamp(),
createdBy:auth.currentUser.uid
});

alert("Transaction Saved");

}

/* Real-time Finance List */
function loadFinance(){

let list=document.getElementById("financeList");

onSnapshot(collection(db,"finance"), snapshot=>{

list.innerHTML="";

snapshot.forEach(docData=>{

let data=docData.data();

let div=document.createElement("div");
div.className="card";

div.innerHTML=`
<h3>${data.type.toUpperCase()}</h3>
<p>Amount: ${data.amount}</p>
<p>${data.description}</p>
`;

list.appendChild(div);

});

});

}

/* Initialize */
loadFinance();
