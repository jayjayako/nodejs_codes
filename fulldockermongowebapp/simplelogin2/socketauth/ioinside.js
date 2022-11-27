// both web and mobile auth
const users = {}; // only used for removing extra socket connection
function iofunc(io) {
  io.use((socket, next) => {
    const session = socket.request.session;
    if (session.authenticated == true) {
      // if elseif else web mobile
      io.sockets.sockets.forEach((socket) => {
        // If given socket id is exist in list of all sockets, kill it
        if (session.userid === users[socket.id]) {
          delete users[socket.id];
          socket.disconnect(true);
        }
      });
      users[socket.id] = session.userid;
      next();
    } else {
      // or another db fetch and if else inside for mobile
      console.log("Invalid user");
      delete users[socket.id];
      socket.disconnect(true);
    }
  });
}

module.exports = {
  iofunc: iofunc,
};
