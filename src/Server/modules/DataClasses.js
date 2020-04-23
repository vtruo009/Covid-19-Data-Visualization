module.exports = {
	Case: class {
		constructor(line) {
			this.id = parseInt(line[0]);
			this.caseInCountry = parseInt(line[1]);

			const helperModule = require('../modules/BasicHelpers.js');

			this.reportingDate = helperModule.stringToDate(line[2]);
			this.reportingDateStr = line[2];

			// Column 3 is blank.

			this.summary = line[4];

			this.location = line[5];
			this.country = line[6];
			this.gender = line[7];
			this.age = parseInt(line[8]);

			this.symptomOnset = line[9];
			this.ifOnsetApproximated = line[10];
			this.hospitalVisitDate = line[11];

			this.exposureStart = line[12];
			this.exposureEnd = line[13];

			this.fromWuhan = line[14];
			this.visitingWuhan = line[15];

			this.dead = line[16] == '1';
			this.recovered = line[17] == '1';

			this.symptom = line.length >= 19 ? line[18] : '';
			this.source = line.length >= 20 ? line[19] : '';
			this.link = line.length >= 21 ? line[20] : '';
		}
	},

	USPlace: class {
		constructor(state, county) {
			this.state = state;
			this.county = county;

			// Dictionary of { <Date, number of Deaths> }
			this.numDeaths = {};

			// Dictionary of { <Date, number of Confirmed cases> }
			this.numConfirmed = {};
		}
		addExtraInfo(
			uid,
			iso2,
			iso3,
			code3,
			FIPS,
			country,
			latitude,
			longitude,
			combinedKey,
			population
		) {
			this.uid = uid;
			this.iso2 = iso2;
			this.iso3 = iso3;
			this.core3 = code3;
			this.FIPS = FIPS;
			this.country = country;
			this.latitude = latitude;
			this.longitude = longitude;
			this.combinedKey = combinedKey;
			this.population = population;
		}
		addNumDeaths(dates, values) {
			// dates is a list of Date {1/20/20, 1/21/20, 1/22/20, ...}
			// values contains the number of people died on the corresponding date.

			for (var i = 0; i < dates.length; ++i) {
				this.numDeaths[dates[i]] = parseInt(values[i]);
			}
		}
		addNumConfirmed(dates, values) {
			// dates is a list of Date {1/20/20, 1/21/20, 1/22/20, ...}
			// values contains the number of confirmed cases on the corresponding date.

			for (var i = 0; i < dates.length; ++i) {
				this.numConfirmed[dates[i]] = parseInt(values[i]);
			}
		}
	},

	WorldPlace: class {
		constructor(country, state, latitude, longitude) {
			this.country = country;
			this.state = state;

			this.latitude = latitude;
			this.longitude = longitude;

			// Dictionary of { <Date, number of Deaths> }
			this.numDeaths = {};

			// Dictionary of { <Date, number of Confirmed cases> }
			this.numConfirmed = {};

			// Dictionary of { <Date, number of Recovered cases> }
			this.numRecovered = {};
		}
		addNumDeaths(dates, values) {
			// dates is a list of Date {1/20/20, 1/21/20, 1/22/20, ...}
			// values contains the number of people died on the corresponding date.

			for (var i = 0; i < dates.length; ++i) {
				if (!Number.isNaN(dates[i].getMonth()) && !Number.isNaN(parseInt(values[i]))) {
					this.numDeaths[dates[i]] = parseInt(values[i]);
				}
			}
		}
		addNumConfirmed(dates, values) {
			// dates is a list of Date {1/20/20, 1/21/20, 1/22/20, ...}
			// values contains the number of confirmed cases on the corresponding date.

			for (var i = 0; i < dates.length; ++i) {
				if (!Number.isNaN(dates[i].getMonth()) && !Number.isNaN(parseInt(values[i]))) {
					this.numConfirmed[dates[i]] = parseInt(values[i]);
				}
			}
		}
		addNumRecovered(dates, values) {
			// dates is a list of Date {1/20/20, 1/21/20, 1/22/20, ...}
			// values contains the number of recovered cases on the corresponding date.

			for (var i = 0; i < dates.length; ++i) {
				if (!Number.isNaN(dates[i].getMonth()) && !Number.isNaN(parseInt(values[i]))) {
					this.numRecovered[dates[i]] = parseInt(values[i]);
				}
			}
		}
	},

	AgeRowCountry: class {
		constructor(country, numConfirmed, numDeaths, numRecovered) {
			this.country = country;
			this.numberOfConfirmed = numConfirmed;
			this.numberOfDeaths = numDeaths;
			this.numberOfRecovered = numRecovered;
		}
	},

	AgeRowDay: class {
		constructor(date, numConfirmedCases) {
			this.date = date;
			this.numberOfConfirmed = numConfirmedCases;
		}
	},

	USRowConfirmed: class {
		constructor(date, numConfirmed) {
			(this.date = date), (this.number = numConfirmed);
		}
	},

	USRowDeaths: class {
		constructor(date, numDeaths) {
			this.date = date;
			this.number = numDeaths;
		}
	},

	WorldRowConfirmed: class {
		constructor(date, numConfirmed) {
			this.date = date;
			this.number = numConfirmed;
		}
	},

	WorldRowDeaths: class {
		constructor(date, numDeaths) {
			this.date = date;
			this.number = numDeaths;
		}
	},

	WorldRowRecovered: class {
		constructor(date, numRecovered) {
			this.date = date;
			this.number = numRecovered;
		}
	},

	GenderCountry: class {
		constructor(country, numConfirmed, numDeaths, numRecovered) {
			this.country = country;
			this.numberOfConfirmed = numConfirmed;
			this.numberOfDeaths = numDeaths;
			this.numberOfRecovered = numRecovered;
		}
	},

	GenderDay: class {
		constructor(date, numConfirmedCases) {
			this.date = date;
			this.numberOfConfirmed = numConfirmedCases;
		}
	},
};
