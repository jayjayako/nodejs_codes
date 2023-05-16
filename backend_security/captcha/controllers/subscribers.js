require("dotenv").config();
var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer();

const fetch = require("node-fetch");

router.post("/captcha", upload.none(), (req, res) => {
  if (req.body.captcha) {
    console.log(req.body.captcha);
    const recaptchaBody = {
      secret: process.env.SECRETKEY,
      response: req.body.captcha,
    };

    fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(Object.entries(recaptchaBody)).toString(),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.success);
        if (data.success == true) {
          res.json({ data: "success" });
          res.end();
        } else {
          res.json({ data: "invalid" });
          res.end();
        }
      });
  } else {
    res.json({ data: "invalid" });
    res.end();
  }
});

module.exports = router;
