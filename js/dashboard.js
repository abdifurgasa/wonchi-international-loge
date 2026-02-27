/* =====================================
   WANCI LODGE DASHBOARD SCRIPT
===================================== */

window.onload = function(){
    loadDashboardStats();
};

/* =====================================
   DASHBOARD STATISTICS LOADER
===================================== */

function loadDashboardStats(){

    const db = Database.getData();
    if(!db) return;

    /* Total Rooms */
    const totalRooms = db.rooms?.length || 0;

    document.querySelectorAll(".card p")[0].innerText =
        totalRooms;

    /* Available Rooms */
    const availableRooms = db.rooms ?
        db.rooms.filter(r => r.status === "available").length
        : 0;

    document.querySelectorAll(".card p")[1].innerText =
        availableRooms;

    /* Today Revenue */

    let revenue = 0;

    if(db.bookings){

        const today = new Date().toDateString();

        db.bookings.forEach(b => {

            if(!b.date) return;

            if(new Date(b.date).toDateString() === today){
                revenue += Number(b.price || 0);
            }

        });
    }

    document.querySelectorAll(".card p")[2].innerText =
        revenue + " ETB";

    /* Customers */

    const customers = db.customers?.length || 0;

    document.querySelectorAll(".card p")[3].innerText =
        customers;
}

/* =====================================
   NAVIGATION SYSTEM
===================================== */

function navigate(page){
    window.location.href = "js/pages/" + page + ".html";
}

/* =====================================
   LOGOUT SYSTEM
===================================== */

function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}
