function write(){
    const fs = require('fs');
    var contents = "\"doppo\", 1/20/20, \"Tokyo, Japan\"";
    fs.writeFileSync("test.txt", contents);
    console.log("Write on file");
}

function RecordCases(updatedAllCases) {
    const readCSVModule = require('../modules/ReadCases.js');
    var allCases = readCSVModule.loadAllCases();

    var labels = allCases[0];

    const fs = require('fs');
    fs.writeFileSync("/database/COVID19_line_list_data.txt", contents);
}

function RecordUSData(updatedUSData) {
    const readCSVModule = require('../modules/ReadCases.js');
    var allCases = readCSVModule.loadAllCases();

    var labels = allCases[0];

    const fs = require('fs');
    fs.writeFileSync("/database/COVID19_line_list_data.txt", contents);

    fs.writeFileSync("/database/time_series_covid_19_confirmed_US.txt", contents);
    fs.writeFileSync("/database/time_series_covid_19_deaths_US.txt", contents);
}

function RecordWorldData(updatedWorldData) {
    const readCSVModule = require('../modules/ReadCases.js');
    var allCases = readCSVModule.loadAllCases();

    var labels = allCases[0];

    const fs = require('fs');
    fs.writeFileSync("/database/time_series_covid_19_confirmed.txt", contents);
    fs.writeFileSync("/database/time_series_covid_19_deaths.txt", contents);
    fs.writeFileSync("/database/time_series_covid_19_recovered.txt", contents);
}

module.exports = {
    RecordCases: RecordCases,
    RecordUSData: RecordUSData,
    RecordWorldData: RecordWorldData
};
