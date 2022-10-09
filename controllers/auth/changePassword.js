const User = require("../../models/user");
const bcryptjs = require("bcryptjs");
const changePassword = async (req, res) => {
  let success = false;

  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (!err) {
      if (foundUser) {
        bcryptjs.genSalt(10, function (err, salt) {
          if (!err) {
            bcryptjs.hash(req.body.newpassword, salt, function (err, hash) {
              if (!err) {
                User.findOneAndUpdate(
                  { email: req.body.email },
                  { password: hash },
                  { new: true }
                )
                  .then((result) => {
                    //console.log(result);
                    res.json({
                      message:
                        "Password update successfully! \n Login with the new password!",
                      success: true,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    res.json({
                      message: "Unable to update password! \n Try again!",
                      success: false,
                    });
                  });
              } else {
                res.status(400).json({
                  message: "Internal Error Occured! Try Again",
                  success: success,
                });
                //console.log(err.message);
              }
            });
          } else {
            res.status(400).json({
              message: "Internal Error Occured! Try Again",
              success: success,
            });
            //console.log(err.message);
          }
        });
      } else {
        res.json({
          message: `User with the email ID ${req.body.email} not found! \n  Signup to continue!`,
          success: false,
        });
      }
    } else {
      res.status(400).json({
        message: "Internal Error Occured! Try Again",
        success: success,
      });
      //console.log(err.message);
    }
  });
};
module.exports = changePassword;
