const { db: dbConfig } = require('./config');
// const server = require('./server');
const db = require('./db')(dbConfig);

// function enableGracefulExit() {
//   const exitHandler = (error) => {
//     if (error) console.error(error);
//     console.log('Gracefully stopping...');
//     server.stop(() => {
//       process.exit();
//     });
//   };

//   process.on('SIGINT', exitHandler);
//   process.on('SIGTERM', exitHandler);
//   process.on('SIGUSR1', exitHandler);
//   process.on('SIGUSR2', exitHandler);
//   process.on('uncaughtException', exitHandler);
//   process.on('unhandledRejection', exitHandler);
// }

async function boot() {
  // enableGracefulExit();
  // server.start();
  // await db.testConnection();
  const createProduct = await db.createProduct({
    item: 'watermelon',
    type: 'Mini Piccolo',
    measure: 'Giant',
    measureValue: 46,
    priceType: 'pricePerItem',
    priceValue: '$8',
  });
  const getProductByID = await db.getProduct(1);
  // console.log(createProduct);
  // console.log(getProductByID);
}

boot();
