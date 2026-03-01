import { auth } from "./firebase.js";

import { signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.login = function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(email === "" || password === ""){
alert("Enter email and password");
return;
}

signInWithEmailAndPassword(auth,email,password)
.then(()=>{

// ✅ Redirect to dashboard
window.location.href = "dashboard.html";

})
.catch(error=>{
alert(error.message);
});

}
