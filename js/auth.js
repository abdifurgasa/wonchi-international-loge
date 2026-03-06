import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* =============================
Login Function
============================= */

window.loginUser = async function(){

const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();

/* Validation */

if(!email || !password){
alert("Please enter email and password");
return;
}

try{

const userCredential = await signInWithEmailAndPassword(auth, email, password);

// Save session
localStorage.setItem("leloUser", JSON.stringify(userCredential.user));

// Redirect dashboard
window.location.replace("dashboard.html");

}

catch(error){

console.error("Login Error:", error.message);

if(error.code === "auth/user-not-found"){
alert("User not found");
}
else if(error.code === "auth/wrong-password"){
alert("Wrong password");
}
else{
alert("Login failed: " + error.message);
}

}

};
