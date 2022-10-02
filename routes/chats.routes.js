const router = require("express").Router();
const tokenValidator = require("../middlewares/auth/tokenValidator");

const accessChat = require("../controllers/chats/accessChats");
router.post("/accessChat", tokenValidator, accessChat);

const getChats = require("../controllers/chats/getChats");
router.get("/getChats", tokenValidator, getChats);

const createGroup = require("../controllers/chats/createGroup");
router.post("/createGroup", tokenValidator, createGroup);

const renameGroup = require("../controllers/chats/renameGroup");
router.put("/renameGroup", tokenValidator, renameGroup);

const removeFromGroup = require("../controllers/chats/removeFromGroup");
router.put("/removeFromGroup", tokenValidator, removeFromGroup);

const addToGroup = require("../controllers/chats/addToGroup");
router.put("/addToGroup", tokenValidator, addToGroup);

module.exports = router;
