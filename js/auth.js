import { auth } from "./firebase.js";

import { signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.login = function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

signInWithEmailAndPassword(auth,email,password)
.then(()=>{

// ✅ Force dashboard open
window.location.href = "dashboard.html";

})
.catch(err=>{
alert(err.message);
});

}
