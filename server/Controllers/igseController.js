const readingRepo = require("../Repos/readingRepo");
const userRepo = require("../Repos/userRepo");
const utilsRepo = require("../Repos/utilsRepo");
const priceRepo = require("../Repos/priceRepo");

const moment = require("moment");

async function getPropertyCount(req, res, next) {
  try {
    const propertyTypes = await utilsRepo.getPropertyTypes();

    const data = [];

    for (let type of propertyTypes) {
      const users = userRepo.getByType(type.id);

      data.push({
        [type.name]: (await users).length,
      });
    }

    res.send(data);
  } catch (error) {
    next(error);
  }
}

async function getAverage(req, res, next) {
  const { propertyName, bedrooms } = req.params;

  try {
    const data = {};
    const prices = await priceRepo.getPrices();
    const propertyType = await utilsRepo.getTypeByName(propertyName);

    if (propertyType) {
      const users = await userRepo.getByTypeAndBedrooms(
        propertyType.id,
        bedrooms
      );

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

            const gas =
              ((lastReading.gas - prevReading.gas) / days) * prices.gas;

            const electricityDay =
              ((lastReading.electricityDay - prevReading.electricityDay) /
                days) *
              prices.electricityDay;

            const electricityNight =
              ((lastReading.electricityNight - prevReading.electricityNight) /
                days) *
              prices.electricityNight;

            sumGas += gas;
            sumElectricityDay += electricityDay;
            sumElectricityNight += electricityNight;
            count += 1;
          }
        }
      }

      const gasAvg = sumGas / count;

      const electricityDayAvg = sumElectricityDay / count;

      const electricityNightAvg = sumElectricityNight / count;

      const totalAvg = (
        (gasAvg + electricityDayAvg + electricityNightAvg) /
        3
      ).toFixed(2);

      data.type = propertyName;
      data.bedrooms = bedrooms;
      data.average_electricity_gas_cost_per_day = totalAvg;
      data.unit = "pound";

      res.send(data);
    } else {
      next(new Error("Invalid property type!"));
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAverage,
  getPropertyCount,
};
