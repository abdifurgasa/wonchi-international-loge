/* =============================
   DASHBOARD LOADER
============================= */

window.onload = function(){
    loadDashboardStats();
};

/* =============================
   LOAD DASHBOARD STATISTICS
============================= */

function loadDashboardStats(){

    const db = Database.getData();

    if(!db){
        return;
    }

    /* ===== TOTAL ROOMS ===== */
    const totalRooms = db.rooms ? db.rooms.length : 0;

    document.querySelectorAll(".card p")[0].innerText =
        totalRooms;

    /* ===== AVAILABLE ROOMS ===== */
    const availableRooms = db.rooms ?
        db.rooms.filter(r => r.status === "available").length
        : 0;

    document.querySelectorAll(".card p")[1].innerText =
        availableRooms;

    /* ===== TODAY REVENUE ===== */

    let revenue = 0;

    if(db.bookings){

        const today = new Date().toDateString();

        db.bookings.forEach(b => {

            if(!b.date) return;

            if(new Date(b.date).toDateString() === today){
                revenue += parseFloat(b.price || 0);
            }

        });
    }

    document.querySelectorAll(".card p")[2].innerText =
        revenue + " ETB";

    /* ===== TOTAL CUSTOMERS ===== */

    const customers = db.customers ?
        db.customers.length : 0;

    document.querySelectorAll(".card p")[3].innerText =
        customers;
}

/* =============================
   NAVIGATION
============================= */

function navigate(page){

    window.location.href = page + ".html";
}

/* =============================
   LOGOUT
============================= */

function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}
