const User = require("../../models/user");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const signup = (req, res, next) => {
  let success = false;
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let message = [];
    errors.array().forEach((error) => {
      message.push(error.msg);
    });
    return res
      .status(400)
      .json({ message: message.toString(), success: success });
  }
  User.findOne({ email: req.body.email }, (founUser) => {
    if (!founUser) {
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
    } else {
      res.status(400).json({
        message: "User already exists!",
        success: success,
      });
    }
  });
  next();
};
module.exports = signup;
