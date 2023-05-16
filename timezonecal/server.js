const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/timezone", (req, res) => {
  // Get the client's time zone from the request body
  let clientTimeZone = req.body.timeZone;

  console.log("Client timezone:", clientTimeZone);

  // Get the server's time zone
  let serverTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log("Server timezone:", serverTimeZone);

  // Get the current date and time in the client's time zone
  let clientDate = new Date().toLocaleString("en-US", {
    timeZone: clientTimeZone,
  });
  console.log("Client date:", clientDate);

  // Calculate the time difference between the client's time zone and the server's time zone
  let clientTime = new Date(clientDate);
  let serverTime = new Date(
    clientTime.toLocaleString("en-US", { timeZone: serverTimeZone })
  );
  let timeDiff = serverTime.getTime() - clientTime.getTime();

  console.log("Time difference:", timeDiff);

  // Convert the client's time to the server's time
  let serverDate = new Date(clientTime.getTime() + timeDiff);
  console.log("Server date:", serverDate);

  // Process the client's time zone data here...

  res.send("Time zone received.");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(express.static("views"));
app.use("/views", express.static(__dirname + "views"));
