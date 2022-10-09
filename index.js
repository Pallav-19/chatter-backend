require("dotenv").config();
require("colors");
const socket = require("socket.io");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const CORS = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chats.routes");
const messageRoutes = require("./routes/messages.routes");
const { notFound, errorHandler } = require("./errors/notfound");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Atlas connected");
  })
  .catch((err) => console.log(`an error ${err} occured.`.red));

app.use(CORS());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT;
const httpServer = require("http").createServer(app);
httpServer.listen(port, () => {
  console.log(`listening from port ${port}`.yellow);
  console.log(`open at http://localhost:${port}`.underline.cyan);
});
const io = new socket.Server(httpServer, {
  pingTimeout: 600000,
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("connected");
  socket.on("setup", (user) => {
    socket.join(user.userId);
    console.log(user.userId);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room");
  });
  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });
  socket.on("new message", (newMessage) => {
    let chat = newMessage.chat;
    if (!chat.users) {
      return console.log("not defined");
    }
    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) {
        return;
      }
      socket.in(user._id).emit("message received", newMessage);
    });
  });
});
