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
    dialect: dbConfig.dialect,
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

module.exports = {
  getProductDb: async (uuid) => {
    try {
      if (!uuid) {
        throw new Error('ERROR: No product uuid defined');
      }

      const res = await Product.findAll({
        where: {
          uuid,
          deleteDate: null,
        },
      });

      if (res.rowCount === 0) {
        return {
          code: 200,
          responseData: `There is no item with uuid ${uuid}`,
        };
      }

      return res[0];
    } catch (err) {
      console.error(err.message || err);
      throw err;
    }
  },

  createProductDb: async ({
    item,
    type,
    measure,
    measureValue,
    priceType,
    priceValue,
  }) => {
    try {
      if (!item) {
        throw new Error('ERROR: No item defined');
      }
      if (!type) {
        throw new Error('ERROR: No item type defined');
      }
      if (!['quantity', 'weight'].includes(measure)) {
        throw new Error('ERROR: Item measure is not valid');
      }
      if (typeof measureValue !== 'number') {
        throw new Error('ERROR: Measure value should be a valid number');
      }
      if (!['pricePerItem', 'pricePerKilo'].includes(priceType)) {
        throw new Error('ERROR: Item price type is not valid');
      }
      if (!priceValue) {
        throw new Error('ERROR: No price value defined');
      }
      const res = await Product.create(
        {
          item,
          type,
          measure,
          measureValue,
          priceType,
          priceValue,
        },
        {
          returning: true,
        },
      );

      return res;
    } catch (err) {
      console.error(err.message || err);
      throw err;
    }
  },

  updateProductDb: async ({ uuid, ...productToUpdate }) => {
    try {
      if (!uuid) {
        throw new Error('ERROR: No product uuid defined');
      }

      const res = await Product.update(productToUpdate, {
        where: { uuid },
        returning: true,
      });

      return res[1];
    } catch (err) {
      console.error(err.message || err);
      throw err;
    }
  },

  getProductAllDb: async () => {
    try {
      const res = await Product.findAll({
        where: {
          deleteDate: null,
        },
        raw: true,
        nest: true,
      });

      return res;
    } catch (err) {
      console.error(err.message || err);
      throw err;
    }
  },

  deleteProductDb: async (uuid) => {
    try {
      if (!uuid) {
        throw new Error('ERROR: No product id defined');
      }

      await Product.update(
        {
          deleteDate: new Date(),
        },
        {
          where: { uuid },
        },
      );

      return {
        code: 200,
      };
    } catch (err) {
      console.error(err.message || err);
      throw err;
    }
  },
};
