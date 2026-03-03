/* =====================================
DASHBOARD SECURITY ENGINE
===================================== */

export function protectDashboard(){

/* Check login session */

if(localStorage.getItem("isLoggedIn")!=="true"){
window.location.href="index.html";
return;
}

}

/* =====================================
LOGOUT FUNCTION
===================================== */

export function logoutSystem(){

localStorage.removeItem("isLoggedIn");
window.location.href="index.html";

}
