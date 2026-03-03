import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
updateDoc,
doc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* Load Available Rooms */
async function loadRooms(){

let select=document.getElementById("roomSelect");

let snap=await getDocs(collection(db,"rooms"));

snap.forEach(d=>{
let room=d.data();

if(room.availability){

let option=document.createElement("option");
option.value=d.id;
option.innerText=room.name+" - "+room.price;

select.appendChild(option);

}

});

}

/* Create Booking */
window.createBooking = async function(){

let customer=document.getElementById("customerName").value;
let phone=document.getElementById("phone").value;
let roomId=document.getElementById("roomSelect").value;
let checkIn=document.getElementById("checkIn").value;
let checkOut=document.getElementById("checkOut").value;

if(!customer || !roomId){
alert("Fill booking data");
return;
}

/* Reserve Booking */
await addDoc(collection(db,"booking"),{
customerName:customer,
phone,
roomId,
checkIn,
checkOut,
status:"reserved",
createdAt:serverTimestamp()
});

/* Update Room Availability */
await updateDoc(doc(db,"rooms",roomId),{
availability:false
});

alert("Room Reserved");

}

/* Booking List */
async function loadBookings(){

let list=document.getElementById("bookingList");

let snap=await getDocs(collection(db,"booking"));

list.innerHTML="";

snap.forEach(docData=>{

let booking=docData.data();

let div=document.createElement("div");
div.className="card";

div.innerHTML=`
<h3>${booking.customerName}</h3>
<p>Room: ${booking.roomId}</p>
<p>Status: ${booking.status}</p>
`;

list.appendChild(div);

});

}

/* Initialize */
loadRooms();
loadBookings();
