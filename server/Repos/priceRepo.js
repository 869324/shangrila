const Price = require("../Models/priceModel");

async function getPrices() {
  const price = await Price.findOne({
    limit: 1,
  });

  return price.dataValues;
}

async function updatePrices(prices) {
  await Price.update(
    {
      gas: prices.gas,
      electricityDay: prices.electricityDay,
      electricityNight: prices.electricityNight,
    },
    {
      where: {
        id: prices.id,
      },
    }
  );
}

module.exports = {
  getPrices,
  updatePrices,
};
