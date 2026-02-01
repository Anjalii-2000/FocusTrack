const mongoose = require("mongoose");

const timeLogSchema = new mongoose.Schema({
  userId: String,
  site: String,
  timeSpent: Number,
  date: String
});

module.exports = mongoose.model("TimeLog", timeLogSchema);
