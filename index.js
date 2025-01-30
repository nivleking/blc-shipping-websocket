const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My WebSocket App</title>
    </head>
    <body>
      <h1>Welcome to My WebSocket App</h1>
    </body>
    </html>
  `);
});

// TODO: change these two values
const origin = "http://localhost:5173";
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

  socket.on("user_kicked", (userId) => {
    io.emit("user_kicked", userId);
  });

  socket.on("start_simulation", (roomId) => {
    io.emit("start_simulation", roomId);
  });

  socket.on("end_simulation", (roomId) => {
    io.emit("end_simulation", roomId);
  });

  socket.on("swap_bays", (roomId) => {
    io.emit("swap_bays", roomId);
  });

  socket.on("port_assigned", ({ roomId, userId, port }) => {
    io.emit("port_updated", { roomId, userId, port });
  });

  socket.on("rankings_updated", ({ roomId: updatedRoomId, rankings: updatedRankings }) => {
    io.emit("rankings_updated", { roomId: updatedRoomId, rankings: updatedRankings });
  });

  socket.on("disconnect", () => {});
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
