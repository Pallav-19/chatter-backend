const { body } = require("express-validator");
const signupValidator = [
  body("name", "enter a valid name which is atleast 3 character long").isLength(
    { min: 3 }
  ),
  body("email", "enter a valid email address").isEmail(),
  body("password", "password must contain 5 characters atleast.").isLength({
    min: 5,
  }),
];
module.exports = signupValidator;
