/*
To use this module, create an server.js file containing:
```js
var pongServer = require('pong-server');
var server = pongServer().listen();
```
Then run ```node server.js```
*/

var fs = require('fs');
var url = require('url');
var express = require('express');
var handlebars = require('handlebars');

module.exports = function() {

  var instance = {};

  var config = {
    serverPort: 9000
  }

  server = express();

  // Create index route
  server.get('/', function(req, res) {
    var response = renderHtmlPage('/templates/index.fragment.html');
    res.send(response);
  });

  // List routes
  server.get('/api/routes.json', function(req, res) {
    var data = {
      routes: server._router.stack,
      timestamp: Date.now()
    };
    res.send(data);
  });

  // Create pong route
  server.get('/api/client/:id/tv-config.js', function(req, res) {
    var data = {
      client: {
        id: req.params.id,
        topLeft: {
          x: 0,
          y: 0
        },
        bottomRight: {
          x: 400,
          y: 300
        }
      }
    };
    res.send(data);
  });

  // Create pong route
  server.get('api/client/:id/tv-pong.js', function(req, res) {
    var data = {
      ball: {
        x: 0,
        y: 0,
        width: '10',
        height: '10',
        image: '/images/ball.png'
      }
    };
    res.send(data);
  });

  var navFragment = false;
  function renderHtmlPage(pageName) {

    sourceTemplate = sourceTemplate ||
    navFragment = navFragment || readFileContents('/templates/navigation.fragment.html');

    var pageData = {
      title: 'TV Wall Pong!',
      head: '',
      body: readFileContents(pageName),
      navigation: navFragment
    };

    var source = readFileContents('/templates/html-template.html');
    var template = handlebars.compile(source);
    var response = template(pageData);

    return response;
  }

  function readFileContents(fileName) {
    var contents = false;
    var fileOptions = {encoding: "utf8"};
    try {
      contents = fs.readFileSync(__dirname + fileName, fileOptions);
    }
    catch(e) {
      console.log("Unable to read file contents from: " + fileName);
    }
    return contents;
  }

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
