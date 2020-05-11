const router = require('express').Router();
const { EditCase, AddCase, RemoveCase } = require('../modules/ModifyData.js');
const { LoadAllCases } = require('../modules/ReadCSV.js');
const { stringToDate } = require('../modules/BasicHelpers.js');
const { GetCaseById } = require('../modules/AccessData');

router.get('/search', (req, res) => {
	var searchCase = GetCaseById(req.query.caseId);
	console.log('Search:', searchCase);
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
	var allCases = LoadAllCases();
	var date = stringToDate(req.body.ReportingDate);
	var updateCase = EditCase(
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
	console.log(req.body);
	var allCases = LoadAllCases();
	// var date = BasicHelpersModule.stringToDate(req.body.ReportingDate);
	// console.log('From insert', date);
	var stringOfGender;
	if (req.body.Gender == 1) {
		stringOfGender = 'male';
	} else {
		stringOfGender = 'female';
	}
	var insertCase = AddCase(
		allCases,
		req.body.ReportingDate, //convert string to date
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
	var allCases = LoadAllCases();
	var deleteCase = RemoveCase(allCases, req.body.caseId);
	res.send({
		success: deleteCase,
	});
});

module.exports = router;
