const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/dbadvance", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB Connetion Successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
