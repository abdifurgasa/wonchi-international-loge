window.onload = function () {
    Database.init();
    loadRooms();
    loadBookings();
};

function loadRooms() {
    const rooms = RoomService.getRooms();
    const select = document.getElementById("roomSelect");

    select.innerHTML = "";

    rooms
        .filter(r => r.status === "available")
        .forEach(room => {
            select.innerHTML += `
                <option value="${room.id}">
                    ${room.number} - ${room.type} (${room.price})
                </option>
            `;
        });
}

function createBooking() {

    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const roomId = parseInt(document.getElementById("roomSelect").value);

    if (!name || !phone || !roomId) {
        alert("Fill all booking fields");
        return;
    }

    const db = Database.getData();

    const room = db.rooms.find(r => r.id === roomId);

    const booking = {
        id: Date.now(),
        customerName: name,
        phone: phone,
        roomNumber: room.number,
        price: room.price,
        date: new Date()
    };

    db.bookings.push(booking);

    // Change room status
    room.status = "occupied";

    Database.saveData(db);

    loadBookings();
    loadRooms();

    alert("Booking successful!");
}

function loadBookings() {

    const db = Database.getData();
    const tbody = document.querySelector("#bookingTable tbody");

    tbody.innerHTML = "";

    db.bookings.forEach(b => {

        tbody.innerHTML += `
        <tr>
            <td>${b.customerName}</td>
            <td>${b.phone}</td>
            <td>${b.roomNumber}</td>
            <td>${b.price}</td>
            <td>
                <button onclick="deleteBooking(${b.id})">Delete</button>
            </td>
        </tr>
        `;
    });
}

function deleteBooking(id) {

    const db = Database.getData();

    db.bookings = db.bookings.filter(b => b.id !== id);

    Database.saveData(db);

    loadBookings();
}

function goBack(){
    window.location.href="../dashboard.html";
}
