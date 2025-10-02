const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Users Route");
});

// show -user
router.get("/:id", (req, res) => {
  res.send("Welcome to the show Users Route");
});

//post -user
router.post("/", (req, res) => {
  res.send("post to users");
});

//delete -user
router.delete("/:id", (req, res) => {
  res.send("delete for the users id");
});


module.exports = router;