const Message = require("../../models/message");
const User = require("../../models/user");
const Chat = require("../../models/chat");
  
const createMessage = async (req, res) => {
  Message.create({
    sender: req.user.userId,
    content: req.body.content,
    chat: req.body.chatId,
  })
    .then(async (newMessage) => {
      await Chat.findByIdAndUpdate(
        req.body.chatId,
        { lastMessage: newMessage._id },
        { new: true }
      );
      newMessage = await newMessage.populate([
        { path: "sender", select: "-password" },
        {
          path: "chat",
          populate: [
            { path: "users", select: "-password" },
            { path: "admin", select: "-password" },
            {
              path: "lastMessage",
            },
          ],
        },
      ]);

    

      res
        .json({
          newMessage: newMessage,
          message: "Message sent!",
          success: true,
        })
        .status(200);
    })
    .catch((err) => {
      console.log(err);
      res
        .json({
          message: "An error occured!",

          success: false,
        })
        .status(500);
    });
};
module.exports = createMessage;
