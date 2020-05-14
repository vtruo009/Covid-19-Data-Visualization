const dataClassesModule = require('../modules/DataClasses.js');
const readCSVModule = require('../modules/ReadCSV.js');
const writeCSVModule = require('../modules/WriteCSV.js');

// An array of Case
var allCases = undefined;
// Dictionary of <string, Country>. String is country name like "China"
var countries = undefined;
// Dictionary of <int, dictionary<string, int>>. 
// The key int is option. (1 = all population, 2 = female, 3 = male, 4 = 80 +, ...)
// The value string is country name.
// The value int is number of people.
// EX: raceComparisonData[2]["Japan"] = number of female confirmed cases in Japan
var raceComparisonData = undefined;

function InitializeAllCases() {
	// Populate allCases
	allCases = readCSVModule.LoadAllCases();

	// Populate countries
	countries = {}
	for (var i = 0; i < allCases.length; ++i) {
		if (!(allCases[i].country in countries)) {
			countries[allCases[i].country] = new dataClassesModule.Country(0, 0, 0, 0, 0, 0);
		}
		
		if (allCases[i].gender == "female") {
			countries[allCases[i].country].numFemaleConfirmed += 1;
			if (allCases[i].dead) countries[allCases[i].country].numFemaleDied++;
			if (allCases[i].recovered) countries[allCases[i].country].numFemaleRecovered++;
		}
		else if (allCases[i].gender == "male") {
			countries[allCases[i].country].numMaleConfirmed++;
			if (allCases[i].dead) countries[allCases[i].country].numMaleDied++;
			if (allCases[i].recovered) countries[allCases[i].country].numMaleRecovered++;
		}
	}

	// Populate raceComparisonData
	raceComparisonData = {}
	for (var i = 1; i <= 8; ++i) {
		raceComparisonData[i] = {}
	}

	for (var i = 0; i < allCases.length; ++i) {
		var countryName = allCases[i].country;
		var optionsToAddData = [1];

		// Option 1: All population

		// Option 2: Female
		if (allCases[i].gender == "female") optionsToAddData.push(2);

		// Option 3: Male
		if (allCases[i].gender == "male") optionsToAddData.push(3);

		// Option 4: 80 +
		if (allCases[i].age > 80) optionsToAddData.push(4);

		// Option 5: 80 +
		else if (allCases[i].age > 60 ) optionsToAddData.push(5);

		// Option 6: 80 +
		else if (allCases[i].age > 40) optionsToAddData.push(6);

		// Option 7: 80 +
		else if (allCases[i].age > 20) optionsToAddData.push(7);

		// Option 8: 80 +
		else if (allCases[i].age > 0) optionsToAddData.push(8);

		optionsToAddData.forEach(AddData);

		function AddData(option) {
			if (!(countryName in raceComparisonData[option])) {
				raceComparisonData[option][countryName] = 0;
			}
			raceComparisonData[option][allCases[i].country]++;
        }
	}
}

function AddCase(reportingDate, country, age, gender, recovered, dead, location, id) {
	if (allCases == undefined) InitializeAllCases();

	for (var i = 0; i < allCases.length; ++i) {
		if (allCases[i].id == id) return false;
	}

	var newCase = new dataClassesModule.Case([
		id, // 0: id
		'', // 1: case in country
		reportingDate, // 2: reporting date
		'', // 3: blacnk column
		'', // 4: summary
		location, // 5: location
		country, // 6: country
		gender, // 7: gender
		age, // 8: age
		'', // 9: Symptom on set
		'', // 10: if onset approximated
		'', // 11: hospital visit date
		'', // 12: exposure start
		'', // 13: exposure end
		'', // 14: from Wuhan
		'', // 15: visiting Wuhan
		dead ? '1' : '0', // 16: dead
		recovered ? '1' : '0', // 17: recovered
		'', // 18: symptom
		'', //19: source
		'', // 20: link
	]);

	// Modify allCases
	allCases.push(newCase);

	// Modify countries
	if (!(newCase.country in countries)) {
		countries[newCase.country] = new dataClassesModule.Country(0, 0, 0, 0, 0, 0, 0);
	}
	if (newCase.gender == "female") {
		countries[newCase.country].numFemaleConfirmed++;
		if (newCase.dead) countries[newCase.country].numFemaleDied++;
		if (newCase.recovered) countries[newCase.country].numFemaleRecovered++;
	} else if (newCase.gender == "male") {
		countries[newCase.country].numMaleConfirmed++;
		if (newCase.dead) countries[newCase.country].numMaleDied++;
		if (newCase.recovered) countries[newCase.country].numMaleRecovered++;
	}

	// Modify raceComparisonData
	var optionsToAddData = [1];
	// Option 1: All population

	// Option 2: Female
	if (newCase.gender == "female") optionsToAddData.push(2);

	// Option 3: Male
	if (newCase.gender == "male") optionsToAddData.push(3);

	// Option 4: 80 +
	if (newCase.age > 80) optionsToAddData.push(4);

	// Option 5: 80 +
	else if (newCase.age > 60) optionsToAddData.push(5);

	// Option 6: 80 +
	else if (newCase.age > 40) optionsToAddData.push(6);

	// Option 7: 80 +
	else if (newCase.age > 20) optionsToAddData.push(7);

	// Option 8: 80 +
	else if (newCase.age > 0) optionsToAddData.push(8);

	optionsToAddData.forEach(AddData);

	function AddData(option) {
		if (!(newCase.country in raceComparisonData[option])) {
			raceComparisonData[option][newCase.country] = 0;
		}
		raceComparisonData[option][newCase.country]++;
	}
	return true;
}

