const { DataTypes } = require("sequelize");
const db = require("../Config/config");

const PropertyType = db.define(
  "PropertyType",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "propertyTypes", timestamps: false }
);

module.exports = PropertyType;
