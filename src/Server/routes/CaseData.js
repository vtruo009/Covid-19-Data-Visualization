var express = require('express');
var router = express.Router();
const ModifyDataModule = require('../modules/ModifyData.js');
const readCSVModule = require('../modules/ReadCSV.js');
const BasicHelpersModule = require('../modules/BasicHelpers.js');
const AccessDataModule = require('../modules/AccessData');

router.get('/search', (req, res) => {
	var searchCase = AccessDataModule.GetCaseById(req.query.caseId);
	if (searchCase == null) {
		res.send({
			success: false,
			case: {},
		});
	} else {
		var integerOfGender;
		if (searchCase.gender == 'male') {
			integerOfGender = 1;
		} else {
			integerOfGender = 2;
		}
		var integerofType;
		if (searchCase.dead) {
			integerofType = 2;
		} else if (searchCase.recovered) {
			integerofType = 3;
		} else {
			integerofType = 1;
		}
		res.send({
			success: true,
			case: {
				CaseId: searchCase.id,
				Country: searchCase.country,
				State: searchCase.location,
				Gender: integerOfGender,
				TypeOfCase: integerofType,
				Age: searchCase.age,
				ReportingDate: searchCase.reportingDateStr,
			},
		});
	}
});

router.post('/update', (req, res) => {
	// Get respective data using the body parameters
	if (req.body.Gender == 1) {
		stringOfGender = 'male';
	} else {
		stringOfGender = 'female';
	}
	var allCases = readCSVModule.LoadAllCases();
	var date = BasicHelpersModule.stringToDate(req.body.ReportingDate);
	var updateCase = ModifyDataModule.EditCase(
		allCases,
		date,
		req.body.Country,
		req.body.Age,
		stringOfGender,
		req.body.TypeOfCase == 3,
		req.body.TypeOfCase == 2,
		req.body.State,
		req.body.CaseId
	);
	res.send({
		success: updateCase,
	});
});

router.post('/insert', (req, res) => {
	var allCases = readCSVModule.LoadAllCases();
	var date = BasicHelpersModule.stringToDate(req.body.ReportingDate);
	var stringOfGender;
	if (req.body.Gender == 1) {
		stringOfGender = 'male';
	} else {
		stringOfGender = 'female';
	}
	var insertCase = ModifyDataModule.AddCase(
		allCases,
		date, //convert string to date
		req.body.Country,
		req.body.Age,
		stringOfGender,
		req.body.TypeOfCase == 3,
		req.body.TypeOfCase == 2,
		req.body.State,
		req.body.CaseId
	);
	res.send({
		success: insertCase,
	});
});

router.post('/delete', (req, res) => {
	var allCases = readCSVModule.LoadAllCases();
	var deleteCase = ModifyDataModule.RemoveCase(allCases, req.body.caseId);
	res.send({
		success: deleteCase,
	});
});

module.exports = router;
