const PropertyType = require("../Models/propertyTypeModel");

async function getPropertyTypes() {
  const propertyTypes = await PropertyType.findAll();
  return propertyTypes;
}

async function getTypeByName(name) {
  const propertyType = await PropertyType.findOne({
    where: { name },
  });
  return propertyType ? propertyType.dataValues : null;
}

module.exports = {
  getPropertyTypes,
  getTypeByName,
};
