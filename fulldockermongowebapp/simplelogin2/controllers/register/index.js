var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer();

var uniqid = require("uniqid");

const Joi = require("joi");

const bcrypt = require("bcrypt");

const { user1registerauth, user1registerinsert } = require("./user1");

router.use(upload.none(), async (req, res, next) => {
  var schema = Joi.object().keys({
    username: Joi.string().invalid("undefined").min(1).required(),
    password: Joi.string().invalid("undefined").min(1).required(),
    lastname: Joi.string().invalid("undefined").min(1).required(),
    firstname: Joi.string().invalid("undefined").min(1).required(),
  });
  var dataToValidate = {
    username: req.body.username,
    password: req.body.password,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
  };
  const result = await schema.validate(dataToValidate);
  if (result.error == null) {
    next();
  } else {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  }
});

router.use(user1registerauth);

router.use(async (req, res, next) => {
  var results = res.locals.results;
  if (results && results != "none") {
    res.send(JSON.stringify([{ id: "invalid" }]));
    res.end();
  } else {
    next();
  }
});

router.use(async (req, res) => {
  var user = req.body.username;
  const hashedpassword = await bcrypt.hash(req.body.password, 10);
  var pass = hashedpassword;
  var last = req.body.lastname;
  var first = req.body.firstname;

  let post = {
    id: uniqid(),
    username: user,
    password: pass,
    lastname: last,
    firstname: first,
    connection: "offline",
    socket: "",
  };
  user1registerinsert(post);
  res.send(JSON.stringify([{ id: "registered" }]));
  res.end();
});

module.exports = router;
