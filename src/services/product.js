const db = require('../db');
const { httpCodes } = require('./helpers');
const { validateParam } = require('./helpers/newValidator');

function createResponse(code, message) {
  return { code, message };
}

async function getProductByUuid(params) {
  const { uuid } = params;
  try {
    if (!uuid) {
      throw new Error('ERROR: No product uuid defined');
    }

    const result = await db.product.findAll({
      where: {
        uuid,
        deleteDate: null,
      },
    });

    if (result.length === 0) {
      return createResponse(httpCodes.ok, {
        message: `There is no item with uuid ${uuid}`,
      });
    }

    return createResponse(httpCodes.ok, { message: result[0] });
  } catch (e) {
    return createResponse(httpCodes.badReq, { error: e.message || e });
  }
}

async function createProduct(body) {
  try {
    const { item, type, measure, measureValue, priceType, priceValue } = body;

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
    const message = await db.product.create(
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

    return createResponse(httpCodes.ok, { message: message.dataValues });
  } catch (err) {
    return createResponse(httpCodes.badReq, { error: err.message || err });
  }
}

async function getProducts(obj) {
  try {
    // const validObj = validateParam(obj);
    const result = await db.product.findAll({
      where: { ...obj, deletedAt: obj.deletedAt || null },
    });
    if (result.length === 0) {
      return createResponse(httpCodes.ok, {
        message: 'There is no items',
      });
    }
    return createResponse(httpCodes.ok, { message: result });
  } catch (err) {
    return createResponse(httpCodes.badReq, { message: err.message || err });
  }
}

async function updateProduct(body) {
  try {
    const productFields = {
      uuid: body.uuid,
      item: body.item,
      type: body.type,
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

    const result = await db.product.update(productFields, {
      where: { uuid: productFields.uuid },
      returning: true,
    });

    return createResponse(httpCodes.ok, { message: result[1] });
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function deleteProduct(params) {
  const { uuid } = params;
  try {
    if (!uuid) {
      throw new Error('ERROR: No product id defined');
    }

    await db.product.update(
      {
        deleteDate: new Date(),
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
};
