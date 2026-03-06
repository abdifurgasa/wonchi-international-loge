import { auth, db } from "./firebase.js";

import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const errorBox = document.getElementById("error");

if(!email || !password){
errorBox.innerText="Enter email and password";
return;
}

try{

const userCredential = await signInWithEmailAndPassword(auth,email,password);

const user = userCredential.user;

const snap = await getDoc(doc(db,"users",user.uid));

if(snap.exists()){
window.location.href="dashboard.html";
}else{
errorBox.innerText="User profile not found";
}

}catch(error){

errorBox.innerText="Login failed";
console.error(error);

}

});
