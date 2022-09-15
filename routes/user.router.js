const router = require("express").Router();

const signupValidator = require("../middlewares/validators/signupExpressValidator");
const signup = require("../controllers/auth/signup");
router.post("/signup", signupValidator, signup);

const loginValidator = require("../middlewares/validators/loginValidator");
const login = require("../controllers/auth/login");
router.post("/login", loginValidator, login);

const tokenValidator = require("../middlewares/validators/tokenValidator");

module.exports = router;
