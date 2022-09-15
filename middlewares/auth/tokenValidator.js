const jwt = require("jsonwebtoken");

const tokenValidator = async (req, res, next) => {
  if (req.headers.authorisation) {
    try {
      const authToken = req.headers.authorisation;
      req.user = jwt.verify(authToken, process.env.JWT_SECET);
      next();
    } catch (err) {
      res
        .json({ message: "You are not Authorised! " + err, success: false })
        .status(400);
    }
  }
};
module.exports = tokenValidator;
