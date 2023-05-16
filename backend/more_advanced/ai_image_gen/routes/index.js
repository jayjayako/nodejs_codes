var express = require("express");
var router = express.Router();

var { generateimage } = require("../controllers/openaiimagegen");

router.get("/generateimage/:inputdata", generateimage);

module.exports = router;
