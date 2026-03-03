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

/* Add Food */
window.addFood = async function(){

let name=document.getElementById("foodName").value;
let price=document.getElementById("foodPrice").value;
let category=document.getElementById("foodCategory").value;

let photoFile=document.getElementById("foodPhoto").files[0];

if(!name || !price){
alert("Fill food data");
return;
}

let photoURL="";

if(photoFile){
photoURL = URL.createObjectURL(photoFile);
}

await addDoc(collection(db,"foods"),{
name,
price:Number(price),
category,
photoURL,
createdAt:serverTimestamp()
});

alert("Food Added");

loadFoods();
}

/* Load Foods */
async function loadFoods(){

let list=document.getElementById("foodList");

let snap=await getDocs(collection(db,"foods"));

list.innerHTML="";

snap.forEach(docData=>{

let food=docData.data();

let div=document.createElement("div");
div.className="card";

div.innerHTML=`
<h3>${food.name}</h3>
<p>Price: ${food.price}</p>
<p>Category: ${food.category}</p>
<button onclick="deleteFood('${docData.id}')">Delete</button>
`;

list.appendChild(div);

});

}

/* Delete Food */
window.deleteFood = async function(id){
await deleteDoc(doc(db,"foods",id));
loadFoods();
}

/* Initial Load */
loadFoods();
