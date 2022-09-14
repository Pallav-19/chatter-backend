const User = require("../../models/user");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const signup = async (req, res, next) => {
  console.log(await req.body);
  let success = false;
  errors = validationResult(await req);
  if (!(await errors.isEmpty())) {
    let message = [];
    errors.array().forEach(async (error) => {
      message.push(await error.msg);
    });
    return res
      .status(400)
      .json({ message: message.toString(), success: success });
  }
  User.findOne({ email: req.body.email }, (foundUser) => {
    if (foundUser) {
      return res.status(301).json({ message: "User exists with same email!" });
    } else {
      bcryptjs.genSalt(10, function (err, salt) {
        if (!err) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            if (!err) {
              User.create({
                name: req.body.name,
                password: hash,
                email: req.body.email,
              })
                .then((user) => {
                  success = true;
                  res.status(201).json({
                    userData: user,
                    message: "user saved successfully!",
                    success: success,
                  });
                })
                .catch((err) => {
                  res
                    .status(400)
                    .json({ message: err.message, success: success });
                });
            } else {
              res.status(400).json({ message: err.message, success: success });
            }
          });
        } else {
          res.status(400).json({ message: err.message, success: success });
        }
      });
    }
  });
};
module.exports = signup;
