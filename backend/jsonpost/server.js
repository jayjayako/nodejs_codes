const express = require("express");
const app = express();

app.use(express.json());

const session = require("express-session");

const sessionMiddleware = session({
  key: "sessid",
  secret: "kahitanoooo",
  resave: false,
  saveUninitialized: false,
  //proxy: true, // remove if no proxy in front
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
  },
});

app.use(sessionMiddleware);

app.use((req, res, next) => {
  res.locals.dirname = __dirname;
  next();
});

app.post("/postdata", (req, res) => {
  let data = req.body.data;
  console.log(data + " it works");
  res.json({ data: "success" });
});

app.get("/someid/:id", (req, res) => {
  console.log(req.params.id + " it works");
  res.json({ data: "success" });
});

app.get("/authnow", (req, res) => {
  req.session.authenticated = true;
  res.json({ data: "authenticated" });
});

app.get("/destroysession", (req, res) => {
  req.session.destroy();
  res.json({ data: "session destroyed" });
});

var server = require("http").createServer(app);

const port = 3000;

const io = require("socket.io")(server);

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

io.on("connection", (socket) => {
  console.log("this is from express " + socket.request.session.authenticated);
  console.log(`Socket ${socket.id} connected`);
  socket.on("message", (message) => {
    console.log(message.message);
  });
});

var routes = require("./routes");

app.use("/api", routes);

app.use(express.static("views"));
app.use("/views", express.static(__dirname + "views"));
