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

var routes = require("./routes");

var server = require("http").createServer(app);

const port = 3000;

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

app.use((req, res, next) => {
  res.locals.rootdir = __dirname;
  next();
});

app.use("/api", routes);

///////////////// express static views frontend ////////////////
app.use(express.static("views"));
app.use("/views", express.static(__dirname + "views"));
////////////////////////////////////////////////////////////////
