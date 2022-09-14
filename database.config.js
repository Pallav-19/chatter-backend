require("dotenv").config();
const mongoose = require("mongoose");
module.exports = async () => {
  const uri = process.env.MONGO_URI;
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Atlas connected");
    })
    .catch((err) => console.log(`an error ${err} occured.` .red));
};
