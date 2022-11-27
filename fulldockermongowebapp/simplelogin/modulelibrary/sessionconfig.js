require("dotenv").config();
var express = require("express");
var router = express.Router();

const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);

var sessionstore = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessiontbl",
});

sessionstore.on("error", function (error) {
  console.log(error);
});

const sessionMiddleware = session({
  key: "sessid",
  secret: process.env.SECRETKEY,
  store: sessionstore,
  resave: false,
  saveUninitialized: false,
  proxy: true, // remove if no proxy in front
  cookie: { secure: true, sameSite: "lax" }, //set to true if https
});

router.use(sessionMiddleware);

module.exports = router;
