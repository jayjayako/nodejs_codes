const express = require("express");
const app = express();
app.disable("x-powered-by");
app.set("trust proxy", true);

const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

const connectDB = require("./modulelibrary/mongodbconn");

connectDB();

var routes = require("./routes");

var server = require("http").createServer(app);

const port = 3000;

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

app.use("/api", routes);
