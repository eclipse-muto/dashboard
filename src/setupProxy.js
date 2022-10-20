const { createProxyMiddleware } = require('http-proxy-middleware');



module.exports = function(app) {
  app.use(
    '/api/2',
    createProxyMiddleware({ target: 'https://sandbox.composiv.ai', changeOrigin: true,  ws: true})
  );
  app.use(
    '/dashboard-device',
    createProxyMiddleware({ target: 'https://dashboard.composiv.ai', changeOrigin: true })
  );
  app.use(
    '/dashboard-stack',
    createProxyMiddleware({ target: 'https://dashboard.composiv.ai', changeOrigin: true })
  );
};