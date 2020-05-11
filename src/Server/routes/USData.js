const router = require('express').Router();
const { LoadUSData } = require('../modules/ReadCSV.js');
const { USRowConfirmed, USRowDeaths } = require('../modules/DataClasses.js');
const {
	EditUSData,
	AddUSData,
	DeleteUSData,
} = require('../modules/ModifyData.js');

// Now, USData stores list of USPlace read from the csv file.
var USData = LoadUSData();

router.get('/search', (req, res) => {
	console.log(req.query);
	// Get respective data using the query parameters
	var selectedInUS = [];
	for (var i = 0; i < USData.length; ++i) {
		if (
			req.query.County == USData[i].county &&
			req.query.State == USData[i].state
		) {
			selectedInUS.push(USData[i]);
		}
	}

	// console.log(selectedInUS);
	if (selectedInUS.length > 0) {
		if (req.query.TypeOfData == 1) {
			var row = [];
			for (var key in selectedInUS[0].numConfirmed) {
				var temp_date = new Date(key);
				var date =
					temp_date.getMonth() +
					1 +
					'/' +
					temp_date.getDate() +
					'/' +
					temp_date.getFullYear();
				var newItem = new USRowConfirmed(
					date,
					selectedInUS[0].numConfirmed[key]
				);
				row.push(newItem);
			}
		} else if (req.query.TypeOfData == 2) {
			var row = [];
			for (var key in selectedInUS[0].numDeaths) {
				var temp_date = new Date(key);
				var date =
					temp_date.getMonth() +
					1 +
					'/' +
					temp_date.getDate() +
					'/' +
					temp_date.getFullYear();
				var newItem = new USRowDeaths(date, selectedInUS[0].numDeaths[key]);
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
		success: DeleteUSData(
			req.body.County,
			req.body.State,
			req.body.Date,
			USData,
			req.body.TypeOfData
		),
	});
});

router.post('/update', (req, res) => {
	res.send({
		success: EditUSData(
			req.body.County,
			req.body.State,
			req.body.Date,
			USData,
			req.body.TypeOfData,
			req.body.Number
		),
	});
});

router.post('/insert', (req, res) => {
	var msg = AddUSData(
		req.body.County,
		req.body.State,
		req.body.Date,
		USData,
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
			message: `${req.body.County}, ${req.body.State} does not exist.`,
		});
	} else if (msg == 'no error') {
		res.send({
			success: true,
			message: '',
		});
	}
});

module.exports = router;
