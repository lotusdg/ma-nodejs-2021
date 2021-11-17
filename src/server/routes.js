const controllers = require('./controllers');

module.exports = (req, res) => {
  const { pathname, method } = req;

  if (pathname === '/' && method === 'GET') {
    return controllers.home(req, res);
  }
  if (pathname === '/home' && method === 'GET') {
    return controllers.home(req, res);
  }

  if (pathname === '/filter' && method === 'GET') {
    return controllers.filter(req, res);
  }
  if (pathname === '/filter' && method === 'POST') {
    return controllers.postFilter(req, res);
  }

  if (pathname === '/topprice' && method === 'GET') {
    return controllers.topPrice(req, res);
  }
  if (pathname === '/topprice' && method === 'POST') {
    return controllers.findTopPricePost(req, res);
  }

  if (pathname === '/commonprice' && method === 'GET') {
    return controllers.commonPriceGET(req, res);
  }
  if (pathname === '/commonprice' && method === 'POST') {
    return controllers.commonPricePost(req, res);
  }

  if (pathname === '/data' && method === 'POST') {
    return controllers.dataPost(req, res);
  }

  return controllers.notFound(req, res);
};
