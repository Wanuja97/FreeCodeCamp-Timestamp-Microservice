// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/1451001600000", function (req, res) {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});


//empty date parameter
app.get("/api/", function (req, res) {
  // creating new date object
  var myDate = new Date();
  //converting date into UNIX and UTC formats
  var myDateUnix = new Date(myDate).getTime();
  var myDateUtc = new Date(myDate).toUTCString();
  res.json(
    {
      "unix": myDateUnix,
      "utc": myDateUtc
    }
  );
});


app.get("/api/:date", function (req, res) {
  //taking parameter input to the myDate variable
  var myDate = req.params.date;
  // checking the date
  if (!isNaN(Date.parse(myDate))) {
    //converting that myDate value into UNIX format
    myDateUnix = new Date(myDate).getTime();
    myDateUtc = new Date(myDate).toUTCString();
    res.json(
      {
        "unix": myDateUnix,
        "utc": myDateUtc
      }
    );
  }
  else {
    res.json(
      { error: "Invalid Date" }
    );
  }


});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
