require("dotenv").config();
require("colors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const CORS = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chats.routes");
const { notFound, errorHandler } = require("./errors/notfound");
app.use(CORS());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT;
module.exports = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Atlas connected");
    const server = app.listen(port, () => {
      console.log(`listening from port ${port}`.yellow);
      console.log(`open at http://localhost:${port}`.underline.cyan);
      const socket = require("socket.io");
      const io = socket(server);
    });
  })
  .catch((err) => console.log(`an error ${err} occured.`.red));
