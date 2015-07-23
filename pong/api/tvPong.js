var instance = {};

instance.cacheDuration = "1 second";

instance.route = '/api/client/:id/:tv-pong.js';

var ball = {
  name: 'ball',
  x: Math.floor(Math.random() * 400),
  y: Math.floor(Math.random() * 400),
  width: '20',
  height: '20',
  image: '/images/ball.png',
  timestamp: Date.now(),
  velocity: {
    x: (Math.floor(Math.random() * 1) - 0.5) * 200,
    y: (Math.floor(Math.random() * 1) - 0.5) * 200,
  },
};

var client1 = {
  x: 50,
  y: 50,
  width: 200,
  height: 150
};

var client2 = {
  x: 350,
  y: 80,
  width: 300,
  height: 180
};

var client3 = {
  x: 250,
  y: 150,
  width: 250,
  height: 160
};

var client4 = {
  x: 450,
  y: 350,
  width: 220,
  height: 180
};

var visibleItems = [ball, client1, client2, client3, client4];

var game = {
  width: 800,
  height: 500
}

instance.configure = function(config) {

}

instance.render = function(req, res) {
  var clientId = req.params.id || false;

  boundBallPosition(ball);

  var data = {
    visibleItems: visibleItems,
    client: {
      id: clientId
    },
    game: game
  };
  res.jsonp(data);
}

function boundBallPosition(ball) {
  var t_now = Date.now();
  var t_diff = (t_now - ball.timestamp) / 1000;

  boundBallAxis(ball, 'x', t_diff);
  boundBallAxis(ball, 'y', t_diff);

  ball.timestamp = t_now;
}

function boundBallAxis(ball, axis, t_diff) {
  var limit = (axis === 'x') ? game.width - ball.width : game.height - ball.height;

  ball[axis] = ball[axis] + ball.velocity[axis] * t_diff;
  while (ball[axis] > limit || ball[axis] < 0) {
    if (ball[axis] > limit) {
      ball[axis] = 2 * limit - ball[axis];
    } else {
      ball[axis] = -ball[axis];
    }
    ball.velocity[axis] = -ball.velocity[axis];
  }
}

module.exports = instance;
