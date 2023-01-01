const { Sequelize } = require("sequelize");
require("dotenv").config();

const config = {
  user: process.env.user,
  database: process.env.database,
  password: process.env.password,
  host: process.env.host,
};

const db = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
});

module.exports = db;
