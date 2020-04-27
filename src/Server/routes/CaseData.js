var express = require('express');
var router = express.Router();

router.get('/search', (req, res) => {
	// structure of th request object:
	// {
	//   // integer
	//   caseId: 13
	//}
	console.log(req.query);
	// NOTE: This router receives a GET request. You can access data through the query of the request. Ex: req.query.someData
	
	const AccessDataModule = require('../modules/AccessDataModule.js');
	var searchCase = AccessDataModule.GetCaseById(req.query.caseId);
	// Should return a response object with the following structure
	// {
	//   CaseId: 12              // integer
	//   Country: "United State" // string
	//   State: "California"     // string
	//   Gender: "1"             // string  "1" => male, "2" => female
	//   TypeOfCase: "2"         // string  "1" => confirmed, "2" => dead 3 recovered
	//   Age: 10                 // integer
	//   ReportingDate: "01/20/20" // String
	//}
	if (searchCase == null){
		res.send({
			// returns dummy data for example purposes
				success: false,
				case:{}
				
		});
	}
	else{
	var integerOfGender;
	if (searchCase.gender == "male"){
		integerOfGender = 1;
	}
	else{
		integerOfGender = 2;
	}
	var integerofType;
	if (searchCase.death == true){
		integerofType = 2;
	}
	else if (searchCase.recover == true){
		integerofType = 3;
	}
	else{
		integerofType = 1;
	}
	res.send({
		// returns dummy data for example purposes
			success: true,
			case:{
				CaseId: searchCase.id   ,           
			  	Country: searchCase.country ,
			   	State: searchCase.state,
			   	Gender: integerOfGender ,  
			   	TypeOfCase: integerofType    ,   
			   	Age: searchCase.age           ,     
				ReportingDate: searchCase.reportingDateStr ,
			}

	});
}
});

router.post('/update', (req, res) => {
	// Example structure of the request object:
	// {
	//   CaseId: 12              // integer
	//   Country: "United State" // string
	//   State: "California"     // string
	//   Gender: "1"             // string  "1" => male, "2" => female
	//   TypeOfCase: "2"         // string  "1" => dead, "2" => recovered
	//   Age: 10                 // integer
	//   ReportingDate: "01/20/20" // String
	//}
	console.log(req.query);
	// Get respective data using the query parameters
	if (req.query.Gender == 1) {
		stringOfGender = "male"
	}
	else {
		stringOfGender = "female"
	}
	const readCSVModule = require('../modules/ReadCSV.js');
	var allCases = readCSVModule.LoadAllCases();
	const BasicHelpersModule = require('../modules/BasicHelpers.js');
	var date = BasicHelpersModule.stringToDate(req.query.ReportingDate);
	const ModifyDataModule = require('../modules/ModifyData.js');
	var updateCase = ModifyDataModule.EditCase(
								allCases,
								date,
								req.query.Country,
								req.query.Age,
								stringOfGender,
								req.query.TypeOfCase == 2,
								req.query.TypeOfCase == 3,
								req.query.CaseId
							);
	// NOTE: This router receives a POST request. You can access data through the body of the request. Ex: req.body.someData

	// Should return a response object with the following structure
	//{
	//    success: true => // boolean => depending on whether the deletion was sucessful or not
	//}

	res.send({
		// returns dummy data for example purposes
		success: updateCase,
	});
});

router.post('/insert', (req, res) => {
	// Example structure of the request object:
	// {
	//   CaseId: 12              // integer
	//   Country: "United State" // string
	//   State: "California"     // string
	//   Gender: "1"             // string  "1" => male, "2" => female
	//   TypeOfCase: "2"         // string  "1" => confirmed, "2" => dead, "3" => recovered
	//   Age: 10                 // integer
	//   ReportingDate: "01/20/20" // String
	//}
	const readCSVModule = require('../modules/ReadCSV.js');
	var allCases = readCSVModule.LoadAllCases();
	const BasicHelpersModule = require('../modules/BasicHelpers.js');
	var date = BasicHelpersModule.stringToDate(req.query.ReportingDate);
	const ModifyDataModule = require('../modules/ModifyData.js');
	var stringOfGender;
	if (req.query.Gender == 1) {
		stringOfGender = "male"
	}
	else {
		stringOfGender = "female"
	}
	var insertCase = ModifyDataModule.AddCase(
							allCases,
							date, //convert string to date
							req.query.Country,
							req.query.Age,
							stringOfGender,
							req.queryTypeOfCase == 3,
							req.query.TypeOfCase == 2,
							req.query.CaseId);
	
	// NOTE: This router receives a POST request. You can access data through the body of the request. Ex: req.body.someData

	// Should return a response object with the following structure
	//{
	//    success: true => // boolean => depending on whether the deletion was sucessful or not
	//}
	res.send({
		// returns dummy data for example purposes
		sucess: insertCase,
	});
});

router.post('/delete', (req, res) => {
	// structure of th request object:
	// {
	//   // integer
	//   caseId: 13
	//}
	const readCSVModule = require('../modules/ReadCSV.js');
	var allCases = readCSVModule.LoadAllCases();
	const ModifyDataModule = require('../modules/ModifyData.js');
	var deleteCase = ModifyDataModule.RemoveCase(allCases,req.query.caseId);

	// NOTE: This router receives a POST request. You can access data through the body of the request. Ex: req.body.caseId

	// Should return a response object with the following structure
	//{
	//    success: true => // boolean => depending on whether the deletion was sucessful or not
	//}
	res.send({
		// returns dummy data for example purposes
		success: deleteCase,
	});
});

module.exports = router;
