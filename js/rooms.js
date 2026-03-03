import { db, auth } from "./firebase.js";
import {
collection,
addDoc,
deleteDoc,
doc,
getDocs,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* Permission Check */
onAuthStateChanged(auth, async(user)=>{

if(!user){
window.location.href="../index.html";
return;
}

});

/* Add Room */
window.addRoom = async function(){

let name=document.getElementById("roomName").value;
let price=document.getElementById("roomPrice").value;
let availability=document.getElementById("roomAvailability").value;

let photoFile=document.getElementById("roomPhoto").files[0];

if(!name || !price){
alert("Fill room data");
return;
}

/* Photo Upload Simulation (Future Storage Integration) */
let photoURL="";

if(photoFile){
photoURL = URL.createObjectURL(photoFile);
}

await addDoc(collection(db,"rooms"),{
name,
price:Number(price),
availability:availability==="true",
photoURL,
createdAt:serverTimestamp()
});

alert("Room Added");

loadRooms();
}

/* Load Rooms */
async function loadRooms(){

let list=document.getElementById("roomList");

let snap=await getDocs(collection(db,"rooms"));

list.innerHTML="";

snap.forEach(docData=>{

let room=docData.data();

let div=document.createElement("div");
div.className="card";

div.innerHTML=`
<h3>${room.name}</h3>
<p>Price: ${room.price}</p>
<p>Available: ${room.availability}</p>
<button onclick="deleteRoom('${docData.id}')">Delete</button>
`;

list.appendChild(div);

});

}

/* Delete Room */
window.deleteRoom = async function(id){
await deleteDoc(doc(db,"rooms",id));
loadRooms();
}

/* Initial Load */
loadRooms();
