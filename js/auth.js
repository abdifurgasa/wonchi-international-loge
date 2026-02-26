function login(){
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const msg = document.getElementById('msg');

    if(user === 'admin' && pass === 'admin123'){
        msg.innerText = "Login Successful!";
        window.location.href = "dashboard.html";
    } else {
        msg.innerText = "Invalid Username or Password!";
        msg.style.color = "red";
    }
}
