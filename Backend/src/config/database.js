const mongoose = require("mongoose");
const dns = require("dns");

if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}
dns.setDefaultResultOrder("ipv4first");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("Connected to Database");
  } catch (err) {
    console.error("Database error:", err);
    process.exit(1);
  }
}

module.exports = connectToDB;
