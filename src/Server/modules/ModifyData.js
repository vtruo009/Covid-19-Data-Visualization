function AddCase(
	allCases,
	reportingDate,
	country,
	age,
	gender,
	recovered,
	dead,
	id
) {
	for (var i = 0; i < allCases.length; ++i) {
		if (allCases[i].id == id) return false;
	}

	const classesModule = require('../modules/DataClasses.js');

	var dateString =
		reportingDate.getMonth() +
		1 +
		'/' +
		reportingDate.getDay() +
		'/' +
		reportingDate.getFullYear();

	var newCase = new classesModule.Case([
		id, // 0: id
		'', // 1: case in country
		dateString, // 2: reporting date
		'', // 3: blacnk column
		'', // 4: summary
		'', // 5: location
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

	allCases.push(newCase);

	const writeCSVModule = require('../modules/WriteCSV.js');
	writeCSVModule.RecordCases(allCases);
}

function EditCase(
	allCases,
	reportingDate,
	country,
	age,
	gender,
	recovered,
	dead,
	id
) {
	for (var i = 0; i < allCases.length; ++i) {
		if (allCases[i].id == id) {
			const classesModule = require('../modules/DataClasses.js');

			allCases[i].country = country;
			allCases[i].reportingDate = reportingDate;
			allCases[i].reportingDateStr =
				reportingDate.getMonth() +
				1 +
				'/' +
				reportingDate.getDate() +
				'/' +
				reportingDate.getFullYear();
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

function DeleteUSData(county, state, date, USData, tod) {
	var result = false;
	if (tod == 1) {
		console.log(USData.length);
		for (var i = 0; i < USData.length; ++i) {
			if (county == USData[i].county && state == USData[i].state) {
				for (var key in USData[i].numConfirmed) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						delete USData[i].numConfirmed[key];
						result = true;
						break;
					}
				}
			}
		}
	} else if (tod == 2) {
		for (var i = 0; i < USData.length; ++i) {
			if (county == USData[i].county && state == USData[i].state) {
				for (var key in USData[i].numDeaths) {
					var temp = new Date(key);
					var d =
						temp.getMonth() +
						1 +
						'/' +
						temp.getDate() +
						'/' +
						temp.getFullYear();
					if (d == date) {
						delete USData[i].numDeaths[key];
						result = true;
						break;
					}
				}
			}
		}
	}

	const writeCSVModule = require('../modules/WriteCSV.js');
	writeCSVModule.RecordUSData(USData);
	// for (var i = 7; i < 10; ++i) {
	//     console.log("hihi");
	//     console.log(USData[i]);
	// }
	return result;
}

function EditUSData(county, state, date, USData, tod, number) {
    var result = false;
    if (tod == 1) {
        console.log(USData.length);
		for (var i = 0; i < USData.length; ++i) {
			if (county == USData[i].county && state == USData[i].state) {
				for (var key in USData[i].numConfirmed) {
					var temp = new Date(key);
					var d = temp.getMonth() + 1 +
					'/' +
					temp.getDate() +
					'/' +
					temp.getFullYear();
					if (d == date) {
						USData[i].numConfirmed[key] = number;
                        result = true;
                        break;
					}
				}
			}
		}
    }
    else if (tod == 2) {
        for (var i = 0; i < USData.length; ++i) {
			if (county == USData[i].county && state == USData[i].state) {
				for (var key in USData[i].numDeaths) {
					var temp = new Date(key);
					var d = temp.getMonth() + 1 +
					'/' +
					temp.getDate() +
					'/' +
					temp.getFullYear();
					if (d == date) {
						USData[i].numDeaths[key] = number;
                        result = true;
                        break;
					}
				}
			}
		}
    }

    const writeCSVModule = require('../modules/WriteCSV.js');
    writeCSVModule.RecordUSData(USData);
    return result;
}

const helper = require('../modules/BasicHelpers.js');
function AddUSData(county, state, date, USData, tod, number) {
	var result = false;
	if (tod == 1) {
		for (var i = 0; i < USData.length; ++i) {
			if (county == USData[i].county && state == USData[i].state) {
				for (var key in USData[i].numConfirmed) {
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
						return result;
					}
				}
				var temp_date = helper.stringToDate(date);
				USData[i].numConfirmed[temp_date] = number;
				result = true;
				break;
			}
		}
	} else if (tod == 2) {
		for (var i = 0; i < USData.length; ++i) {
			if (county == USData[i].county && state == USData[i].state) {
				for (var key in USData[i].numDeaths) {
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
						return result;
					}
				}
				var temp_date = helper.stringToDate(date);
				USData[i].numDeaths[temp_date] = number;
				result = true;
				break;
			}
		}
	}
	const writeCSVModule = require('../modules/WriteCSV.js');
	writeCSVModule.RecordUSData(USData);
	// for (var i = 7; i < 10; ++i) {
	//     console.log("hihi");
	//     console.log(USData[i]);
	// }
	return result;
}

function DeleteWorldData(country, state, date, WorldData, tod) {
	var result = false;
    if (tod == 1) {
        for (var i = 0; i < WorldData.length; ++i) {
            if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numConfirmed) {
					var temp = new Date(key);
					var d = temp.getMonth() + 1 +
					'/' +
					temp.getDate() +
					'/' +
					temp.getFullYear();
					if (d == date) {
						delete WorldData[i].numConfirmed[key];
						console.log("DELETED");
                        result = true;
                        break;
					}
				}
			}
        }
	}
	else if (tod == 2) {
		for (var i = 0; i < WorldData.length; ++i) {
            if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numDeaths) {
					var temp = new Date(key);
					var d = temp.getMonth() + 1 +
					'/' +
					temp.getDate() +
					'/' +
					temp.getFullYear();
					if (d == date) {
						delete WorldData[i].numDeaths[key];
						console.log("DELETED DEATH");
                        result = true;
                        break;
					}
				}
			}
        }
	}
	else if (tod == 3) {
		for (var i = 0; i < WorldData.length; ++i) {
            if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numRecovered) {
					var temp = new Date(key);
					var d = temp.getMonth() + 1 +
					'/' +
					temp.getDate() +
					'/' +
					temp.getFullYear();
					if (d == date) {
						delete WorldData[i].numRecovered[key];
						console.log("DELETED RECOVERED");
                        result = true;
                        break;
					}
				}
			}
        }
	}
    const writeCSVModule = require('../modules/WriteCSV.js');
	writeCSVModule.RecordUSData(WorldData);
	// for (var i = 7; i < 10; ++i) {
	//     console.log("hihi");
	//     console.log(WorldData[i]);
	// }
    return result;
}

