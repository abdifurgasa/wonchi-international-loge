window.onload = function () {
    Database.init();
    loadRooms();
};

/* =============================
   ADD ROOM
============================= */

function addRoom(){

    const number = document.getElementById("roomNumber").value.trim();
    const type = document.getElementById("roomType").value.trim();
    const price = parseFloat(document.getElementById("roomPrice").value);
    const photo = document.getElementById("roomPhoto").value.trim();

    if(!number || !type || isNaN(price)){
        alert("Please fill all fields correctly");
        return;
    }

    const room = new Room(number, type, price, photo);

    RoomService.addRoom(room);

    clearRoomForm();
    loadRooms();

    alert("Room added successfully");
}

/* =============================
   LOAD ROOM TABLE
============================= */

function loadRooms() {

    const rooms = RoomService.getRooms();
    const tbody = document.querySelector("#roomTable tbody");

    if(!tbody) return;

    tbody.innerHTML = "";

    rooms.forEach(room => {

        const row = `
        <tr>

            <td>
                <img src="${room.photo || '../assets/images/room.png'}"
                width="60" height="60"
                style="border-radius:12px; object-fit:cover;">
            </td>

            <td>${room.number || ""}</td>
            <td>${room.type || ""}</td>

            <td style="font-weight:bold">
                ${room.price || 0} ETB
            </td>

            <td>
                <span class="status-badge ${room.status === "available" ? "available" : "booked"}">
                ${room.status || "available"}
                </span>
            </td>

            <td>
                <button class="action-btn change-btn"
                onclick="toggleStatus(${room.id})">
                Change
                </button>

                <button class="action-btn delete-btn"
                onclick="deleteRoom(${room.id})">
                Delete
                </button>
            </td>

        </tr>
        `;

        tbody.innerHTML += row;
    });
}

/* =============================
   STATUS TOGGLE
============================= */

function toggleStatus(id) {

    const db = Database.getData();

    const room = db.rooms.find(r => r.id === id);

    if(!room) return;

    room.status = room.status === "available"
        ? "occupied"
        : "available";

    Database.saveData(db);
    loadRooms();
}

/* =============================
   DELETE ROOM
============================= */

function deleteRoom(id) {

    if(!confirm("Delete this room?")) return;

    const db = Database.getData();

    db.rooms = db.rooms.filter(r => r.id !== id);

    Database.saveData(db);
    loadRooms();
}

/* =============================
   FORM RESET
============================= */

function clearRoomForm(){

    document.getElementById("roomNumber").value = "";
    document.getElementById("roomType").value = "";
    document.getElementById("roomPrice").value = "";
    document.getElementById("roomPhoto").value = "";
}

/* =============================
   BACK NAVIGATION
============================= */

function goBack() {
    window.location.href = "../dashboard.html";
}
