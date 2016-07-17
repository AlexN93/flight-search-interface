/**
 * SearchController
 *
 * @description :: Server-side logic for managing the search logic
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
require('async');

module.exports = {
  getFlights: function (req, res) {
    var date = req.param('date'),
      origin  = req.param('origin'),
      destination  = req.param('destination');

    async.waterfall([
      function(callback) {
        AirportsService.getAirports(origin, function(origin_airports) {
          if(!origin_airports.length)  {
            return res.json(200, {success: false, message: "No origin airports found."});
          }
          callback(null, origin_airports);
        });
      },
      function(origin_airports, callback) {
        AirportsService.getAirports(destination, function(destination_airports) {
          if(!destination_airports.length)  {
            return res.json(200, {success: false, message: "No destination airports found."});
          }
          callback(null, origin_airports, destination_airports);
        });
      },
      function(origin_airports, destination_airports, callback) {
        AirlinesService.getAirlines(function (airlines) {
          SearchService.getFlights({
            airlines: airlines,
            date: date,
            origin_airports: origin_airports,
            destination_airports: destination_airports
          }, function (flights_found) {
            callback(null, flights_found);
          });
        });
      }
    ], function (err, result) {
      return res.json(200, {success: true, flights: result});
    });

  }
};

