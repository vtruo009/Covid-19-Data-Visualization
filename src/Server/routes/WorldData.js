var express = require('express');
var router = express.Router();

const ModModule = require('../modules/ModifyData.js');

const readCSVModule = require('../modules/ReadCSV.js');
var WorldData = readCSVModule.LoadWorldData();

const worldReq = require('../modules/DataClasses.js');
router.get('/search', (req, res) => {
	console.log(req.query);
	// Get respective data using the query parameters
	var selectedCountry = [];
	// Now, WorldData stores list of WorldPlace read from the csv file.

	// console.log(WorldData);
	for (var i = 0; i < WorldData.length; ++i) {
		if (
			req.query.Country == WorldData[i].country &&
			req.query.State == WorldData[i].state
		) {
			selectedCountry.push(WorldData[i]);
		}
	}

	console.log(selectedCountry);

	if (selectedCountry.length > 0) {
		if (req.query.TypeOfData == 1) {
			var row = [];
			for (var key in selectedCountry[0].numConfirmed) {
				var temp_date = new Date(key);
				var date =
					temp_date.getMonth() +
					1 +
					'/' +
					temp_date.getDate() +
					'/' +
					temp_date.getFullYear();
				var newItem = new worldReq.WorldRowConfirmed(
					date,
					selectedCountry[0].numConfirmed[key]
				);
				row.push(newItem);
			}
		} else if (req.query.TypeOfData == 2) {
			var row = [];
			for (var key in selectedCountry[0].numDeaths) {
				var temp_date = new Date(key);
				var date =
					temp_date.getMonth() +
					1 +
					'/' +
					temp_date.getDate() +
					'/' +
					temp_date.getFullYear();
				var newItem = new worldReq.WorldRowDeaths(
					date,
					selectedCountry[0].numDeaths[key]
				);
				row.push(newItem);
			}
		} else if (req.query.TypeOfData == 3) {
			var row = [];
			for (var key in selectedCountry[0].numRecovered) {
				var temp_date = new Date(key);
				var date =
					temp_date.getMonth() +
					1 +
					'/' +
					temp_date.getDate() +
					'/' +
					temp_date.getFullYear();
				var newItem = new worldReq.WorldRowRecovered(
					date,
					selectedCountry[0].numRecovered[key]
				);
				row.push(newItem);
			}
		}
	}

	res.send({
		data: row,
	});
});

router.post('/delete', (req, res) => {
	res.send({
		success: ModModule.WorldDelete(req.body.Country, req.body.State, req.body.date, WorldData, req.body.TypeOfData) //lower or upper case date?
	})
})
module.exports = router;
