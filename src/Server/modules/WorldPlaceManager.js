const dataClassesModule = require('../modules/DataClasses.js');
const readCSVModule = require('../modules/ReadCSV.js');
const writeCSVModule = require('../modules/WriteCSV.js');
const helper = require('../modules/BasicHelpers.js');
const worldReq = require('../modules/DataClasses.js');

// Array of WorldPlaces read from CSV
var allWorldPlace = [];

// Populates allWorldPlace with data read from CSV
function InitializeAllWorldPlace() {
	allWorldPlace = readCSVModule.LoadWorldData();
}

function AddWorldData(province, country, date, tod, number) {
	if (allWorldPlace.length == 0) InitializeAllWorldPlace();

    var errormsg = 'no error';
	if (tod == 1) {
		for (var i = 0; i < allWorldPlace.length; ++i) {
			if (country == allWorldPlace[i].country && province == allWorldPlace[i].state) {
				for (var key in allWorldPlace[i].numConfirmed) {
					var temp_date = new Date(key);
					var d =
						temp_date.getMonth() +
						1 +
						'/' +
						temp_date.getDate() +
						'/' +
						temp_date.getFullYear();
					if (d == date) {
						console.log('ERROOOOOOOR');
						errormsg = 'date exists';
						return errormsg;
					}
				}
				var temp_date = helper.stringToDate(date);
				allWorldPlace[i].numConfirmed[temp_date] = number;
				// Here: numConfirmed has new date (temp_date) added
				// If this date's value is the same as GetMostRecentValue(numConfirmed)
					// temp_date is most recent & we change currentNumConfirmed
				// Else
					// do nothing
				if (allWorldPlace[i].numConfirmed[temp_date] == GetMostRecentValue(allWorldPlace[i].numConfirmed)) {
					console.log("changed current value\n");
					allWorldPlace[i].currentNumConfirmed = number;
				}
				break;
			} else if (i == allWorldPlace.length - 1) {
				errormsg = 'wrong place';
				break;
			}
		}
	}
	else if (tod == 2) {
		for (var i = 0; i < allWorldPlace.length; ++i) {
			if (country == allWorldPlace[i].country && province == allWorldPlace[i].state) {
				for (var key in allWorldPlace[i].numDeaths) {
					var temp_date = new Date(key);
					var d =
						temp_date.getMonth() +
						1 +
						'/' +
						temp_date.getDate() +
						'/' +
						temp_date.getFullYear();
					if (d == date) {
						console.log('ERROOOOOOOR');
						errormsg = 'date exists';
						return errormsg;
					}
				}
				var temp_date = helper.stringToDate(date);
				allWorldPlace[i].numDeaths[temp_date] = number;
				allWorldPlace[i].currentNumDeaths = number;
				break;
			} else if (i == allWorldPlace.length - 1) {
				errormsg = 'wrong place';
				break;
			}
		}
	} else if (tod == 3) {
		for (var i = 0; i < allWorldPlace.length; ++i) {
			if (country == allWorldPlace[i].country && province == allWorldPlace[i].state) {
				for (var key in allWorldPlace[i].numRecovered) {
					var temp_date = new Date(key);
					var d =
						temp_date.getMonth() +
						1 +
						'/' +
						temp_date.getDate() +
						'/' +
						temp_date.getFullYear();
					if (d == date) {
						console.log('ERROOOOOOOR');
						errormsg = 'date exists';
						return errormsg;
					}
				}
				var temp_date = helper.stringToDate(date);
				allWorldPlace[i].numRecovered[temp_date] = number;
				allWorldPlace[i].currentNumRecovered = number;
				break;
			} else if (i == allWorldPlace.length - 1) {
				errormsg = 'wrong place';
				break;
			}
		}
	}
	console.log(allWorldPlace[13]);
	return errormsg;
}

