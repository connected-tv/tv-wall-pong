var monitor = require('product-monitor');

var server = monitor({
  "productInformation": {
    "title": "TV Wall Pong"
  },
  "serverPort": 9000,
  "userContentPath": "pong"
});
