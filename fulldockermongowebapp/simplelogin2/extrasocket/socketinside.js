const { updateuser1loggedin, updatesocket } = require("./user1");
const user1 = require("../models/user1");

async function socketfunct(socket) {
  if (socket.request.session.authenticated == true) {
    updatesocket(socket.request.session.userid, socket.id);
  } // else for mobile api
  /////////////// function for user logout /////////////
  async function autologout(socketid) {
    ////////////////////// for user 1 ///////////////////
    const results = await user1.findOne({ id: socket.request.session.userid });
    if (results) {
      if (socketid == results.socket) {
        updateuser1loggedin(socket.request.session.userid, "offline");
        socket.request.session.destroy();
        console.log("User Logged Out");
      }
    }
    /////////////////////////////////////////////////////

    return;
  }
  //////////////////////////////////////////////////////

  socket.on("message", (message) => {
    console.log(message.message);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected: socket " + socket.id);
    setTimeout(autologout, 5000, socket.id);
    socket.disconnect(true);
  });
}

module.exports = {
  socketfunct: socketfunct,
};
