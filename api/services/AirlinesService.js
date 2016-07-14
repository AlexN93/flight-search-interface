var request = require('request');

module.exports = {
  getAirlines: function (next) {
    request.get({
      url: sails.config.params.domain +  '/airlines'
    }, function (error, response, body) {
      if (error) {
        sails.log.error(error);
      }
      else {
        next(JSON.parse(body));
      }
    });
  },
}
