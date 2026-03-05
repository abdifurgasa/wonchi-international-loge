import { auth, db } from "./firebase.js";

import {
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ===============================
Auto Login Redirect
================================ */

onAuthStateChanged(auth, async (user) => {

if(user){

try{

const snap = await getDoc(doc(db,"users",user.uid));

if(snap.exists()){
window.location.href="dashboard.html";
}

}catch(error){
console.error(error);
}

}

});

/* ===============================
LOGIN FUNCTION
================================ */

window.login = async function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const errorBox = document.getElementById("error");

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

/* Check Firestore user */

const snap = await getDoc(doc(db,"users",user.uid));

if(snap.exists()){

window.location.href="dashboard.html";

}else{

errorBox.innerText="User profile not found";
signOut(auth);

}

}catch(error){

errorBox.innerText="Login failed";
console.error(error);

}

};
