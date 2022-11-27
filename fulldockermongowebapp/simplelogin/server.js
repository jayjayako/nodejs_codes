require("dotenv").config();
const express = require("express");
const app = express();
app.set("trust proxy", true);

const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

const mongoose = require("mongoose");

//connect
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfully");
  })
  .catch(err => {
    console.log(err.message);
  });

var sessionMiddleware = require("./modulelibrary/sessionconfig");

app.use(sessionMiddleware);

var routes = require("./routes");

var server = require("http").createServer(app);

const port = 3000;

const io = require("socket.io")(server, { cors: { origin: "*" } });

server.listen(port, err => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

const wrap = middleware => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

var { iofunc } = require("./socketauth/ioinside.js");
iofunc(io);
var { socketfunct } = require("./extrasocket/socketinside.js");
io.on("connection", socket => {
  console.log("this is from express " + socket.request.session.authenticated);
  socketfunct(socket);
  app.socket = socket.on("disconnect", () => {
    console.log("Disconnected: outside " + socket.id);
    socket.disconnect(true);
  });
});

app.use("/api", routes);

app.use(express.static("views"));
app.use("/views", express.static(__dirname + "views"));
