var express = require('express');
var router = express.Router();

const AnalyticsModule = require('../modules/Analytics.js');

router.get('/compareGender', (req, res) => {
	var genderAnalytics = AnalyticsModule.GetGenderAnalytics(req.query.Country, req.query.TypeOfData);

	if (genderAnalytics == null) {
		res.send({
			CountryExists: false,
			FemaleNumberOfCases: 0,
			MaleNumberOfCases: 0
		});
	} else {
		res.send({
			CountryExists: true,
			FemaleNumberOfCases: genderAnalytics.femaleNum,
			MaleNumberOfCases: genderAnalytics.maleNum
		});
	}
});

module.exports = router;
