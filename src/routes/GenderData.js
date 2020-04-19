var express = require('express');
var router = express.Router();

// Renders search.html with passing any data
router.get('/', (req, res) => {
  res.render('DataByGender/SelectFeature.html')
});

const readCSVModule = require('../modules/ReadCases.js');
var allCases = readCSVModule.loadAllCases();
// Now, allCases stores list of Cases read from the csv file.

// Print first 10 ages.
// for (var i = 0; i < 10; ++i){
//     console.log(allCases[i].gender);
// }

// Get request. query paraemeters contain data from form. render search.html passing data
router.get('/SelectFeature', (req, res) => {
    console.log(req.query);
    // Get respective data using the query parameters
    var selectedGender = [];
    if (req.query.Gender == 1){
        for (var i =0; i<allCases.length; ++i){
            if (allCases[i].gender == "male"){
                selectedGender.push(allCases[i]);
            }
        }
    }
    if (req.query.Gender == 2){
        for (var i =0; i<allCases.length; ++i){
            if (allCases[i].gender == "female"){
                selectedGender.push(allCases[i]);
            }
        }
    }

    //From here the selected gender data is stored in selectedGender[] (array of Cases) now
    // console.log(selectedGender);
    const genderReq = require('../modules/DataClasses.js')
    var row = [];
    if (req.query.TypeOfData == 1) {
        var confirmedDict = {};
        var deathDict = {};
        var recoveredDict = {};
        for (var i = 0; i < selectedGender.length; ++i) {
            //for confimred cases
            if (confirmedDict[selectedGender[i].country]) {
                confirmedDict[selectedGender[i].country]++;
            }
            else {
                confirmedDict[selectedGender[i].country] = 1;
            }
            // //for death cases
            if (deathDict[selectedGender[i].country]) {
                if (selectedGender[i].dead) {
                    deathDict[selectedGender[i].country]++
                }
            }
            else {
                if (selectedGender[i].dead) {
                    deathDict[selectedGender[i].country] = 1;
                }
                else {
                    deathDict[selectedGender[i].country] = 0;
                }
            } 
            //for recovered cases
            if (recoveredDict[selectedGender[i].country]) {
                if (selectedGender[i].recovered) {
                    recoveredDict[selectedGender[i].country]++
                }
            }
            else {
                if (selectedGender[i].recovered) {
                    recoveredDict[selectedGender[i].country] = 1;
                }
                else {
                    recoveredDict[selectedGender[i].country] = 0;
                }
            }
        }
        for (var key in confirmedDict) { //use confirmedDict cuz every key is the same as other Dict since country == key
            var newItem = new genderReq.GenderCountry(key,confirmedDict[key],deathDict[key],recoveredDict[key]);
            row.push(newItem);
        }
    }
    else if (req.query.TypeOfData == 2) {
        var dayDict = {};
        for (var i = 0; i < selectedGender.length; ++i) {
            if (dayDict[selectedGender[i].reportingDateStr]) {
                dayDict[selectedGender[i].reportingDateStr]++;
            }
            else {
                dayDict[selectedGender[i].reportingDateStr] = 1;
            }
        }

        for (var key in dayDict) {
            var newItem = new genderReq.GenderDay(key, dayDict[key]);
            row.push(newItem);
        }
    }
    console.log(row);
    res.render(
        'DataByGender/SelectFeature.html', 
        {
            // response with dummy data
            TypeOfTable: req.query.TypeOfData,
            Gender: req.query.Gender,
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
