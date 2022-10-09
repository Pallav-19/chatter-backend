const Chat = require("../../models/chat");
const User = require("../../models/user");

const accessChat = async (req, res) => {
  toUserId = req.body.userId;
  console.log(req.body.userId);
  if (!toUserId) {
    return res
      .json({ message: "User not received!", success: false })
      .status(400);
  }
  let isChat = await Chat.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.userId } } },
      { users: { $elemMatch: { $eq: toUserId } } },
    ],
  })
    .populate("users", "-password")
    .populate("lastMessage");
  isChat = await User.populate(isChat, {
    path: "lastMessage.sender",
    select: "-password",
  });
  if (isChat.length > 0) {
    res
      .json({ message: "chat Found", chat: isChat[0], success: true })
      .status(200);
  } else {
    let chatData = {
      name: "sender",
      isGroup: false,
      users: [req.user.userId, toUserId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res
        .json({ message: "Chat Created", chat: fullChat, success: true })
        .status(200);
    } catch (err) {
      res
        .json({ message: "Internal Error Occurred", success: false })
        .status(400);
    }
  }
};
module.exports = accessChat;
