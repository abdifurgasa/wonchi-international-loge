function updateFinance(){

    let totalIncome = bookings.reduce((sum,b)=>sum + b.price,0);

    let financeBox = document.getElementById("financeData");

    if(financeBox){
        financeBox.innerHTML = `
        <h3>💰 Finance Report</h3>
        <p>Total Income: $${totalIncome}</p>
        <p>Total Bookings: ${bookings.length}</p>
        `;
    }
}
