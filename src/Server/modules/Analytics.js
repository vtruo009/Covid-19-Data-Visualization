const readCSVModule = require('../modules/ReadCSV.js');

function GetGenderAnalytics(country, typeOfData) {
    var allCases = readCSVModule.LoadAllCases();

    var femaleNum = 0;
    var maleNum = 0;

    for (var i = 0; i < allCases.length; ++i) {
        if (allCases[i].country == country) {
            if (allCases[i].gender == "female") {
                if (typeOfData == 2 && allCases[i].dead) femaleNum++; // dead
                else if (typeOfData == 3 && allCases[i].recovered) femaleNum++; //recovered
                else if (typeOfData == 1) femaleNum++; // confirmed
            }
            else if (allCases[i].gender == "male") {
                if (typeOfData == 2 && allCases[i].dead) maleNum++; // dead
                else if (typeOfData == 3 && allCases[i].recovered) maleNum++; //recovered
                else if (typeOfData == 1) maleNum++; // confirmed
            }
        }
    }

    if (femaleNum == 0 && maleNum == 0) return undefined;

    return new GenderAnalytics(femaleNum, maleNum);
}

class GenderAnalytics {
    constructor(femaleNum, maleNum) {
        this.femaleNum = femaleNum; // integer
        this.maleNum = maleNum; // integer
    }
}

module.exports = {
    GetGenderAnalytics : GetGenderAnalytics
};