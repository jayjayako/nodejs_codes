require("dotenv").config();
var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer();

var { email } = require("../email");

var { captcha } = require("../captcha");

var xss = require("xss");

const Joi = require("joi");

router.use(upload.none(), async (req, res, next) => {
  var schema = Joi.object().keys({
    email: Joi.string()
      .valid(process.env.MYEMAIL)
      .invalid("undefined")
      .min(1)
      .required(),
    message: Joi.string().invalid("undefined").min(1).required(),
    captcha: Joi.string().invalid("undefined").min(1).required(),
  });
  var dataToValidate = {
    email: req.body.email,
    message: req.body.message,
    captcha: req.body.captcha,
  };
  const result = await schema.validate(dataToValidate);
  if (result.error == null) {
    next();
  } else {
    res.json({ data: "invalid" });
    res.end();
  }
});

router.post("/sendmessage", async (req, res) => {
  let result = await captcha(req.body.captcha);
  if (result == "success") {
    email(req.body.email, xss(req.body.message));
    res.json({ data: "success" });
    res.end();
  } else {
    res.json({ data: "invalid" });
    res.end();
  }
});

module.exports = router;
