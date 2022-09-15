require("dotenv").config();
const express = require("express");
const app = express();
const dbconfig = require("./database.config.js");
const CORS = require("cors");
const colors = require("colors");
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
app.listen(port, () => {
  console.log(`listening from port ${port}`.yellow);
  console.log(`open at http://localhost:${port}`.underline.cyan);
  dbconfig();
});
