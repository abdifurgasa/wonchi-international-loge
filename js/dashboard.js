// ================= FIREBASE IMPORT =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "wanci-international-loge.firebaseapp.com",
  projectId: "wanci-international-loge",
  storageBucket: "wanci-international-loge.firebasestorage.app",
  messagingSenderId: "346207231234",
  appId: "1:346207231234:web:xxxxxx"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= PAGE SWITCH =================
window.showPage = function (pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
};

window.logout = function () {
  localStorage.removeItem("user");
  window.location.href = "index.html";
};

// ================= AUTO PRICE =================
window.setAutoPrice = function () {
  const type = document.getElementById("roomType").value;
  const priceInput = document.getElementById("roomPrice");

  const prices = {
    Single: 500,
    Double: 800,
    Deluxe: 1200,
    Smart: 1500,
    VIP: 2500
  };

  priceInput.value = prices[type] || "";
};

// ================= ADD ROOM =================
window.addRoom = async function () {
  const number = document.getElementById("roomNumber").value;
  const type = document.getElementById("roomType").value;
  const price = document.getElementById("roomPrice").value;

  if (!number || !type || !price) {
    alert("Fill all room fields");
    return;
  }

  await addDoc(collection(db, "rooms"), {
    number,
    type,
    price: Number(price)
  });

  alert("Room Added Successfully");
  document.getElementById("roomNumber").value = "";
  document.getElementById("roomType").value = "";
  document.getElementById("roomPrice").value = "";

  loadRooms();
};

// ================= LOAD ROOMS =================
async function loadRooms() {
  const snapshot = await getDocs(collection(db, "rooms"));
  const roomList = document.getElementById("roomList");
  const bookingRoom = document.getElementById("bookingRoom");

  roomList.innerHTML = "";
  bookingRoom.innerHTML = "<option value=''>Select Room</option>";

  snapshot.forEach(docSnap => {
    const data = docSnap.data();

    roomList.innerHTML += `
      <div class="card">
        <h3>Room ${data.number}</h3>
        <p>Type: ${data.type}</p>
        <p>Price: $${data.price}</p>
      </div>
    `;

    bookingRoom.innerHTML += `
      <option value="${docSnap.id}">
        Room ${data.number} - ${data.type}
      </option>
    `;
  });

  document.getElementById("totalRooms").innerText = snapshot.size;
}

// ================= CREATE BOOKING =================
window.createBooking = async function () {
  const guest = document.getElementById("guestName").value;
  const roomId = document.getElementById("bookingRoom").value;
  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;

  if (!guest || !roomId || !checkIn || !checkOut) {
    alert("Fill all booking fields");
    return;
  }

  // Check if room already booked and not checked out
  const bookingSnapshot = await getDocs(collection(db, "bookings"));
  let isBusy = false;

  bookingSnapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (data.roomId === roomId && data.status !== "Checked Out") {
      isBusy = true;
    }
  });

  if (isBusy) {
    alert("Room is already booked!");
    return;
  }

  const roomDoc = await getDoc(doc(db, "rooms", roomId));
  const roomData = roomDoc.data();

  const days =
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

  const totalBill = days * roomData.price;

  await addDoc(collection(db, "bookings"), {
    guest,
    roomId,
    roomNumber: roomData.number,
    roomType: roomData.type,
    checkIn,
    checkOut,
    days,
    totalBill,
    status: "Booked"
  });

  alert("Booking Created Successfully");

  document.getElementById("guestName").value = "";
  document.getElementById("checkIn").value = "";
  document.getElementById("checkOut").value = "";

  loadBookingList();
  loadRevenueChart();
};

// ================= LOAD BOOKINGS =================
async function loadBookingList() {
  const snapshot = await getDocs(collection(db, "bookings"));
  const list = document.getElementById("bookingList");

  list.innerHTML = "";

  snapshot.forEach(docSnap => {
    const data = docSnap.data();

    list.innerHTML += `
      <div class="card">
        <h3>${data.guest}</h3>
        <p>Room: ${data.roomNumber}</p>
        <p>Bill: $${data.totalBill || 0}</p>
        <p>Status: ${data.status || "Booked"}</p>

        <button onclick="checkOut('${docSnap.id}')">
          Check Out
        </button>

        <button onclick="generateInvoice('${docSnap.id}')">
          Invoice
        </button>
      </div>
    `;
  });
}

// ================= CHECK OUT =================
window.checkOut = async function (bookingId) {
  await updateDoc(doc(db, "bookings", bookingId), {
    status: "Checked Out"
  });

  alert("Guest Checked Out");
  loadBookingList();
  loadRevenueChart();
};

// ================= REVENUE CHART =================
async function loadRevenueChart() {
  const snapshot = await getDocs(collection(db, "bookings"));
  let totalRevenue = 0;

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (data.status === "Checked Out") {
      totalRevenue += data.totalBill || 0;
    }
  });

  const ctx = document.getElementById("revenueChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Revenue"],
      datasets: [{
        label: "Total Revenue",
        data: [totalRevenue]
      }]
    }
  });
}

// ================= INVOICE =================
window.generateInvoice = async function (bookingId) {
  const bookingDoc = await getDoc(doc(db, "bookings", bookingId));
  const data = bookingDoc.data();

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.text("Wanci International Lodge Invoice", 20, 20);
  pdf.text(`Guest: ${data.guest}`, 20, 40);
  pdf.text(`Room: ${data.roomNumber}`, 20, 50);
  pdf.text(`Type: ${data.roomType}`, 20, 60);
  pdf.text(`Days: ${data.days}`, 20, 70);
  pdf.text(`Total Bill: $${data.totalBill}`, 20, 80);
  pdf.text(`Status: ${data.status}`, 20, 90);

  pdf.save("invoice.pdf");
};

// ================= INITIAL LOAD =================
loadRooms();
loadBookingList();
loadRevenueChart();
