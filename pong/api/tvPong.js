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
  }
};

var visibleItems = [ball];

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
