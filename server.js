var monitor = require('product-monitor');
var express = require('express');

var serverPort = process.argv.slice(2)[0] || 80;

var server = monitor({
  "productInformation": {
    "title": "TV Wall Pong"
  },
  "serverPort": serverPort,
  "userContentPath": "pong"
}, ready);

function ready(instance) {
  instance.server.use('/public', express.static(process.cwd() + '/public'));
  instance.listen();
}