function EditCase(reportingDate, country, age, gender, recovered, dead, location, id) {
	if (allCases == undefined) InitializeAllCases();

	var removeResult = RemoveCase(id);
	if (!removeResult) return false; // id does not exist.
	AddCase(reportingDate, country, age, gender, recovered, dead, location, id);

	return true;
}

function RemoveCase(id) {
	if (allCases == undefined) InitializeAllCases();

	for (var i = 0; i < allCases.length; ++i) {
		if (allCases[i].id == id) {
			// Modify countries
			if (allCases[i].gender == "female") {
				countries[allCases[i].country].numFemaleConfirmed--;
				if (allCases[i].dead) countries[allCases[i].country].numFemaleDied--;
				if (allCases[i].recovered) countries[allCases[i].country].numFemaleRecovered--;
			} else if (allCases[i].gender == "male") {
				countries[allCases[i].country].numMaleConfirmed--;
				if (allCases[i].dead) countries[allCases[i].country].numMaleDied--;
				if (allCases[i].recovered) countries[allCases[i].country].numMaleRecovered--;
			}

			// Modify raceComparisonData
			var optionsToRemoveData = [1];
			// Option 1: All population

			// Option 2: Female
			if (allCases[i].gender == "female") optionsToRemoveData.push(2);

			// Option 3: Male
			if (allCases[i].gender == "male") optionsToRemoveData.push(3);

			// Option 4: 80 +
			if (allCases[i].age > 80) optionsToRemoveData.push(4);

			// Option 5: 80 +
			else if (allCases[i].age > 60) optionsToRemoveData.push(5);

			// Option 6: 80 +
			else if (allCases[i].age > 40) optionsToRemoveData.push(6);

			// Option 7: 80 +
			else if (allCases[i].age > 20) optionsToRemoveData.push(7);

			// Option 8: 80 +
			else if (allCases[i].age > 0) optionsToRemoveData.push(8);

			optionsToRemoveData.forEach(AddData);

			function AddData(option) {
				raceComparisonData[option][allCases[i].country]--;
			}

			// Modify allCases
			allCases.splice(i, 1);
			return true;
		}
	}
	return false;
}

function SaveRecords() {
	if (allCases == undefined) InitializeAllCases();
	writeCSVModule.RecordCases(allCases);
}

function GetCaseById(id) {
	if (allCases == undefined) InitializeAllCases();

	for (var i = 0; i < allCases.length; ++i) {
		if (allCases[i].id == id) return allCases[i];
	}
	return undefined
}

function GetGenderAnalytics(country, typeOfData) {
	if (allCases == undefined) InitializeAllCases();

	var femaleNum, maleNum;

	switch (typeOfData) {
		case 1: // confirmed
			femaleNum = countries[country].numFemaleConfirmed;
			maleNum = countries[country].numMaleConfirmed;
			break;
		case 2: // dead
			femaleNum = countries[country].numFemaleDied;
			maleNum = countries[country].numMaleDied;
			break;
		case 3: // recovered
			femaleNum = countries[country].numFemaleRecovered;
			maleNum = countries[country].numMaleRecovered;
			break;
	}

	return { femaleNum: femaleNum, maleNum: maleNum }
}

function GetRaceComparison(option) {
	if (allCases == undefined) InitializeAllCases();
	return raceComparisonData[option];
}

