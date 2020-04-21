module.exports = {
	loadAllCases: function () {
		// Read values from the CSV, organizes the data into an array of "Case", and returns the array.

		const readCSVModule = require('../modules/ReadCSV.js');
		let parsedCSV = readCSVModule.readCSV(
			'../Server/database/COVID19_line_list_data.csv'
		);

		var allCases = [];

		const caseClassModule = require('../modules/DataClasses.js');
		for (var i = 1; i < parsedCSV.length; ++i) {
			// We want to skip the first row because it is labels.
			allCases.push(new caseClassModule.Case(parsedCSV[i]));
		}

		return allCases;
	},

	loadUSData: function () {
		// Read values from the CSV, organizes the data into an array of "USPlace" and returns the array.

		// Modules
		const readCSVModule = require('../modules/ReadCSV.js');
		const classModule = require('../modules/DataClasses.js');
		const helperModule = require('../modules/BasicHelpers.js');

		// The US data csv has columns { /* Country information */, /* Number of deaths for each date */}
		// numNonDateColumn is the number of columns that contains the country information.
		// In other words, number of columns we need to skip when reading the values for each dates.
		var numNonDateColumn;

		// Contains { <"COUNTY,STATE" (string), corresponding USPlace object> }
		var statesDict = {};

		// Load death data
		let parsedDeathData = readCSVModule.readCSV(
			'../Server/database/time_series_covid_19_deaths_US.csv'
		);

		numNonDateColumn = 12;

		var deathDates = []; // Array of Date objects. Contains all dates that we have data for.
		var deathDateLabels = parsedDeathData[0].slice(numNonDateColumn);
		deathDateLabels.forEach((date) =>
			deathDates.push(helperModule.stringToDate(date))
		);

		// We skip the first row. This is a label.
		for (var i = 1; i < parsedDeathData.length; ++i) {
			var state = parsedDeathData[i][6];
			var county = parsedDeathData[i][5];

			var newState = new classModule.USPlace(state, county);
            newState.addExtraInfo(
                parsedDeathData[i][0], // UID
                parsedDeathData[i][1], // iso2
                parsedDeathData[i][2], // iso3
                parsedDeathData[i][3], // code3
                parsedDeathData[i][4], // FIPS
                parsedDeathData[i][7], // Country
                parsedDeathData[i][8], // Lat
                parsedDeathData[i][9], // Long
                parsedDeathData[i][10], // Combined_key
                parsedDeathData[i][11]); // Population
			newState.addNumDeaths(
				deathDates,
				parsedDeathData[i].slice(numNonDateColumn)
			);
			statesDict[county + ',' + state] = newState;
		}

		// Organize confirmed data.
		let parsedConfirmedData = readCSVModule.readCSV(
			'../Server/database/time_series_covid_19_confirmed_US.csv'
		);

		numNonDateColumn = 11;

		var confirmedDates = [];
		var confirmedDatesDateLabels = parsedConfirmedData[0].slice(
			numNonDateColumn
		);
		confirmedDatesDateLabels.forEach((date) =>
			confirmedDates.push(helperModule.stringToDate(date))
		);

		// We skip the first row. This is a label.
		for (var i = 1; i < parsedConfirmedData.length; ++i) {
			var state = parsedConfirmedData[i][6];
			var county = parsedConfirmedData[i][5];

			if (!(county + ',' + state in statesDict)) {
				statesDict[county + ',' + state] = new classModule.USPlace(
					state,
					county
				);
                statesDict[county + ',' + state].addExtraInfo(
                    parsedConfirmedData[i][0], // UID
                    parsedConfirmedData[i][1], // iso2
                    parsedConfirmedData[i][2], // iso3
                    parsedConfirmedData[i][3], // code3
                    parsedConfirmedData[i][4], // FIPS
                    parsedConfirmedData[i][7], // Country
                    parsedConfirmedData[i][8], // Lat
                    parsedConfirmedData[i][9], // Long
                    parsedConfirmedData[i][10], // Combined_key
                    "NA"); // No population data in the csv with confirmed data.
            }

			statesDict[county + ',' + state].addNumConfirmed(
				confirmedDates,
				parsedConfirmedData[i].slice(numNonDateColumn)
			);
		}

		// Copy USPlace objects from dictionary to an array.
		var allStates = [];
		for (var key in statesDict) {
			allStates.push(statesDict[key]);
		}

		return allStates;
	},

	loadWorldData: function () {
		// Read values from the CSV, organizes the data into an array of "WorldPlace" and returns the array.

		// Modules
		const readCSVModule = require('../modules/ReadCSV.js');
		const classModule = require('../modules/DataClasses.js');
		const helperModule = require('../modules/BasicHelpers.js');

		// The World data csv has columns { /* Country information */, /* Number of deaths for each date */}
		// numNonDateColumn is the number of columns that contains the country information.
		// In other words, number of columns we need to skip when reading the values for each dates.
		var numNonDateColumn;

		// Contains { <"STATE,COUNTRY" (string), corresponding WorldPlace object> }
		var statesDict = {};

		// Load death data
		let parsedDeathData = readCSVModule.readCSV(
			'../Server/database/time_series_covid_19_deaths.csv'
		);

		numNonDateColumn = 4;

		var deathDates = []; // Array of Date objects. Contains all dates that we have data for.
		var deathDateLabels = parsedDeathData[0].slice(numNonDateColumn);
		deathDateLabels.forEach((date) =>
			deathDates.push(helperModule.stringToDate(date))
		);

		// We skip the first row. This is a label.
		for (var i = 1; i < parsedDeathData.length; ++i) {
			var state = parsedDeathData[i][0];
			var country = parsedDeathData[i][1];

            var latitude = parsedDeathData[i][2];
            var longitude = parsedDeathData[i][3];

			var newState = new classModule.WorldPlace(country, state, latitude, longitude);
			newState.addNumDeaths(
				deathDates,
				parsedDeathData[i].slice(numNonDateColumn)
			);
			statesDict[state + ',' + country] = newState;
		}

		// Organize confirmed data.
		let parsedConfirmedData = readCSVModule.readCSV(
			'../Server/database/time_series_covid_19_confirmed.csv'
		);

		numNonDateColumn = 4;

		var confirmedDates = [];
		var confirmedDatesDateLabels = parsedConfirmedData[0].slice(
			numNonDateColumn
		);
		confirmedDatesDateLabels.forEach((date) =>
			confirmedDates.push(helperModule.stringToDate(date))
		);

		// We skip the first row. This is a label.
		for (var i = 1; i < parsedConfirmedData.length; ++i) {
			var state = parsedConfirmedData[i][0];
			var country = parsedConfirmedData[i][1];

			if (!(state + ',' + country in statesDict)) {
                var latitude = parsedConfirmedData[i][2];
                var longitude = parsedConfirmedData[i][3];

				statesDict[state + ',' + country] =
					new classModule.WorldPlace(country, state, latitude, longitude);
            }

			statesDict[state + ',' + country].addNumConfirmed(
				confirmedDates,
				parsedConfirmedData[i].slice(numNonDateColumn)
			);
		}

		// Organize recovered data.
		let parsedRecoveredData = readCSVModule.readCSV(
			'../Server/database/time_series_covid_19_recovered.csv'
		);
		numNonDateColumn = 4;

		var recoveredDates = [];
		var recoveredDatesDateLabels = parsedRecoveredData[0].slice(
			numNonDateColumn
		);
		recoveredDatesDateLabels.forEach((date) =>
			recoveredDates.push(helperModule.stringToDate(date))
		);

		// We skip the first row. This is a label.
		for (var i = 1; i < parsedRecoveredData.length; ++i) {
			var state = parsedRecoveredData[i][0];
			var country = parsedRecoveredData[i][1];

			if (!(state + ',' + country in statesDict)) {

				var latitude = parsedRecoveredData[i][2];
				var longitude = parsedRecoveredData[i][3];

				statesDict[state + ',' + country] =
					new classModule.WorldPlace(country, state, latitude, longitude);
			}

			statesDict[state + ',' + country].addNumRecovered(
				recoveredDates,
				parsedRecoveredData[i].slice(numNonDateColumn)
			);
		}

		// Copy USPlace objects from dictionary to an array.
		var allStates = [];
		for (var key in statesDict) {
			allStates.push(statesDict[key]);
		}

		return allStates;
	},
};
