import { db } from "./firebase.js";

import {
collection,
getDocs,
updateDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ===============================
AUTO CHECKOUT ENGINE
=============================== */

export async function autoCheckoutSystem(){

const today =
new Date().toISOString().split("T")[0];

const snapshot =
await getDocs(collection(db,"bookings"));

snapshot.forEach(async booking=>{

const data = booking.data();

/* If checkout passed */

if(data.checkOut && data.checkOut < today){

/* Free Room */

await updateDoc(
doc(db,"rooms",data.roomId),
{
status:"Available"
}
);

/* Close Booking */

await updateDoc(
doc(db,"bookings",booking.id),
{
status:"Completed"
}
);

}

});

}

/* Run scheduler every 60 seconds */

setInterval(()=>{

autoCheckoutSystem();

},60000);
