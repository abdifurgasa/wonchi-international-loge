let rooms = JSON.parse(localStorage.getItem("rooms")) || [];

function addRoom(){
    let name = prompt("Enter Room Name");
    let price = prompt("Enter Room Price");

    if(name && price){
        rooms.push({
            name:name,
            price:price
        });

        localStorage.setItem("rooms",JSON.stringify(rooms));
        alert("Room Added Successfully");
        showRooms();
    }
}

function showRooms(){
    let container = document.getElementById("roomList");

    if(!container) return;

    container.innerHTML = "";

    rooms.forEach((r,i)=>{
        container.innerHTML += `
        <div class="card">
            <h4>${r.name}</h4>
            <p>Price: $${r.price}</p>
            <button onclick="deleteRoom(${i})">Delete</button>
        </div>
        `;
    });
}

function deleteRoom(index){
    rooms.splice(index,1);
    localStorage.setItem("rooms",JSON.stringify(rooms));
    showRooms();
}
