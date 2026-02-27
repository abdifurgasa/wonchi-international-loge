window.onload = function () {
    Database.init();
    loadRooms();
};

function addRoom() {
    const number = document.getElementById("roomNumber").value;
    const type = document.getElementById("roomType").value;
    const price = parseFloat(document.getElementById("roomPrice").value);

    if (!number || !type || !price) {
        alert("Please fill all fields");
        return;
    }

    const room = new Room(number, type, price);
    RoomService.addRoom(room);

    document.getElementById("roomNumber").value = "";
    document.getElementById("roomType").value = "";
    document.getElementById("roomPrice").value = "";

    loadRooms();
}

function loadRooms() {
    const rooms = RoomService.getRooms();
    const tbody = document.querySelector("#roomTable tbody");
    tbody.innerHTML = "";

    rooms.forEach(room => {
        const row = `
            <tr>
                <td>${room.number}</td>
                <td>${room.type}</td>
                <td>${room.price} ETB</td>
                <td>${room.status}</td>
                <td>
                    <button onclick="toggleStatus(${room.id})">Change</button>
                    <button onclick="deleteRoom(${room.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function toggleStatus(id) {
    const db = Database.getData();
    const room = db.rooms.find(r => r.id === id);
    room.status = room.status === "available" ? "occupied" : "available";
    Database.saveData(db);
    loadRooms();
}

function deleteRoom(id) {
    const db = Database.getData();
    db.rooms = db.rooms.filter(r => r.id !== id);
    Database.saveData(db);
    loadRooms();
}

function goBack() {
    window.location.href = "../dashboard.html";
}
