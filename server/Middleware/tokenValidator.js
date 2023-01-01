const { verifyToken } = require("../Utils/jwt");

const tokenValidator = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    next(new Error("Unauthorized"));
  } else {
    token = token.split("").slice(7, token.length).join("");

    try {
      verifyToken(token);
      next();
    } catch (error) {
      next(new Error("Unauthorized"));
    }
  }
};

module.exports = tokenValidator;
