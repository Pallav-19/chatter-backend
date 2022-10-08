const Chat = require("../../models/chat");
const User = require("../../models/user");

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  Chat.findOneAndUpdate(
    { _id: chatId },
    {
      name: chatName,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("admin", "-password")
    .then((result) => {
      if (!result) {
        res.json({ message: "Unable to update", success: false });
      } else {
        res.json({
          message: "Group name updated successfully!",
          success: true,
          result,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal error occured!", success: false });
    });
};
module.exports = renameGroup;
