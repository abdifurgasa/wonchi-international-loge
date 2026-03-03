import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* Sidebar Toggle */
window.toggleSidebar = function(){
document.getElementById("sidebar").classList.toggle("collapsed");
}

/* Logout */
window.logout = function(){
signOut(auth);
window.location.href="index.html";
}

/* Authentication + Role Menu Loader */
onAuthStateChanged(auth, async(user)=>{

if(!user){
window.location.href="index.html";
return;
}

const snap = await getDoc(doc(db,"users",user.uid));

if(snap.exists()){

const data = snap.data();

document.getElementById("userInfo").innerText =
data.name + " (" + data.role + ")";

/* Load Menu Based on Role */
loadMenu(data.role);

}
});

/* Enterprise Role Menu Engine */
function loadMenu(role){

let menu=document.getElementById("menuList");

let menus=[];

/* Admin Full Access */
if(role==="admin"){
menus=[
"📊 Dashboard",
"🏨 Rooms",
"🍔 Foods",
"🍹 Drinks",
"👥 Staff",
"💰 Finance"
];
}

/* Manager */
else if(role==="manager"){
menus=[
"📊 Dashboard",
"🏨 Rooms",
"🍔 Foods",
"🍹 Drinks",
"💰 Finance"
];
}

/* Receptionist */
else if(role==="receptionist"){
menus=[
"📊 Dashboard",
"🏨 Booking",
"💰 Finance"
];
}

/* Worker */
else if(role==="worker"){
menus=[
"📊 Dashboard",
"🍔 Order Food",
"🍹 Order Drink"
];
}

/* Barman */
else if(role==="barman"){
menus=["📊 Dashboard","🍹 Drink Queue"];
}

/* Kitchen */
else if(role==="kitchen"){
menus=["📊 Dashboard","🍔 Food Queue"];
}

menu.innerHTML="";

menus.forEach(m=>{
let a=document.createElement("a");
a.href="#";
a.innerText=m;
menu.appendChild(a);
});

}
