window.onload = function () {
    Database.init();
    loadDashboard();
};

function loadDashboard() {

    const db = Database.getData();

    // Total Rooms
    document.querySelectorAll(".card p")[0].innerText =
        db.rooms.length;

    // Available Rooms
    const availableRooms = db.rooms.filter(
        r => r.status === "available"
    ).length;

    document.querySelectorAll(".card p")[1].innerText =
        availableRooms;

    // Revenue Calculation
    const totalRevenue = db.finance ?
        db.finance.reduce((sum, f) => sum + f.amount, 0) : 0;

    document.querySelectorAll(".card p")[2].innerText =
        totalRevenue + " ETB";

    // Customers Count
    document.querySelectorAll(".card p")[3].innerText =
        db.customers ? db.customers.length : 0;
}

function navigate(page) {
    window.location.href = "pages/" + page + ".html";
}

function logout() {
    window.location.href = "index.html";
}
