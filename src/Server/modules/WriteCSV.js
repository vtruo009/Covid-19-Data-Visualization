function RecordUSData(updatedUSData) {
    var confirmedLabel = Cell("UID") + // 1
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

    var confirmedDateLabels = [];
    var confirmedContents = "";
    updatedUSData.forEach(recordConfirmedDataOnCSV);

    function recordConfirmedDataOnCSV(item) {
        confirmedContents += Cell(item.uid) + // 1
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

        confirmedDateLabels.forEach(recordValuesOnExistingDate);

        function recordValuesOnExistingDate(date) {
            if (date in item.numConfirmed) {
                confirmedContents += Cell(item.numConfirmed[date]);
            } else {
                confirmedContents += Cell("");
            }
        }

        for (var key in item.numConfirmed) {
            if (!confirmedDateLabels.includes(key)) {
                var newDate = new Date(key);
                confirmedDateLabels.push(newDate);
                confirmedContents += Cell(item.numConfirmed[newDate]);
            }
        }
        confirmedContents += "\n";
    }

    confirmedDateLabels.forEach(appendToLabel);

    function appendToLabel(date) {
        var dateCopy = date;
        confirmedLabel += Cell((dateCopy.getMonth() + 1) + "/" + dateCopy.getDate() + "/" + dateCopy.getYear());
    }
    confirmedLabel += "\n";

    var contents = confirmedLabel + confirmedContents;

    const fs = require('fs');
    const fileNameModule = require('../modules/DatabaseFileNames.js');
    fs.writeFileSync(fileNameModule.USConfirmedFileName, contents);
}

function Cell(content) {
    return "\"" + content + "\",";
}

module.exports = {
    RecordUSData: RecordUSData
};