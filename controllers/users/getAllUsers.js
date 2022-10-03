const User = require("../../models/user");

const getAllUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({
    _id: { $ne: req.user.userId },
  });
  if (users.length > 0) {
    res.json({ message: "Users found! ", users, success: true });
  } else {
    res.json({ message: "Users not found!", users: [], success: false });
  }
};
module.exports = getAllUsers;
