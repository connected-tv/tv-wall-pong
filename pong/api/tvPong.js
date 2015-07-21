var instance = {};

instance.route = '/api/client/:id/tv-pong.js';

instance.configure = function(config) {

}

instance.render = function(req, res) {
    var clientId = req.params.id || false;

    var data = {
        visibleItems: [{
            name: 'ball',
            x: 0,
            y: 0,
            width: '10',
            height: '10',
            image: '/images/ball.png',
            velocity: {
                x: -10,
                y: 10
            }
        }],
        client: {
            id: clientId
        }
    };
    res.send(data);
}

module.exports = instance;
