const { product, user, order } = require('../db');

async function getAllOrders() {
  try {
    const res = await order.findAll({
      where: {
        deletedAt: null,
      },
      attributes: { exclude: ['userID', 'productID'] },
      include: [{ model: user }, { model: product }],
    });
    if (!res[0]) {
      return [];
    }
    return res;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

const getOrderById = async (ID) => {
  try {
    if (!ID) {
      throw new Error('ERROR: No order id defined');
    }
    const res = await order.findByPk(ID, {
      attributes: { exclude: ['userID', 'productID'] },
      include: [{ model: user }, { model: product }],
    });
    if (!res || !res.dataValues) {
      return [];
    }
    return res.dataValues;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
};

async function createOrder(obj) {
  try {
    const timestamp = Date.now();
    const res = await product.findOne({
      where: {
        UUID: obj.productUUID,
        deletedAt: null,
      },
    });
    if (!res) {
      return [];
    }

    let userRef = await user.findOne({
      where: {
        login: obj.user,
      },
    });

    if (!userRef) {
      userRef = await user.create({
        login: obj.user,
        createdAt: timestamp,
        updateAt: timestamp,
        deletedAt: null,
      });
    }

    if (res.dataValues.measureValue < obj.quantity) {
      throw new Error('We have less quantity than you want');
    }
    const result = await order.create({
      productUUID: obj.productUUID,
      quantity: obj.quantity,
      status: 'in process',
      createdAt: timestamp,
      updateAt: timestamp,
      deletedAt: null,
      userID: userRef.dataValues.ID,
    });
    if (!result) {
      // eslint-disable-next-line quotes
      throw new Error("Can't create order");
    }
    return result;
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function updateOrder({ orderID, ...obj }) {
  try {
    if (!orderID) {
      throw new Error('ERROR: No order id defined');
    }
    const res = await product.findOne({
      where: {
        id: obj.productId,
        deletedAt: null,
      },
    });
    if (!res) {
      // eslint-disable-next-line quotes
      throw new Error("Can't update order. Such product is absent");
    }
    if (res.dataValues.measureValue < obj.quantity) {
      throw new Error('We have less than you want');
    }
    const result = await order.update(obj, {
      where: { ID: orderID },
      returning: true,
    });
    if (!result[1][0]) {
      // eslint-disable-next-line quotes
      throw new Error("Can't update order");
    }
    return result[1][0];
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

async function deleteOrder(orderID) {
  try {
    if (!orderID) {
      throw new Error('ERROR: No product id defined');
    }
    // await db.Product.destroy({ where: { id } });
    const res = await order.update(
      {
        deletedAt: Date.now(),
      },
      {
        where: { ID: orderID },
      },
    );
    if (res[0] !== 1) {
      throw new Error('Order is not deleted');
    }
    return { result: 'Order deleted' };
  } catch (err) {
    console.error(err.message || err);
    throw err;
  }
}

module.exports = {
  getOrderById,
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
