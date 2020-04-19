var express = require('express');
var router = express.Router();

// Renders search.html with passing any data
router.get('/', (req, res) => {
  res.render('USData/search.html')
});

// Get request. query paraemeters contain data from form. render search.html passing data
const USReq = require('../modules/DataClasses.js');
router.get('/search', (req, res) => {
    console.log(req.query);
    // Get respective data using the query parameters

    const readCSVModule = require('../modules/ReadCases.js');
    var USData = readCSVModule.loadUSData();
    // Now, USData stores list of USPlace read from the csv file.

    var selectedInUS = [];
    for (var i = 0; i<USData.length; ++i){
        // console.log(USData[i].county);
        if ( req.query.County == USData[i].county && req.query.State == USData[i].state){
            selectedInUS.push(USData[i]);
        }
    }

    if (req.query.TypeOfData == 1) {
        var row = [];
        for (var key in selectedInUS[0].numConfirmed) {
            var temp_date = new Date(key);
            var date = temp_date.getMonth()+1 + '/' + temp_date.getDate() + '/' + temp_date.getFullYear();
            var newItem = new USReq.USRowConfirmed(date,selectedInUS[0].numConfirmed[key]);
            row.push(newItem);
        }
    }
    else if (req.query.TypeOfData == 2) { //deaths
        var row = [];
        for (var key in selectedInUS[0].numDeaths) {
            var temp_date = new Date(key);
            var date = temp_date.getMonth()+1 + '/' + temp_date.getDate() + '/' + temp_date.getFullYear();
            var newItem = new USReq.USRowDeaths(date,selectedInUS[0].numDeaths[key]);
            row.push(newItem);
        }
    }

    res.render(
        'USData/search.html', 
        {
            // response with dummy data
            TypeOfTable: req.query.TypeOfData,
            County: req.query.County,
            State: req.query.State,
            data: row,
        
        }
    );
});

module.exports = router;
