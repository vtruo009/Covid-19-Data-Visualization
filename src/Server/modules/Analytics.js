const readCSVModule = require('../modules/ReadCSV.js');

function GetGenderAnalytics(country, typeOfData) {
    var allCases = readCSVModule.LoadAllCases();

    var female = 0;
    var male = 0;

    for (var i = 0; i < allCases.length; ++i) {
        if (allCases[i].country == country) {
            if (allCases[i].gender == "female") {
                if (typeOfData == 2 && allCases[i].dead) female++; // dead
                else if (typeOfData == 3 && allCases[i].recovered) female++; //recovered
                else if (typeOfData == 1) female++; // confirmed
            }
            else if (allCases[i].gender == "male") {
                if (typeOfData == 2 && allCases[i].dead) male++; // dead
                else if (typeOfData == 3 && allCases[i].recovered) male++; //recovered
                else if (typeOfData == 1) male++; // confirmed
            }
        }
    }

    if (female == 0 && male == 0) return undefined;

    return { femaleNum: female, maleNum: male }
}

module.exports = {
    GetGenderAnalytics : GetGenderAnalytics
};