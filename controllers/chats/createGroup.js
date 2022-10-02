const Chat = require("../../models/chat");
const User = require("../../models/user");
const createGroup = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res
      .json({ message: "Please Fill All The Fields", success: false })
      .status(400);
  }
  let Users = JSON.parse(req.body.users);
  if (Users.length < 2) {
    return res.json({
      message:
        "Group Creation Failed , Expected more than 2 members in a group!",
      success: false,
    });
  }
  Users.push(req.user);
  try {
    const groupChat = {
      name: req.body.name,
      users: Users,
      isGroup: true,
      admin: req.user,
    };
    let result = await Chat.create(groupChat);
    let finalresult = await Chat.findOne({ _id: result._id })
      .populate("users", "-password")
      .populate("admin", "-password");

    res
      .json({
        message: "Group Created Successfully!",
        success: true,
        group: finalresult,
      })
      .status(200);
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
};
module.exports = createGroup;
