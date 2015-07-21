TV Wall Pong
============

For playing Pong across multiple TVs!

Home
----
TV Wall pong currently lives on a private server, hosted at http://tv-wall-pong/

Development
-----------
To set up as a development environment, run:
```sh
git clone https://github.com/connected-tv/tv-wall-pong.git
cd tv-wall-pong
npm install
npm start 9500
```
This should start `tv-wall-pong` on `http://localhost:9500/`.

Setup and maintenance
---------------------

To set up on a server, run:
```sh
git clone https://github.com/connected-tv/tv-wall-pong.git
cd tv-wall-pong
npm install
sudo npm install pm2 -g
sudo pm2 start server.js
```

The `sudo` command is required to access Port 80, if that's how you want it mapped.

The server
----------

The server tracks the ball position, and hands out screen positions to clients.

It currently supports these JSONP endpoints:
* /api/client/:id/tv-config.js
* /api/client/:id/tv-pong.js

The server endpoints are a work in-progress. There will be some sort of render loop that moves the ball around... and a client configuration that specifies a list of objects to draw on each screen.

The viewer
----------

The viewer tracks the whole game field, and shows the position of virtual screens.

* Information provided in the viewer will allow clients to render the future path of the ball over a given distance.
* The viewer will provide an overview of the game field, and allow virtual screens to be positioned.
