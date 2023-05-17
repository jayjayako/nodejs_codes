// both web and mobile auth

function iofunc(io) {
  io.use(async (socket, next) => {
    next();
  });
}

module.exports = {
  iofunc: iofunc,
};
