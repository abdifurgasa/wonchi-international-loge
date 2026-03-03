// ================= FIREBASE IMPORT =================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
doc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ================= FIREBASE CONFIG =================

const firebaseConfig = {
apiKey: "PASTE_YOUR_API_KEY",
authDomain: "wanci-international-loge.firebaseapp.com",
projectId: "wanci-international-loge",
storageBucket: "wanci-international-loge.appspot.com",
messagingSenderId: "346207231234",
appId: "1:346207231234:web:xxxx"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= PAGE CONTROL =================

window.showPage = function(page){

document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(page).classList.add("active");

if(page==="rooms") loadRooms();
if(page==="booking") loadRoomsToBooking();
if(page==="restaurant") loadFoods();

}

// ================= ROOMS =================

window.addRoom = async function(){

const number = roomNumber.value;
const type = roomType.value;
const price = roomPrice.value;

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

async function loadRooms(){

const snapshot = await getDocs(collection(db,"rooms"));
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

// ================= BOOKING =================

window.createBooking = async function(){

const guest = guestName.value;
const roomId = bookingRoom.value;
const checkInDate = new Date(checkIn.value);
const checkOutDate = new Date(checkOut.value);

if(!guest || !roomId || !checkIn.value || !checkOut.value){
alert("Fill all fields");
return;
}

const roomsSnapshot = await getDocs(collection(db,"rooms"));
let selectedRoom;

roomsSnapshot.forEach(r=>{
if(r.id===roomId) selectedRoom=r;
});

const roomData = selectedRoom.data();

if(roomData.status==="Booked"){
alert("Room already booked!");
return;
}

const days = Math.ceil((checkOutDate-checkInDate)/(1000*60*60*24));
const totalBill = days * roomData.price;

await addDoc(collection(db,"bookings"),{
guest,
roomId,
roomNumber:roomData.number,
totalBill,
status:"Booked"
});

await updateDoc(doc(db,"rooms",roomId),{
status:"Booked"
});

alert("Booking Created");

guestName.value="";
checkIn.value="";
checkOut.value="";

}

async function loadRoomsToBooking(){

const snapshot = await getDocs(collection(db,"rooms"));
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

// ================= RESTAURANT =================

window.addFood = async function(){

const name = foodName.value;
const price = foodPrice.value;

if(!name || !price){
alert("Fill fields");
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

async function loadFoods(){

const snapshot = await getDocs(collection(db,"foods"));
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
