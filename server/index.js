const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  console.log(`User id - ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log(data);
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log(data);

    socket.to(data.room).emit("receive_message", data);
    // socket.broadcast.emit('receive_message', data)
  });
});

server.listen(8081, () => {
  console.log("Server 8081 starts");
});
