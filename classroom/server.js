const express = require('express');
const app = express();
const user = require('./routes/user.js');
const post = require('./routes/post.js');
const cookieParser = require('cookie-parser');

//cookie parser middleware predefine function
app.use(cookieParser("secretcode"));

// signed cookie route
app.get("/getsignedcookie", (req,res)=>{
    res.cookie('signedCookie', 'This is a signed cookie', { signed: true });
    res.send("Signed cookie sent")
});

//verify the signed cookies

app.get("/verifycookie", (req, res) => {
    console.log(req.signedCookies);
res.send(req.signedCookies);
});

app.get("/greet",(req,res)=>{
  let {name = "Guest"} = req.cookies;
  res.send(`Hello, ${name}!`);
});
//root route
app.get('/', (req,res)=>{
    console.dir(req.cookies);
    res.send("Welcome to the Root Route");
});

app.use('/users', user);

app.use('/posts', post);
//Sending Cookies 

app.get('/setcookie', (req, res) => {
res.cookie('username', 'JohnDoe' );
res.cookie('name', 'Vishnu Kant' );
res.send('Cookie has been set');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});