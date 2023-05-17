const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

var routes = require("./routes");

var server = require("http").createServer(app);

const port = 3000;

const io = require("socket.io")(server, { cors: { origin: "*" } });

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

////////////////// use for realtime connection ////////////////////
var { iofunc } = require("./socketauth/ioinside.js");
iofunc(io);
var { socketfunct } = require("./extrasocket/socketinside.js");

/////////////////// socket connection instance /////////////////
io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socketfunct(socket);

  app.socket = socket.on("disconnect", () => {
    console.log("Disconnected: outside " + socket.id);
    socket.disconnect(true);
  });
});
////////////////////////////////////////////////////////////////

app.use("/api", routes);

///////////////// express static views frontend ////////////////
// app.use(express.static("views"));
// app.use("/views", express.static(__dirname + "views"));
////////////////////////////////////////////////////////////////
