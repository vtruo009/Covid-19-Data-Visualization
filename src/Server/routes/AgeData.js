var express = require('express');
var router = express.Router();

const CaseManager = require('../modules/CaseManager.js');

// Get request. query paraemeters contain data from form. render search.html passing data
router.get('/search', (req, res) => {
	res.send({
		data: CaseManager.GetAgeData(req.query.AgeRange, req.query.TypeOfData)
	});
});

module.exports = router;
