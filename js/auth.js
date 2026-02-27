function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const message = document.getElementById("loginMessage");

    let role = null;

    if(username === "admin" && password === "1234"){
        role = "admin";
    }

    else if(username === "staff" && password === "1111"){
        role = "staff";
    }

    else{
        message.style.color = "red";
        message.textContent = "Invalid username or password";
        return;
    }

    // Save session
    localStorage.setItem("wanci_role", role);

    message.style.color = "green";
    message.textContent = "Login successful!";

    setTimeout(()=>{
        window.location.href = "dashboard.html";
    },800);
}
