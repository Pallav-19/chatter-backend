const User = require("../../models/user");
const Chat = require("../../models/chat");
const getChats = async (req, res) => {
  console.log("in get");
  try {
    console.log(req.user.userId);
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
        console.log(results.length);
      });
  } catch (err) {
    res.json({ message: "An Internal Error Occured ! Try Again!", success: false }).status(400);
  }
};
module.exports = getChats;
