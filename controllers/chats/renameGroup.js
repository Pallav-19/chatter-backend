const Chat = require("../../models/chat");
const User = require("../../models/user");

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = Chat.findByIdAndUpdate(
    chatId,
    {
      name: chatName,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("admin", "-password");

  if (!updatedChat) {
    res.json({ message: "chat not found", success: "fasle" });
  } else {
    res.json({ message: "chat updated", success: true, result: updatedChat });
  }
};
module.exports = renameGroup;
