let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

function addBooking(){
    let guest = prompt("Guest Name");
    let room = prompt("Room Name");
    let price = prompt("Booking Price");

    if(guest && room && price){

        bookings.push({
            guest:guest,
            room:room,
            price:parseFloat(price),
            date:new Date().toLocaleString()
        });

        localStorage.setItem("bookings",JSON.stringify(bookings));

        alert("Booking Created Successfully");
        showBookings();
        updateFinance();
    }
}

function showBookings(){
    let box = document.getElementById("bookingList");
    if(!box) return;

    box.innerHTML="";

    bookings.forEach((b,i)=>{
        box.innerHTML+=`
        <div class="card">
            <h4>👤 ${b.guest}</h4>
            <p>🛏 ${b.room}</p>
            <p>💰 $${b.price}</p>
            <button onclick="deleteBooking(${i})">Delete</button>
        </div>
        `;
    });
}

function deleteBooking(index){
    bookings.splice(index,1);
    localStorage.setItem("bookings",JSON.stringify(bookings));

    showBookings();
    updateFinance();
}
