const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");              
const { Server } = require("socket.io");   

const PORT = process.env.PORT || 5000;
const activityRoutes = require("./routes/activityRoutes");

const app = express();
const server = http.createServer(app);     

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FocusTrack™ Server is Running");
});

/* MongoDB connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

/* Socket.IO */
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

/* Routes */
app.use("/api", activityRoutes);

/* Start server */
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});