const socket = io();

socket.on("connect", () => {
  socket.emit("message", {
    message: "this is from client socket",
  });
});
