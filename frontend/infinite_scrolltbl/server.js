const express = require("express");
const app = express();

app.use(express.json());

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

///////////////// express static views frontend ////////////////
app.use(express.static("views"));
app.use("/views", express.static(__dirname + "views"));
////////////////////////////////////////////////////////////////
