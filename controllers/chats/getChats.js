const User = require("../../models/user");
const Chat = require("../../models/chat");
const getChats = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user.userId } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then((results) => {
        results = User.populate(results, {
          path: "latestMessage.sender",
          select: "name email pic",
        });
        res
          .json({ message: "Found Chats", chats: results, success: true })
          .status(200);
      });
  } catch (err) {
    res.json({ message: err.message, success: false }).status(400);
  }
};
module.exports = getChats;
