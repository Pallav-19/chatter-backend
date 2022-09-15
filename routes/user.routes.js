const router = require("express").Router();

const tokenValidator = require("../middlewares/auth/tokenValidator");

const getAllUsers = require("../controllers/users/getAllUsers");
router.get("/allUsers", tokenValidator, getAllUsers);

module.exports = router;
