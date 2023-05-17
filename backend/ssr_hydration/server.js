const express = require("express");
const app = express();

app.use(express.json());

app.set("view engine", "ejs");

const frontend = require("./routes/frontend");

app.use("/", frontend);

app.listen(3000, () => {
  console.log(`App 🚀 @ http://localhost:3000`);
});

app.use(express.static("public"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/img", express.static(__dirname + "/public/img"));
