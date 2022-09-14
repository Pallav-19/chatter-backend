require("dotenv").config();
const express = require("express");
const app = express();
const dbconfig = require("./database.config.js");
const CORS = require("cors");
const colors = require("colors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.router.js");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(CORS());

app.use("/api/user", userRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening from port ${port}`.yellow);
  console.log(`open at http://localhost:${port}`.underline.cyan);
  dbconfig();
});
