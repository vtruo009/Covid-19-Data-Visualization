const dataClassesModule = require('../modules/DataClasses.js');
const readCSVModule = require('../modules/ReadCSV.js');
const writeCSVModule = require('../modules/WriteCSV.js');

// Array of WorldPlaces read from CSV
var allWorldPlace = [];

// Populates allWorldPlace with data read from CSV
function InitializeAllWorldPlace() {
    allWorldPlace = readCSVModule.LoadWorldData();
}

function AddallWorldPlace(province, country, date, tod) {
    if (allWorldPlace == undefined) InitializeAllWorldPlace();

    // Copied from ModifyData.js
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
				break;
			} else if (i == allWorldPlace.length - 1) {
				errormsg = 'wrong place';
				break;
			}
		}
	} else if (tod == 2) {
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
				break;
			} else if (i == allWorldPlace.length - 1) {
				errormsg = 'wrong place';
				break;
			}
		}
	}
	return errormsg;
}

function EditallWorldPlace(province, country, date, tod, number) {
    if (allWorldPlace == undefined) InitializeAllWorldPlace();

    var result = false;
	if (tod == 1) {
		console.log(allWorldPlace.length);
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
						result = true;
						break;
					}
				}
			}
		}
	} else if (tod == 2) {
		console.log(allWorldPlace.length);
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
						result = true;
						break;
					}
				}
			}
		}
	} else if (tod == 3) {
		console.log(allWorldPlace.length);
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
						result = true;
						break;
					}
				}
			}
		}
	}
	return result;
}

function RemoveallWorldPlace(province, country, date, tod) {
    if (allWorldPlace == undefined) InitializeAllWorldPlace();

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
						console.log('DELETED');
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
						delete allWorldPlace[i].numDeaths[key];
						console.log('DELETED DEATH');
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
						delete allWorldPlace[i].numRecovered[key];
						console.log('DELETED RECOVERED');
						result = true;
						break;
					}
				}
			}
		}
	}
	return result;
}

function SaveRecords() {
    if(allWorldPlaces == undefined) InitializeAllWorldPlaces();
    writeCSVModule.RecordWorldData(allWorldPlace);
}