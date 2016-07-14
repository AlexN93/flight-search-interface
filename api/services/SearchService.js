require('async');
var request = require('request'),
  moment = require('moment');

module.exports = {
  getDates: function (date, next) {
    //change it
    var dates = [],
      index = 1;
    dates.push(moment(date).format('YYYY-MM-DD'));
    while (index < 3) {
      dates.unshift(moment(date).add(-Math.abs(index), 'days').format('YYYY-MM-DD'));
      dates.push(moment(date).add(index, 'days').format('YYYY-MM-DD'));
      index++;
    }
    next(dates);
  },

  getFlights: function (data, next) {
    var flights = [];
    // here you iterate over airlines
    async.each(data.airlines, function (airline, callback) {
      request.get({
        url: sails.config.params.domain + '/flight_search/' + airline.code + '?date=' + data.date + '&from=' + data.from + '&to=' + data.to
      }, function (error, response, body) {
        if (error) {
          sails.log.error(error);
        }
        else {
          flights.push(JSON.parse(body));
          callback();
        }
      });
    }, function done() {
      console.log(data.date);
      next(flights);
    });
  }
}
