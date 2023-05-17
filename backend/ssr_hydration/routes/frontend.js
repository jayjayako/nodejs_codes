var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/app", (req, res) => {
  res.render("home/app");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
