/* =====================================================
Wanci International Lodge
Professional Dashboard Engine
===================================================== */

import { protectDashboard, logoutSystem } from "./auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
doc,
updateDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ================= FIREBASE CONFIG ================= */

const firebaseConfig = {
apiKey:"AlzaSyDqB7Igrso8OEBIL6ad3OtciFhIk9TdE",
authDomain:"wanci-international-loge.firebaseapp.com",
projectId:"wanci-international-loge",
storageBucket:"wanci-international-loge.appspot.com",
messagingSenderId:"346207231234",
appId:"1:346207231234:web:4688a6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ================= SECURITY ================= */

protectDashboard();

/* ================= PAGE CONTROL ================= */

window.showPage=function(page){

document.querySelectorAll(".page")
.forEach(p=>p.classList.remove("active"));

document.getElementById(page).classList.add("active");

if(page==="rooms") loadRooms();
if(page==="booking"){
loadRoomsToBooking();
loadBookingList();
}
if(page==="restaurant") loadFoods();

}

/* ================= ROOM SYSTEM ================= */

window.addRoom = async function(){

const number = roomNumber.value;
const type = roomType.value;
const price = Number(roomPrice.value);

if(!number || !type || !price){
alert("Fill all fields");
return;
}

await addDoc(collection(db,"rooms"),{
number,
type,
price,
status:"Available"
});

alert("Room Added");

roomNumber.value="";
roomType.value="";
roomPrice.value="";

loadRooms();
}

/* Load Rooms */

async function loadRooms(){

const snapshot =
await getDocs(collection(db,"rooms"));

roomList.innerHTML="";

snapshot.forEach(docSnap=>{
const data = docSnap.data();

roomList.innerHTML+=`
<div class="card">

<h3>Room ${data.number}</h3>
<p>Type: ${data.type}</p>
<p>Price: $${data.price}</p>
<p>Status: ${data.status}</p>

</div>
`;
});

}

/* ================= BOOKING ENGINE ================= */

window.createBooking = async function(){

const guest = guestName.value;
const roomId = bookingRoom.value;

if(!guest || !roomId || !checkIn.value || !checkOut.value){
alert("Fill booking fields");
return;
}

/* Fetch Room */

const roomRef = await getDoc(doc(db,"rooms",roomId));

const roomData = roomRef.data();

if(roomData.status==="Booked"){
alert("Room already booked");
return;
}

const checkInDate = new Date(checkIn.value);
const checkOutDate = new Date(checkOut.value);

const days = Math.max(
1,
Math.ceil((checkOutDate-checkInDate)/(1000*60*60*24))
);

const totalBill = days * roomData.price;

/* Save Booking */

await addDoc(collection(db,"bookings"),{
guest,
roomId,
roomNumber:roomData.number,
totalBill,
status:"Booked"
});

/* Update Room Status */

await updateDoc(doc(db,"rooms",roomId),{
status:"Booked"
});

alert("Booking Created");

guestName.value="";
checkIn.value="";
checkOut.value="";

}

/* Load Rooms For Booking */

async function loadRoomsToBooking(){

const snapshot =
await getDocs(collection(db,"rooms"));

bookingRoom.innerHTML="";

snapshot.forEach(docSnap=>{
const data = docSnap.data();

if(data.status==="Available"){
bookingRoom.innerHTML+=`
<option value="${docSnap.id}">
Room ${data.number} - $${data.price}
</option>
`;
}

});

}

/* ================= RESTAURANT ================= */

window.addFood = async function(){

const name = foodName.value;
const price = Number(foodPrice.value);

if(!name || !price){
alert("Fill food fields");
return;
}

await addDoc(collection(db,"foods"),{
name,
price
});

alert("Food Added");

foodName.value="";
foodPrice.value="";

loadFoods();

}

/* Load Foods */

async function loadFoods(){

const snapshot =
await getDocs(collection(db,"foods"));

foodList.innerHTML="";

snapshot.forEach(docSnap=>{
const data = docSnap.data();

foodList.innerHTML+=`
<div class="card">

<h3>${data.name}</h3>
<p>Price: $${data.price}</p>

</div>
`;
});

}

/* ================= BOOKING LIST ================= */

async function loadBookingList(){

const snapshot =
await getDocs(collection(db,"bookings"));

bookingList.innerHTML="";

snapshot.forEach(docSnap=>{
const data = docSnap.data();

bookingList.innerHTML+=`
<div class="card">

<h3>${data.guest}</h3>
<p>Room: ${data.roomNumber}</p>
<p>Total Bill: $${data.totalBill}</p>
<p>Status: ${data.status}</p>

</div>
`;
});

}

/* ================= LOGOUT ================= */

window.logout=function(){
logoutSystem();
}

/* ================= SYSTEM INIT ================= */

window.onload=function(){

loadRooms();
loadBookingList();
loadFoods();

}
