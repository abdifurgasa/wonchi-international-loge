import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
query,
where,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ===============================
Send Approval Request
=============================== */

window.sendApproval = async function(){

const action=document.getElementById("actionType").value;

if(!auth.currentUser){
alert("User not logged in");
return;
}

await addDoc(collection(db,"approvals"),{

requesterId:auth.currentUser.uid,
requesterRole:"worker",
actionType:action,
status:"pending",
level:1,
createdAt:serverTimestamp()

});

alert("Approval Request Sent");

};

/* ===============================
Load Approval List
=============================== */

window.loadApprovals = async function(){

const list=document.getElementById("approvalList");

if(!list) return;

if(!auth.currentUser) return;

const q = query(
collection(db,"approvals"),
where("requesterId","==",auth.currentUser.uid)
);

const snap = await getDocs(q);

list.innerHTML="";

snap.forEach(docData=>{

let data=docData.data();

let div=document.createElement("div");

div.className="card";

div.innerHTML=`

<h3>Action: ${data.actionType}</h3>
<p>Status: ${data.status}</p>
<p>Level: ${data.level}</p>
`;

list.appendChild(div);

});

};

/* ===============================
Initialize Safe Load
=============================== */

window.addEventListener("load",()=>{
setTimeout(loadApprovals,500);
});
