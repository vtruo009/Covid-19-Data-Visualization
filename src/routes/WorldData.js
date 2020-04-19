var express = require('express');
var router = express.Router();

// Renders search.html with passing any data
router.get('/', (req, res) => {
  res.render('WorldData/search.html')
});

const worldReq = require('../modules/DataClasses.js');
var selectedCountry = [];
router.get('/search', (req, res) => {
    console.log(req.query);
    // Get respective data using the query parameters

    const readCSVModule = require('../modules/ReadCases.js');
    var WorldData = readCSVModule.loadWorldData();
    // Now, WorldData stores list of WorldPlace read from the csv file.

    for (var i = 0; i<WorldData.length; ++i){
        if (req.query.Country == WorldData[i].country && req.query.State == WorldData[i].state){
            selectedCountry.push(WorldData[i]);
        }
    }

    if (selectedCountry.length == 0){
        // TODO (Johan) : Pring an error message saying the data does not exist for input Country and State.
    } else {
        if (req.query.TypeOfData == 1) {
            var row = [];
            for (var key in selectedCountry[0].numConfirmed) {
                var temp_date = new Date(key);
                var date = temp_date.getMonth()+1 + '/' + temp_date.getDate() + '/' + temp_date.getFullYear();
                var newItem = new worldReq.WorldRowConfirmed(date, selectedCountry[0].numConfirmed[key]);
                row.push(newItem);
            }
        }
        else if (req.query.TypeOfData == 2) {
            var row = [];
            for (var key in selectedCountry[0].numDeaths) {
                var temp_date = new Date(key);
                var date = temp_date.getMonth()+1 + '/' + temp_date.getDate() + '/' + temp_date.getFullYear();
                var newItem = new worldReq.WorldRowDeaths(date, selectedCountry[0].numDeaths[key]);
                row.push(newItem);
            }
        }
        else if (req.query.TypeOfData == 3) {
            var row = [];
            for (var key in selectedCountry[0].numRecovered) {
                var temp_date = new Date(key);
                var date = temp_date.getMonth()+1 + '/' + temp_date.getDate() + '/' + temp_date.getFullYear();
                var newItem = new worldReq.WorldRowRecovered(date, selectedCountry[0].numRecovered[key]);
                row.push(newItem);
            }
        }
    }

    res.render(
        'WorldData/search.html', 
        {
            TypeOfTable: req.query.TypeOfData,
            Country: req.query.Country,
            State: req.query.State,
            data: row,
        
        }
    );
});

module.exports = router;