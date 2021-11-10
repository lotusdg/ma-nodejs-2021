const controllers = require('./controllers');

module.exports = (req, res) => {
  const { pathname, method } = req;

  if (pathname === '/' && method === 'GET') return controllers.home(req, res);
  if (pathname === '/home' && method === 'GET')
    return controllers.home(req, res);

  if (pathname === '/store' && method === 'GET')
    return controllers.store(req, res);
  if (pathname === '/poststore' && method === 'POST')
    return controllers.poststore(req, res);

  return controllers.notFound(req, res);
};
