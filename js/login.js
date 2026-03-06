import { auth } from "./firebase.js";

import { 
signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try {

await signInWithEmailAndPassword(auth, email, password);

localStorage.setItem("leloUser", email);

window.location.href = "index.html";

} catch (error) {

alert("Login Failed: " + error.message);

}

});
