const controllers = require('./controllers');

module.exports = (req, res) => {
  const { pathname, method } = req;

  if (pathname === '/' && method === 'GET') return controllers.home(req, res);
  if (pathname === '/home' && method === 'GET')
    return controllers.home(req, res);

  if (pathname === '/filter' && method === 'GET')
    return controllers.filter(req, res);
  if (pathname === '/postFilter' && method === 'POST')
    return controllers.postFilter(req, res);

  if (pathname === '/topprice' && method === 'GET')
  return controllers.filter(req, res);

  return controllers.notFound(req, res);
};
