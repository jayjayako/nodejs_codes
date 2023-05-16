const express = require("express");
const app = express();

var server = require("http").createServer(app);
var fs = require("fs");

const port = process.env.PORT || 3000;

const cors = require("cors");

app.use(cors());

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

app.get("/filedownload", (req, res) => {
  const rs = fs.createReadStream("./myfiles/samplefile.txt");
  res.setHeader("Content-Disposition", "attachment; samplefile.txt");
  rs.pipe(res);
});
