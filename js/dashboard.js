window.onload = function () {
    Database.init();
    loadDashboard();
};

function loadDashboard() {
    const db = Database.getData();

    document.querySelectorAll(".card p")[0].innerText = db.rooms.length;
    document.querySelectorAll(".card p")[3].innerText = db.customers.length;

    const totalRevenue = db.finance.reduce((sum, item) => sum + item.amount, 0);
    document.querySelectorAll(".card p")[2].innerText = totalRevenue + " ETB";

    const availableRooms = db.rooms.filter(r => r.status === "available").length;
    document.querySelectorAll(".card p")[1].innerText = availableRooms;
}

function navigate(page) {
    window.location.href = "pages/" + page + ".html";
}

function logout() {
    window.location.href = "index.html";
}
