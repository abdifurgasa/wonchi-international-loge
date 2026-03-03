import { db, auth } from "./firebase.js";
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.sendNotification = async function(){

let title = document.getElementById("title").value;
let message = document.getElementById("message").value;
let role = document.getElementById("targetRole").value;

if(!title || !message){
alert("Fill notification data");
return;
}

await addDoc(collection(db,"notifications"),{
title,
message,
roleTarget:role,
read:false,
createdAt:serverTimestamp()
});

alert("Notification Sent");

}
