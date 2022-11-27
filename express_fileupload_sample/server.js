const express = require("express");
const upload = require("express-fileupload");

const app = express();

const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  upload({
    useTempFiles: true,
    tempFileDir: "./tmp",
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const fs = require("fs");

var user = {};

app.post("/", (req, res) => {
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
    filedata.mv("./uploads/" + filename + mimetype, (err) => {
      if (err) {
        res.send(err);
        res.end();
      } else {
        res.send(JSON.stringify([{ data: "success" }]));
        res.end();
      }
    });
  } else {
    console.log(req.files.filedata.tempFilePath);
    fs.unlink(req.files.filedata.tempFilePath, (err) => {
      if (err) {
        throw err;
      }

      console.log("Delete File successfully.");
    });
    res.send(JSON.stringify([{ data: "invalid" }]));
    res.end();
  }
});

app.listen(5000);
