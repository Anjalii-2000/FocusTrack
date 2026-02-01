const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  blockedSites: [String]
});

module.exports = mongoose.model("User", userSchema);
