require("dotenv").config(); // process.env.VARIABLE use this env
const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

var routes = require("./routes");

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
