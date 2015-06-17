var monitor = require('product-monitor');

var serverPort = process.env.TV_WALL_PONG_SERVER_PORT || 80;

var server = monitor({
  "productInformation": {
    "title": "TV Wall Pong"
  },
  "serverPort": serverPort,
  "userContentPath": "pong"
});
