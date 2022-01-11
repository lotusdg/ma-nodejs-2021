const server = require('./server');
const { db: dbConfig } = require('./config');
const db = require('./db')(dbConfig);

function enableGracefulExit() {
  const exitHandler = (error) => {
    if (error) console.error(error);
    console.log('Gracefully stopping...');
    server.stop(() => {
      db.close();
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
}

boot();
