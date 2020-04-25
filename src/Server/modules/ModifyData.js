
function AddCase(allCases, reportingDate, country, age, gender, recovered, dead, id) {
	for (var i = 0; i < allCases.length; ++i) {
		if (allCases[i].id == id) return false;
	}

	const classesModule = require('../modules/DataClasses.js');

    var dateString = reportingDate.getMonth() + 1 + "/" + reportingDate.getDay() + "/" + reportingDate.getFullYear();

    var newCase = new classesModule.Case([
		id, // 0: id
		"", // 1: case in country
		dateString, // 2: reporting date
		"", // 3: blacnk column
		"", // 4: summary
		"", // 5: location
		country, // 6: country
		gender, // 7: gender
		age, // 8: age
		"", // 9: Symptom on set
		"", // 10: if onset approximated
		"", // 11: hospital visit date
		"", // 12: exposure start
		"", // 13: exposure end
		"",  // 14: from Wuhan
		"", // 15: visiting Wuhan
		(dead? '1': '0'), // 16: dead
		(recovered ? '1' : '0'), // 17: recovered
		"", // 18: symptom
		"", //19: source
		"" // 20: link
	]);

	allCases.push(newCase);

	const writeCSVModule = require('../modules/WriteCSV.js');
	writeCSVModule.RecordCases(allCases);
}

function EditCase(allCases, reportingDate, country, age, gender, recovered, dead, id) {
	for (var i = 0; i < allCases.length; ++i) {
		if (allCases[i].id == id) {
			const classesModule = require('../modules/DataClasses.js');

			allCases[i].country = country;
			allCases[i].reportingDate = reportingDate;
			allCases[i].reportingDateStr = reportingDate.getMonth() + 1 + "/" + reportingDate.getDate() + "/" + reportingDate.getFullYear();
			allCases[i].age = age;
			allCases[i].gender = gender;
			allCases[i].recovered = recovered;
			allCases[i].dead = dead;

			const writeCSVModule = require('../modules/WriteCSV.js');
			writeCSVModule.RecordCases(allCases);

			return true;
        }
	}

	// id not found.
	return false;
}

function RemoveCase(allCases, id) {
	for (var i = 0; i < allCases.length; ++i) {
		if (allCases[i].id == id) {
			allCases.splice(i, 1);

			const writeCSVModule = require('../modules/WriteCSV.js');
			writeCSVModule.RecordCases(allCases);

			return true;
		}
	}

	// id not found.
	return false;
}

module.exports = {
    // Argument: Array of Case,  reportingDate (Date), country, age, gender, recovered (Bool), dead (Bool), id
    EditCase: EditCase,

    // Argument: Array of Case,  reportingDate (Date), country, age, gender, recovered (Bool), dead (Bool), id
    AddCase: AddCase,

    // Argument: id of the Case the user wants to delete.
    RemoveCase: RemoveCase,
};