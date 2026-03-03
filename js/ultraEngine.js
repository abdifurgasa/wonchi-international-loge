import { collection, getDocs, updateDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function ultraAutoCheckout(db){

const today=new Date().toISOString().split("T")[0];

const snapshot=
await getDocs(collection(db,"bookings"));

snapshot.forEach(async snap=>{

const data=snap.data();

if(data.checkOut < today){

await updateDoc(doc(db,"rooms",data.roomId),{
status:"Available"
});

await updateDoc(doc(db,"bookings",snap.id),{
status:"Completed"
});

}

});

}

/* Run scheduler */
setInterval(()=>{

if(window.db){
ultraAutoCheckout(window.db);
}

},60000);
