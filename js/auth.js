import { getAuth, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore, doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export function ultraAuth(app){

const auth=getAuth(app);
const db=getFirestore(app);

onAuthStateChanged(auth,async user=>{

if(!user){
window.location.href="index.html";
return;
}

const snap=
await getDoc(doc(db,"users",user.email));

if(!snap.exists()){
alert("Role not assigned");
window.location.href="index.html";
return;
}

const data=snap.data();

document.getElementById("welcomeText").innerText=
"Welcome "+data.name+" ("+data.role+")";

});

}
