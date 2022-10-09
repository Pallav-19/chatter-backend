const User = require("../../models/user");

const getAllUsers = async (req, res) => {
  const keyword = (await req.query.search)
    ? {
        $or: [
          { name: { $regex: await req.query.search, $options: "i" } },
          { email: { $regex: await req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword)
    .find({
      _id: { $ne: req.user.userId },
    })
    .select("-password");
  if (users.length > 0) {
    res.json({ message: "Users found! ", users, success: true });
    //console.log(users);
  } else {
    //console.log("not found");
    res.json({ message: "Users not found!", users: [], success: false });
  }
};
module.exports = getAllUsers;
