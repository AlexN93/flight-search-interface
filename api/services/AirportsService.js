var request = require('request');

module.exports = {
  getAirports: function (airportId, next) {
    request.get({
      url: sails.config.params.domain +  '/airports?q=' + airportId
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