function InsertWorldData(country, state, date, WorldData, tod, number) {
	var result = false;
	if (tod == 1) {
		for (var i = 0; i < WorldData.length; ++i) {
			if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numConfirmed) {
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
						return result;
					}
				}
				var temp_date = helper.stringToDate(date);
				WorldData[i].numConfirmed[temp_date] = number;
				result = true;
				break;
			}
		}
	}
	else if (tod == 2) {
		for (var i = 0; i < WorldData.length; ++i) {
			if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numDeaths) {
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
						return result;
					}
				}
				var temp_date = helper.stringToDate(date);
				WorldData[i].numDeaths[temp_date] = number;
				result = true;
				break;
			}
		}
	}
	else if (tod == 3) {
		for (var i = 0; i < WorldData.length; ++i) {
			if (country == WorldData[i].country && state == WorldData[i].state) {
				for (var key in WorldData[i].numRecovered) {
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
						return result;
					}
				}
				var temp_date = helper.stringToDate(date);
				WorldData[i].numRecovered[temp_date] = number;
				result = true;
				break;
			}
		}
    }
    const writeCSVModule = require('../modules/WriteCSV.js');
	writeCSVModule.RecordUSData(WorldData);
	// for (var i = 7; i < 10; ++i) {
	//     console.log("hihi");
	//     console.log(WorldData[i]);
	// }
    return result;
}

module.exports = {
	//Delete function
	DeleteUSData: DeleteUSData,

    // Argument: Array of WorldPlace.
    EditUSData: EditUSData,

	// Argument: Array of USPlace.
	AddUSData: AddUSData,

    //World Add
    DeleteWorldData: DeleteWorldData,
    
    InsertWorldData: InsertWorldData,
    // Argument: Array of Case,  reportingDate (Date), country, age, gender, recovered (Bool), dead (Bool), id
	EditCase: EditCase,

	// Argument: Array of Case,  reportingDate (Date), country, age, gender, recovered (Bool), dead (Bool), id
	AddCase: AddCase,

	// Argument: Array of Case,  id of the Case the user wants to delete.
	RemoveCase: RemoveCase,
};
