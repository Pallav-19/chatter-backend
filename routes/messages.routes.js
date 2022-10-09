const router = require("express").Router();

const tokenValidator = require("../middlewares/auth/tokenValidator");
const createMessage = require("../controllers/messages/createMessage");
router.post("/createMessage", tokenValidator, createMessage);

const getMessages = require("../controllers/messages/getMessage");
router.get("/getMessages/:chatId", tokenValidator, getMessages);
module.exports = router;
