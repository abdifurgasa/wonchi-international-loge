window.onload = function(){
    Database.init();
    loadOrders();
};

function addFoodOrder(){

    const name = document.getElementById("foodName").value;
    const price = parseFloat(document.getElementById("foodPrice").value);

    if(!name || !price){
        alert("Fill food order data");
        return;
    }

    const db = Database.getData();

    if(!db.restaurant){
        db.restaurant = [];
    }

    const order = {
        id: Date.now(),
        food: name,
        price: price,
        date: new Date()
    };

    db.restaurant.push(order);

    // Save finance income
    db.finance.push({
        id: Date.now(),
        type:"income",
        amount: price,
        description:"Restaurant Sale",
        date:new Date()
    });

    Database.saveData(db);

    loadOrders();
    alert("Order added!");
}

function loadOrders(){

    const db = Database.getData();

    const tbody = document.querySelector("#foodTable tbody");

    tbody.innerHTML = "";

    if(!db.restaurant) return;

    db.restaurant.forEach(order=>{

        tbody.innerHTML += `
        <tr>
        <td>${order.food}</td>
        <td>${order.price}</td>
        <td>${order.date}</td>
        <td>
        <button onclick="deleteOrder(${order.id})">Delete</button>
        </td>
        </tr>
        `;
    });
}

function deleteOrder(id){

    const db = Database.getData();

    db.restaurant = db.restaurant.filter(o=>o.id!==id);

    Database.saveData(db);

    loadOrders();
}

function goBack(){
    window.location.href="../dashboard.html";
}
