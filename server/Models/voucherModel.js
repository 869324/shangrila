const { DataTypes } = require("sequelize");
const db = require("../Config/config");

const Voucher = db.define(
  "Voucher",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    credit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { tableName: "vouchers", timestamps: false }
);

module.exports = Voucher;
