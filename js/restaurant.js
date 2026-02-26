let foods = JSON.parse(localStorage.getItem("foods")) || [];

function addFood(){
    let name = prompt("Enter Food Name");
    let price = prompt("Enter Food Price");
    let image = prompt("Enter Image URL");

    if(name && price){
        foods.push({
            name:name,
            price:price,
            image:image || "https://via.placeholder.com/120"
        });

        localStorage.setItem("foods",JSON.stringify(foods));

        alert("Food Added Successfully");
        showFoods();
    }
}

function showFoods(){
    let container = document.getElementById("foodList");

    if(!container) return;

    container.innerHTML = "";

    foods.forEach((f,i)=>{
        container.innerHTML += `
        <div class="card">
            <img src="${f.image}" width="120" height="80" style="border-radius:8px;">
            <h4>${f.name}</h4>
            <p>Price: $${f.price}</p>
            <button onclick="deleteFood(${i})">Delete</button>
        </div>
        `;
    });
}

function deleteFood(index){
    foods.splice(index,1);
    localStorage.setItem("foods",JSON.stringify(foods));
    showFoods();
}
