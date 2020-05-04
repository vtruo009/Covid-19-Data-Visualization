const readCSVModule = require('../modules/ReadCSV.js');

function GetGenderAnalytics(country, typeOfData) {
    var allCases = readCSVModule.LoadAllCases();

    var countryExists = false;

    var female = 0;
    var male = 0;

    for (var i = 0; i < allCases.length; ++i) {
        if (allCases[i].country == country) {
            countryExists = true;
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

    if (!countryExists) return undefined;

    return { femaleNum: female, maleNum: male }
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
        return { place1Value: place1Value, place2Value: place2Value }
    }

    var place1Value, place2Value;

    switch (typeOfData) {
        case '1': // confirmed
            place1Value = GetMostRecentValue(province1Data.numConfirmed);
            place2Value = GetMostRecentValue(province2Data.numConfirmed);
            break;
        case '2': // dead
            place1Value = GetMostRecentValue(province1Data.numDeaths);
            place2Value = GetMostRecentValue(province2Data.numDeaths);
            break;
        case '3': // recovered
            place1Value = GetMostRecentValue(province1Data.numRecovered);
            place2Value = GetMostRecentValue(province2Data.numRecovered);
            break;
    }

    return { place1Value: place1Value, place2Value: place2Value }

    function GetMostRecentValue(dictionary) {
        if (isEmpty(dictionary)) return 0;

        var mostResentDate = new Date(1900, 0, 1);

        for (var key in dictionary) {
            if (new Date(key) > mostResentDate) mostResentDate = new Date(key);
        }

        return dictionary[mostResentDate];
    }
}

function isEmpty(dictionary) {
    for (var key in dictionary) {
        if (dictionary.hasOwnProperty(key))
            return false;
    }
    return true;
}


module.exports = {
    GetGenderAnalytics: GetGenderAnalytics,
    GetTwoPlacesComparison: GetTwoPlacesComparison
};