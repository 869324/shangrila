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

async function getUsers() {
  const users = await User.findAll({
    where: {
      role: 2,
    },
  });

  return users.map((user) => user.dataValues);
}

module.exports = {
  createUser,
  getByEmail,
  updateCredit,
  getById,
  getUsers,
};
