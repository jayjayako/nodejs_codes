const express = require("express");
const router = express.Router();

var oauth = require("../controllers/oauth");

router.use("/oauth", oauth);

module.exports = router;
