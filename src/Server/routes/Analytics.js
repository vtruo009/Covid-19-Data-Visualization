var express = require('express');
var router = express.Router();

const W = require('../modules/WorldPlaceManager.js');
const U = require('../modules/USPlacesManager.js');
const C = require('../modules/CaseManager.js');

const { performance } = require('perf_hooks');

router.get('/compareGender', (req, res) => {
	const t0 = performance.now();
	const genderAnalytics = C.GetGenderAnalytics(
		req.query.Country,
		req.query.TypeOfData
	);
	
	const t1 = performance.now();
	console.log(`Call to compareGender takes ${t1-t0} milliseconds.`);

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

router.get('/compareRace', (req, res) => {
	const t0 = performance.now();
	res.send({
		CountryNumberDict: C.GetRaceComparison(req.query.Option),
	});
	const t1 = performance.now();
	console.log(`Call to compareRace took ${t1-t0} milliseconds.`);
});

router.get('/compareProvinces', (req, res) => {
	const t0 = performance.now();
	const twoPlacesComparison = W.GetTwoWorldPlacesComparison(
		req.query.Country1,
		req.query.Province1,
		req.query.Country2,
		req.query.Province2,
		req.query.TypeOfData,
	);
	const t1 = performance.now();
	console.log(`Call to compareProvinces took ${t1-t0} milliseconds.`);
	// console.log(twoPlacesComparison);
	res.send({
		Province1Exists: twoPlacesComparison.place1Value != -1,
		Province2Exists: twoPlacesComparison.place2Value != -1,
		Province1NumberOfCases: twoPlacesComparison.place1Value,
		Province2NumberOfCases: twoPlacesComparison.place2Value,
	});
});

router.get('/comparePercentageWorld', (req, res) => {
	const t0 = performance.now();
	const populationComparison = W.GetWorldPopulationAnalysis(
		req.query.Country,
		req.query.Province
	);
	const t1 = performance.now();
	console.log(`Call to comparePercentageWorld took ${t1-t0} milliseconds.`);
	// console.log(populationComparison);
	res.send({
		ProvinceExists: populationComparison.confirmed != -1,
		NumOfRecovered: populationComparison.recovered,
		NumOfDeath: populationComparison.deaths,
		NumOfConfirmed: populationComparison.confirmed,
	});
});

router.get('/compareCounties', (req, res) => {
	const t0 = performance.now();
	const twoPlacesComparison = U.GetTwoUSPlacesComparison(
		req.query.State1,
		req.query.County1,
		req.query.State2,
		req.query.County2,
		req.query.TypeOfData,
	);
	const t1 = performance.now();
	console.log(`Call to compareCounties took ${t1-t0} milliseconds.`);
	res.send({
		County1Exists: twoPlacesComparison.place1Value != -1,
		County2Exists: twoPlacesComparison.place2Value != -1,
		County1NumberOfCases: twoPlacesComparison.place1Value,
		County2NumberOfCases: twoPlacesComparison.place2Value,
	});
});

router.get('/comparePercentageUS', (req, res) => {
	const t0 = performance.now();
	const populationComparison = U.GetUSPopulationAnalysis(
		req.query.State,
		req.query.County
	);
	const t1 = performance.now();
	console.log(`Call to comparePercentageUS took ${t1-t0} milliseconds.`);
	res.send({
		CountyExists: populationComparison.confirmed != -1,
		NumOfUnaffected: populationComparison.unaffected,
		NumOfDeath: populationComparison.deaths,
		NumOfConfirmed: populationComparison.confirmed,
	});
});

module.exports = router;
