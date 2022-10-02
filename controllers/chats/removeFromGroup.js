const Chat = require("../../models/chat");
const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const removed = Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("admin", "-password");
  res.json({ message: "User Added", success: true, result: removed });
};
module.exports = removeFromGroup;
