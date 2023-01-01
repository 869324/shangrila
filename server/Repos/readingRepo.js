const { Op } = require("sequelize");
const Reading = require("../Models/readingModel");
const db = require("../Config/config");

async function createReading(reading) {
  const createdReading = await Reading.create(reading);
  return createdReading.dataValues;
}

async function getReadings(userId) {
  const readings = await Reading.findAll({
    where: {
      userId,
    },
  });

  return readings;
}

async function getLastReading(userId) {
  const reading = await Reading.findOne({
    where: {
      userId,
    },
    order: [["date", "desc"]],
    limit: 1,
  });

  return reading ? reading.dataValues : null;
}

async function getPreviousReading(reading) {
  const prevReading = await Reading.findOne({
    where: {
      userId: reading.userId,
      date: {
        [Op.lt]: db.fn("date", reading.date),
      },
    },
    order: [["date", "desc"]],
    limit: 1,
  });

  return prevReading ? prevReading.dataValues : null;
}

async function getUnpaidReadings(userId) {
  const readings = await Reading.findAll({
    where: {
      userId,
      paid: 0,
    },
  });

  return readings.map((reading) => reading.dataValues);
}

async function getByDate(userId, date) {
  const reading = await Reading.findOne({
    where: {
      userId,
      date: db.fn("date", date),
    },
  });

  return reading ? reading.dataValues : null;
}

async function updatePaid(id, paid) {
  await Reading.update(
    { paid },
    {
      where: {
        id,
      },
    }
  );
}

module.exports = {
  createReading,
  getReadings,
  getLastReading,
  getPreviousReading,
  getUnpaidReadings,
  getByDate,
  updatePaid,
};
