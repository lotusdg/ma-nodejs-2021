const { Pool } = require('pg');

module.exports = (config) => {
  const client = new Pool(config);
  return {
    testConnection: async () => {
      try {
        console.log('hello from pg test connection');
        const timeFromDb = await client.query('SELECT NOW()');
        return timeFromDb.rows[0];
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

        return {
          message: `DEBUG: New product created: ${JSON.stringify(
            result.rows[0],
          )}`,
        };
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    getProduct: async (id) => {
      try {
        if (!id) {
          throw new Error('ERROR: Products id is not defined');
        }
        const result = await client.query(
          'SELECT * FROM Products p WHERE p.id = $1 AND p.deletedate IS NULL',
          [id],
        );
        if (!result.rows[0]) {
          return { message: 'no requested items' };
        }
        return result.rows[0];
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    updateProduct: async ({ id, ...product }) => {
      try {
        if (!id) {
          throw new Error('ERROR: Product is not defined');
        }

        const query = [];
        const values = [];

        // eslint-disable-next-line no-restricted-syntax
        for (const [i, [k, v]] of Object.entries(product).entries()) {
          query.push(`${k} = $${i + 1}`);
          values.push(v);
        }

        if (!values.length) {
          throw new Error('Error: Nothing to update');
        }
        values.push(new Date());
        values.push(id);

        const result = await client.query(
          `UPDATE products SET ${query.join(',')}, datelastchange = $${
            values.length - 1
          } WHERE id = $${values.length} RETURNING *`,
          values,
        );

        return {
          message: `DEBUG: Product updated ${JSON.stringify(result.rows[0])}`,
        };
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    deleteProduct: async (id) => {
      try {
        if (!id) {
          throw new Error('ERROR: Products id is not defined');
        }

        const timestamp = new Date();

        await client.query(
          'UPDATE products SET deletedate = $1 WHERE id = $2',
          [timestamp, id],
        );
        return { message: 'Product was deleted' };
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
