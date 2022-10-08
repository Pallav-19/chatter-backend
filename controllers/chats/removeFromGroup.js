const Chat = require("../../models/chat");
const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    res.json({ message: "Incomplete data provided!", success: false });
    return;
  }
  Chat.findById(chatId)
    .then(async (chat) => {
      try {
        const removed = await Chat.findByIdAndUpdate(
          chatId,
          { $pull: { users: userId } },
          { new: true }
        )
          .populate("users", "-password")
          .populate("admin", "-password");
        if (req.body.self == req.body.userId) {
          res.json({
            message: `You left the group "${chat.name}"`,
            success: true,
            result: "",
          });
        } else {
          res.json({
            message: "User Removed",
            success: true,
            result: removed,
          });
        }
      } catch (err) {
        console.log(err);
        res.json({ message: "Internal error occured!", success: false });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal error occurred!", succecss: false });
    });
};
module.exports = removeFromGroup;
