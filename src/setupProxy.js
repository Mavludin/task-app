const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://intravision-task.test01.intravision.ru',
      changeOrigin: true,
    })
  );
};