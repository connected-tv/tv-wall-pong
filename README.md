TV Wall Pong
============

For playing Pong across multiple TVs!

Home
----
TV Wall pong currently lives on a private server, hosted at http://tv-wall-pong/

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
Sudo is required to access Port 80, if that's how you want it mapped.

To set up for development, run:
```sh
git clone git@github.com:connected-tv/tv-wall-pong.git
cd tv-wall-pong
npm install
export TV_WALL_PONG_SERVER_PORT=9000
node server.js
```

The server
----------

The server tracks the ball position, and hands out screen positions to clients.

It currently supports these JSON endpoints:
* /api/client/:id/tv-config.js
* /api/client/:id/tv-pong.js

The server endpoints are a work in-progress. There will be some sort of render loop that moves the ball around...

The viewer
----------

The viewer tracks the whole game field, and shows the position of virtual screens.

* Information provided in the viewer will allow clients to render the future path of the ball over a given distance.
* The viewer will provide an overview of the game field, and allow virtual screens to be positioned.


