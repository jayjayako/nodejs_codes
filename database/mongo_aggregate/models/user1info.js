const mongoose = require("mongoose");

const userinfoschema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    max: 500,
  },
  email: {
    type: String,
    required: true,
    min: 1,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    min: 1,
  },
  position: {
    type: String,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model("UserInfo", userinfoschema, "UserInfo");
