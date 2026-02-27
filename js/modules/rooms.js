/* =====================================
   ROOM MODULE - Wanci Lodge System
===================================== */

window.onload = function () {
    Database.init();
    loadRooms();
};

/* =====================================
   ADD ROOM
===================================== */

function addRoom(){

    const number = document.getElementById("roomNumber").value.trim();
    const type = document.getElementById("roomType").value.trim();
    const price = parseFloat(document.getElementById("roomPrice").value);

    const photoInput = document.getElementById("roomPhoto");

    if(!number || !type || isNaN(price)){
        alert("Fill all room fields");
        return;
    }

    /* ===== Gallery File Selection ===== */

    let photo = "";

    if(photoInput.files && photoInput.files.length > 0){
        photo = URL.createObjectURL(photoInput.files[0]);
    }

    const room = new Room(number, type, price, photo);

    RoomService.addRoom(room);

    clearRoomForm();
    loadRooms();

    alert("Room added successfully");
}

/* =====================================
   LOAD ROOM TABLE
===================================== */

function loadRooms(){

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

            <td>${room.price || 0} ETB</td>

            <td>
                <span style="
                padding:5px 10px;
                border-radius:8px;
                background:${room.status === "available" ? "#e8f5e9" : "#ffebee"};
                color:${room.status === "available" ? "#2e7d32" : "#c62828"};
                font-size:12px;
                ">
                ${room.status || "available"}
                </span>
            </td>

            <td>
                <button onclick="toggleStatus(${room.id})">
                Change
                </button>

                <button onclick="deleteRoom(${room.id})">
                Delete
                </button>
            </td>

        </tr>
        `;

        tbody.innerHTML += row;
    });
}

/* =====================================
   STATUS TOGGLE
===================================== */

function toggleStatus(id){

    const db = Database.getData();

    const room = db.rooms.find(r => r.id === id);

    if(!room) return;

    room.status =
        room.status === "available"
        ? "occupied"
        : "available";

    Database.saveData(db);

    loadRooms();
}

/* =====================================
   DELETE ROOM
===================================== */

function deleteRoom(id){

    if(!confirm("Delete room?")) return;

    const db = Database.getData();

    db.rooms = db.rooms.filter(r => r.id !== id);

    Database.saveData(db);

    loadRooms();
}

/* =====================================
   CLEAR FORM
===================================== */

function clearRoomForm(){

    document.getElementById("roomNumber").value = "";
    document.getElementById("roomType").value = "";
    document.getElementById("roomPrice").value = "";

    const photoInput = document.getElementById("roomPhoto");
    if(photoInput) photoInput.value = "";
}

/* =====================================
   BACK NAVIGATION
===================================== */

function goBack(){
    window.location.href="../dashboard.html";
}
