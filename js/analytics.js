import { collection, getDocs } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function loadRevenueAnalytics(db){

const snap=
await getDocs(collection(db,"bookings"));

let revenue=0;

snap.forEach(d=>{
const data=d.data();

if(data.status==="Completed"){
revenue+=data.totalBill||0;
}

});

const ctx=document.getElementById("revenueChart");

if(!ctx) return;

new Chart(ctx,{
type:"line",
data:{
labels:["Revenue"],
datasets:[{
label:"Revenue Growth",
data:[revenue]
}]
}
});

}
