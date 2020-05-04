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

router.get('/compareProvinces', (req, res) => {
	var twoPlacesComperison = AnalyticsModule.GetTwoPlacesComparison(
		req.query.Country1, req.query.Province1,
		req.query.Country2, req.query.Province2,
		req.query.TypeOfData, false);

	res.send({
		Province1Exists: twoPlacesComperison.place1Value != -1,
		Province2Exists: twoPlacesComperison.place2Value != -1,
		Province1NumberOfCases: twoPlacesComperison.place1Value,
		Province2NumberOfCases: twoPlacesComperison.place2Value
	});
});

router.get('/compareCounties', (req, res) => {
	var twoPlacesComperison = AnalyticsModule.GetTwoPlacesComparison(
		req.query.State1, req.query.County1,
		req.query.State2, req.query.County2,
		req.query.TypeOfData, true);

	res.send({
		County1Exists: twoPlacesComperison.place1Value != -1,
		County2Exists: twoPlacesComperison.place2Value != -1,
		County1NumberOfCases: twoPlacesComperison.place1Value,
		County2NumberOfCases: twoPlacesComperison.place2Value
	});
});

router.get('/compareRace', (req, res) => {
	var raceComparison = AnalyticsModule.GetRaceComparison(req.query.Option);

	res.send({
		CountryNumberDict: raceComparison
	});
});

router.get('/comparePercentageUS', (req, res) => {
	var populationComparison =
		AnalyticsModule.GetUSPopulationAnalysis(req.query.State, req.query.County);

	res.send({
		CountyExists: populationComparison.confirmed != -1,
		NumOfUnaffected: populationComparison.unaffected,
		NumOfDeath: populationComparison.deaths,
		NumOfConfirmed: populationComparison.confirmed
	});
});

router.get('/comparePercentageWorld', (req, res) => {
	console.log(req.query);
	var populationComparison =
		AnalyticsModule.GetWorldPopulationAnalysis(req.query.Country, req.query.Province);

	res.send({
		CountyExists: populationComparison.confirmed != -1,
		NumOfRecovered: populationComparison.recovered,
		NumOfDeath: populationComparison.deaths,
		NumOfConfirmed: populationComparison.confirmed
	});
});

module.exports = router;
