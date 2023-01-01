const { DataTypes } = require("sequelize");
const db = require("../Config/config");

const Price = db.define(
  "Price",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    gas: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    electricityDay: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    electricityNight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    standingCharge: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { tableName: "prices", timestamps: false }
);

module.exports = Price;
