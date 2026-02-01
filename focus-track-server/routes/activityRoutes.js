const express = require("express");
const router = express.Router();
const TimeLog = require("../models/TimeLog");

// Save activity
router.post("/log", async (req, res) => {
  const { userId, site, timeSpent } = req.body;

  await TimeLog.create({
    userId,
    site,
    timeSpent,
    date: new Date().toISOString().split("T")[0]
  });

  res.json({ message: "Time logged successfully" });
});

// Get report
router.get("/report/:userId", async (req, res) => {
  const logs = await TimeLog.find({ userId: req.params.userId });
  res.json(logs);
});

module.exports = router;
