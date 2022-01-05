const { Pool } = require('pg');

module.exports = (config) => {
  const client = new Pool(config);
  return {
    testConnection: async () => {
      try {
        console.log('hello from pg test connection');
        const timeFromDb = await client.query('SELECT NOW()');
        console.log(timeFromDb.rows[0]);
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    createProduct: async ({
      item,
      type,
      measure,
      measureValue,
      priceType,
      priceValue,
    }) => {
      try {
        if (
          !item ||
          !type ||
          !measure ||
          !measureValue ||
          !priceType ||
          !priceValue
        ) {
          throw new Error('ERROR: Product is not defined');
        }

        const timestamp = new Date();

        const result = await client.query(
          'INSERT INTO Products(item, type, measure, measurevalue, pricetype, pricevalue, createdate, datelastchange, deletedate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
          [
            item,
            type,
            measure,
            measureValue,
            priceType,
            priceValue,
            timestamp,
            timestamp,
            null,
          ],
        );

        return `DEBUG: New product created: ${JSON.stringify(result.rows[0])}`;
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    getProduct: async (id) => {
      try {
        if (!id) {
          throw new Error('ERROR: Product is not defined');
        }
        const result = await client.query(
          'SELECT * FROM Products p WHERE p.id = $1 AND p.deletedate IS NULL',
          [id],
        );
        return result.rows[0];
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    close: async () => {
      console.log('close pg db connection');
      client.end();
    },
  };
};
