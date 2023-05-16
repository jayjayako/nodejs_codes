var express = require("express");
var router = express.Router();

var emailtemplate = require("../controllers/emailtemplate");

router.use("/sendemail", emailtemplate);

module.exports = router;
