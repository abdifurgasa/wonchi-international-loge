import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ================= FOOD SYSTEM ================= */

export async function loadFoods(){

const snapshot =
await getDocs(collection(db,"foods"));

const foodList =
document.getElementById("foodList");

if(!foodList) return;

foodList.innerHTML="";

snapshot.forEach(docSnap=>{
const data = docSnap.data();

foodList.innerHTML+=`
<div class="card">

<h3>${data.name}</h3>
<p>Price: $${data.price}</p>

</div>
`;
});

}
