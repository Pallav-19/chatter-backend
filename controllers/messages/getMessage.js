const Chat = require("../../models/chat");
  
const Message = require("../../models/message");
const getMessages = async (req, res) => {
  const chatId = req.params.chatId;
  await Message.find({ chat: chatId })
    .populate([{ path: "sender", select: "-password" }, { path: "chat" }])
    .then((allmessages) => {
      if (allmessages) {
      
        
        res
          .json({
            message: "messages found",
            messages: allmessages,
            success: true,
          })
          .status(200);
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal error", success: true }).status(400);
    });
};
module.exports = getMessages;
