const {
	LoadAllCases,
	LoadUSData,
	LoadWorldData,
} = require('../modules/ReadCSV.js');

function GetGenderAnalytics(country, typeOfData) {
	var allCases = LoadAllCases();

	var countryExists = false;

	var female = 0;
	var male = 0;

	for (var i = 0; i < allCases.length; ++i) {
		if (allCases[i].country == country) {
			countryExists = true;
			if (allCases[i].gender == 'female') {
				if (typeOfData == 2 && allCases[i].dead) female++;
				// dead
				else if (typeOfData == 3 && allCases[i].recovered) female++;
				//recovered
				else if (typeOfData == 1) female++; // confirmed
			} else if (allCases[i].gender == 'male') {
				if (typeOfData == 2 && allCases[i].dead) male++;
				// dead
				else if (typeOfData == 3 && allCases[i].recovered) male++;
				//recovered
				else if (typeOfData == 1) male++; // confirmed
			}
		}
	}

	if (!countryExists) return undefined;

	return { femaleNum: female, maleNum: male };
}

function GetTwoPlacesComparison(
	largerAreaName1,
	smallerAreaName1,
	largerAreaName2,
	smallerAreaName2,
	typeOfData,
	isUSData
) {
	var province1Data = null;
	var province2Data = null;

	if (isUSData) {
		var allUSData = LoadUSData();

		for (var i = 0; i < allUSData.length; ++i) {
			if (
				allUSData[i].state == largerAreaName1 &&
				allUSData[i].county == smallerAreaName1
			) {
				province1Data = allUSData[i];
			}
			if (
				allUSData[i].state == largerAreaName2 &&
				allUSData[i].county == smallerAreaName2
			) {
				province2Data = allUSData[i];
			}
		}
	} else {
		// World
		var allWorldData = LoadWorldData();

		for (var i = 0; i < allWorldData.length; ++i) {
			if (
				allWorldData[i].country == largerAreaName1 &&
				allWorldData[i].state == smallerAreaName1
			) {
				province1Data = allWorldData[i];
			}
			if (
				allWorldData[i].country == largerAreaName2 &&
				allWorldData[i].state == smallerAreaName2
			) {
				province2Data = allWorldData[i];
			}
		}
	}

	if (province1Data == null || province2Data == null) {
		place1Value = province1Data == null ? -1 : 0;
		place2Value = province2Data == null ? -1 : 0;
		return { place1Value: place1Value, place2Value: place2Value };
	}

	var place1Value, place2Value;

	switch (typeOfData) {
		case '1': // confirmed
			place1Value = GetMostRecentValue(province1Data.numConfirmed);
			place2Value = GetMostRecentValue(province2Data.numConfirmed);
			break;
		case '2': // dead
			place1Value = GetMostRecentValue(province1Data.numDeaths);
			place2Value = GetMostRecentValue(province2Data.numDeaths);
			break;
		case '3': // recovered
			place1Value = GetMostRecentValue(province1Data.numRecovered);
			place2Value = GetMostRecentValue(province2Data.numRecovered);
			break;
	}

	return { place1Value: place1Value, place2Value: place2Value };
}

function GetRaceComparison(option) {
	var allCases = LoadAllCases();

	var dictionary = {};

	for (var i = 0; i < allCases.length; ++i) {
		if (!dictionary.hasOwnProperty(allCases[i].country)) {
			dictionary[allCases[i].country] = 0;
		}

		var addData = false;
		switch (option) {
			case '1': // All Population
				addData = true;
				break;
			case '2': // Female
				if (allCases[i].gender == 'female') addData = true;
				break;
			case '3': // Male
				if (allCases[i].gender == 'male') addData = true;
				break;
			case '4': // 80 +
				if (allCases[i].age > 80) addData = true;
				break;
			case '5': // 60 - 80
				if (allCases[i].age > 60 && allCases[i].age <= 80) addData = true;
				break;
			case '6': // 40 - 60
				if (allCases[i].age > 40 && allCases[i].age <= 60) addData = true;
				break;
			case '7': // 20 - 40
				if (allCases[i].age > 20 && allCases[i].age <= 40) addData = true;
				break;
			case '8': // 0 - 20
				if (allCases[i].age <= 20) addData == true;
				break;
		}

		if (addData) dictionary[allCases[i].country]++;
	}

	return dictionary;
}

function GetUSPopulationAnalysis(state, county) {
	var unaffected, deaths, confirmed;

	var allUSData = LoadUSData();
	var countyData = null;

	for (var i = 0; i < allUSData.length; ++i) {
		if (allUSData[i].state == state && allUSData[i].county == county) {
			countyData = allUSData[i];
		}
	}

	if (countyData == null) {
		// The requested county does not exist.
		return { unaffected: -1, deaths: -1, confirmed: -1 };
	}

	deaths = GetMostRecentValue(countyData.numDeaths);
	confirmed = GetMostRecentValue(countyData.numConfirmed);
	unaffected = countyData.population - deaths - confirmed;

	return { unaffected: unaffected, deaths: deaths, confirmed: confirmed };
}

function GetWorldPopulationAnalysis(country, province) {
	var recovered, deaths, confirmed;

	var allWorldData = LoadWorldData();
	var provinceData = null;

	for (var i = 0; i < allWorldData.length; ++i) {
		if (
			allWorldData[i].country == country &&
			allWorldData[i].state == province
		) {
			provinceData = allWorldData[i];
		}
	}

	if (provinceData == null) {
		// The requested province does not exist.
		return { recovered: -1, deaths: -1, confirmed: -1 };
	}

	deaths = GetMostRecentValue(provinceData.numDeaths);
	confirmed = GetMostRecentValue(provinceData.numConfirmed);
	recovered = GetMostRecentValue(provinceData.numRecovered);

	return { recovered: recovered, deaths: deaths, confirmed: confirmed };
}

// Returns true if the dictionary in the argument is empty.
function isEmpty(dictionary) {
	for (var key in dictionary) {
		if (dictionary.hasOwnProperty(key)) return false;
	}
	return true;
}

// Input: dictionary of {Date, number of cases, deaths, or recovered}.
// Output: Number of cases for the most recent date. If the dictionary is empty, returns 0.
function GetMostRecentValue(dictionary) {
	if (isEmpty(dictionary)) return 0;

	var mostResentDate = new Date(1900, 0, 1);

	for (var key in dictionary) {
		if (new Date(key) > mostResentDate) mostResentDate = new Date(key);
	}

	return dictionary[mostResentDate];
}

module.exports = {
	GetGenderAnalytics,
	GetTwoPlacesComparison,
	GetRaceComparison,
	GetUSPopulationAnalysis,
	GetWorldPopulationAnalysis,
};
