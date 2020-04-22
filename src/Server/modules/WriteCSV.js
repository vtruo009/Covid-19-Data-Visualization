function RecordUSData(updatedUSData) {
    const helperModule = require('../modules/BasicHelpers.js');

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

        function recordValuesOnExistingDate(dateStr) {
            var date = helperModule.stringToDate(dateStr);
            if (date in item.numConfirmed) {
                confirmedContents += Cell(item.numConfirmed[date]);
            } else {
                confirmedContents += Cell("");
            }
        }

        for (var key in item.numConfirmed) {
            var keyDate = new Date(key);
            var dateStr = (keyDate.getMonth() + 1) + "/" + keyDate.getDate() + "/" + keyDate.getFullYear();
            if (!confirmedDateLabels.includes(dateStr)) {
                confirmedDateLabels.push(dateStr);
                confirmedContents += Cell(item.numConfirmed[key]);
            }
        }
        confirmedContents += "\n";
    }

    confirmedDateLabels.forEach(appendToLabel);

    function appendToLabel(date) {
        confirmedLabel += Cell(date);
    }
    confirmedLabel += "\n";

    var contents = confirmedLabel + confirmedContents;

    const fs = require('fs');
    const fileNameModule = require('../modules/DatabaseFileNames.js');
    fs.writeFileSync(fileNameModule.USConfirmedFileName, contents);
    console.log("Write data done.");
}

function Cell(content) {
    return "\"" + content + "\",";
}

module.exports = {
    RecordUSData: RecordUSData
};