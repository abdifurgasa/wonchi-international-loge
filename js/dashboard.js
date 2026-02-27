/* =========================================
   ULTIMATE PRO DASHBOARD
   Wanci International Lodge System
========================================= */

window.onload = function(){
    initDashboard();
};

/* =========================================
   MAIN INITIALIZER
========================================= */

function initDashboard(){
    loadDashboardStats();
    startLiveRefresh();
}

/* =========================================
   LIVE AUTO REFRESH (EVERY 10 SECONDS)
========================================= */

function startLiveRefresh(){
    setInterval(loadDashboardStats, 10000);
}

/* =========================================
   LOAD STATISTICS
========================================= */

function loadDashboardStats(){

    const db = Database.getData();
    if(!db) return;

    /* ===== TOTAL ROOMS ===== */
    const totalRooms = db.rooms?.length || 0;

    setCardValue(0, totalRooms);

    /* ===== AVAILABLE ROOMS ===== */
    const availableRooms = db.rooms ?
        db.rooms.filter(r => r.status === "available").length : 0;

    setCardValue(1, availableRooms);

    /* ===== TODAY REVENUE ===== */

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

    setCardValue(2, revenue + " ETB");

    /* ===== TOTAL CUSTOMERS ===== */

    const customers = db.customers?.length || 0;

    setCardValue(3, customers);
}

/* =========================================
   DASHBOARD CARD WRITER
========================================= */

function setCardValue(index, value){

    const cards = document.querySelectorAll(".card p");

    if(cards[index]){
        cards[index].innerText = value;
    }
}

/* =========================================
   NAVIGATION ENGINE
========================================= */

function navigate(page){
    window.location.href = page + ".html";
}

/* =========================================
   SESSION CONTROL
========================================= */

function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}
