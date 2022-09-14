const { body } = require("express-validator");
const loginValidator = [
  body("email", "enter a valid email!").isEmail(),
  body("password", "password cannot be blank!").exists(),
];
module.exports = loginValidator;
