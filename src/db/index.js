const { Pool } = require('pg');

module.exports = (config) => {
  const client = new Pool(config);
  return {
    testConnection: async () => {
      try {
        console.log('hello from testconnection');
        await client.query('SELECT NOW()');
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
