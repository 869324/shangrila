const Price = require("../Models/priceModel");

async function getPrices() {
  const price = await Price.findOne({
    limit: 1,
  });

  return price.dataValues;
}

module.exports = {
  getPrices,
};
