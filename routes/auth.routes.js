const router = require("express").Router();

const signupValidator = require("../middlewares/validators/signupExpressValidator");
const signup = require("../controllers/auth/signup");
router.post("/signup", signupValidator, signup);

const loginValidator = require("../middlewares/validators/loginValidator");
const login = require("../controllers/auth/login");
router.post("/login", loginValidator, login);

const sendOTP = require("../controllers/auth/otp");
router.post("/sendOTP/:method", sendOTP);

const changePassword = require("../controllers/auth/changePassword");
router.patch("/changePassword", changePassword);

module.exports = router;
