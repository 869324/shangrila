const PropertyType = require("../Models/propertyTypeModel");
const db = require("../Config/config");

async function getPropertyTypes(req, res, next) {
  let propertyTypes = await PropertyType.findAll();
  res.send(propertyTypes);
}

module.exports = {
  getPropertyTypes,
};
