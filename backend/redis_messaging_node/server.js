const express = require("express");
const Redis = require("ioredis");
const { createAdapter } = require("@socket.io/redis-adapter");

const app = express();

const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

var server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

const client = new Redis();

const pubClient = client.duplicate();

const subClient = client.duplicate();

app.get("/sample", (req, res) => {
  // publish a message to the Redis channel
  const message = "Hello, Redis!";
  pubClient.publish(channel, message);
  res.send("working");
  res.end();
});

app.get("/addsample1", async (req, res) => {
  const user1 = {
    name: "Bob",
    age: "20",
    description: "I am a programmer",
  };
  await client.hmset("user:1", user1);
  res.send("rows added");
  res.end();
});

app.get("/addsample2", async (req, res) => {
  const user2 = {
    name: "Pedro",
    age: "20",
    description: "I am a programmer",
  };
  await client.hmset("user:2", user2);
  res.send("rows added");
  res.end();
});

app.get("/getusers", async (req, res) => {
  const all = await client.smembers("user");
  console.log(all);
  res.json(all);
  res.end();
});

app.get("/getuser1", async (req, res) => {
  const all = await client.hgetall("user:1");
  res.json(all);
  res.end();
});

app.get("/deleteusersample", async (req, res) => {
  let fields = await client.hkeys("user:1");
  if (fields.length === 0) {
    res.send("data is empty");
    res.end();
  } else {
    await client.hdel("user:1", ...fields);
    res.send("data deleted");
    res.end();
  }
});

app.get("/setuser/:id/:value", async (req, res) => {
  try {
    const response = await client.set(req.params.id, req.params.value);
    res.send("Key set to value");
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error setting key");
  }
});

app.get("/allusers", (req, res) => {
  client.hgetall("myhash", function (err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
      res.send(result);
      res.end();
    }
  });
});

app.get("/getuser/:id", (req, res) => {
  client.get(req.params.id, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("Error getting key");
    } else {
      console.log(result);
      res.send(result);
      res.end();
    }
  });
});

app.get("/deleteuser/:id", (req, res) => {
  client.del(req.params.id, function (err, reply) {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting key");
    } else {
      console.log("Number of keys deleted:", reply);
      res.send("Key deleted");
      res.end();
    }
  });
});

const port = 3000;

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

const Adapter = createAdapter({ pubClient, subClient });

const channel = "my-channel";
subClient.subscribe(channel);

// handle messages received on the Redis channel
subClient.on("message", (channel, message) => {
  console.log(`Received message "${message}" on channel "${channel}"`);
});

// io.adapter(Adapter);

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);

  function onMessage(channel, message) {
    console.log(
      `Received message socket ${socket.id}"${message}" on channel "${channel}"`
    );
  }

  subClient.on("message", onMessage);

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
    subClient.removeListener("message", onMessage);
  });
});

app.use(express.static("views"));
app.use("/views", express.static(__dirname + "views"));
