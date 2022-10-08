const nodemailer = require("nodemailer");
const User = require("../../models/user");
const sendOTP = async (req, res) => {
  if (req.params.method) {
  }
  const result = await User.findOne({ email: req.body.emailOTP });
  if (req.params.method === "verification") {
    if (!result) {
      let OTP = Math.floor(Math.random() * 900) + 100;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.APP_PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: await req.body.emailOTP,
        subject: "OTP verification from CHATTER!",
        html: `<div><h1>Hey <em><b>${req.body.name}</b></em>, \n Welcome to <b>CHATTER!</b></h1> \n \n <h2>Your One Time Password is : <i> ${OTP}</i></h2></div>`,
      };
      await transporter
        .sendMail(mailOptions)
        .then(() => {
          res
            .json({
              message: `OTP sent to ${req.body.emailOTP}`,
              outputOTP: OTP,
              success: true,
            })
            .status(200);
        })
        .catch((err) => {
          console.log(err);
          res.json({
            message: "An error was encountered! try again!",
            success: false,
          });
        });
    } else {
      res.json({
        message: `User with email addres ${req.body.emailOTP} exists login to continue!`,
        success: false,
      });
    }
  } else if (req.params.method === "reset") {
    if (result) {
      let OTP = Math.floor(Math.random() * 900) + 100;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.APP_PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: await req.body.emailOTP,
        subject: "Reset Password (Chatter)",
        html: `<div><h1>Hey <em><b>${result.name}</b></em>, \n  </h1>  \n \n <h2>Your One Time Password for reseting your password is : <i> ${OTP}</i></h2></div>`,
      };
      await transporter
        .sendMail(mailOptions)
        .then(() => {
          res
            .json({
              message: `OTP sent to ${req.body.emailOTP} ,\n Check your email`,
              outputOTP: OTP,
              success: true,
            })
            .status(200);
        })
        .catch((err) => {
          console.log(err);
          res.json({
            message: "An error was encountered! try again!",
            success: false,
          });
        });
    } else {
      res.json({
        message: `User with Email address ${req.body.emailOTP} doesn't exists ,Signup to continue!`,
        success: false,
      });
    }
  }
};
module.exports = sendOTP;
