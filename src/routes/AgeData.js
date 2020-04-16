var express = require('express');
var router = express.Router();

// Renders search.html with passing any data
router.get('/', (req, res) => {
  res.render('DataByAgeDistribution/SelectFeature.html')
});

const readCSVModule = require('../modules/ReadCases.js');
var allCases = readCSVModule.loadAllCases();
// Now, allCases stores list of Cases read from the csv file.

// Print first 10 countries.
for (var i = 0; i < 10; ++i){
    console.log(allCases[i].country);
}

// Get request. query paraemeters contain data from form. render search.html passing data
router.get('/SelectFeature', (req, res) => {
    console.log(req.query);
    // Get respective data using the query parameters

    //get age range input from user, 
    var selectedRange = [];
   // allCases.length(); size of array
    if (req.query.AgeRange == 1){
        for (var i = 0; i<allCases.length(); ++i){
            if (allCases[i].age > 80){
                selectedRange.append(allCases[i]);
            }
        }
    }
    if (req.query.AgeRange == 2){
        for (var i = 0; i<allCases.length(); ++i){
            if (allCases[i].age > 60 && allCases[i].age <= 80){
                selectedRange.append(allCases[i]);
            }
        }
    }
    if (req.query.AgeRange == 3){
        for (var i = 0; i<allCases.length(); ++i){
            if (allCases[i].age > 40 && allCases[i].age <= 60){
                selectedRange.append(allCases[i]);
            }
        }
    }   
    if (req.query.AgeRange == 4){
        for (var i = 0; i<allCases.length(); ++i){
            if (allCases[i].age > 20 && allCases[i].age <= 40){
                selectedRange.append(allCases[i]);
            }
        }
    }    
    if (req.query.AgeRange == 5){
        for (var i = 0; i<allCases.length(); ++i){
            if (allCases[i].age <= 20){
                selectedRange.append(allCases[i]);
            }
        }
    }
    console.log(selectedRange);

    res.render(
        'DataByAgeDistribution/SelectFeature.html', 
        {
            // response with dummy data
            TypeOfTable: req.query.TypeOfData,
            AgeRange: req.query.AgeRange,
            data: [
                {
                    date: '01/02/2020',
                    country: 'Japan',
                    confirmed: 4,
                    recovered: 4,
                    death: 1
                },
                {
                    date: '01/03/2020',
                    country: 'China',
                    confirmed: 5,
                    recovered: 4,
                    death: 0
                },
                {
                    date: '01/04/2020',
                    country: 'US',
                    confirmed: 6,
                    recovered: 4,
                    death: 10
                }
            ],
        
        }
    );
});

module.exports = router;
