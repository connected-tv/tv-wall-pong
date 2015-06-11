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

  server.get('/status', function(req, res) {
    res.send('Status OK 200');
  });

  function renderHtmlPage(pageName) {
    var pageData = {
      title: 'TV Wall Pong!',
      head: '',
      body: readFileContents(pageName),
      navigation: readFileContents('/templates/navigation.fragment.html')
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
