import { db } from "./firebase.js";

import {
collection,
addDoc,
doc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.createBooking = async function(){

const guest = document.getElementById("guestName").value;
const roomNumber = document.getElementById("roomNumber").value;
const roomType = document.getElementById("roomType").value;
const checkIn = document.getElementById("checkIn").value;
const checkOut = document.getElementById("checkOut").value;

if(!guest || !roomNumber){
alert("Fill booking data");
return;
}

/* Save Booking */

await addDoc(collection(db,"bookings"),{
guestName:guest,
roomNumber:roomNumber,
roomType:roomType,
checkIn:checkIn,
checkOut:checkOut,
status:"Occupied"
});

/* Update Room Status Automatically */

const roomRef = doc(db,"rooms",roomNumber);

await updateDoc(roomRef,{
status:"Occupied"
});

alert("Booking Successful");

}
