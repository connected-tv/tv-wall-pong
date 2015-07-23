var instance = {};

instance.cacheDuration = "1 second";

instance.route = '/api/client/:id/tv-pong.js';

var visibleItems = [{
  name: 'ball',
  x: Math.floor(Math.random() * 400),
  y: Math.floor(Math.random() * 400),
  width: '10',
  height: '10',
  image: '/images/ball.png',
  timestamp: Date.now(),
  velocity: {
    x: Math.floor(Math.random() * 51) - 25,
    y: Math.floor(Math.random() * 51) - 25,
  }
}];

instance.configure = function(config) {

}

instance.render = function(req, res) {
  var clientId = req.params.id || false;

  var ball = visibleItems[0];

  boundBallPosition(ball);

  var data = {
    visibleItems: visibleItems,
    client: {
      id: clientId
    }
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
  ball[axis] = ball[axis] + ball.velocity[axis] * t_diff;
  while (ball[axis] > 500 || ball[axis] < 0) {
    if (ball[axis] > 500) {
      ball[axis] = 2 * 500 - ball[axis];
    } else {
      ball[axis] = -ball[axis];
    }
    ball.velocity[axis] = -ball.velocity[axis];
  }
}

module.exports = instance;
