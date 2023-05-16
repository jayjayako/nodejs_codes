const express = require("express");
const webpush = require("web-push");

const app = express();
//app.set("trust proxy", true);

const multer = require("multer");
const upload = multer();

const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// var routes = require("./routes");

var server = require("http").createServer(app);

const port = 3000;

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

// app.use("/api", routes);

app.use(express.static("views"));
app.use("/views", express.static(__dirname + "views"));

var publicvapidkey =
  "BJplVShk3kb27bTP3x5t4n0vnXanOmQpayLPqQdLIXQ_YqI0PgvGOUw3aj1uQtAezqU3lobfEPXXZvtBwMTPMGc";
var privatevapidkey = "WsWCebQo2zctC1RjFkquz0X20IoGttwseKTX2dJXT-g";

webpush.setVapidDetails(
  "mailto:jayjaymaangasatmagaling@gmail.com",
  publicvapidkey,
  privatevapidkey
);

let users = {};

app.post("/subscribe", upload.none(), (req, res) => {
  users[req.body.username] = req.body.strsubscription;
  console.log(req.body.username);
  console.log(users[req.body.username]);

  res.send(JSON.stringify([{ data: "success" }]));
  res.end();
});

app.post("/pushnotifsend", upload.none(), (req, res) => {
  res.send(JSON.stringify([{ data: "success" }]));
  const payload = JSON.stringify({ "title": req.body.message });

  webpush
    .sendNotification(JSON.parse(users[req.body.username]), payload)
    .catch((err) => console.error(err));

  res.end();
});
