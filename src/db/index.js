const { Sequelize } = require('sequelize');

const { DataTypes } = require('sequelize');

const { db: dbConfig } = require('../config');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
  },
);

const Product = sequelize.define('product', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  item: DataTypes.STRING,
  type: DataTypes.STRING,
  measure: DataTypes.STRING,
  measureValue: DataTypes.FLOAT,
  priceType: DataTypes.STRING,
  priceValue: DataTypes.STRING,
  deleteDate: DataTypes.DATE,
});

module.exports = Product;
