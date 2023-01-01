const User = require("../Models/userModel");

async function createUser(user, next) {
  const createdUser = await User.create(user);
  return createdUser.dataValues;
}

async function getByEmail(email, next) {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  return user;
}

module.exports = {
  createUser,
  getByEmail,
};
