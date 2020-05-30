var express = require('express');
var router = express.Router();
const {
	GetCaseById,
	EditCase,
	AddCase,
	RemoveCase,
} = require('../modules/CaseManager');

router.get('/search', (req, res) => {
	const searchCase = GetCaseById(req.query.caseId);
	if (searchCase == undefined) {
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
	if (req.body.Gender == 1) {
		stringOfGender = 'male';
	} else {
		stringOfGender = 'female';
	}

	res.send({
		success: EditCase(
			req.body.ReportingDate,
			req.body.Country,
			req.body.Age,
			stringOfGender,
			req.body.TypeOfCase == 3,
			req.body.TypeOfCase == 2,
			req.body.State,
			req.body.CaseId
		),
	});
});

router.post('/insert', (req, res) => {
	let stringOfGender = '';
	if (req.body.Gender == 1) {
		stringOfGender = 'male';
	} else {
		stringOfGender = 'female';
	}
	res.send({
		success: AddCase(
			req.body.ReportingDate, //convert string to date
			req.body.Country,
			req.body.Age,
			stringOfGender,
			req.body.TypeOfCase == 3,
			req.body.TypeOfCase == 2,
			req.body.State,
			req.body.CaseId
		),
	});
});

router.post('/delete', (req, res) => {
	res.send({
		success: RemoveCase(req.body.caseId),
	});
});

module.exports = router;
