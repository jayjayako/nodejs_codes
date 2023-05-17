var express = require("express");
var router = express.Router();

router.get("/getdata", async (req, res) => {
  res.send(JSON.stringify([{ id: "success" }]));
  res.end();
});

module.exports = router;
