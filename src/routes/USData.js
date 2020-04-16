var express = require('express');
var router = express.Router();

// Renders search.html with passing any data
router.get('/', (req, res) => {
  res.render('USData/search.html')
});

const readCSVModule = require('../modules/ReadCases.js');
var USData = readCSVModule.loadUSData();
// Now, USData stores list of USPlace read from the csv file.

// Print number of confirmed cases for each day for the second country.
for (var i = 1; i < 2; ++i){
    for(var date in USData[i].numConfirmed) {
        console.log(date + ": " + USData[i].numConfirmed[date]);
    }
}

// Get request. query paraemeters contain data from form. render search.html passing data
router.get('/search', (req, res) => {
    console.log(req.query);
    // Get respective data using the query parameters
    res.render(
        'USDATA/search.html', 
        {
            // response with dummy data
            TypeOfTable: req.query.TypeOfData,
            County: req.query.County,
            State: req.query.State,
            data: [
                {
                    date: '01/02/2020',
                    number: 30
                },
                {
                    date: '01/03/2020',
                    number: 14
                },
                {
                    date: '01/04/2020',
                    number: 30
                }
            ],
        
        }
    );
});

module.exports = router;