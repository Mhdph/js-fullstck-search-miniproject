const express = require("express");
const User = require("../models/User");
const router = express.Router();

//GET USER STATS
router.get("/getall",(req, res) => {
  User.find({}, (err, response) => {
    if (err) {
      console.log(err);
    }
    res.send(response);
  });
});

router.get("/search",  (req, res) => {
  const { name, family, work, age } = req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = name;
  }

  if (family) {
    queryObject.family = family;
  }

  if (work) {
    queryObject.work = work;
  }

  if (age) {
    queryObject.age = age;
  }

  User.find(queryObject, (err, response) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json(response);
  });
});

module.exports = router;
