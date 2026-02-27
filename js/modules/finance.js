/* =============================
   FINANCE MODULE
============================= */

window.onload = function () {
    Database.init();
    loadFinance();
};

/* =============================
   LOAD FINANCE DATA
============================= */

function loadFinance() {

    const db = Database.getData();

    const tbody = document.querySelector("#financeTable tbody");
    const totalBox = document.getElementById("totalIncome");

    if (!tbody) return;

    tbody.innerHTML = "";

    let totalIncome = 0;

    if (db.bookings) {

        db.bookings.forEach(b => {

            totalIncome += parseFloat(b.price || 0);

            tbody.innerHTML += `
            <tr>
                <td>${b.customerName}</td>
                <td>${b.roomNumber}</td>
                <td>${b.price} ETB</td>
                <td>${b.date}</td>
            </tr>
            `;
        });
    }

    if (totalBox) {
        totalBox.innerText = totalIncome + " ETB";
    }
}

/* =============================
   BACK BUTTON
============================= */

function goBack(){
    window.location.href="../dashboard.html";
}
