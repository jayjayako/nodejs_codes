var express = require("express");
var router = express.Router();

const { updateuser1loggedin } = require("./user1");
var auth = require("../modulelibrary/authsession");

router.use(auth, (req, res) => {
  console.log("User Logged Out");
  updateuser1loggedin(req.session.userid, "offline");
  req.session.destroy();
  res.clearCookie("sessid");
  res.send(JSON.stringify([{ id: "done" }]));
  res.end();
});

module.exports = router;
