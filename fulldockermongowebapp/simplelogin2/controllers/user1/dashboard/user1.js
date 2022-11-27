const user1 = require("../../../models/user1");

const checkifconnupdated = async (id, connection) => {
  try {
    const results = await user1.findOne({ id });
    if (results) {
      if (connection != results.connection) {
        updateuser1loggedin(id, connection);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const updateuser1loggedin = async (id, connection) => {
  let filter = { id: id };
  let post = { connection: connection };
  try {
    const results = await user1.findOneAndUpdate(filter, post, {
      new: true,
    });
    if (results) {
      console.log("Updated Connection");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  updateuser1loggedin: checkifconnupdated,
};
