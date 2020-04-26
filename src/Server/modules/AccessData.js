function GetCaseById(id) {
	const readCSVModule = require('../modules/ReadCSV');
	var allCases = readCSVModule.LoadAllCases();

	for (var i = 0; i < allCases.length; ++i) {
		if (allCases[i].id == id) return allCases[i];
	}
	return undefined;
}

module.exports = {
	// Argument: id (string)
	// Returns Case (if found) or undefined (if not found)
	GetCaseById: GetCaseById
};