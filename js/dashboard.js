body{
margin:0;
font-family:Segoe UI, sans-serif;
background:#f1f5f9;
}

/* Sidebar */

.sidebar{
width:250px;
height:100vh;
background:linear-gradient(180deg,#0f172a,#1e293b);
color:white;
position:fixed;
padding:20px;
transition:0.4s;
}

.sidebar h2{
text-align:center;
margin-bottom:30px;
}

.sidebar ul{
list-style:none;
padding:0;
}

.sidebar li{
padding:15px;
margin:8px 0;
border-radius:10px;
cursor:pointer;
transition:0.3s;
}

.sidebar li:hover{
background:#ff0000;
transform:translateX(6px);
}

/* Main */

.main{
margin-left:250px;
transition:0.4s;
}

.topbar{
background:white;
padding:15px;
display:flex;
justify-content:space-between;
align-items:center;
box-shadow:0 2px 10px rgba(0,0,0,0.1);
}

/* Cards */

.card{
background:white;
padding:25px;
border-radius:20px;
box-shadow:0 5px 20px rgba(0,0,0,0.08);
margin:20px;
transition:0.3s;
}

.card:hover{
transform:translateY(-6px);
}

/* Pages */

.page{
display:none;
}

.page.active{
display:block;
}

/* Responsive */

@media(max-width:768px){
.sidebar{
width:70px;
}

.main{
margin-left:70px;
}
}
