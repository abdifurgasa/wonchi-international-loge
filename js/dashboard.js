import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
doc,
getDoc,
collection,
getDocs,
addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getStorage,
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/* ================= CONFIG ================= */

const firebaseConfig = {
apiKey: "AIzaSyDqB7Ig1rso8OEBIL6ad3OtciFqHIk9TdE",
authDomain: "wanci-international-loge-43dd3.firebaseapp.com",
projectId: "wanci-international-loge-43dd3",
storageBucket: "wanci-international-loge-43dd3.appspot.com",
messagingSenderId: "441258681939",
appId: "1:441258681939:web:961697760d09b7234688a6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* ================= AUTH ================= */

onAuthStateChanged(auth, async user=>{

if(!user){
window.location.href="index.html";
return;
}

const snap =
await getDoc(doc(db,"users",user.email));

if(!snap.exists()){
alert("Role not assigned");
window.location.href="index.html";
return;
}

const data = snap.data();

document.getElementById("welcomeText").innerText =
"Welcome "+data.name+" ("+data.role+")";

loadDashboardData();
loadRooms();
loadBookingList();
loadRevenueChart();
loadRoomOptions();

});

/* ================= PAGE CONTROL ================= */

window.showPage = function(page){

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active");
});

document.getElementById(page).classList.add("active");

}

window.toggleMenu = function(){
document.getElementById("sidebar")
.classList.toggle("collapsed");
}

/* ================= DASHBOARD DATA ================= */

async function loadDashboardData(){

const snapshot =
await getDocs(collection(db,"rooms"));

document.getElementById("totalRooms").innerText =
snapshot.size;

}

/* ================= ROOM PRICE AUTO ================= */

const ROOM_PRICES = {
Single:800,
Double:1200,
Deluxe:2000,
Smart:2500,
VIP:5000
};

window.setAutoPrice = function(){

const type =
document.getElementById("roomType").value;

document.getElementById("roomPrice").value =
ROOM_PRICES[type] || "";

}

/* ================= ADD ROOM ================= */

window.addRoom = async function(){

const number =
document.getElementById("roomNumber").value;

const type =
document.getElementById("roomType").value;

const price =
document.getElementById("roomPrice").value;

const photoFile =
document.getElementById("roomPhoto").files[0];

if(!number || !type || !price){
alert("Fill all room fields");
return;
}

let photoURL="";

if(photoFile){

const storageRef =
ref(storage,"rooms/"+Date.now()+"_"+photoFile.name);

await uploadBytes(storageRef,photoFile);

photoURL =
await getDownloadURL(storageRef);
}

await addDoc(collection(db,"rooms"),{
number,
type,
price,
photo:photoURL
});

alert("Room Added");

loadRooms();
loadDashboardData();
loadRoomOptions();

}

/* ================= LOAD ROOMS ================= */

async function loadRooms(){

const snapshot =
await getDocs(collection(db,"rooms"));

const list =
document.getElementById("roomList");

if(!list) return;

list.innerHTML="";

snapshot.forEach(docSnap=>{

const data = docSnap.data();

list.innerHTML += `
<div class="card">
<img src="${data.photo || 'https://via.placeholder.com/200'}" width="100%">
<h3>Room ${data.number}</h3>
<p>Type: ${data.type}</p>
<p>Price: $${data.price}</p>
</div>
`;

});

}

/* ================= LOAD ROOM OPTIONS ================= */

async function loadRoomOptions(){

const snapshot =
await getDocs(collection(db,"rooms"));

const select =
document.getElementById("bookingRoom");

if(!select) return;

select.innerHTML="<option value=''>Select Room</option>";

snapshot.forEach(docSnap=>{

const data = docSnap.data();

select.innerHTML += `
<option value="${docSnap.id}">
Room ${data.number} - $${data.price}
</option>
`;

});

}

/* ================= CREATE BOOKING ================= */

window.createBooking = async function(){

const guest =
document.getElementById("guestName").value;

const roomId =
document.getElementById("bookingRoom").value;

const checkIn =
document.getElementById("checkIn").value;

const checkOut =
document.getElementById("checkOut").value;

if(!guest || !roomId || !checkIn || !checkOut){
alert("Fill booking data");
return;
}

/* CHECK DATE CONFLICT */

const snapshot =
await getDocs(collection(db,"bookings"));

let conflict = false;

snapshot.forEach(docSnap=>{

const data = docSnap.data();

if(data.roomId === roomId){

if(
(new Date(checkIn) < new Date(data.checkOut)) &&
(new Date(checkOut) > new Date(data.checkIn))
){
conflict = true;
}

}

});

if(conflict){
alert("Room already booked for selected dates");
return;
}

/* CALCULATE BILL */

const roomSnap =
await getDoc(doc(db,"rooms",roomId));

const price =
parseFloat(roomSnap.data().price);

const days =
Math.max(
1,
Math.ceil(
(new Date(checkOut)-new Date(checkIn))
/(1000*60*60*24)
)
);

const totalBill = days * price;

await addDoc(collection(db,"bookings"),{
guest,
roomId,
checkIn,
checkOut,
days,
totalBill,
status:"Booked"
});

alert("Booking Created\nTotal Bill: $"+totalBill);

loadBookingList();
loadRevenueChart();

}

/* ================= BOOKING LIST ================= */

async function loadBookingList(){

const snapshot =
await getDocs(collection(db,"bookings"));

const list =
document.getElementById("bookingList");

if(!list) return;

list.innerHTML="";

snapshot.forEach(docSnap=>{

const data = docSnap.data();

list.innerHTML += `
<div class="card">
<h3>${data.guest}</h3>
<p>Bill: $${data.totalBill}</p>
<button onclick="generateInvoice('${docSnap.id}')">
Download Invoice
</button>
</div>
`;

});

}

/* ================= REVENUE CHART ================= */

async function loadRevenueChart(){

const snapshot =
await getDocs(collection(db,"bookings"));

let totalRevenue=0;

snapshot.forEach(docSnap=>{
totalRevenue += docSnap.data().totalBill || 0;
});

const ctx =
document.getElementById("revenueChart");

if(!ctx) return;

new Chart(ctx,{
type:"bar",
data:{
labels:["Revenue"],
datasets:[{
label:"Total Revenue",
data:[totalRevenue]
}]
}
});

}

/* ================= INVOICE ================= */

window.generateInvoice = async function(bookingId){

const snap =
await getDoc(doc(db,"bookings",bookingId));

if(!snap.exists()){
alert("Booking not found");
return;
}

const data = snap.data();

const { jsPDF } = window.jspdf;

const pdf = new jsPDF();

pdf.text("Hotel Invoice",20,20);
pdf.text("Guest: "+data.guest,20,40);
pdf.text("CheckIn: "+data.checkIn,20,50);
pdf.text("CheckOut: "+data.checkOut,20,60);
pdf.text("Total Bill: $"+data.totalBill,20,70);

pdf.save("invoice.pdf");

}

/* ================= LOGOUT ================= */

window.logout = function(){
signOut(auth).then(()=>{
window.location.href="index.html";
});
  }
