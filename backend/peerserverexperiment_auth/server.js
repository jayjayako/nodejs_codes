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

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");

// Create the PeerServer with authentication middleware
const peerServer = ExpressPeerServer(server, {
  path: "/peerjs",
  allow_discovery: true,
  authenticate: (req, next) => {
    next();
  },
});

// Define the middleware function to authenticate users
function authenticate(req, res, next) {
  // assume the user is authenticated
  console.log("user auth here");
  next();
}

// Add the authentication middleware to the PeerServer
app.use("/", authenticate, peerServer);

// Start the server
server.listen(3001, () => {
  console.log("Server started on port 3001");
});
