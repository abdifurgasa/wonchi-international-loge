import { auth, db } from "./firebase.js";

import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { doc, getDoc }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* =========================
   AUTH CHECK
========================= */

onAuthStateChanged(auth, async user=>{

if(!user){
window.location.href="index.html";
return;
}

const snap = await getDoc(doc(db,"users",user.email));

if(!snap.exists()){
alert("Role not assigned");
return;
}

const data = snap.data();

document.getElementById("welcome").innerText =
"Welcome " + data.name + " (" + data.role + ")";

/* Load Menu */
loadMenu(data.role);

});

/* =========================
   MENU SYSTEM
========================= */

function loadMenu(role){

const menu = document.getElementById("menu");

const menus = {

admin: `
<li>Dashboard</li>
<li>Rooms</li>
<li>Bookings</li>
<li>Users</li>
<li>Reports</li>
`,

manager: `
<li>Dashboard</li>
<li>Reports</li>
<li>Revenue</li>
`,

reception: `
<li>Dashboard</li>
<li>New Booking</li>
`,

worker: `
<li>Dashboard</li>
<li>Cleaning Tasks</li>
`,

kitchen: `
<li>Dashboard</li>
<li>Food Orders</li>
`,

barman: `
<li>Dashboard</li>
<li>Drink Orders</li>
`

};

menu.innerHTML = menus[role] || "<li>No Access</li>";

}

/* =========================
   LOGOUT
========================= */

window.logout=function(){
signOut(auth).then(()=>{
window.location.href="index.html";
});
}
