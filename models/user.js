const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true, trim: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    image: {
      type: String,
      default:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.pngfind.com%2Fpngs%2Fm%2F676-6764065_default-profile-picture-transparent-hd-png-download.png&imgrefurl=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FTRJxwTh_default-profile-picture-transparent-hd-png-download%2F&tbnid=Py7vEmEUu78LlM&vet=12ahUKEwiUnrjCtZL6AhV8_zgGHT49DbYQMygQegUIARCLAg..i&docid=LNUJaH5j9BeuyM&w=840&h=663&q=default%20profile%20picture&ved=2ahUKEwiUnrjCtZL6AhV8_zgGHT49DbYQMygQegUIARCLAg",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
