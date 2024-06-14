const { createServer } = require("http");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);

dotenv.config();
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  const isExistSocket = activeUsers.find((exist) => exist === socket.id);

  if (!isExistSocket) {
    activeUsers.push(socket.id);
    socket.emit("update-user-list", {
      users: activeUsers.filter((exist) => exist !== socket.id),
    });
    socket.broadcast.emit("update-user-list", { users: [socket.id] });
  }

  socket.on("call-to", (data) => {
    socket.to(data.to).emit("call-from", {
      offer: data.offer,
      socket: socket.id,
    });
  });

  socket.on("answer-to", (data) => {
    socket.to(data.to).emit("answer-from", {
      answer: data.answer,
      socket: socket.id,
    });
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((exist) => exist !== socket.id);
    socket.broadcast.emit("remove-user", {
      socketId: socket.id,
    });
  });
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
