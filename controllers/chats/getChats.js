const User = require("../../models/user");
const Chat = require("../../models/chat");
const getChats = async (req, res) => {
  console.log("in get");
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user.userId } } })
      .populate("users", "-password")
      .populate("admin", "-password")
      .populate("lastMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "lastMessage.sender",
          select: "name email pic",
        });
        res.send(results).status(200);
      });
  } catch (err) {
    res.json({ message: err.message, success: false }).status(400);
  }
};
module.exports = getChats;
