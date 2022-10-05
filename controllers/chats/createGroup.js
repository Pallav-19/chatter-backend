const Chat = require("../../models/chat");
const User = require("../../models/user");
const createGroup = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res
      .json({ message: "Please Fill All The Fields", success: false })
      .status(400);
  }
  let Users = (req.body.users);
  console.log(Users);
  if (Users.length < 2) {
    return res.json({
      message:
        "Group Creation Failed , Expected more than 2 members in a group!",
      success: false,
    });
  }
  Users.push(req.user.userId);
  console.log(Users)
  try {
    const groupChat = {
      name: req.body.name,
      users: Users,
      isGroup: true,
      admin: req.user.userId,
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
    console.log(err);
    res.json({ message: "Internal error", success: false });
  }
};
module.exports = createGroup;
