/**
 * AirlinesController
 *
 * @description :: Server-side logic for managing airlines
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getAirlines: function(req, res) {
    AirlinesService.getAirlines(function(airlines) {
      return res.json(200, {success: true, airlines: airlines});
    });
  },
};

