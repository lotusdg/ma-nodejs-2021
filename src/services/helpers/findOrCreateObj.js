const crud = require('../product');
const db = require('../../db');
const { validator } = require('./index');

async function findOrCreateObj(obj) {
  try {
    validator([obj]);
    const [{ ID: itemID }] = await db.item.findOrCreate({
      attributes: ['ID'],
      where: { name: obj.item },
    });
    const [{ ID: typeID }] = await db.type.findOrCreate({
      attributes: ['ID'],
      where: { name: obj.type },
    });
    const similarProduct = await crud.getProductByTypeAndPrice(
      typeID,
      obj.priceValue,
    );
    if (!similarProduct) {
      return await db.product.create(
        {
          itemID,
          typeID,
          measure: obj.measure,
          measureValue: obj.measureValue,
          priceType: obj.priceType,
          priceValue: obj.priceValue,
        },
        {
          returning: true,
        },
      );
    }
    return await crud.updateProduct({
      UUID: similarProduct.dataValues.UUID,
      itemID,
      typeID,
      measure: similarProduct.dataValues.measure,
      measureValue: similarProduct.dataValues.measureValue + obj.measureValue,
      priceType: similarProduct.dataValues.priceType,
      priceValue: similarProduct.dataValues.priceValue,
    });
  } catch (err) {
    throw new Error(err.message || err);
  }
}

module.exports = { findOrCreateObj };
