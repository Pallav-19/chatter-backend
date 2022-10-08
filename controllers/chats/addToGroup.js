const Chat = require("../../models/chat");
const addToGroup = async (req, res) => {
  const { chatId, users } = req.body;

  Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: { $each: users } } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("admin", "-password")
    .then((chat) => {
      res.json({ message: "Users Added", success: true, chat });
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Error", success: false });
    });
};
module.exports = addToGroup;
