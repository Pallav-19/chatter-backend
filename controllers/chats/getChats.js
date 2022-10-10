const User = require("../../models/user");
const Chat = require("../../models/chat");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET);
const getChats = async (req, res) => {
  //console.log("in get");
  try {
    //console.log(req.user.userId);
    Chat.find({ users: { $elemMatch: { $eq: req.user.userId } } })
      .populate("users", "-password")
      .populate("admin", "-password")
      .populate({ path: "lastMessage" })
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "lastMessage.sender",
          select: "name email pic",
        });
        results = results.map((r) => {
          if (!r._doc.lastMessage) return { ...r._doc };
          else
            return {
              ...r._doc,
              lastMessageContent: cryptr.decrypt(r._doc.lastMessage?.content),
            };
        });
        // console.log(results[0]);
        // res.json(results).status(200);
        //console.log(results.length);
      });
  } catch (err) {
    res
      .json({
        message: "An Internal Error Occured ! Try Again!",
        success: false,
      })
      .status(400);
  }
};
module.exports = getChats;
