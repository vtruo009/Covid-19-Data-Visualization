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
    RecordCases: RecordCases
};
