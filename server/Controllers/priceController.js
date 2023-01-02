const priceRepo = require("../Repos/priceRepo");

async function getPrices(req, res, next) {
  try {
    const prices = await priceRepo.getPrices();

    res.send(prices);
  } catch (error) {
    next(error);
  }
}

async function updatePrices(req, res, next) {
  const prices = req.body;
  try {
    await priceRepo.updatePrices(prices);

    res.send(true);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPrices,
  updatePrices,
};
