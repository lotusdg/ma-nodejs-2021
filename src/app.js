// const { db: dbConfig } = require('./config');
const server = require('./server');
// const db = require('./db')(dbConfig);

function enableGracefulExit() {
  const exitHandler = (error) => {
    if (error) console.error(error);
    console.log('Gracefully stopping...');
    server.stop(() => {
      process.exit();
    });
  };

  process.on('SIGINT', exitHandler);
  process.on('SIGTERM', exitHandler);
  process.on('SIGUSR1', exitHandler);
  process.on('SIGUSR2', exitHandler);
  process.on('uncaughtException', exitHandler);
  process.on('unhandledRejection', exitHandler);
}

function boot() {
  enableGracefulExit();
  server.start();
  // const updateProduct = await db.updateProduct({
  //   id: 3,
  //   item: 'test',
  //   type: 'Mini test',
  //   measure: 'test',
  //   measureValue: 46,
  //   priceType: 'test',
  //   priceValue: '$8',
  // });
  // console.log(await db.deleteProduct(3));
}

boot();
