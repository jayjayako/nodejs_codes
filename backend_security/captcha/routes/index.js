var express = require("express");
var router = express.Router();

var subscribers = require("../controllers/subscribers");

router.use("/subscribers", subscribers);

module.exports = router;
