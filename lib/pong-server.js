/*
To use this module, create an server.js file containing:
```js
var pongServer = require('pong-server');
var server = pongServer().listen();
```
Then run ```node server.js```
*/

var url = require('url');
var express = require('express');

module.exports = function() {

  var instance = {};

  var config = {
    serverPort: 9000
  }

  server = express();

  // Create index route
  server.get('/', function(req, res) {
    res.send('Hello pong!');
  });

  server.get('/status', function(req, res) {
    res.send('Status OK 200');
  });

  // Public API
  instance.server = server;

  instance.listen = function() {
    server.listen(config.serverPort, function() {
    	console.log(
    		'Pong Server available on ' +
    		url.format({
    			protocol: 'http',
    			hostname: 'localhost',
    			query: '',
    			pathname: '',
    			port: config.serverPort
    		})
    	);
    })
    .on('error', function (e) {
    	console.log('Could not start server: ');
      if (e.code == 'EADDRINUSE') {
        console.log(' Port address already in use.');
      }
    	console.log('  ' + e);
    });
  }

  return instance;
}
