const DataType = {
    CONFIRMED: 1,
    RECOVERED: 2,
    DEAD: 3
};

function UpdateUSDataFile(updatedUSData, dataType) {
    const helperModule = require('../modules/BasicHelpers.js');

    var label = Cell("UID") + // 1
        Cell("iso2") + // 2
        Cell("iso3") + // 3
        Cell("code3") + // 4
        Cell("FIPS") + // 5
        Cell("Admin2") + // 6
        Cell("Province_State") + // 7
        Cell("Country_Region") + // 8
        Cell("Lat") + // 9
        Cell("Long_") + // 10
        Cell("Combined_Key"); // 11

    if (dataType == DataType.DEAD) label += Cell("Population");

    var dateLabels = [];
    var values = "";
    updatedUSData.forEach(recordValues);

    function recordValues(item) {
        var dateValueDict;
        if (dataType == DataType.CONFIRMED) dateValueDict = item.numComfirmed;
        else if (dataType == DataType.DEAD) dateValueDict = item.numDeaths;

        values += Cell(item.uid) + // 1
            Cell(item.iso2) + // 2
            Cell(item.iso3) + // 3
            Cell(item.code3) + // 4
            Cell(item.FIPS) + // 5
            Cell(item.county) + // 6
            Cell(item.state) + // 7
            Cell(item.country) + // 8
            Cell(item.latitude) + // 9
            Cell(item.longitude) + // 10
            Cell(item.combinedKey); // 11

        if (dataType == DataType.DEAD) values += Cell(item.population);

        dateLabels.forEach(recordValuesOnExistingDate);

        function recordValuesOnExistingDate(dateStr) {
            var date = helperModule.stringToDate(dateStr);
            if (date in dateValueDict) {
                values += Cell(dateValueDict[date]);
            } else {
                values += Cell("");
            }
        }

        for (var key in dateValueDict) {
            var keyDate = new Date(key);
            var dateStr = (keyDate.getMonth() + 1) + "/" + keyDate.getDate() + "/" + keyDate.getFullYear();
            if (!dateLabels.includes(dateStr)) {
                dateLabels.push(dateStr);
                values += Cell(dateValueDict[key]);
            }
        }
        values += "\n";
    }

    dateLabels.forEach(appendToLabel);

    function appendToLabel(date) {
        label += Cell(date);
    }
    label += "\n";

    var contents = label + values;

    const fs = require('fs');
    const fileNameModule = require('../modules/DatabaseFileNames.js');

    var fileName;
    if (dataType == DataType.CONFIRMED) fileName = fileNameModule.USConfirmedFileName;
    else if (dataType == DataType.DEAD) fileName = fileNameModule.USDeathsFileNama;

    fs.writeFileSync(fileName, contents);
}
function RecordUSData(updatedUSData) {
    UpdateUSDataFile(updatedUSData, DataType.CONFIRMED);
    UpdateUSDataFile(updatedUSData, DataType.DEAD);
}

function Cell(content) {
    return "\"" + content + "\",";
}

module.exports = {
    RecordUSData: RecordUSData
    // Argument: Array of USPlace.
};