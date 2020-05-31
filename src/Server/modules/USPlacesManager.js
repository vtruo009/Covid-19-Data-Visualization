const dataClassesModule = require('../modules/DataClasses.js');
const readCSVModule = require('../modules/ReadCSV.js');
const writeCSVModule = require('../modules/WriteCSV.js');
//const getRecentModule = require('../modules/World');

var allUSPlaces = [];

function InitializeAllUSPlace() {
	allUSPlaces = readCSVModule.LoadUSData();
} // read allUSdata and put into array

function AddUSData(county, state, date, tod, number) {
	if (allUSPlaces.length == 0) InitializeAllUSPlace();

	var errormsg = 'no error';
	if (tod == 1) {
		for (var i = 0; i < allUSPlaces.length; ++i) {
			if (county == allUSPlaces[i].county && state == allUSPlaces[i].state) {
				for (var key in allUSPlaces[i].numConfirmed) {
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
						//return result;
						errormsg = 'date exists';
						return errormsg;
					}
				}
				var temp_date = helper.stringToDate(date);
				allUSPlaces[i].numDeaths[temp_date] = number;
				if (
					allUSPlaces[i].numDeaths[temp_date] ==
					GetMostRecentValue(allUSPlaces[i].numDeaths)
				) {
					allUSPlaces[i].currentNumDeaths = number;
				} //check if the number is the most recent number
				break;
			} else if (i == allUSPlaces.length - 1) {
				// if its the last element & prog didn't go into the 1st if -> place doesn't exist
				errormsg = 'wrong place';
			}
		}
	} else if (tod == 2) {
		for (var i = 0; i < allUSPlaces.length; ++i) {
			if (county == allUSPlaces[i].county && state == allUSPlaces[i].state) {
				for (var key in allUSPlaces[i].numDeaths) {
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
				allUSPlaces[i].numConfirmed[temp_date] = number;
				if (
					allUSPlaces[i].numConfirmed[temp_date] ==
					GetMostRecentValue(allUSPlaces[i].numConfirmed)
				) {
					allUSPlaces[i].currentNumConfirmed = number;
				}
				break;
			} else if (i == allUSPlaces.length - 1) {
				// if its the last element & prog didn't go into the 1st if -> place doesn't exist
				errormsg = 'wrong place';
				break; //just in case
			}
		}
	}

	return errormsg;
}

function EditUSData(county, state, date, tod, number) {
	if (allUSPlaces.length == 0) InitializeAllUSPlace();
	var result = false;
	if (tod == 1) {
		console.log(allUSPlaces.length);
		for (var i = 0; i < allUSPlaces.length; ++i) {
			if (county == allUSPlaces[i].county && state == allUSPlaces[i].state) {
				for (var key in allUSPlaces[i].numConfirmed) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						allUSPlaces[i].numConfirmed[key] = number;
						if (
							allUSPlaces[i].numConfirmed[temp] ==
							GetMostRecentValue(allUSPlaces[i].numConfirmed)
						) {
							allUSPlaces[i].currentNumConfirmed = number;
						}
						result = true;
						break;
					}
				}
			}
		}
	} else if (tod == 2) {
		for (var i = 0; i < allUSPlaces.length; ++i) {
			if (county == allUSPlaces[i].county && state == allUSPlaces[i].state) {
				for (var key in allUSPlaces[i].numDeaths) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						allUSPlaces[i].numDeaths[key] = number;
						if (
							allUSPlaces[i].numDeaths[temp] ==
							GetMostRecentValue(allUSPlaces[i].numDeaths)
						) {
							allUSPlaces[i].currentNumDeaths = number;
						}
						//console.log('hi, updated Deaths')
						result = true;
						break;
					}
				}
			}
		}
	}
	return result;
}

function RemoveUSData(county, state, date, tod) {
	if (allUSPlaces.length == 0) InitializeAllUSPlace();
	var result = false;
	if (tod == 1) {
		console.log(allUSPlaces.length);
		for (var i = 0; i < allUSPlaces.length; ++i) {
			if (county == allUSPlaces[i].county && state == allUSPlaces[i].state) {
				for (var key in allUSPlaces[i].numConfirmed) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						delete allUSPlaces[i].numConfirmed[key];
						allUSPlaces[i].currentNumConfirmed = GetMostRecentValue(
							allUSPlaces[i].numConfirmed
						);
						//upate numConfirmed  and currentNumConfirmed
						result = true;
						break;
					}
				}
			}
		}
	} else if (tod == 2) {
		for (var i = 0; i < allUSPlaces.length; ++i) {
			if (county == allUSPlaces[i].county && state == allUSPlaces[i].state) {
				for (var key in allUSPlaces[i].numDeaths) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						delete allUSPlaces[i].numDeaths[key];
						allUSPlaces[i].currentNumDeaths = GetMostRecentValue(
							allUSPlaces[i].numDeaths
						);
						console.log('hi, numDeaths delete done here');
						result = true;
						break;
					}
				}
			}
		}
	}
	return result;
}
// function SaveRecords()
// A void function that saves allUSPlace (Maybe modified) into csv.
function SaveRecords() {
	if (allUSPlaces.length == 0) InitializeAllUSPlace();
	writeCSVModule.RecordUSData(allUSPlaces);
}

