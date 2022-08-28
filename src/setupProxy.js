const { createProxyMiddleware } = require('http-proxy-middleware');

// proxy middleware options
const options = {
    // target: 'https://age-of-empires-2-api.herokuapp.com', // target host
    target: 'http://sandbox.composiv.ai', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    pathRewrite: {
      '^/api/model': '/api/v1/civilization', // rewrite path
      '^/api/civil': '/api/v1/civilization', // rewrite path
      '^/api/remove/path': '/path', // remove base path
      '^/api/models': '/api/v1.0/models', // remove base path
    },
     router: {
      // when request.headers.host == 'dev.localhost:3000',
      // override target 'http://www.example.org' to 'http://localhost:8000'
      // 'dev.localhost:3000': 'http://localhost:8125',
    }, 
  };

module.exports = function(app) {
  app.use(
    '/api/2',
    createProxyMiddleware(options)
  );
};