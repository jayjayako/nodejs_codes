var express = require("express");
var router = express.Router();

const upload = require("express-fileupload");

router.use(
  upload({
    useTempFiles: true,
    tempFileDir: "./tmp",
  })
);

const fs = require("fs");

var user = {};

router.post("/upload", (req, res) => {
  if (user[req.body.filename]) {
  } else {
    user[req.body.filename] = 0;
  }
  user[req.body.filename] += 1;
  if (req.files && user[req.body.filename] != 2) {
    console.log(req.body.filename);
    console.log(req.files.filedata.name);
    let filedata = req.files.filedata;
    let filename = req.body.filename;
    let mimetype = req.files.filedata.mimetype;
    if (mimetype == "image/png") {
      mimetype = ".png";
    }
    filedata.mv(
      res.locals.dirname + "/uploads/" + filename + mimetype,
      (err) => {
        if (err) {
          res.json({ data: "error" });
        } else {
          res.json({ data: "success" });
        }
      }
    );
  } else {
    console.log(req.files.filedata.tempFilePath);
    fs.unlink(
      res.locals.dirname + "/" + req.files.filedata.tempFilePath,
      (err) => {
        if (err) {
          throw err;
        }

        console.log("Delete File successfully.");
      }
    );
    res.json({ data: "invalid" });
  }
});

module.exports = router;
