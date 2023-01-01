const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.jwt_secret;

const createToken = (user) => {
  return jwt.sign(user, secret);
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

const decode = (token) => {
  return jwt.decode(token, secret);
};

module.exports = {
  createToken,
  verifyToken,
  decode,
};
