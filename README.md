## Flight Search Interface


##Tech Stack:
+ Jquery
+ SailsJS Framework
+ Moment.js
+ Spinner.js
+ Bootstrap

##API spec:

+ GET: /airlines <br>
```
{
  "success": true,
  "airlines": [
    {
      "code": "SU",
      "name": "Aeroflot"
    },
    {
      "code": "MU",
      "name": "China Eastern"
    },
    {
      "code": "EK",
      "name": "Emirates"
    },
    {
      "code": "KE",
      "name": "Korean Air lines"
    },
    {
      "code": "QF",
      "name": "Qantas"
    },
    {
      "code": "SQ",
      "name": "Singapore Airlines"
    }
  ]
}
```


+ GET: airports/:citiName <br>
```
{
  "success": true,
  "airports": [
    {
      "airportCode": "MLB",
      "airportName": "Melbourne International Arpt",
      "cityCode": "MLB",
      "cityName": "Melbourne",
      "countryCode": "US",
      "countryName": "United States",
      "latitude": 28.102753,
      "longitude": -80.645258,
      "stateCode": "FL",
      "timeZone": "America/New_York"
    },
    {
      "airportCode": "MEL",
      "airportName": "Tullamarine Arpt",
      "cityCode": "MEL",
      "cityName": "Melbourne",
      "countryCode": "AU",
      "countryName": "Australia",
      "latitude": -37.673333,
      "longitude": 144.843333,
      "stateCode": "VI",
      "timeZone": "Australia/Hobart"
    }
  ]
}
```


+ POST :  /search
```
Body request :
{date: "2016-07-20", origin: "Melbourne", destination: "New York"}
```


##Getting started:
You need to have node, bower and npm installed in order to set up the application.<br>
The app should look like [this](http://screencloud.net/v/mupV). Keep in mind that I've decided to with having the option of<br>
multiple airports per city, so if you have Melbourne as an origin and New York as destination, you will get a lot of flights<br>
for that specific day. If the user decides to enter precise airport name, the results list and request time will be reduced<br>
To run the start.sh script you will need npm, bower, node and git installed. You can do the set up process manually with the following commands.

```
$ git clone https://github.com/AlexN93/flight-search-interface.git
$ npm install
$ bower install
$ sails lift
```
