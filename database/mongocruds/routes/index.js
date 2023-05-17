var express = require("express");
var router = express.Router();

var getdata = require("../controllers/getdata");

router.use("/getdata", getdata);

module.exports = router;
