import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function(){

let calendarEl = document.getElementById("calendar");

let bookings = [];

let snap = await getDocs(collection(db,"booking"));

snap.forEach(docData=>{
let b = docData.data();

let color="#28a745"; // default available

if(b.status==="reserved") color="#dc3545";
if(b.status==="checkedin") color="#ffc107";
if(b.status==="completed") color="#007bff";

bookings.push({
title: b.customerName,
start: b.checkIn,
end: b.checkOut,
color: color
});

});

/* FullCalendar Engine */
let calendar = new FullCalendar.Calendar(calendarEl,{
initialView:"dayGridMonth",
events:bookings
});

calendar.render();

});
