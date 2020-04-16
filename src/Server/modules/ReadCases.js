module.exports = {
    loadAllCases: function(){
        // Read values from the CSV, organizes the data into an array of "Case", and returns the array.

        const readCSVModule = require('../modules/ReadCSV.js');
        let parsedCSV = readCSVModule.readCSV('../Server/database/COVID19_line_list_data.csv');
    
        var allCases = [];

        const caseClassModule = require('../modules/DataClasses.js');
        for (var i = 0; i < parsedCSV.length; ++i){
            allCases.push(new caseClassModule.Case(parsedCSV[i]));
        }

        return allCases;
    }
}