// api/cors.js
const corsAnywhere = require('cors-anywhere');

const server = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2'],
});

module.exports = (req, res) => {
  server.emit('request', req, res);
};
