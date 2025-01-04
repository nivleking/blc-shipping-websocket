const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

// TODO: change these two values
const origin = "#";
const port = "5174";

const io = new Server(server, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("user_added", (newUser) => {
    io.emit("user_added", newUser);
  });

  socket.on("user_deleted", (userId) => {
    io.emit("user_deleted", userId);
  });

  socket.on("disconnect", () => {});
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
