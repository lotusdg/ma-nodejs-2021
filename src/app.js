const server = require('./server');

// Graceful exit
function enableGracefulExit() {
  const exitHandler = (error) => {
    if (error) console.error(error);

    console.log('Gracefully stopping...');
    server.stop(() => {
      process.exit();
    });
  };

  // catching ctrl+c event
  process.on('SIGINT', exitHandler);
  process.on('SIGTERM', exitHandler);

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler);
  process.on('SIGUSR2', exitHandler);

  // catches uncaught/unhandled exceptions
  process.on('uncaughtException', exitHandler);
  process.on('unhandledRejection', exitHandler);
}

function boot() {
  enableGracefulExit();
  server.start();
}

boot();
