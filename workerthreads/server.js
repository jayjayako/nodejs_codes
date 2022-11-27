const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 3000;

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

const io = require("socket.io")(server, { cors: { origin: "*" } });

const { Worker, isMainThread } = require("worker_threads");

io.use((socket, next) => {
  socket.userid = "useridtest";
  next();
});

io.on("connection", (socket) => {
  socket.on("socketmsg", (message) => {
    console.log(message);
    console.log("this is user id ", socket.userid);
    let number = 10;
    if (isMainThread) {
      let worker = new Worker("./worker.js", {
        workerData: { num: number, msg: "this is test" },
      });
      worker.postMessage(message);
      worker.once("message", (data) => {
        console.log("from workerthread", data.number, data.stats);
      });
      worker.on("error", (error) => {
        console.log("got error", error);
      });
      worker.on("exit", (exitCode) => {
        console.log(`It exited with code ${exitCode}`);
      });
    }
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});
