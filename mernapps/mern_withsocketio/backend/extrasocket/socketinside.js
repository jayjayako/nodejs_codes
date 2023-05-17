async function socketfunct(socket) {
  socket.on("message", (message) => {
    console.log(message.message);
  });
}

module.exports = {
  socketfunct: socketfunct,
};
