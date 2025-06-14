const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

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
const origin = process.env.WEBSOCKET_ORIGIN;
const port = process.env.WEBSOCKET_PORT;

const io = new Server(server, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("user_added", ({ roomId, newUser }) => {
    io.emit("user_added", { roomId, newUser });
  });

  socket.on("user_kicked", ({ roomId, userId }) => {
    io.emit("user_kicked", { roomId, userId });
  });

  socket.on("start_simulation", ({ roomId }) => {
    io.emit("start_simulation", { roomId });
  });

  socket.on("end_simulation", ({ roomId }) => {
    io.emit("end_simulation", { roomId });
  });

  socket.on("swap_bays", ({ roomId }) => {
    io.emit("swap_bays", { roomId });
  });

  socket.on("port_assigned", ({ roomId, userId, port }) => {
    io.emit("port_updated", { roomId, userId, port });
  });

  socket.on("port_config_updated", ({ roomId }) => {
    io.emit("port_config_updated", { roomId });
  });

  socket.on("rankings_updated", ({ roomId, rankings }) => {
    io.emit("rankings_updated", { roomId, rankings });
  });

  socket.on("stats_requested", ({ roomId, userId }) => {
    io.emit("stats_requested", { roomId, userId });
  });

  socket.on("stats_updated", ({ roomId, userId, stats }) => {
    io.emit("stats_updated", { roomId, userId, stats });
  });

  socket.on("disconnect", () => {});
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
