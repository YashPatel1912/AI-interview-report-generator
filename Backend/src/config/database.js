const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("connected to Databse");
  } catch (err) {
    console.log("Databse error: ", err);
  }
}

module.exports = connectToDB;
