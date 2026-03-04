import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ===============================
   AUTH CHECK + ROLE LOAD
================================ */

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    try {

        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists()) {

            const data = snap.data();
            console.log("Logged in as:", data.name, data.role);

            loadMenu(data.role);
        }

    } catch (error) {
        console.error("Error loading user:", error);
    }
});

/* ===============================
   LOGOUT
================================ */

document.getElementById("logoutBtn")
.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
});

/* ===============================
   ROLE BASED MENU SYSTEM
================================ */

function loadMenu(role) {

    const menu = document.querySelector(".sidebar ul");

    let menus = [];

    if (role === "admin") {
        menus = ["🏠 Dashboard", "🛏 Rooms", "📅 Booking", "🍽 Food", "🍹 Drink", "💰 Finance"];
    }
    else if (role === "manager") {
        menus = ["🏠 Dashboard", "🛏 Rooms", "📅 Booking", "🍽 Food", "🍹 Drink"];
    }
    else if (role === "receptionist") {
        menus = ["🏠 Dashboard", "📅 Booking"];
    }
    else if (role === "worker") {
        menus = ["🏠 Dashboard", "🍽 Food"];
    }
    else if (role === "barman") {
        menus = ["🏠 Dashboard", "🍹 Drink"];
    }
    else if (role === "kitchen") {
        menus = ["🏠 Dashboard", "🍽 Food"];
    }

    menu.innerHTML = "";

    menus.forEach(text => {

        const li = document.createElement("li");
        li.innerText = text;

        menu.appendChild(li);
    });
}
