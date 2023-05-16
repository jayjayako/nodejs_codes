const socket = io();

socket.on("socket-message", (data) => {
  console.log(data.message);
});
