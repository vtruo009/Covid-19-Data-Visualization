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

function RecordCases(updatedAllCases) {
    var contents = Cell("id") + // 1
        Cell("case_in_country") + // 2
        Cell("reporting date") + // 3
        Cell("") + // 4
        Cell("summary") + // 5
        Cell("location") + // 6
        Cell("country") + // 7
        Cell("gender") + // 8
        Cell("age") + // 9
        Cell("symptom_onset") + // 10
        Cell("If_onset_approximated") + // 11
        Cell("hosp_visit_date") + // 12
        Cell("exposure_start") + // 13
        Cell("exposure_end") + // 14
        Cell("visiting Wuhan") + // 15
        Cell("from Wuhan") + // 16
        Cell("death") + // 17
        Cell("recovered") + // 18
        Cell("symptom") + // 19
        Cell("source") + // 20
        Cell("link"); // 21

    contents += "\n";
   
    updatedAllCases.forEach(appendToCSV);
    function appendToCSV(item) {

        contents += Cell(item.id) + // 1
            Cell(item.caseInCountry) + // 2
            Cell(item.reportingDateStr) + // 3
            Cell("") + // 4
            Cell(item.summary) + // 5
            Cell(item.location) + // 6
            Cell(item.country) + // 7
            Cell(item.gender) + // 8
            Cell(item.age) + // 9
            Cell(item.symptomOnset) + // 10
            Cell(item.ifOnsetApproximated) + // 11
            Cell(item.hospitalVisitDate) + // 12
            Cell(item.exposureStart) + // 13
            Cell(item.exposureEnd) + // 14
            Cell(item.visitingWuhan) + // 15
            Cell(item.fromWuhan) + // 16
            Cell(item.dead ? 1 : 0) + // 17
            Cell(item.recovered ? 1 : 0) + // 18
            Cell(item.symptom) + // 19
            Cell(item.source) + // 20
            Cell(item.link); // 21
        contents += "\n";
    }
    const fs = require('fs');

    const fileNameModule = require('../modules/DatabaseFileNames.js');
    fs.writeFileSync(fileNameModule.CasesFileName, contents);
}

function Cell(content) {
    return "\"" + content + "\",";
}

module.exports = {
    RecordUSData: RecordUSData,
    // Argument: Array of USPlace.
    RecordCases: RecordCases
};
