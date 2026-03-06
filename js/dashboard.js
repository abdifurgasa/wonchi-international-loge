import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

const logoutBtn = document.getElementById("logoutBtn");
const sidebarMenu = document.getElementById("sidebarMenu");

/* ================= AUTH CHECK ================= */

onAuthStateChanged(auth, async (user) => {

if (!user) {
window.location.replace("index.html");
return;
}

try {

const snap = await getDoc(doc(db, "users", user.uid));

let role = "guest";

if (snap.exists()) {
role = snap.data().role || "guest";
}

console.log("Login Role:", role);

loadMenu(role);

} catch (err) {
console.error("Dashboard Load Error:", err);
loadMenu("guest");
}

});

/* ================= LOGOUT ================= */

if (logoutBtn) {

logoutBtn.addEventListener("click", async () => {

await signOut(auth);

window.location.replace("index.html");

});

}

/* ================= ROLE MENU ================= */

function loadMenu(role){

if(!sidebarMenu) return;

let menus = [];

if(role === "admin"){
menus = [
{name:"Dashboard", link:"dashboard.html"},
{name:"Rooms", link:"pages/rooms.html"},
{name:"Booking", link:"pages/booking.html"},
{name:"Food", link:"pages/restaurant.html"},
{name:"Drink", link:"pages/drinks.html"},
{name:"Finance", link:"pages/finance.html"}
];
}

else if(role === "manager"){
menus = [
{name:"Dashboard", link:"dashboard.html"},
{name:"Rooms", link:"pages/rooms.html"},
{name:"Booking", link:"pages/booking.html"},
{name:"Food", link:"pages/restaurant.html"}
];
}

else if(role === "receptionist"){
menus = [
{name:"Dashboard", link:"dashboard.html"},
{name:"Booking", link:"pages/booking.html"}
];
}

else{
menus = [{name:"Dashboard", link:"dashboard.html"}];
}

/* Render Menu */

sidebarMenu.innerHTML = "";

menus.forEach(menu=>{

const li = document.createElement("li");

li.innerHTML = `<a href="${menu.link}">${menu.name}</a>`;

sidebarMenu.appendChild(li);

});

}

});
    
