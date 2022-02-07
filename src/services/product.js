const db = require('../db');
const { httpCodes, validationAndParse } = require('./helpers');

function createResponse(code, message) {
  return { code, message };
}

async function getProducts() {
  try {
    const result = await db.product.findAll({
      where: {
        deletedAt: null,
      },
      attributes: { exclude: ['itemID', 'typeID'] },
      include: [{ model: db.item }, { model: db.type }],
    });
    return result;
  } catch (err) {
    throw new Error(err.message || err);
  }
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
    const { err } = validationAndParse([body]);
    if (err) {
      throw new Error(err.message || err);
    }
    const timestamp = Date.now();
    const resItem = await db.item.create({
      name: body.item,
      createdAt: timestamp,
      updateAt: timestamp,
    });
    const resType = await db.type.create({
      name: body.item,
      createdAt: timestamp,
      updateAt: timestamp,
    });
    const result = await db.product.create({
      measure: body.measure,
      measureValue: body.measureValue,
      priceValue: body.priceValue,
      itemID: resItem.dataValues.ID,
      typeID: resType.dataValues.ID,
      createdAt: timestamp,
      updateAt: timestamp,
      deletedAt: null,
    });
    return createResponse(httpCodes.ok, result);
  } catch (err) {
    return createResponse(httpCodes.badReq, { error: err.message || err });
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

    return createResponse(httpCodes.ok, result[1]);
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function deleteProduct(params) {
  const { UUID } = params;
  try {
    if (!UUID) {
      throw new Error('ERROR: No product id defined');
    }
    await db.product.update(
      {
        deletedAt: new Date(),
      },
      {
        where: { UUID },
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
