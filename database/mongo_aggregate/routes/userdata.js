const express = require("express");
const router = express.Router();
const User = require("../models/user1");
const UserInfo = require("../models/user1info");

// inner join
router.get("/innerjoin", async (req, res) => {
  try {
    const usersdata = await User.aggregate([
      {
        $lookup: {
          from: "userinfos",
          localField: "id",
          foreignField: "id",
          as: "user_info",
        },
      },
      { $unwind: "$user_info" },
      {
        $project: {
          "_id": 0,
          "lastname": 1,
          "firstname": 1,
          "user_info.email": 1,
          "user_info.phone": 1,
          "user_info.position": 1,
        },
      },
    ]).exec();
    res.send(usersdata);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// with id findone
router.get("/innerjoinsingle", async (req, res) => {
  try {
    const usersdata = await User.aggregate([
      {
        $lookup: {
          from: "userinfos",
          localField: "id",
          foreignField: "id",
          as: "user_info",
        },
      },
      { $unwind: "$user_info" },
      { $match: { id: "1" } },
      {
        $project: {
          "_id": 0,
          "lastname": 1,
          "firstname": 1,
          "user_info.email": 1,
          "user_info.phone": 1,
          "user_info.position": 1,
        },
      },
    ]).exec();
    res.send(usersdata);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
