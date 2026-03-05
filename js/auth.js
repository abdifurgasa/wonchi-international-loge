import { auth, db } from "./firebase.js";

import {
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =============================
Auto Redirect If Logged In
============================= */

onAuthStateChanged(auth, async (user) => {

    if (user) {

        try {

            const snap = await getDoc(doc(db, "users", user.uid));

            if (snap.exists()) {
                window.location.href = "dashboard.html";
            }

        } catch (e) {
            console.error(e);
        }

    }

});

/* =============================
Login Function ⭐
============================= */

window.login = async function(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let errorBox = document.getElementById("error");

    if(!email || !password){
        errorBox.innerText="Enter email and password";
        return;
    }

    try{

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        const snap = await getDoc(doc(db,"users",user.uid));

        if(snap.exists()){
            window.location.href="dashboard.html";
        }
        else{
            errorBox.innerText="User profile not found";
            signOut(auth);
        }

    }catch(err){
        errorBox.innerText="Login failed";
        console.error(err);
    }

};
