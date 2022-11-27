const express = require("express");
const app = express();
// app.set("trust proxy", true);

const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

var server = require("http").createServer(app);

const port = 3001;

const io = require("socket.io")(server, { cors: { origin: "*" } });

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

var sio = require("socket.io-client");

var socketserve = sio.connect("http://localhost:3000");

io.on("connection", (socket) => {
  console.log("User Connected " + socket.id);

  /////////////// this is for server ////////////
  socket.on("server2msg", (message) => {
    console.log("server2 socket message");
    socket.to(message.sockid).emit("clientmessagerecieve", {
      message: message.message,
    });
  });
  ///////////////////////////////////////////////

  /////////////// this is for client ////////////
  socket.on("clientmessagesend", (message) => {
    socketserve.emit("server1msg", {
      sockid: message.sockid,
      message: message.message,
    });

    socket.to(message.sockid).emit("clientmessagerecieve", {
      message: message.message,
    });
  });
  ///////////////////////////////////////////////

  socket.on("disconnect", () => {
    console.log("Disconnected: socket " + socket.id);
  });
});

app.use(express.static("views"));
app.use("/views", express.static(__dirname + "views"));