function GetGenderData(gender, typeOfData) {
	if (allCases == undefined) InitializeAllCases();

	var selectedGender = [];
	if (gender == 1) {
		for (var i = 0; i < allCases.length; ++i) {
			if (allCases[i].gender == 'male') {
				selectedGender.push(allCases[i]);
			}
		}
	}
	if (gender == 2) {
		for (var i = 0; i < allCases.length; ++i) {
			if (allCases[i].gender == 'female') {
				selectedGender.push(allCases[i]);
			}
		}
	}

	//From here the selected gender data is stored in selectedGender[] (array of Cases) now
	var row = [];
	if (typeOfData == 1) {
		var confirmedDict = {};
		var deathDict = {};
		var recoveredDict = {};
		for (var i = 0; i < selectedGender.length; ++i) {
			//for confimred cases
			if (confirmedDict[selectedGender[i].country]) {
				confirmedDict[selectedGender[i].country]++;
			} else {
				confirmedDict[selectedGender[i].country] = 1;
			}
			// //for death cases
			if (deathDict[selectedGender[i].country]) {
				if (selectedGender[i].dead) {
					deathDict[selectedGender[i].country]++;
				}
			} else {
				if (selectedGender[i].dead) {
					deathDict[selectedGender[i].country] = 1;
				} else {
					deathDict[selectedGender[i].country] = 0;
				}
			}
			//for recovered cases
			if (recoveredDict[selectedGender[i].country]) {
				if (selectedGender[i].recovered) {
					recoveredDict[selectedGender[i].country]++;
				}
			} else {
				if (selectedGender[i].recovered) {
					recoveredDict[selectedGender[i].country] = 1;
				} else {
					recoveredDict[selectedGender[i].country] = 0;
				}
			}
		}
		for (var key in confirmedDict) {
			//use confirmedDict cuz every key is the same as other Dict since country == key
			var newItem = new dataClassesModule.GenderCountry(
				key,
				confirmedDict[key],
				deathDict[key],
				recoveredDict[key]
			);
			row.push(newItem);
		}
	} else if (typeofData == 2) {
		var dayDict = {};
		for (var i = 0; i < selectedGender.length; ++i) {
			if (dayDict[selectedGender[i].reportingDateStr]) {
				dayDict[selectedGender[i].reportingDateStr]++;
			} else {
				dayDict[selectedGender[i].reportingDateStr] = 1;
			}
		}

		for (var key in dayDict) {
			var newItem = new genderReq.GenderDay(key, dayDict[key]);
			row.push(newItem);
		}
	}

	return row;
}

function GetAgeData(ageRange, typeOfData) {
	if (allCases == undefined) InitializeAllCases();

	//get age range input from user,
	var selectedRange = [];
	// allCases.length; size of array
	if (ageRange == 1) {
		for (var i = 0; i < allCases.length; ++i) {
			if (allCases[i].age > 80) {
				selectedRange.push(allCases[i]);
			}
		}
	}
	if (ageRange == 2) {
		for (var i = 0; i < allCases.length; ++i) {
			if (allCases[i].age > 60 && allCases[i].age <= 80) {
				selectedRange.push(allCases[i]);
			}
		}
	}
	if (ageRange == 3) {
		for (var i = 0; i < allCases.length; ++i) {
			if (allCases[i].age > 40 && allCases[i].age <= 60) {
				selectedRange.push(allCases[i]);
			}
		}
	}
	if (ageRange == 4) {
		for (var i = 0; i < allCases.length; ++i) {
			if (allCases[i].age > 20 && allCases[i].age <= 40) {
				selectedRange.push(allCases[i]);
			}
		}
	}
	if (ageRange == 5) {
		for (var i = 0; i < allCases.length; ++i) {
			if (allCases[i].age <= 20) {
				selectedRange.push(allCases[i]);
			}
		}
	}

	// From here the selected range of age data is stored in selectedRange[] (array of Cases) now.
	var row = [];
	if (typeOfData == 1) {
		var confirmedDict = {};
		var deathDict = {};
		var recoveredDict = {};
		for (var i = 0; i < selectedRange.length; ++i) {
			//for confimred cases
			if (confirmedDict[selectedRange[i].country]) {
				confirmedDict[selectedRange[i].country]++;
			} else {
				confirmedDict[selectedRange[i].country] = 1;
			}
			// //for death cases
			if (deathDict[selectedRange[i].country]) {
				if (selectedRange[i].dead) {
					deathDict[selectedRange[i].country]++;
				}
			} else {
				if (selectedRange[i].dead) {
					deathDict[selectedRange[i].country] = 1;
				} else {
					deathDict[selectedRange[i].country] = 0;
				}
			}
			//for recovered cases
			if (recoveredDict[selectedRange[i].country]) {
				if (selectedRange[i].recovered) {
					recoveredDict[selectedRange[i].country]++;
				}
			} else {
				if (selectedRange[i].recovered) {
					recoveredDict[selectedRange[i].country] = 1;
				} else {
					recoveredDict[selectedRange[i].country] = 0;
				}
			}
		}
		for (var key in confirmedDict) {
			var newItem = new dataClassesModule.AgeRowCountry(
				key,
				confirmedDict[key],
				deathDict[key],
				recoveredDict[key]
			);
			row.push(newItem);
		}
	} else if (typeOfData == 2) {
		var dayDict = {};
		for (var i = 0; i < selectedRange.length; ++i) {
			if (dayDict[selectedRange[i].reportingDateStr]) {
				dayDict[selectedRange[i].reportingDateStr]++;
			} else {
				dayDict[selectedRange[i].reportingDateStr] = 1;
			}
		}

		for (var key in dayDict) {
			var newItem = new dataClassesModule.AgeRowDay(key, dayDict[key]);
			row.push(newItem);
		}
	}

	return row
}

module.exports = {
	InitializeAllCases: InitializeAllCases,
	AddCase: AddCase,
	EditCase: EditCase,
	RemoveCase: RemoveCase,
	SaveRecords: SaveRecords,
	GetCaseById: GetCaseById,
	GetGenderAnalytics: GetGenderAnalytics,
	GetRaceComparison: GetRaceComparison,
	GetGenderData: GetGenderData,
	GetAgeData: GetAgeData
}