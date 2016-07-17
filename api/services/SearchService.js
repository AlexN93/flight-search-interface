require('async');
var request = require('request');
  // moment = require('moment');

module.exports = {
  // getDates: function (date, next) {
  //   //change it
  //   var dates = [],
  //     index = 1;
  //   dates.push(moment(date).format('YYYY-MM-DD'));
  //   while (index < 3) {
  //     dates.unshift(moment(date).add(-Math.abs(index), 'days').format('YYYY-MM-DD'));
  //     dates.push(moment(date).add(index, 'days').format('YYYY-MM-DD'));
  //     index++;
  //   }
  //   next(dates);
  // },

  getFlights: function (data, next) {
    var flights = [];
    async.each(data.airlines, function (airline, callback) {
      async.each(data.origin_airports, function (from, callback) {
        async.each(data.destination_airports, function (to, callback) {
          request.get({
            url: sails.config.params.domain + '/flight_search/' + airline.code + '?date=' + data.date + '&from=' + from.airportCode + '&to=' + to.airportCode
          }, function (error, response, body) {
            if (error) {
              sails.log.error(error);
            }
            else {
              // console.log(sails.config.params.domain + '/flight_search/' + airline.code + '?date=' + data.date + '&from=' + from.airportCode + '&to=' + to.airportCode);
              flights.push(JSON.parse(body));
              callback();
            }
          });
        }, function done() {
          callback();
        });
      }, function done() {
        callback();
      });
    }, function done() {
      next(flights);
    });
  }
}
