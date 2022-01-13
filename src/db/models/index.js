const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const { db: dbConfig } = require('../../config');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
  },
);

const fileBaseName = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    const returnFile =
      file.indexOf('.') !== 0 &&
      file !== fileBaseName &&
      file.slice(-3) === '.js';
    return returnFile;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const sequelizeOptions = { logging: console.log };

sequelize.sync(sequelizeOptions).catch((err) => {
  console.log(err);
  process.exit();
});

module.exports = db;
