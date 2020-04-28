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

function GetTwoPlacesComparison(largerAreaName1, smallerAreaName1, largerAreaName2, smallerAreaName2, typeOfData, isUSData) {
    var province1Data = null;
    var province2Data = null;

    if (isUSData) {
        var allUSData = readCSVModule.LoadUSData();

        for (var i = 0; i < allUSData.length; ++i) {
            if (allUSData[i].state == largerAreaName1 && allUSData[i].county == smallerAreaName1) {
                province1Data = allUSData[i];
            }
            if (allUSData[i].state == largerAreaName2 && allUSData[i].county == smallerAreaName2) {
                province2Data = allUSData[i];
            }
        }
    } else { // World
        var allWorldData = readCSVModule.LoadWorldData();

        for (var i = 0; i < allWorldData.length; ++i) {
            if (allWorldData[i].country == largerAreaName1 && allWorldData[i].state == smallerAreaName1) {
                province1Data = allWorldData[i];
            }
            if (allWorldData[i].country == largerAreaName2 && allWorldData[i].state == smallerAreaName2) {
                province2Data = allWorldData[i];
            }
        }
    }

    if (province1Data == null || province2Data == null) {
        place1Value = (province1Data == null) ? -1 : 0;
        place2Value = (province2Data == null) ? -1 : 0;
        return new TwoPlacesComparison(place1Value, place2Value);
    }

    var dateCountDict1;
    var dateCountDict2;

    switch (typeOfData) {
        case '1': // confirmed
            dateCountDict1 = province1Data.numConfirmed;
            dateCountDict2 = province2Data.numConfirmed;
            break;
        case '2': // dead
            dateCountDict1 = province1Data.numDeaths;
            dateCountDict2 = province2Data.numDeaths;
            break;
        case '3': // recovered
            dateCountDict1 = province1Data.numRecovered;
            dateCountDict2 = province2Data.numRecovered;
            break;
    }

    if (isEmpty(dateCountDict1) || isEmpty(dateCountDict2)) {
        place1Value = isEmpty(dateCountDict1) ? -1 : 0;
        place2Value = isEmpty(dateCountDict2) ? -1 : 0;
        return new TwoPlacesComparison(place1Value, place2Value);
    }

    var mostRecentDate1 = new Date(2020, 0, 1);
    var mostRecentDate2 = new Date(2020, 0, 1);

    for (var key in dateCountDict1) {
        if (new Date(key) > mostRecentDate1) mostRecentDate1 = new Date(key);
    }

    for (var key in dateCountDict2) {
        if (new Date(key) > mostRecentDate2) mostRecentDate2 = new Date(key);
    }

    return new TwoPlacesComparison(dateCountDict1[mostRecentDate1], dateCountDict2[mostRecentDate2]);
}

function isEmpty(dictionary) {
    for (var key in dictionary) {
        if (dictionary.hasOwnProperty(key))
            return false;
    }
    return true;
}

class TwoPlacesComparison {
    constructor(place1Value, place2Value) {
        this.place1Value = place1Value; // integer
        this.place2Value = place2Value; // integer
    }
}


module.exports = {
    GetGenderAnalytics: GetGenderAnalytics,
    GetTwoPlacesComparison: GetTwoPlacesComparison
};