const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const activityRoutes = require("./routes/activityRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("FocusTrack™ Server is Running");
});

mongoose.connect("mongodb://127.0.0.1:27017/focustrack")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const io = new Server(server, {
  cors: { origin: "*" },
  methods: ["GET", "POST"]
});
app.use("/api", activityRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
