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
Auto Login Redirect Check
============================= */
onAuthStateChanged(auth, async (user)=>{

```
if(user){

    const snap = await getDoc(doc(db,"users",user.uid));

    if(snap.exists()){
        window.location.href="dashboard.html";
    }
}
```

});

/* =============================
Login Function
============================= */
window.login = async function(){

```
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

try{

    const userCredential = await signInWithEmailAndPassword(
        auth,email,password
    );

    const user = userCredential.user;

    const snap = await getDoc(doc(db,"users",user.uid));

    if(snap.exists()){

        let role=snap.data().role;

        if(role==="admin"){
            window.location.href="dashboard.html";
        }
        else{
            document.getElementById("error").innerText="Access denied!";
            signOut(auth);
        }
    }

}catch(error){
    document.getElementById("error").innerText="Login failed!";
}
```

}
