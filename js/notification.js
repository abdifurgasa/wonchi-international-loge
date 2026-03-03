import { db, auth } from "./firebase.js";
import {
collection,
onSnapshot,
query,
where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* Real-time Notification Listener */
function loadNotifications(){

let user=auth.currentUser;

if(!user) return;

/* Listen notifications for user role or global */
onSnapshot(collection(db,"notifications"), snapshot=>{

let badge=document.getElementById("notifyBadge");
let list=document.getElementById("notificationList");

let count=0;

list.innerHTML="";

snapshot.forEach(docData=>{

let n=docData.data();

/* Role Filtering */
if(n.roleTarget==="all" || n.roleTarget==="admin"){

count++;

let div=document.createElement("div");
div.className="card";

div.innerHTML=`
<h4>${n.title}</h4>
<p>${n.message}</p>
`;

list.appendChild(div);

}

});

badge.innerText=count;

});

}

/* Initialize Notification System */
loadNotifications();
