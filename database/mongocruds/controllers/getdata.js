var express = require("express");
var router = express.Router();

const Superadmin_tbl = require("../models/superadmin_tbl");

router.get("/display", async (req, res) => {
  let id = "1";
  try {
    const results = await Superadmin_tbl.findOne({ id });
    if (results) {
      res.json({ data: results });
    } else {
      res.json({ data: "no data" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
