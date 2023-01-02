const readingRepo = require("../Repos/readingRepo");
const userRepo = require("../Repos/userRepo");
const moment = require("moment");

async function getStats(req, res, next) {
  try {
    const stats = {};
    const users = await userRepo.getUsers();

    let sumGas = 0;
    let sumElectricityDay = 0;
    let sumElectricityNight = 0;
    let count = 0;

    for (let user of users) {
      const lastReading = await readingRepo.getLastReading(user.id);
      if (lastReading) {
        const prevReading = await readingRepo.getPreviousReading(lastReading);

        if (prevReading) {
          const days = moment(lastReading.date).diff(
            moment(prevReading.date),
            "days"
          );

          const gas = (lastReading.gas - prevReading.gas) / days;

          const electricityDay =
            (lastReading.electricityDay - prevReading.electricityDay) / days;

          const electricityNight =
            (lastReading.electricityNight - prevReading.electricityNight) /
            days;

          sumGas += gas;
          sumElectricityDay += electricityDay;
          sumElectricityNight += electricityNight;
          count += 1;
        }
      }
    }

    const gasAvg = parseFloat((sumGas / count).toFixed(2));

    const electricityDayAvg = parseFloat(
      (sumElectricityDay / count).toFixed(2)
    );

    const electricityNightAvg = parseFloat(
      (sumElectricityNight / count).toFixed(2)
    );

    stats.gas = gasAvg;
    stats.electricityDay = electricityDayAvg;
    stats.electricityNight = electricityNightAvg;

    res.send(stats);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getStats,
};
