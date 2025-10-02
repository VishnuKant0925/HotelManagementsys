const express = require('express');
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");
const path = require("path");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());

app.get("/register", (req, res) => {
  let { name = "Anonymous" } = req.query;
  req.session.name = name;
  if(name === "Anonymous"){
  req.flash("error", "User is not registered");
  }
  else{
    req.flash("success", "User is registered successfully");
  }
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  //res.send(`hello ${req.session.name}`);
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  res.render("page.ejs",{name : req.session.name});
});

/*middleware to show number of times a user has accessed the route */

// app.get("/test", (req,res) =>{
//     if (req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send(`you have send ${req.session.count} times`);
// });



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});