const router = require('express').Router();
const {
	UpdateWorldData,
	DeleteWorldData,
	InsertWorldData,
} = require('../modules/ModifyData.js');
const { LoadWorldData } = require('../modules/ReadCSV.js');
const {
	WorldRowConfirmed,
	WorldRowDeaths,
	WorldRowRecovered,
} = require('../modules/DataClasses.js');

var WorldData = LoadWorldData();

router.get('/search', (req, res) => {
	// Get respective data using the query parameters
	var selectedCountry = [];
	// Now, WorldData stores list of WorldPlace read from the csv file.

	for (var i = 0; i < WorldData.length; ++i) {
		if (
			req.query.Country == WorldData[i].country &&
			req.query.State == WorldData[i].state
		) {
			selectedCountry.push(WorldData[i]);
		}
	}

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
				var newItem = new WorldRowConfirmed(
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
				var newItem = new WorldRowDeaths(
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
				var newItem = new WorldRowRecovered(
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
		success: DeleteWorldData(
			req.body.Country,
			req.body.State,
			req.body.Date,
			WorldData,
			req.body.TypeOfData
		),
	});
});

router.post('/update', (req, res) => {
	res.send({
		success: UpdateWorldData(
			req.body.Country,
			req.body.State,
			req.body.Date,
			WorldData,
			req.body.TypeOfData,
			req.body.Number
		),
	});
});

router.post('/insert', (req, res) => {
	var msg = InsertWorldData(
		req.body.Country,
		req.body.State,
		req.body.Date,
		WorldData,
		req.body.TypeOfData,
		req.body.Number
	);
	if (msg == 'date exists') {
		res.send({
			success: false,
			message: `Date: ${req.body.Date} already exists.`,
		});
	} else if (msg == 'wrong place') {
		res.send({
			success: false,
			message: `${req.body.State}, ${req.body.Country} does not exists.`,
		});
	} else if (msg == 'no error') {
		res.send({
			success: true,
			message: '',
		});
	}
});
module.exports = router;
