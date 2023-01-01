const moment = require("moment");
const User = require("../Models/userModel");
const voucherRepo = require("../Repos/voucherRepo");
const userRepo = require("../Repos/userRepo");
const crypto = require("crypto");
const jwtUtils = require("../Utils/jwt");
const db = require("../Config/config");

async function login(req, res, next) {
  const { username, password } = req.body;

  const hash = crypto.createHash("sha256").update(password).digest("base64");

  let user = await userRepo.getByEmail(username);
  if (user) {
    user = user.dataValues;

    if (user.password == hash) {
      res.send(jwtUtils.createToken(user));
    } else {
      next(new Error("Invalid password!"));
    }
  } else {
    next(new Error("Invalid username!"));
  }
}

async function verifyToken(req, res, next) {
  const { token } = req.body;

  try {
    const status = jwtUtils.verifyToken(token);

    res.send(status ? true : false);
  } catch (error) {
    next(error);
  }
}

async function getUsers(req, res) {
  const users = await User.findAll({
    where: {
      role: 2,
    },
  });

  res.send(users);
}

async function createUser(req, res, next) {
  const user = req.body;

  let voucher = await voucherRepo.getByCode(user.voucher, next);

  if (!voucher) {
    next(new Error("Invalid voucher code!"));
  } else {
    voucher = voucher.dataValues;

    if (voucher.userId) {
      next(new Error("Voucher is used!"));
    } else {
      const hash = crypto
        .createHash("sha256")
        .update(user.password)
        .digest("base64");

      user.password = hash;
      user.credit = voucher.credit;
      delete user.voucher;

      try {
        const createdUser = await userRepo.createUser(user, next);
        voucherRepo.updateOwner(voucher.id, createdUser.id, next);

        delete createdUser.password;
        res.send(createdUser);
      } catch (error) {
        switch (error.parent.code) {
          case "ER_DUP_ENTRY":
            next(new Error("Email already in use!"));
            break;

          default:
            next(error);
            break;
        }
      }
    }
  }
}

module.exports = {
  getUsers,
  createUser,
  login,
  verifyToken,
};
