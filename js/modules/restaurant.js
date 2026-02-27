/* =====================================
   RESTAURANT MODULE - Wanci Lodge
===================================== */

window.onload = function(){
    Database.init();
    loadFoods();
};

/* =====================================
   ADD FOOD MENU
===================================== */

function addFood(){

    const name = document.getElementById("foodName").value.trim();
    const price = parseFloat(document.getElementById("foodPrice").value);

    const photoInput = document.getElementById("foodPhoto");

    if(!name || isNaN(price)){
        alert("Fill food name and price");
        return;
    }

    /* ===== Gallery Image Selection ===== */

    let photo = "";

    if(photoInput.files && photoInput.files.length > 0){
        photo = URL.createObjectURL(photoInput.files[0]);
    }

    const db = Database.getData();

    const food = {
        id: Date.now(),
        name,
        price,
        photo
    };

    db.restaurant.push(food);

    Database.saveData(db);

    clearFoodForm();
    loadFoods();

    alert("Food added successfully");
}

/* =====================================
   LOAD FOOD TABLE
===================================== */

function loadFoods(){

    const db = Database.getData();
    const tbody = document.querySelector("#foodTable tbody");

    if(!tbody) return;

    tbody.innerHTML = "";

    db.restaurant.forEach(food => {

        tbody.innerHTML += `
        <tr>

            <td>
                <img src="${food.photo || '../assets/images/food.png'}"
                width="60" height="60"
                style="border-radius:12px; object-fit:cover;">
            </td>

            <td>${food.name}</td>
            <td>${food.price} ETB</td>

            <td>
                <button onclick="deleteFood(${food.id})">
                Delete
                </button>
            </td>

        </tr>
        `;
    });
}

/* =====================================
   DELETE FOOD
===================================== */

function deleteFood(id){

    if(!confirm("Delete food item?")) return;

    const db = Database.getData();

    db.restaurant = db.restaurant.filter(f => f.id !== id);

    Database.saveData(db);

    loadFoods();
}

/* =====================================
   CLEAR FORM
===================================== */

function clearFoodForm(){

    document.getElementById("foodName").value = "";
    document.getElementById("foodPrice").value = "";

    const photoInput = document.getElementById("foodPhoto");
    if(photoInput) photoInput.value = "";
}
