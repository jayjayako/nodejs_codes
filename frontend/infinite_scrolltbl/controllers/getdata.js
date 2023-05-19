var express = require("express");
var router = express.Router();

const list = require("../models/list");

router.get("/displaytable/:tableinc/:tablestatcount", async (req, res) => {
  let actualtableinc = parseInt(req.params.tableinc) + 1;
  const count = await list.countDocuments();

  try {
    if (req.params.tablestatcount == "init" || actualtableinc < 0) {
      const results = await list.find().limit(5);
      if (results) {
        res.json({
          status: "success",
          tablestatcount: "increment",
          tablecount: count,
          allresults: results,
        });
      } else {
        res.json({ status: "no data" });
      }
    }
    if (
      actualtableinc >= 1 &&
      actualtableinc <= count &&
      req.params.tablestatcount == "increment"
    ) {
      const results = await list
        .find()
        .skip((actualtableinc - 1) * 5)
        .limit(5);
      if (results) {
        res.json({
          status: "success",
          tablestatcount: "increment",
          tablecount: count,
          allresults: results,
        });
      } else {
        res.json({ status: "no data" });
      }
    }
    if (actualtableinc > 1 && req.params.tablestatcount == "decrement") {
      const results = await list
        .find()
        .skip((actualtableinc - 1) * 5 - 5)
        .limit(5);
      if (results) {
        res.json({
          status: "success",
          tablestatcount: "decrement",
          tablecount: count,
          allresults: results,
        });
      } else {
        res.json({ status: "no data" });
      }
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error" });
  }
});

module.exports = router;
