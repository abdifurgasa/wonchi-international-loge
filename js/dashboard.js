import { auth, db } from "./firebase.js";

import { onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

onAuthStateChanged(auth, async user => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    const snap = await getDoc(doc(db, "users", user.email));

    if (!snap.exists()) {
        alert("Role not assigned");
        return;
    }

    const data = snap.data();

    document.getElementById("welcome").innerText =
        "Welcome " + data.name + " (" + data.role + ")";

    const role = data.role;

    document.querySelectorAll(".menu-item").forEach(item=>{
        item.style.display="none";
    });

    if(role==="admin"){
        document.querySelectorAll(".menu-item").forEach(item=>{
            item.style.display="block";
        });
    }
    else if(role==="receptionist"){
        document.getElementById("dashboardMenu").style.display="block";
        document.getElementById("roomsMenu").style.display="block";
        document.getElementById("bookingsMenu").style.display="block";
    }
    else{
        document.getElementById("noAccess").style.display="block";
    }

});

window.logout=function(){
signOut(auth).then(()=>{
window.location.href="index.html";
});
};
