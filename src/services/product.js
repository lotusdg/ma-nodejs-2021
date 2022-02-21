const db = require('../db');
const { product } = require('../db');
const { httpCodes, validator } = require('./helpers');

function createResponse(code, message) {
  return { code, message };
}

async function getProducts() {
  try {
    const result = await product.findAll({
      where: {
        deletedAt: null,
      },
      attributes: { exclude: ['itemId', 'typeId'] },
      include: [{ model: db.item }, { model: db.type }],
    });
    return result;
  } catch (err) {
    throw new Error(err.message || err);
  }
}

async function getProductByUuid(params) {
  const uuid = params;
  try {
    if (!uuid) {
      throw new Error('ERROR: No product uuid defined');
    }

    const result = await product.findAll({
      where: {
        uuid,
        deletedAt: null,
      },
      attributes: { exclude: ['itemId', 'typeId'] },
      include: [{ model: db.item }, { model: db.type }],
    });

    if (result.length === 0) {
      return createResponse(httpCodes.ok, {
        message: `There is no item with uuid ${uuid}`,
      });
    }

    return createResponse(httpCodes.ok, result[0]);
  } catch (e) {
    return createResponse(httpCodes.badReq, { error: e.message || e });
  }
}

async function getProductByTypeAndPrice(typeId, itemId, priceValue) {
  try {
    if (!typeId || !itemId) {
      throw new Error('ERROR: No product type defined');
    }
    const res = await product.findOne({
      where: {
        typeId,
        itemId,
        priceValue,
        deletedAt: null,
      },
    });
    return res;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function updateProduct(body, uuid) {
  try {
    const productFields = {
      uuid: body.uuid || uuid,
      itemId: body.itemId,
      typeId: body.typeId,
      measure: body.measure,
      measureValue: body.measureValue,
      priceType: body.priceType,
      priceValue: body.priceValue,
    };
    Object.keys(productFields).forEach((key) => {
      if (typeof productFields[key] === 'undefined') {
        delete productFields[key];
      }
    });

    const result = await product.update(productFields, {
      where: { uuid: productFields.uuid },
      returning: true,
    });

    return createResponse(httpCodes.ok, result[1][0].dataValues);
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function createProduct(itemId, typeId, obj) {
  try {
    const result = await db.product.create(
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
    return createResponse(httpCodes.ok, result);
  } catch (err) {
    return createResponse(httpCodes.badReq, { error: err.message || err });
  }
}

async function findOrCreate(obj) {
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
    const similarProduct = await getProductByTypeAndPrice(
      typeId,
      itemId,
      obj.priceValue,
    );
    if (!similarProduct) {
      return createProduct(itemId, typeId, obj);
    }
    return await updateProduct({
      uuid: similarProduct.dataValues.uuid,
      itemId,
      typeId,
      measure: obj.measure || similarProduct.dataValues.measure,
      measureValue: similarProduct.dataValues.measureValue + obj.measureValue,
      priceType: obj.priceType || similarProduct.dataValues.priceType,
      priceValue: obj.priceValue || similarProduct.dataValues.priceValue,
    });
  } catch (err) {
    throw new Error(err.message || err);
  }
}

async function deleteProduct(params) {
  const uuid = params;
  try {
    if (!uuid) {
      throw new Error('ERROR: No product id defined');
    }
    await product.update(
      {
        deletedAt: new Date(),
      },
      {
        where: { uuid },
      },
    );
    return createResponse(httpCodes.ok);
  } catch (err) {
    return createResponse(httpCodes.badReq, {
      error: err.message || err,
    });
  }
}

module.exports = {
  getProductByUuid,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductByTypeAndPrice,
  findOrCreate,
};
