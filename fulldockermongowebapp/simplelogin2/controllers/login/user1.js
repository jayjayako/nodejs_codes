const user1 = require("../../models/user1");

const user1auth = async (req, res, next) => {
  try {
    res.locals.results = "none";
    const { username, password } = req.body;
    const results = await user1.findOne({ username });
    if (results) {
      res.locals.results = results;
      next();
    } else {
      res.locals.results = "none";
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

const user1auth2 = async (req) => {
  anothertestfunc(req);
  try {
    const results = await user1.findOne({
      id: req.session.userid,
      connection: "offline",
    });
    if (results) {
      console.log("triggers logout safety");
      req.session.destroy();
    }
  } catch (err) {
    console.log(err);
  }
};

function anothertestfunc(req) {
  console.log("destroy session for usertype " + req.session.userid);
}

module.exports = {
  user1auth: user1auth,
  user1auth2: user1auth2,
};
