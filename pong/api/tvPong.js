var instance = {};

instance.cacheDuration = "1 second";

instance.route = '/api/client/:id/tv-pong.js';

instance.configure = function(config) {
  self = this;
  self.visibleItems = [{
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
}

instance.render = function(req, res) {
    var clientId = req.params.id || false;

    var ball = self.visibleItems[0];
    var t_now = Date.now();
    var t_diff = (t_now - ball.timestamp)/1000;
    ball.x = ball.x + ball.velocity.x * t_diff;
    while ( ball.x > 500 || ball.x < 0 ) {
      if ( ball.x > 500 ) {
        ball.x = 2 * 500 - ball.x;
      } else {
        ball.x = - ball.x;
      }
      ball.velocity.x = - ball.velocity.x;
    }
    ball.y = ball.y + ball.velocity.y * t_diff;
    while ( ball.y > 500 || ball.y < 0 ) {
      if ( ball.y > 500 ) {
        ball.y = 2 * 500 - ball.y;
      } else {
        ball.y = - ball.y;
      }
      ball.velocity.y = - ball.velocity.y;
    }
    ball.timestamp = t_now;

    var data = {
        visibleItems: self.visibleItems,
        client: {
            id: clientId
        }
    };
    res.jsonp(data);
}

module.exports = instance;
