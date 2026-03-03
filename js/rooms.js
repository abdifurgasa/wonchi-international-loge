import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ================= ROOM ENGINE ================= */

export async function loadRooms(){

const snapshot =
await getDocs(collection(db,"rooms"));

const roomList =
document.getElementById("roomList");

if(!roomList) return;

roomList.innerHTML="";

snapshot.forEach(docSnap=>{
const data = docSnap.data();

roomList.innerHTML+=`
<div class="card">

<h3>Room ${data.number}</h3>
<p>Type: ${data.type}</p>
<p>Price: $${data.price}</p>
<p>Status: ${data.status}</p>

</div>
`;
});

}
