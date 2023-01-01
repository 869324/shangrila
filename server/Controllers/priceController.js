const priceRepo = require("../Repos/priceRepo");

async function getPrices(req, res, next) {
  try {
    const prices = await priceRepo.getPrices();

    res.send(prices);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPrices,
};
