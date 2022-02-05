const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const { db: dbConfig } = require('../config');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  { ...dbConfig },
);

const fileBaseName = path.basename(__filename);
const db = {};

fs.readdirSync(path.join(__dirname, 'models'))
  .filter((file) => {
    const returnFile =
      file.indexOf('.') !== 0 &&
      file !== fileBaseName &&
      file.slice(-3) === '.js';
    return returnFile;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, 'models', file))(
      sequelize,
      DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// синхронизация всех моделей

// async function sync() {
//   await sequelize.sync({ force: true });
//   console.log('Все модели были успешно синхронизированы.');
// }

// sync();

module.exports = db;
