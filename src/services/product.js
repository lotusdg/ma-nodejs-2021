const db = require('../db');
const { httpCodes } = require('./helpers');

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

async function getProducts() {
  try {
    const result = await db.product.findAll({
      where: { deletedAt: null },
    });
    if (result.length === 0) {
      throw new Error('Products not found');
    }
    return result;
  } catch (err) {
    throw new Error(err.message || err);
  }
}

async function updateProduct(body) {
  try {
    const productFields = {
      UUID: body.UUID,
      itemID: body.itemID,
      typeID: body.typeID,
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
      where: { UUID: productFields.UUID },
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

async function getProductByTypeAndPrice(typeID, priceValue) {
  try {
    if (!typeID) {
      throw new Error('ERROR: No product type defined');
    }
    const res = await db.product.findOne({
      where: {
        typeID,
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

module.exports = {
  getProductByUuid,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductByTypeAndPrice,
};
