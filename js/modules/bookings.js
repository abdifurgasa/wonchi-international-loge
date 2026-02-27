/* =============================
   PAGE LOAD
============================= */

window.onload = function () {
    Database.init();
    loadRooms();
    loadBookings();
};

/* =============================
   LOAD AVAILABLE ROOMS
============================= */

function loadRooms() {

    const rooms = RoomService.getRooms();
    const select = document.getElementById("roomSelect");

    if (!select) return;

    select.innerHTML = "";

    rooms
        .filter(r => r.status === "available")
        .forEach(room => {

            select.innerHTML += `
            <option value="${room.id}">
                ${room.number} - ${room.type} (${room.price} ETB)
            </option>
            `;
        });
}

/* =============================
   CREATE BOOKING
============================= */

function createBooking() {

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const roomId = parseInt(document.getElementById("roomSelect").value);

    if (!name || !phone || isNaN(roomId)) {
        alert("Please fill all booking fields");
        return;
    }

    const db = Database.getData();

    const room = db.rooms.find(r => r.id === roomId);

    if (!room) {
        alert("Room not found");
        return;
    }

    const booking = {
        id: Date.now(),
        customerName: name,
        phone: phone,
        roomNumber: room.number,
        price: room.price,
        date: new Date().toLocaleString()
    };

    db.bookings.push(booking);

    // Change room status automatically
    room.status = "occupied";

    Database.saveData(db);

    clearBookingForm();
    loadBookings();
    loadRooms();

    alert("Booking successful!");
}

/* =============================
   LOAD BOOKINGS TABLE
============================= */

function loadBookings() {

    const db = Database.getData();
    const tbody = document.querySelector("#bookingTable tbody");

    if (!tbody) return;

    tbody.innerHTML = "";

    db.bookings.forEach(b => {

        tbody.innerHTML += `
        <tr>

            <td>${b.customerName}</td>
            <td>${b.phone}</td>
            <td>${b.roomNumber}</td>

            <td style="font-weight:bold">
                ${b.price} ETB
            </td>

            <td>${b.date}</td>

            <td>
                <button class="delete-btn"
                onclick="deleteBooking(${b.id})">
                Delete
                </button>
            </td>

        </tr>
        `;
    });
}

/* =============================
   DELETE BOOKING
============================= */

function deleteBooking(id) {

    if (!confirm("Delete booking?")) return;

    const db = Database.getData();

    const booking = db.bookings.find(b => b.id === id);

    if (booking) {

        // Free room again
        const room = db.rooms.find(
            r => r.number === booking.roomNumber
        );

        if (room) room.status = "available";
    }

    db.bookings = db.bookings.filter(b => b.id !== id);

    Database.saveData(db);

    loadBookings();
    loadRooms();
}

/* =============================
   CLEAR FORM
============================= */

function clearBookingForm(){

    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
}

/* =============================
   BACK BUTTON
============================= */

function goBack(){
    window.location.href="../dashboard.html";
}
