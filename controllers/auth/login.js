const bcryptjs = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../../models/user");
module.exports = (req, res) => {
  let success = false;
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let message = [];
    errors.array().forEach((error) => {
      message.push(error.msg);
    });
    return res.json({ message: message.toString(), success: success });
  }
  if (req.body) {
    //console.log(req.body);
    User.findOne({ email: req.body.email })
      .then((founduser) => {
        //console.log(founduser);
        if (founduser) {
          bcryptjs.compare(
            req.body.password,
            founduser.password,
            function (err, data) {
              if (!err) {
                if (data) {
                  const token = jwt.sign(
                    {
                      userId: founduser._id,
                      email: founduser.email,
                      name: founduser.name,
                      image: founduser.image,
                      LoginTime: new Date(),
                    },
                    process.env.JWT_SECRET
                  );
                  success = true;
                  res.status(200).json({
                    message: "login successfull",
                    token: token,
                    success: success,
                  });
                } else {
                  res.json({
                    message: "Password did not match",
                    success: success,
                  });
                }
              } else {
                res.json({
                  message: "An Internal Error Occured ! Try Again!",
                  success: success,
                });
              }
            }
          );
        } else {
          res.json({
            message: "user not found!",
            success: success,
          });
        }
      })
      .catch((err) => {
        res.json({
          message: "An Internal Error Occured ! Try Again!",
          success: success,
        });
      });
  } else {
    res.json({
      message: "invalid data entered",
      success: success,
    });
  }
};
