import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ================= FINANCE ENGINE ================= */

export async function loadFinanceAnalytics(){

const snapshot =
await getDocs(collection(db,"finance"));

let revenue = 0;

snapshot.forEach(docSnap=>{
revenue += docSnap.data().amount || 0;
});

const chart =
document.getElementById("revenueChart");

if(chart){

new Chart(chart,{
type:"bar",
data:{
labels:["Total Revenue"],
datasets:[{
label:"Finance Revenue",
data:[revenue]
}]
}
});

}

}
