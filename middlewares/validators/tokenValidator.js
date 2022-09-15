const jwt = require("jsonwebtoken");

const tokenValidator = async (req, res, next) => {
  if (req.headers.authorisation) {
    const authToken = req.headers.authorisation;
    req.user = jwt.verify(authToken, process.env.JWT_SECET);
    try {
    } catch (err) {}
  }
};
module.exports = tokenValidator;
