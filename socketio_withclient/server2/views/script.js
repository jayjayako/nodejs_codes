const socket = io();

socket.on("clientmessagerecieve", (message) => {
  console.log(message.message);
  alertmsg(message.message);
});

function alertmsg(message) {
  alert(message);
}

function send() {
  var socketid = document.getElementById("inputsocketid").value;
  var mymessage = document.getElementById("inputdataid").value;
  socket.emit("clientmessagesend", {
    sockid: socketid,
    message: mymessage,
  });
}
