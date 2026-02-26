function login(){
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const msg = document.getElementById('msg');

    if(user === "admin" && pass === "admin123"){
        localStorage.setItem("loggedIn","true");
        window.location.href = "dashboard.html";
    }else{
        msg.innerText = "Invalid Username or Password";
        msg.style.color = "red";
    }
}

window.onload = function(){
    if(window.location.pathname.includes("dashboard")){
        if(localStorage.getItem("loggedIn") !== "true"){
            window.location.href = "login.html";
        }
    }
}
