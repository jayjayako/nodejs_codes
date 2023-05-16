const express = require("express");
const Redis = require("ioredis");

const app = express();

const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

const client = new Redis();

app.get("/sample", (req, res) => {
  res.send("working");
  res.end();
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
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// process.on("SIGINT", () => {
//   console.log("Closing Redis connection");
//   client.quit();
//   process.exit();
// });
