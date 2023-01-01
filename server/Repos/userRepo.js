const User = require("../Models/userModel");

async function createUser(user) {
  const createdUser = await User.create(user);
  return createdUser.dataValues;
}

async function getByEmail(email) {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  return user ? user.dataValues : null;
}

async function getById(id) {
  const user = await User.findOne({
    where: {
      id,
    },
  });

  return user ? user.dataValues : null;
}

async function updateCredit(id, credit) {
  await User.update(
    { credit },
    {
      where: {
        id,
      },
    }
  );
}

module.exports = {
  createUser,
  getByEmail,
  updateCredit,
  getById,
};
