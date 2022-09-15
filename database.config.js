require("dotenv").config();
const mongoose = require("mongoose");
module.exports = async () => {
  const uri = process.env.MONGO_URI;
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Atlas connected");
    })
    .catch((err) => console.log(`an error ${err} occured.`.red));
};
