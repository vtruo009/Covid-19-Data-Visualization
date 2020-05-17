var express = require('express');
var router = express.Router();
const AnalyticsModule = require('../modules/Analytics.js');
const { performance } = require('perf_hooks');

router.get('/compareGender', (req, res) => {
	const t0 = performance.now();
	var genderAnalytics = AnalyticsModule.GetGenderAnalytics(
		req.query.Country,
		req.query.TypeOfData
	);
	const t1 = performance.now();
	console.log(`Call to compareGender took ${t1 - t0} milliseconds.`);

	if (genderAnalytics == null) {
		res.send({
			CountryExists: false,
			FemaleNumberOfCases: 0,
			MaleNumberOfCases: 0,
		});
	} else {
		res.send({
			CountryExists: true,
			FemaleNumberOfCases: genderAnalytics.femaleNum,
			MaleNumberOfCases: genderAnalytics.maleNum,
		});
	}
});

router.get('/compareProvinces', (req, res) => {
	const t0 = performance.now();
	var twoPlacesComperison = AnalyticsModule.GetTwoPlacesComparison(
		req.query.Country1,
		req.query.Province1,
		req.query.Country2,
		req.query.Province2,
		req.query.TypeOfData,
		false
	);
	const t1 = performance.now();
	console.log(`Call to compareProvinces took ${t1 - t0} milliseconds.`);

	res.send({
		Province1Exists: twoPlacesComperison.place1Value != -1,
		Province2Exists: twoPlacesComperison.place2Value != -1,
		Province1NumberOfCases: twoPlacesComperison.place1Value,
		Province2NumberOfCases: twoPlacesComperison.place2Value,
	});
});

router.get('/compareCounties', (req, res) => {
	const t0 = performance.now();
	var twoPlacesComperison = AnalyticsModule.GetTwoPlacesComparison(
		req.query.State1,
		req.query.County1,
		req.query.State2,
		req.query.County2,
		req.query.TypeOfData,
		true
	);
	const t1 = performance.now();
	console.log(`Call to compareCounties took ${t1 - t0} milliseconds.`);
	res.send({
		County1Exists: twoPlacesComperison.place1Value != -1,
		County2Exists: twoPlacesComperison.place2Value != -1,
		County1NumberOfCases: twoPlacesComperison.place1Value,
		County2NumberOfCases: twoPlacesComperison.place2Value,
	});
});

router.get('/compareRace', (req, res) => {
	const t0 = performance.now();
	var raceComparison = AnalyticsModule.GetRaceComparison(req.query.Option);
	const t1 = performance.now();
	console.log(`Call to compareRace took ${t1 - t0} milliseconds.`);
	res.send({
		CountryNumberDict: raceComparison,
	});
});

router.get('/comparePercentageUS', (req, res) => {
	const t0 = performance.now();
	var populationComparison = AnalyticsModule.GetUSPopulationAnalysis(
		req.query.State,
		req.query.County
	);
	const t1 = performance.now();
	console.log(`Call to comparePercentageUS took ${t1 - t0} milliseconds.`);
	res.send({
		CountyExists: populationComparison.confirmed != -1,
		NumOfUnaffected: populationComparison.unaffected,
		NumOfDeath: populationComparison.deaths,
		NumOfConfirmed: populationComparison.confirmed,
	});
});

router.get('/comparePercentageWorld', (req, res) => {
	const t0 = performance.now();
	var populationComparison = AnalyticsModule.GetWorldPopulationAnalysis(
		req.query.Country,
		req.query.Province
	);
	const t1 = performance.now();
	console.log(`Call to comparePercentageWorld took ${t1 - t0} milliseconds.`);
	res.send({
		ProvinceExists: populationComparison.confirmed != -1,
		NumOfRecovered: populationComparison.recovered,
		NumOfDeath: populationComparison.deaths,
		NumOfConfirmed: populationComparison.confirmed,
	});
});

module.exports = router;
