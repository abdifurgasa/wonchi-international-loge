import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

    const logoutBtn = document.getElementById("logoutBtn");
    const sidebarMenu = document.querySelector(".sidebar ul");

    /* ================= AUTH CHECK ================= */

    onAuthStateChanged(auth, async (user) => {

        if (!user) {
            window.location.href = "index.html";
            return;
        }

        try {
            const snap = await getDoc(doc(db, "users", user.uid));

            if (snap.exists()) {
                const data = snap.data();
                console.log("Logged in as:", data.role);
                loadMenu(data.role);
            }

        } catch (err) {
            console.error("User load error:", err);
        }
    });

    /* ================= LOGOUT ================= */

    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            await signOut(auth);
            window.location.href = "index.html";
        });
    }

    /* ================= ROLE MENU ================= */

    function loadMenu(role) {

        if (!sidebarMenu) return;

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
        else {
            menus = ["🏠 Dashboard"];
        }

        sidebarMenu.innerHTML = "";

        menus.forEach(text => {
            const li = document.createElement("li");
            li.innerText = text;
            sidebarMenu.appendChild(li);
        });
    }

});
