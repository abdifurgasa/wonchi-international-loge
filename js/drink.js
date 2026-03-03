import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ================= DRINK SYSTEM ================= */

export async function loadDrinks(){

const snapshot =
await getDocs(collection(db,"drinks"));

const drinkList =
document.getElementById("drinkList");

if(!drinkList) return;

drinkList.innerHTML="";

snapshot.forEach(docSnap=>{
const data = docSnap.data();

drinkList.innerHTML+=`
<div class="card">

<h3>${data.name}</h3>
<p>Price: $${data.price}</p>

</div>
`;
});

}
