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

const client = require("./modulelibrary/importredisio");

const pubClient = client.duplicate();

const subClient = client.duplicate();

var sessionMiddleware = require("./modulelibrary/sessionconfig");
app.use(sessionMiddleware);

app.get("/setsession", (req, res) => {
  req.session.authenticated = true;
  res.send("session created");
  res.end();
});

const channel = "my-channel";
subClient.subscribe(channel);

app.get("/testredisclient", (req, res) => {
  const message = "Hello, Redis!";
  pubClient.publish(channel, message);
  res.send("Redis Test");
  res.end();
});

app.get("/destroysession", (req, res) => {
  req.session.destroy();
  res.clearCookie("sessid");
  res.send("session destroyed");
  res.end();
});

var server = require("http").createServer(app);
// const io = require("socket.io")(server, { cors: { origin: "*" } });

const port = 3000;

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

// const wrap = (middleware) => (socket, next) =>
//   middleware(socket.request, {}, next);
// io.use(wrap(sessionMiddleware));

// const Adapter = createAdapter({ pubClient, subClient });

// handle messages received on the Redis channel
subClient.on("message", (channel, message) => {
  console.log(`Received message "${message}" on channel "${channel}"`);
});

// io.adapter(Adapter);

// io.on("connection", (socket) => {
//   console.log(`Socket ${socket.id} connected`);

//   function onMessage(channel, message) {
//     console.log(
//       `Received message socket ${socket.id}"${message}" on channel "${channel}"`
//     );
//   }

//   subClient.on("message", onMessage);

//   socket.on("disconnect", () => {
//     console.log(`Socket ${socket.id} disconnected`);
//     subClient.removeListener("message", onMessage);
//   });
// });

// app.use(express.static("views"));
// app.use("/views", express.static(__dirname + "views"));
