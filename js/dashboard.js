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
addDoc,
deleteDoc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getStorage,
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/* =============================
CONFIG
============================= */

const firebaseConfig = {
apiKey: "AIzaSyDqD...",
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

/* =============================
AUTH CHECK
============================= */

onAuthStateChanged(auth, async user=>{

if(!user){
window.location.href="index.html";
return;
}

const snap =
await getDoc(doc(db,"users",user.email));

if(!snap.exists()){
alert("Role not assigned");
return;
}

const data = snap.data();

const welcome =
document.getElementById("welcomeText");

if(welcome){
welcome.innerText =
"Welcome "+data.name+" ("+data.role+")";
}

/* Worker Security */

if(data.role === "worker"){

const adminMenu =
document.getElementById("adminPanelMenu");

if(adminMenu){
adminMenu.remove();
}

}

loadDashboardData();
loadRooms();
loadRoomOptions();
loadBookingList();
loadRevenueChart();

});

/* =============================
AUTO CHECKOUT ENGINE
============================= */

async function autoCheckoutSystem(){

const today =
new Date().toISOString().split("T")[0];

const snapshot =
await getDocs(collection(db,"bookings"));

snapshot.forEach(async docSnap=>{

const data = docSnap.data();

if(data.checkOut < today){

await updateDoc(doc(db,"rooms",data.roomId),{
status:"Available"
});

await updateDoc(doc(db,"bookings",docSnap.id),{
status:"Completed"
});

}

});

}

setInterval(autoCheckoutSystem,60000);

/* =============================
ROOM PRICE TABLE
============================= */

const ROOM_PRICES = {
Single:800,
Double:1200,
Deluxe:2000,
Smart:2500,
VIP:5000
};

window.setAutoPrice=function(){

const type=document.getElementById("roomType").value;

document.getElementById("roomPrice").value=
ROOM_PRICES[type]||"";

}

/* =============================
ADD ROOM
============================= */

window.addRoom=async function(){

const number=document.getElementById("roomNumber").value;
const type=document.getElementById("roomType").value;
const price=document.getElementById("roomPrice").value;
const photoFile=document.getElementById("roomPhoto").files[0];

if(!number||!type||!price){
alert("Fill all fields");
return;
}

let photoURL="";

if(photoFile){

const storageRef=
ref(storage,"rooms/"+Date.now()+"_"+photoFile.name);

await uploadBytes(storageRef,photoFile);

photoURL=
await getDownloadURL(storageRef);
}

await addDoc(collection(db,"rooms"),{
number,
type,
price,
photo:photoURL,
status:"Available"
});

loadRooms();
loadDashboardData();

alert("Room Added");

}

/* =============================
BOOKING SYSTEM
============================= */

window.createBooking=async function(){

const guest=document.getElementById("guestName").value;
const roomId=document.getElementById("bookingRoom").value;
const checkIn=document.getElementById("checkIn").value;
const checkOut=document.getElementById("checkOut").value;

if(!guest||!roomId){
alert("Fill booking data");
return;
}

const roomSnap=
await getDoc(doc(db,"rooms",roomId));

const price=parseFloat(roomSnap.data().price);

const days=Math.max(
1,
Math.ceil(
(new Date(checkOut)-new Date(checkIn))
/(1000*60*60*24)
)
);

const totalBill=days*price;

await addDoc(collection(db,"bookings"),{
guest,
roomId,
checkIn,
checkOut,
days,
totalBill,
status:"Booked"
});

await updateDoc(doc(db,"rooms",roomId),{
status:"Booked"
});

loadRooms();
loadBookingList();

alert("Booking Created\nTotal Bill: $"+totalBill);

}

/* =============================
INVOICE GENERATOR
============================= */

window.generateInvoice=async function(bookingId){

const snap=
await getDoc(doc(db,"bookings",bookingId));

if(!snap.exists()){
alert("Booking not found");
return;
}

const data=snap.data();

if(!window.jspdf){
alert("Invoice library missing");
return;
}

const { jsPDF }=window.jspdf;

const pdf=new jsPDF();

pdf.text("Hotel Invoice",20,20);

pdf.text("Guest: "+data.guest,20,40);
pdf.text("CheckIn: "+data.checkIn,20,50);
pdf.text("CheckOut: "+data.checkOut,20,60);
pdf.text("Total Bill: $"+(data.totalBill||0),20,70);
pdf.text("Status: "+data.status,20,80);

pdf.save("invoice.pdf");

}

/* =============================
LOGOUT
============================= */

window.logout=function(){
signOut(auth).then(()=>{
window.location.href="index.html";
});
}
