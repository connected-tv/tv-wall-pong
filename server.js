var monitor = require('product-monitor');

var serverPort = process.argv.slice(2)[0] || 80;

var server = monitor({
  "productInformation": {
    "title": "TV Wall Pong"
  },
  "serverPort": serverPort,
  "userContentPath": "pong"
});
