var express = require('express');
var router = express.Router();


//add require (../USPlacesManager.js)
//get of whats inside router
const ModUSPlacesManager = require('../USPlacesManager');
router.get('/search', (req, res) => {
	console.log(req.query);
	res.send({
		data: ModUSPlacesManager.GetRows(req.body.County, req.body.State, req.body.TypeOfData),//call GetRow
	});
});

router.post('/delete', (req, res) => {
	res.send({
		success: ModUSPlacesManager.RmoveUSData(
			req.body.County,
			req.body.State,
			req.body.Date,
			req.body.TypeOfData
		),
	});
});

router.post('/update', (req, res) => {
	res.send({
		success: ModUSPlacesManager.EditUSData(
			req.body.County,
			req.body.State,
			req.body.Date,
			req.body.TypeOfData,
			req.body.Number
		),
	});
});

router.post('/insert', (req, res) => {
	var msg = ModUSPlacesManager.AddUSData(
		req.body.County,
		req.body.State,
		req.body.Date,
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
