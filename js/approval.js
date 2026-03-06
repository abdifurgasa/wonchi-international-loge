import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
updateDoc,
doc,
query,
where,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ===============================
Workflow Levels
=============================== */

const ROLE_LEVEL = {
worker:1,
manager:2,
admin:3
};

/* ===============================
Send Approval Request
=============================== */

window.sendApproval = async function(){

const action=document.getElementById("actionType").value;

if(!auth.currentUser){
alert("Login required");
return;
}

await addDoc(collection(db,"approvals"),{

requesterId:auth.currentUser.uid,
actionType:action,
status:"pending",
currentLevel:1,
maxLevel:3,
createdAt:serverTimestamp()

});

alert("Approval Request Sent");

};

/* ===============================
Load Approvals (Secure Filtering)
=============================== */

window.loadApprovals = async function(){

const list=document.getElementById("approvalList");

if(!list) return;

if(!auth.currentUser) return;

/* Load user role */

const userRole = localStorage.getItem("userRole") || "worker";
const userLevel = ROLE_LEVEL[userRole];

/* Query approvals */

const q = query(
collection(db,"approvals"),
where("currentLevel","<=",userLevel),
where("status","==","pending")
);

const snap = await getDocs(q);

list.innerHTML="";

snap.forEach(docSnap=>{

const data = docSnap.data();

let div=document.createElement("div");
div.className="card";

div.innerHTML=`

<h3>Action: ${data.actionType}</h3>
<p>Level: ${data.currentLevel}</p>

<button onclick="approveWorkflow('${docSnap.id}',${data.currentLevel})"
style="background:green;color:white;padding:6px 10px;border:none;border-radius:5px">
Approve </button>
`;

list.appendChild(div);

});

};

/* ===============================
Workflow Approval Logic
=============================== */

window.approveWorkflow = async function(id,currentLevel){

const userRole = localStorage.getItem("userRole") || "worker";
const userLevel = ROLE_LEVEL[userRole];

if(userLevel < currentLevel){
alert("Permission denied");
return;
}

const nextLevel = currentLevel + 1;

if(nextLevel > 3){

await updateDoc(doc(db,"approvals",id),{
status:"approved",
currentLevel:nextLevel
});

alert("Workflow Fully Approved");

}else{

await updateDoc(doc(db,"approvals",id),{
currentLevel:nextLevel
});

alert("Moved to Next Level Approval");

}

loadApprovals();

};

/* ===============================
Initialize
=============================== */

window.addEventListener("load",()=>{
setTimeout(loadApprovals,800);
});
