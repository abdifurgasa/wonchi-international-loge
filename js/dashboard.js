import { auth, db } from "./firebase.js";

import { onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
"Welcome "+data.name+" ("+data.role+")";

});

window.logout=function(){
signOut(auth).then(()=>{
window.location.href="index.html";
});
}
