const Chat = require("../../models/chat");
const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  const added = Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("admin", "-password");
  res.json({ message: "User Added", success: true, result: added });
};
module.exports = addToGroup;
