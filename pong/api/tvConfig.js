var instance = function() {}

instance.route = '/api/client/:id/tv-config.js';

instance.configure = function(config) {

}

instance.render = function(req, res) {
  var clientId = req.params.id || false;

  var data = {
    client: {
      id: clientId,
      topLeft: {
        x: 0,
        y: 0
      },
      bottomRight: {
        x: 400,
        y: 300
      }
    }
  };
  res.jsonp(data);
}

module.exports = instance;
