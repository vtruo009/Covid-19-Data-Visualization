var express = require('express');
var router = express.Router();

// Get request. query paraemeters contain data from form. render search.html passing data
router.get('/search', (req, res) => {
	console.log(req.query);
	// Get respective data using the query parameters

	const readCSVModule = require('../modules/ReadCases.js');
	var allCases = readCSVModule.loadAllCases();
	// Now, allCases stores list of Cases read from the csv file.

	//get age range input from user,
	var selectedRange = [];
	// allCases.length; size of array
	if (req.query.AgeRange == 1) {
		for (var i = 0; i < allCases.length; ++i) {
			if (allCases[i].age > 80) {
				selectedRange.push(allCases[i]);
			}
		}
	}
	if (req.query.AgeRange == 2) {
		for (var i = 0; i < allCases.length; ++i) {
			if (allCases[i].age > 60 && allCases[i].age <= 80) {
				selectedRange.push(allCases[i]);
			}
		}
	}
	if (req.query.AgeRange == 3) {
		for (var i = 0; i < allCases.length; ++i) {
			if (allCases[i].age > 40 && allCases[i].age <= 60) {
				selectedRange.push(allCases[i]);
			}
		}
	}
	if (req.query.AgeRange == 4) {
		for (var i = 0; i < allCases.length; ++i) {
			if (allCases[i].age > 20 && allCases[i].age <= 40) {
				selectedRange.push(allCases[i]);
			}
		}
	}
	if (req.query.AgeRange == 5) {
		for (var i = 0; i < allCases.length; ++i) {
			if (allCases[i].age <= 20) {
				selectedRange.push(allCases[i]);
			}
		}
	}

	// From here the selected range of age data is stored in selectedRange[] (array of Cases) now.
	const ageReq = require('../modules/DataClasses.js');
	var row = [];
	if (req.query.TypeOfData == 1) {
		var confirmedDict = {};
		var deathDict = {};
		var recoveredDict = {};
		for (var i = 0; i < selectedRange.length; ++i) {
			//for confimred cases
			if (confirmedDict[selectedRange[i].country]) {
				confirmedDict[selectedRange[i].country]++;
			} else {
				confirmedDict[selectedRange[i].country] = 1;
			}
			// //for death cases
			if (deathDict[selectedRange[i].country]) {
				if (selectedRange[i].dead) {
					deathDict[selectedRange[i].country]++;
				}
			} else {
				if (selectedRange[i].dead) {
					deathDict[selectedRange[i].country] = 1;
				} else {
					deathDict[selectedRange[i].country] = 0;
				}
			}
			//for recovered cases
			if (recoveredDict[selectedRange[i].country]) {
				if (selectedRange[i].recovered) {
					recoveredDict[selectedRange[i].country]++;
				}
			} else {
				if (selectedRange[i].recovered) {
					recoveredDict[selectedRange[i].country] = 1;
				} else {
					recoveredDict[selectedRange[i].country] = 0;
				}
			}
		}
		for (var key in confirmedDict) {
			var newItem = new ageReq.AgeRowCountry(
				key,
				confirmedDict[key],
				deathDict[key],
				recoveredDict[key]
			);
			row.push(newItem);
		}
	} else if (req.query.TypeOfData == 2) {
		var dayDict = {};
		for (var i = 0; i < selectedRange.length; ++i) {
			if (dayDict[selectedRange[i].reportingDateStr]) {
				dayDict[selectedRange[i].reportingDateStr]++;
			} else {
				dayDict[selectedRange[i].reportingDateStr] = 1;
			}
		}

		for (var key in dayDict) {
			var newItem = new ageReq.AgeRowDay(key, dayDict[key]);
			row.push(newItem);
		}
	}

	res.send({
		data: row,
	});
});

module.exports = router;
