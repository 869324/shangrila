const userRepo = require("../Repos/userRepo");
const voucherRepo = require("../Repos/voucherRepo");
const priceRepo = require("../Repos/priceRepo");
const readingRepo = require("../Repos/readingRepo");
const moment = require("moment");

async function getBills(req, res, next) {
  const { userId } = req.body;
  const prices = await priceRepo.getPrices();

  try {
    let readings = await readingRepo.getUnpaidReadings(userId);

    const bills = [];

    for (let reading of readings) {
      const prevReading = await readingRepo.getPreviousReading(reading);

      if (prevReading) {
        const fromDate = prevReading.date;
        const toDate = reading.date;

        const days = moment(toDate).diff(moment(fromDate), "days");

        const gas = parseFloat(
          ((reading.gas - prevReading.gas) * prices.gas).toFixed(2)
        );

        const electricityDay = parseFloat(
          (
            (reading.electricityDay - prevReading.electricityDay) *
            prices.electricityDay
          ).toFixed(2)
        );

        const electricityNight = parseFloat(
          (
            (reading.electricityNight - prevReading.electricityNight) *
            prices.electricityNight
          ).toFixed(2)
        );

        const standingCharge = parseFloat(
          (days * prices.standingCharge).toFixed(2)
        );

        const total = parseFloat(
          (gas + electricityDay + electricityNight + standingCharge).toFixed(2)
        );

        bills.push({
          userId: reading.userId,
          fromDate,
          toDate,
          gas,
          electricityDay,
          electricityNight,
          standingCharge,
          total,
        });
      }
    }

    res.send(bills);
  } catch (error) {
    next(error);
  }
}

async function pay(req, res, next) {
  const bill = req.body;

  const user = await userRepo.getById(bill.userId);
  if (user.credit < bill.total) {
    next(new Error("You do not have enough credit to make this payment!"));
  } else {
    const reading = await readingRepo.getByDate(bill.userId, bill.toDate);

    if (reading) {
      try {
        readingRepo.updatePaid(reading.id, true);
        userRepo.updateCredit(user.id, user.credit - bill.total);
        res.send(true);
      } catch (error) {
        next(error);
      }
    } else {
      next(new Error("Problem processing bill"));
    }
  }
}

module.exports = {
  getBills,
  pay,
};
