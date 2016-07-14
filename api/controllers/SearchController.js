/**
 * SearchController
 *
 * @description :: Server-side logic for managing the search logic
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
require('async');

module.exports = {
  getFlights: function (req, res) {
    var date = new Date(req.param('date')),
      from  = req.param('from'),
      to  = req.param('to'),
      flights = [];

    SearchService.getDates(date, function (dates) {
      AirlinesService.getAirlines(function (airlines) {
        async.each(dates, function (date, callback) {
          SearchService.getFlights({
            airlines: airlines,
            date: date,
            from: from,
            to: to
          }, function (flights_found) {
            flights.push(flights_found);
            callback();
          });
        }, function done() {
          return res.json(200, {success: true, flights: flights});
        });
      });
    });

  }
};

