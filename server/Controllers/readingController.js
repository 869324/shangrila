const readingRepo = require("../Repos/readingRepo");

async function createReading(req, res, next) {
  const reading = req.body;

  try {
    const previousReading = await readingRepo.getLastReading(reading.userId);

    if (previousReading) {
      validateReading(reading, previousReading, next);
    }

    let createdReading = await readingRepo.createReading(reading);
    res.send(createdReading);
  } catch (error) {
    next(error);
  }
}

async function getReadings(req, res, next) {
  const { userId } = req.body;

  try {
    const readings = await readingRepo.getReadings(userId);
    res.send(readings);
  } catch (error) {
    next(error);
  }
}

function validateReading(reading, previousReading) {
  if (new Date(reading.date) <= new Date(previousReading.date)) {
    throw new Error(
      "The entered date is less/equal to the last reading's date!"
    );
  } else if (reading.gas < previousReading.gas) {
    throw new Error(
      "The entered gas reading is less than the last reading's amount!"
    );
  } else if (reading.electricityDay < previousReading.electricityDay) {
    throw new Error(
      "The entered electricity (day) reading is less than the last reading's amount!"
    );
  } else if (reading.electricityNight < previousReading.electricityNight) {
    throw new Error(
      "The entered electricity (night) reading is less than the last reading's amount!"
    );
  }
}

module.exports = {
  createReading,
  getReadings,
};
