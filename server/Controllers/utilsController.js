const PropertyType = require("../Models/propertyTypeModel");

async function getPropertyTypes(req, res, next) {
  let propertyTypes = await PropertyType.findAll();
  res.send(propertyTypes);
}

module.exports = {
  getPropertyTypes,
};
