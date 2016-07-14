/**
 * AirportsController
 *
 * @description :: Server-side logic for managing airports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getAirports: function(req, res) {
    var airportId = (req.param('airportId'));
    AirportsService.getAirports(airportId, function(airports) {
      return res.json(200, {success: true, airports: airports});
    });
  },
};

