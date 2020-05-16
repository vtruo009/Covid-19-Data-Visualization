var express = require('express');
var router = express.Router();

const WP = require('../modules/WorldPlaceManager.js');

router.get('/search', (req, res) => {
	res.send({
		data: WP.GetRows( req.query.Country, req.query.State, req.query.TypeOfData), // call GetRow() samething for delete update insert
	});
});

router.post('/delete', (req, res) => {
	res.send({
		success: WP.RemoveWorldData(
			req.body.State,
			req.body.Country,
			req.body.Date,
			req.body.TypeOfData),
	});
});

router.post('/update', (req, res) => {
	res.send({
		success: WP.EditWorldData(
			req.body.State,
			req.body.Country,
			req.body.Date,
			req.body.TypeOfData,
			req.body.Number
		),
	});
});

router.post('/insert', (req, res) => {
	var msg = WP.AddWorldData(
		req.body.State,
		req.body.Country,
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
