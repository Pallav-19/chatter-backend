const router = require("express").Router();
const tokenValidator = require("../middlewares/auth/tokenValidator");

const accessChat = require("../controllers/chats/accessChats");
router.post("/accessChat", tokenValidator,accessChat);
// router.get("/getChats", tokenValidator,getChats);

// router.post("/createGroup", tokenValidator,createGroup);
// router.post("/renameGroup", tokenValidator,renameGroup);
// router.post("/removeGroup", tokenValidator,removeGroup);
// router.post("/addGroup", tokenValidator,addGroup);

module.exports = router;
