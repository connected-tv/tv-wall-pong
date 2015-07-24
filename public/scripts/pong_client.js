function PongGame(pong_server, parent_box) {
  ball_div = document.createElement('div');
  ball_div.style.position = 'absolute';
  ball_img = document.createElement('img');
  ball_img.setAttribute('src', 'static/img/ball.png');
  ball_img.style.width = '20px';
  ball_img.style.height = '20px';
  ball = {
    x: 0,
    y: 0,
    timestamp: Date.now()
  }
  game = {
    width: 10,
    height: 10
  }

  ball_div.appendChild(ball_img);
  parent_box.appendChild(ball_div);

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

  var move_ball = function() {
    boundBallPosition(ball);
    ball_div.style.top = ball.y + "px";
    ball_div.style.left = ball.x + "px";
    setTimeout(move_ball, 100);
  }

  var $jsonp = (function(){
    var that = {};

    that.send = function(src, options) {
      var callback_name = options.callbackName || 'callback',
        on_success = options.onSuccess || function(){},
        on_timeout = options.onTimeout || function(){},
        timeout = options.timeout || 10; // sec

      var timeout_trigger = window.setTimeout(function(){
        window[callback_name] = function(){};
        on_timeout();
      }, timeout * 1000);

      window[callback_name] = function(data){
        window.clearTimeout(timeout_trigger);
        on_success(data);
      }

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = src;

      document.getElementsByTagName('head')[0].appendChild(script);
    }

    return that;
  })();

  var refresh = function() {
    $jsonp.send(pong_server + '/api/client/99/tv-pong.js?callback=handleStuff', {
      callbackName: 'handleStuff',
      onSuccess: function(json) {
        ball = json.visibleItems[0];
        game = json.game;
        ball_img.setAttribute('src', pong_server + ball.image);
        ball_img.style.width = ball.width + 'px';
        ball_img.style.height = ball.height + 'px';
        ball.timestamp = Date.now();
        setTimeout(refresh, 5000);
      },
      onError: function(response) {
        setTimeout(refresh, 5000);
      },
      timeout: 5
    });
  }
  setTimeout(refresh, 100);
  setTimeout(move_ball, 500);
}
