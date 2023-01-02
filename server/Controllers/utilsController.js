const PropertyType = require("../Models/propertyTypeModel");
const utilsRepo = require("../Repos/utilsRepo");

async function getPropertyTypes(req, res, next) {
  try {
    const propertyTypes = await utilsRepo.getPropertyTypes();
    res.send(propertyTypes);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPropertyTypes,
};
