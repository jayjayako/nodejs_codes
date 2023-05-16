var express = require("express");
var router = express.Router();

var fileupload = require("../controllers/fileupload");

router.use("/fileupload", fileupload);

module.exports = router;
