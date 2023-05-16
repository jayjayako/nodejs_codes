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

var { sendemail } = require("./routes");

app.get("/:tomail/:msg", (req, res) => {
  sendemail(req.params.tomail, req.params.msg);
  res.send("email sent!");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// type this on your browser
// localhost:3000/email destination/your message
