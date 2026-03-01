import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
getStorage,
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { firebaseConfig } from "./firebase.js";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/* Add Room */

window.addRoom = async function(){

const number = document.getElementById("roomNumber").value;
const type = document.getElementById("roomType").value;
const price = document.getElementById("roomPrice").value;
const photo = document.getElementById("roomPhoto").files[0];

if(!number || !price || !photo){
alert("Fill all fields");
return;
}

/* Upload Photo */

const storageRef = ref(storage,"rooms/"+photo.name);

await uploadBytes(storageRef,photo);

const photoURL = await getDownloadURL(storageRef);

/* Save Room Data */

await addDoc(collection(db,"rooms"),{
roomNumber:number,
type:type,
price:Number(price),
photo:photoURL,
status:"Available"
});

alert("Room Added");

loadRooms();

}

/* Load Rooms */

async function loadRooms(){

const table = document.getElementById("roomTable");

const querySnapshot = await getDocs(collection(db,"rooms"));

table.innerHTML="";

querySnapshot.forEach(docSnap=>{

const data = docSnap.data();

table.innerHTML += `
<tr>
<td><img src="${data.photo}" width="80"></td>
<td>${data.roomNumber}</td>
<td>${data.type}</td>
<td>${data.price}</td>
<td>
<button onclick="deleteRoom('${docSnap.id}')">Delete</button>
</td>
</tr>
`;

});

}

/* Delete Room */

window.deleteRoom = async function(id){

await deleteDoc(doc(db,"rooms",id));

alert("Room deleted");

loadRooms();

}

/* Auto Load */

window.addEventListener("load",loadRooms);
