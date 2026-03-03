import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
updateDoc,
doc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* Send Approval Request */
window.sendApproval = async function(){

let action=document.getElementById("actionType").value;

await addDoc(collection(db,"approvals"),{
requesterId:auth.currentUser.uid,
requesterRole:"worker",
actionType:action,
status:"pending",
level:1,
createdAt:serverTimestamp()
});

alert("Approval Request Sent");

}

/* Load Approval List */
async function loadApprovals(){

let list=document.getElementById("approvalList");

let snap=await getDocs(collection(db,"approvals"));

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

}

/* Initialize */
loadApprovals();