function EditWorldData(province, country, date, tod, number) {
	if (allWorldPlace.length == 0) InitializeAllWorldPlace();
	
    var result = false;
	if (tod == 1) {
		for (var i = 0; i < allWorldPlace.length; ++i) {
			if (country == allWorldPlace[i].country && province == allWorldPlace[i].state) {
				for (var key in allWorldPlace[i].numConfirmed) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						allWorldPlace[i].numConfirmed[key] = number;
						allWorldPlace[i].currentNumConfirmed = number;
						result = true;
						break;
					}
				}
			}
		}
	} else if (tod == 2) {
		for (var i = 0; i < allWorldPlace.length; ++i) {
			if (country == allWorldPlace[i].country && province == allWorldPlace[i].state) {
				for (var key in allWorldPlace[i].numDeaths) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						allWorldPlace[i].numDeaths[key] = number;
						allWorldPlace[i].currentNumDeaths = number;
						result = true;
						break;
					}
				}
			}
		}
	} else if (tod == 3) {
		for (var i = 0; i < allWorldPlace.length; ++i) {
			if (country == allWorldPlace[i].country && province == allWorldPlace[i].state) {
				for (var key in allWorldPlace[i].numRecovered) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						allWorldPlace[i].numRecovered[key] = number;
						allWorldPlace[i].currentNumRecovered = number;
						result = true;
						break;
					}
				}
			}
		}
	}
	return result;
}

function RemoveWorldData(province, country, date, tod) {
    if (allWorldPlace.length == 0) InitializeAllWorldPlace();
	// console.log("Before:\n", allWorldPlace[13]);
    var result = false;
	if (tod == 1) {
		for (var i = 0; i < allWorldPlace.length; ++i) {
			if (country == allWorldPlace[i].country && province == allWorldPlace[i].state) {
				for (var key in allWorldPlace[i].numConfirmed) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						delete allWorldPlace[i].numConfirmed[key];
						allWorldPlace[i].currentNumConfirmed = GetMostRecentValue(allWorldPlace[i].numConfirmed);
						console.log('DELETED');
						result = true;
						break;
					}
				}
			}
		}
	} 
	else if (tod == 2) {
		for (var i = 0; i < allWorldPlace.length; ++i) {
			if (country == allWorldPlace[i].country && province == allWorldPlace[i].state) {
				for (var key in allWorldPlace[i].numDeaths) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						delete allWorldPlace[i].numDeaths[key];
						allWorldPlace[i].currentNumDeaths = GetMostRecentValue(allWorldPlace[i].numDeaths);
						console.log('DELETED DEATH');
						result = true;
						break;
					}
				}
			}
		}
	}
	else if (tod == 3) {
		for (var i = 0; i < allWorldPlace.length; ++i) {
			if (country == allWorldPlace[i].country && province == allWorldPlace[i].state) {
				for (var key in allWorldPlace[i].numRecovered) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						delete allWorldPlace[i].numRecovered[key];
						allWorldPlace[i].currentNumRecovered = GetMostRecentValue(allWorldPlace[i].numRecovered);
						console.log('DELETED RECOVERED');
						result = true;
						break;
					}
				}
			}
		}
	}
	// console.log("After:\n", allWorldPlace[11]);
	return result;
}

function GetTwoPlacesComparison(country1, province1, country2, province2, tod) {
    var province1Data = null;
    var province2Data = null;

	for (var i = 0; i < allWorldPlace.length; ++i) {
		if (allWorldPlace[i].country == country1 && allWorldPlace[i].state == province1) {
			province1Data = allWorldPlace[i];
		}
		if (allWorldPlace[i].country == country2 && allWorldPlace[i].state == province2) {
			province2Data = allWorldPlace[i];
		}
	}

    if (province1Data == null || province2Data == null) {
        place1Value = (province1Data == null) ? -1 : 0;
		place2Value = (province2Data == null) ? -1 : 0;
        return { place1Value: place1Value, place2Value: place2Value }
	}
	
	var place1Value, place2Value;

    switch (tod) {
		case '1': // confirmed
			console.log("in case");
            place1Value = province1Data.currentNumConfirmed;
            place2Value = province2Data.currentNumConfirmed;
            break;
        case '2': // dead
            place1Value = province1Data.currentNumDeaths;
            place2Value = province2Data.currentNumDeaths;
            break;
        case '3': // recovered
            place1Value = province1Data.currentNumRecovered;
            place2Value = province2Data.currentNumRecovered;
            break;
	}
	
    return { place1Value: place1Value, place2Value: place2Value }
}

