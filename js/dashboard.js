import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ===============================
Security Dashboard Guard
=============================== */

const sidebarMenu = document.getElementById("sidebarMenu");
const logoutBtn = document.getElementById("logoutBtn");

/* ===============================
Authentication Watcher
=============================== */

onAuthStateChanged(auth, async (user) => {

if(!user){
window.location.replace("index.html");
return;
}

try{

const snap = await getDoc(doc(db,"users",user.uid));

let role = "guest";

if(snap.exists()){
role = snap.data().role || "guest";
}

localStorage.setItem("userRole",role);

loadMenu(role);

}catch(error){

console.error("Dashboard Auth Error:",error);

loadMenu("guest");

}

});

/* ===============================
Menu Loader Engine
=============================== */

function loadMenu(role){

if(!sidebarMenu) return;

let menus=[];

if(role==="admin"){
menus=[
{name:"Dashboard",link:"dashboard.html"},
{name:"Rooms",link:"pages/rooms.html"},
{name:"Booking",link:"pages/booking.html"},
{name:"Food",link:"pages/restaurant.html"},
{name:"Drink",link:"pages/drinks.html"},
{name:"Finance",link:"pages/finance.html"}
];
}

else if(role==="manager"){
menus=[
{name:"Dashboard",link:"dashboard.html"},
{name:"Rooms",link:"pages/rooms.html"},
{name:"Booking",link:"pages/booking.html"},
{name:"Food",link:"pages/restaurant.html"}
];
}

else if(role==="receptionist"){
menus=[
{name:"Dashboard",link:"dashboard.html"},
{name:"Booking",link:"pages/booking.html"}
];
}

else{
menus=[{name:"Dashboard",link:"dashboard.html"}];
}

/* Render Sidebar */

sidebarMenu.innerHTML="";

menus.forEach(menu=>{
sidebarMenu.innerHTML+=`

<li><a href="${menu.link}">${menu.name}</a></li>
`;
});

}

/* ===============================
Logout System
=============================== */

if(logoutBtn){

logoutBtn.onclick = async ()=>{

try{

await signOut(auth);

localStorage.clear();

window.location.replace("index.html");

}catch(error){
console.error("Logout Error:",error);
}

};

}
