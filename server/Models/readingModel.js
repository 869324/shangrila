const { DataTypes } = require("sequelize");
const db = require("../Config/config");

const Reading = db.define(
  "Reading",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
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
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { tableName: "readings", timestamps: false }
);

module.exports = Reading;