function GetWorldPopulationAnalysis(country, province) {
    var recovered, deaths, confirmed;

    var provinceData = null;

    for (var i = 0; i < allWorldPlace.length; ++i) {
        if (allWorldPlace[i].country == country && allWorldPlace[i].state == province) {
            provinceData = allWorldPlace[i];
        }
    }

    if (provinceData == null) { // The requested province does not exist.
        return { recovered: -1, deaths: -1, confirmed: -1 }
    }

    deaths = provinceData.currentNumDeaths;
    confirmed = provinceData.currentNumConfirmed;
	recovered = provinceData.currentNumRecovered;

    return { recovered: recovered, deaths: deaths, confirmed: confirmed }
}

function GetRows(country, province, tod) {
	// Get respective data using the query parameters
	if (allWorldPlace.length == 0) InitializeAllWorldPlace();

	var selectedCountry = [];
	
	for (var i = 0; i < allWorldPlace.length; ++i) {
		if (
			country == allWorldPlace[i].country &&
			province == allWorldPlace[i].state
		) {
			selectedCountry.push(allWorldPlace[i]);
		}
	}

	if (selectedCountry.length > 0) {
		if (tod == 1) {
			var row = [];
			for (var key in selectedCountry[0].numConfirmed) {
				var temp_date = new Date(key);
				var date =
					temp_date.getMonth() +
					1 +
					'/' +
					temp_date.getDate() +
					'/' +
					temp_date.getFullYear();
					var newItem = new worldReq.WorldRowConfirmed(
					date,
					selectedCountry[0].numConfirmed[key]
				);
				row.push(newItem);
			}
		} else if (tod == 2) {
			var row = [];
			for (var key in selectedCountry[0].numDeaths) {
				var temp_date = new Date(key);
				var date =
					temp_date.getMonth() +
					1 +
					'/' +
					temp_date.getDate() +
					'/' +
					temp_date.getFullYear();
					var newItem = new worldReq.WorldRowDeaths(
					date,
					selectedCountry[0].numDeaths[key]
				);
				row.push(newItem);
			}
		} else if (tod == 3) {
			var row = [];
			for (var key in selectedCountry[0].numRecovered) {
				var temp_date = new Date(key);
				var date =
					temp_date.getMonth() +
					1 +
					'/' +
					temp_date.getDate() +
					'/' +
					temp_date.getFullYear();
					var newItem = new worldReq.WorldRowRecovered(
					date,
					selectedCountry[0].numRecovered[key]
				);
				row.push(newItem);
			}
		}
	}

	return row;
}

function SaveRecords() {
    if(allWorldPlace.length == 0) InitializeAllWorldPlace();
    writeCSVModule.RecordWorldData(allWorldPlace);
}

// Input: dictionary of {Date, number of cases, deaths, or recovered}.
// Output: Number of cases for the most recent date. If the dictionary is empty, returns 0.
function GetMostRecentValue(dictionary) {
    if (dictionary.length == 0) return 0;

    var mostResentDate = new Date(1900, 0, 1);

    for (var key in dictionary) {
        if (new Date(key) > mostResentDate) mostResentDate = new Date(key);
    }

    return dictionary[mostResentDate];
}

module.exports = {
	InitializeAllWorldPlace: InitializeAllWorldPlace,
	AddWorldData: AddWorldData,
	EditWorldData: EditWorldData,
	RemoveWorldData: RemoveWorldData,
	GetTwoPlacesComparison: GetTwoPlacesComparison,
	GetWorldPopulationAnalysis: GetWorldPopulationAnalysis,
	GetRows: GetRows,
	SaveRecords: SaveRecords,
	GetMostRecentValue: GetMostRecentValue
}