function GetTwoUSPlacesComparison(
	state1,
	county1,
	state2,
	county2,
	typeOfData
) {
	if (allUSPlaces.length == 0) InitializeAllUSPlace();

	var county1Data = null;
	var county2Data = null;

	for (var i = 0; i < allUSPlaces.length; ++i) {
		if (allUSPlaces[i].state == state1 && allUSPlaces[i].county == county1) {
			county1Data = allUSPlaces[i];
		}
		if (allUSPlaces[i].state == state2 && allUSPlaces[i].county == county2) {
			county2Data = allUSPlaces[i];
		}
	}

	if (county1Data == null || county2Data == null) {
		place1Value = county1Data == null ? -1 : 0;
		place2Value = county2Data == null ? -1 : 0;
		return { place1Value: place1Value, place2Value: place2Value };
	}

	var place1Value, place2Value;

	switch (typeOfData) {
		case '1': // confirmed
			place1Value = county1Data.currentNumConfirmed;
			place2Value = county2Data.currentNumConfirmed;
			break;
		case '2': // dead
			place1Value = county1Data.currentNumDeaths;
			place2Value = county2Data.currentNumDeaths;
			break;
	}

	return { place1Value: place1Value, place2Value: place2Value };
}

function GetUSPopulationAnalysis(state, county) {
	if (allUSPlaces.length == 0) InitializeAllUSPlace();

	var unaffected, deaths, confirmed;
	var countyData = null;

	for (var i = 0; i < allUSPlaces.length; ++i) {
		if (allUSPlaces[i].state == state && allUSPlaces[i].county == county) {
			countyData = allUSPlaces[i];
		}
	}

	if (countyData == null) {
		// The requested county does not exist.
		return { unaffected: -1, deaths: -1, confirmed: -1 };
	}

	deaths = countyData.currentNumDeaths;
	confirmed = countyData.currentNumConfirmed;
	unaffected = countyData.population - deaths - confirmed;

	return { unaffected: unaffected, deaths: deaths, confirmed: confirmed };
}

// function GetRows(county, state, typeOfData)
// Input: county (string), state (string), typeOfData (int) (1 = conf, 2 = deaths)
// Similar to what we do in routes/USData.js.
// We want to return “row”.
// We want to use this function in routes/USData.js.
function GetRows(county, state, typeOfData) {
	if (allUSPlaces.length == 0) InitializeAllUSPlace();
	var selectedInUS = [];
	for (var i = 0; i < allUSPlaces.length; ++i) {
		if (county === allUSPlaces[i].county && state === allUSPlaces[i].state) {
			selectedInUS.push(allUSPlaces[i]);
		}
	}

	console.log(selectedInUS);
	if (selectedInUS.length > 0) {
		if (typeOfData == 1) {
			var row = [];
			for (var key in selectedInUS[0].numConfirmed) {
				var temp_date = new Date(key);
				var date =
					temp_date.getMonth() +
					1 +
					'/' +
					temp_date.getDate() +
					'/' +
					temp_date.getFullYear();
				let newItem = {
					date: date,
					number: selectedInUS[0].numConfirmed[key],
				};
				row.push(newItem);
			}
		} else if (typeOfData == 2) {
			var row = [];
			for (var key in selectedInUS[0].numDeaths) {
				var temp_date = new Date(key);
				var date =
					temp_date.getMonth() +
					1 +
					'/' +
					temp_date.getDate() +
					'/' +
					temp_date.getFullYear();
				let newItem = {
					date: date,
					number: selectedInUS[0].numDeaths[key],
				};
				row.push(newItem);
			}
		}
	}
	return row;
}
function GetMostRecentValue(dictionary) {
	if (dictionary.length == 0) return 0;

	var mostResentDate = new Date(1900, 0, 1);

	for (var key in dictionary) {
		if (new Date(key) > mostResentDate) mostResentDate = new Date(key);
	}

	return dictionary[mostResentDate];
} //for currentNumConfirmed

module.exports = {
	InitializeAllUSPlace: InitializeAllUSPlace,
	AddUSData: AddUSData,
	EditUSData: EditUSData,
	RemoveUSData: RemoveUSData,
	SaveRecords: SaveRecords,
	GetTwoUSPlacesComparison: GetTwoUSPlacesComparison,
	GetUSPopulationAnalysis: GetUSPopulationAnalysis,
	GetRows: GetRows,
	GetMostRecentValue: GetMostRecentValue,
};
