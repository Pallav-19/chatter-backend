require("dotenv").config();
const express = require("express");
const app = express();
const dbconfig = require("./database.config.js");


app.get("/", (req, res) => {
  res.send("welcome to chatter!");
});



const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening from port ${port}`);
  console.log(`open at http://localhost:${port}`);
  dbconfig();
});
