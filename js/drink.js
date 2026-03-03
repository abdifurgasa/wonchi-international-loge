import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
deleteDoc,
doc,
getDocs,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* Permission Check */
onAuthStateChanged(auth, async(user)=>{

if(!user){
window.location.href="../index.html";
return;
}

});

/* Add Drink */
window.addDrink = async function(){

let name=document.getElementById("drinkName").value;
let price=document.getElementById("drinkPrice").value;
let category=document.getElementById("drinkCategory").value;

let photoFile=document.getElementById("drinkPhoto").files[0];

if(!name || !price){
alert("Fill drink data");
return;
}

let photoURL="";

if(photoFile){
photoURL = URL.createObjectURL(photoFile);
}

await addDoc(collection(db,"drinks"),{
name,
price:Number(price),
category,
photoURL,
createdAt:serverTimestamp()
});

alert("Drink Added");

loadDrinks();
}

/* Load Drinks */
async function loadDrinks(){

let list=document.getElementById("drinkList");

let snap=await getDocs(collection(db,"drinks"));

list.innerHTML="";

snap.forEach(docData=>{

let drink=docData.data();

let div=document.createElement("div");
div.className="card";

div.innerHTML=`
<h3>${drink.name}</h3>
<p>Price: ${drink.price}</p>
<p>Category: ${drink.category}</p>
<button onclick="deleteDrink('${docData.id}')">Delete</button>
`;

list.appendChild(div);

});

}

/* Delete Drink */
window.deleteDrink = async function(id){
await deleteDoc(doc(db,"drinks",id));
loadDrinks();
}

/* Initial Load */
loadDrinks();
