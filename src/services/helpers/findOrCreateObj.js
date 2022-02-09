const crud = require('../product');
const db = require('../../db');
const { validator } = require('./index');

async function findOrCreateObj(obj) {
  try {
    validator([obj]);
    const [{ id: itemId }] = await db.item.findOrCreate({
      attributes: ['id'],
      where: { name: obj.item },
    });
    const [{ id: typeId }] = await db.type.findOrCreate({
      attributes: ['id'],
      where: { name: obj.type },
    });
    const similarProduct = await crud.getProductByTypeAndPrice(
      typeId,
      obj.priceValue,
    );
    if (!similarProduct) {
      return await db.product.create(
        {
          itemId,
          typeId,
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
      uuid: similarProduct.dataValues.UUID,
      itemId,
      typeId,
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
