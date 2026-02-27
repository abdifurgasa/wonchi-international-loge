function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    if (username === "admin" && password === "1234") {
        message.style.color = "green";
        message.textContent = "Login successful!";
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    } else {
        message.style.color = "red";
        message.textContent = "Invalid username or password!";
    }
}
