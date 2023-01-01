const Voucher = require("../Models/voucherModel");
const createError = require("http-errors");

async function getById(id) {
  const voucher = await Voucher.findOne({
    where: {
      id,
    },
  });

  if (!voucher) {
    throw new Error("Voucher not found!");
  } else {
    return voucher.dataValues;
  }
}

async function getByCode(code, next) {
  const voucher = await Voucher.findOne({
    where: {
      code,
    },
  });

  return voucher;
}

async function updateOwner(voucherId, userId, next) {
  console.log({ voucherId, userId });
  await Voucher.update(
    { userId },
    {
      where: {
        id: voucherId,
      },
    }
  );
}

module.exports = {
  getById,
  getByCode,
  updateOwner,
};
