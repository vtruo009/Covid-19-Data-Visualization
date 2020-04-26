var express = require('express');
var router = express.Router();

router.get('/search', (req, res) => {
	// structure of th request object:
	// {
	//   // integer
	//   caseId: 13
	//}

	// NOTE: This router receives a GET request. You can access data through the query of the request. Ex: req.query.someData

	// Should return a response object with the following structure
	// {
	//   CaseId: 12              // integer
	//   Country: "United State" // string
	//   State: "California"     // string
	//   Gender: "1"             // string  "1" => male, "2" => female
	//   TypeOfCase: "2"         // string  "1" => dead, "2" => recovered
	//   Age: 10                 // integer
	//   ReportingDate: "01/20/20" // String
	//}

	res.send({
		// returns dummy data for example purposes
		dummyDate: 'hello',
	});
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

	// NOTE: This router receives a POST request. You can access data through the body of the request. Ex: req.body.someData

	// Should return a response object with the following structure
	//{
	//    success: true => // boolean => depending on whether the deletion was sucessful or not
	//}

	res.send({
		// returns dummy data for example purposes
		dummyDate: 'hello',
	});
});

router.post('/insert', (req, res) => {
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

	// NOTE: This router receives a POST request. You can access data through the body of the request. Ex: req.body.someData

	// Should return a response object with the following structure
	//{
	//    success: true => // boolean => depending on whether the deletion was sucessful or not
	//}
	res.send({
		// returns dummy data for example purposes
		dummyDate: 'hello',
	});
});

router.post('/delete', (req, res) => {
	// structure of th request object:
	// {
	//   // integer
	//   caseId: 13
	//}

	// NOTE: This router receives a POST request. You can access data through the body of the request. Ex: req.body.caseId

	// Should return a response object with the following structure
	//{
	//    success: true => // boolean => depending on whether the deletion was sucessful or not
	//}
	res.send({
		// returns dummy data for example purposes
		dummyDate: 'hello',
	});
});

module.exports = router;
