var instance = {};

instance.cacheDuration = "1 second";

instance.route = '/api/client/:id/tv-pong.js';

instance.configure = function(config) {

}

instance.render = function(req, res) {
    var clientId = req.params.id || false;

    var data = {
        visibleItems: [{
            name: 'ball',
            x: Math.floor(Math.random() * 400),
            y: Math.floor(Math.random() * 400),
            width: '10',
            height: '10',
            image: '/images/ball.png',
            velocity: {
                x: Math.floor(Math.random() * 51) - 25,
                y: Math.floor(Math.random() * 51) - 25,
            }
        }],
        client: {
            id: clientId
        }
    };
    res.jsonp(data);
}

module.exports = instance;
