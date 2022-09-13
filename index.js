require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("welcome to chatter!");
});
app.listen(port, () => {
  console.log(`listening from port ${port}`);
  console.log(`open at http://localhost:${port}`);
});
