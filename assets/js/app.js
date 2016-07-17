$(document).ready(function () {
  var spinner_opts = {
    lines: 13
    , length: 28
    , width: 14
    , radius: 42
    , scale: 1
    , corners: 1
    , color: '#000'
    , opacity: 0.25
    , rotate: 0
    , direction: 1
    , speed: 1.4
    , trail: 36
    , fps: 20
    , zIndex: 2e9
    , className: 'spinner'
    , top: '50%'
    , left: '50%'
    , shadow: false
    , hwaccel: false
    , position: 'absolute'
  };

  var target = document.getElementById('spinner-container');

  var initialize = function () {
    var today = moment();
    var tomorrow = moment(today).add(1, 'day');
    $('#date').val(tomorrow.format('YYYY-MM-DD'));
    $('#date').attr('min', tomorrow.format('YYYY-MM-DD'));

    setDates(tomorrow);
  };

  var setDates = function (date) {
    $('.nav-container').empty();
    $('.nav-container').prepend('<li class="active"><a>' + moment(date).format('YYYY-MM-DD') + '</a></li>');

    var index = 1;
    while (index < 3) {
      var disabled = moment() > moment(date).add(-Math.abs(index), 'days') ? 'class="disabled"' : '';
      $('.nav-container').prepend('<li ' + disabled + '><a>' + moment(date).add(-Math.abs(index), 'days').format('YYYY-MM-DD') + '</a></li>');
      $('.nav-container').append('<li><a>' + moment(date).add(index, 'days').format('YYYY-MM-DD') + '</a></li>');
      index++;
    }
  };

  var searchFlights = function () {
    $.ajax({
      method: 'POST',
      url: 'search',
      data: {
        date: $('#date').val(),
        origin: $('#origin').val(),
        destination: $('#destination').val()
      }
    }).done(function (data) {
      $(target).data('spinner').stop();
      if (!data.success) {
        $('.nav-container').hide();
        $('.results-container').append(data.message);
      }
      else {
        $('.nav-container').show();
        $.each(data.flights, function (key, object) {
          $.each(object, function (key, flight) {
            $('.results-container').append('<a href="#" class="list-group-item">' +
              '<b>Departure: </b>' + moment.utc(flight.start.dateTime).format('YYYY-MM-DD HH:mm') + ' UTC <b>Arrival: </b>' + moment.utc(flight.finish.dateTime).format('YYYY-MM-DD HH:mm') + ' UTC<br>' +
              '<b>From: </b>' + flight.start.airportName + ' (' + flight.start.cityName + ', ' + flight.start.countryName + ')<br>' +
              '<b>To: </b>' + flight.finish.airportName + ' (' + flight.finish.cityName + ', ' + flight.finish.countryName + ')<br>' +
              '<b>Airline: </b>' + flight.airline.name + '</a>');
          });
        });
      }
    });
  };

  $('.date').change(function () {
    setDates(this.value);
    $('.search-form').submit();
  });

  $(document).on('click', '.nav-container li', function(e) {
    $('.date').val($(this).children().html());
    setDates($(this).children().html());
    $('.search-form').submit();
  });

  $('.search-form').submit(function (event) {
    $('.results-container').empty();
    var spinner = new Spinner(spinner_opts).spin(target);
    $(target).data('spinner', spinner);
    searchFlights();
    event.preventDefault();
  });

  initialize();

});










