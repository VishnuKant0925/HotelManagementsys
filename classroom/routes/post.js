const express = require("express");
const router = express.Router();

//index -
router.get("/",(req,res)=>{
    res.send("Welcome to the Posts Route");
});

// show 
router.get("/:id", (req, res) => {
  res.send("Welcome to the show Posts Route");
});

//post 
router.post("/", (req, res) => {
  res.send("post to Posts");
});

//delete 
router.delete("/:id", (req, res) => {
  res.send("delete for the posts id");
});


module.exports = router;