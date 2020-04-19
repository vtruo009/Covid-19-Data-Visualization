module.exports = {
    Case : class{
        constructor(line) {
            this.id = parseInt(line[0]);

            const helperModule = require('../modules/BasicHelpers.js');
            this.reportingDate = helperModule.stringToDate(line[2]);
            this.reportingDateStr = line[2];
            this.country = line[6];
            this.gender = line[7];
            this.age = parseInt(line[8]);

            this.dead = (line[16] == '1');
            this.recovered = (line[17] == '1');

        }
    },

    USPlace : class{
        constructor(state, county) {
            this.state = state;
            this.county = county;

            // Dictionary of { <Date, number of Deaths> }
            this.numDeaths = {};

            // Dictionary of { <Date, number of Confirmed cases> }
            this.numConfirmed = {};
        }
        addNumDeaths(dates, values){
            // dates is a list of Date {1/20/20, 1/21/20, 1/22/20, ...}
            // values contains the number of people died on the corresponding date.

            for (var i = 0; i < dates.length; ++i){
                this.numDeaths[dates[i]] =  parseInt(values[i]);
            }
        }
        addNumConfirmed(dates, values){
            // dates is a list of Date {1/20/20, 1/21/20, 1/22/20, ...}
            // values contains the number of confirmed cases on the corresponding date.

            for (var i = 0; i < dates.length; ++i){
                this.numConfirmed[dates[i]] =  parseInt(values[i]);
            }
        }
    },

    WorldPlace : class{
        constructor(country, state) {
            this.country = country;
            this.state = state;

            // Dictionary of { <Date, number of Deaths> }
            this.numDeaths = {};

            // Dictionary of { <Date, number of Confirmed cases> }
            this.numConfirmed = {};

            // Dictionary of { <Date, number of Recovered cases> }
            this.numRecovered = {};
        }
        addNumDeaths(dates, values){
            // dates is a list of Date {1/20/20, 1/21/20, 1/22/20, ...}
            // values contains the number of people died on the corresponding date.

            for (var i = 0; i < dates.length; ++i){
                this.numDeaths[dates[i]] =  parseInt(values[i]);
            }
        }
        addNumConfirmed(dates, values){
            // dates is a list of Date {1/20/20, 1/21/20, 1/22/20, ...}
            // values contains the number of confirmed cases on the corresponding date.

            for (var i = 0; i < dates.length; ++i){
                this.numConfirmed[dates[i]] =  parseInt(values[i]);
            }
        }
        addNumRecovered(dates, values){
            // dates is a list of Date {1/20/20, 1/21/20, 1/22/20, ...}
            // values contains the number of recovered cases on the corresponding date.

            for (var i = 0; i < dates.length; ++i){
                this.numRecovered[dates[i]] =  parseInt(values[i]);
            }
        }
    },


    AgeRowCountry : class{
        constructor(country, numConfirmed, numDeaths, numRecovered) {
            this.country = country;
            this.numConfirmed = numConfirmed;
            this.numDeaths = numDeaths;
            this.numRecovered = numRecovered;
        }
    },

    AgeRowDay : class {
        constructor(date, numConfirmedCases) {
            this.date = date;
            this.numConfirmedCases = numConfirmedCases;
        }
    },

    USRowConfirmed : class {
        constructor(date, numConfirmed) {
            this.date = date,
            this.numConfirmed = numConfirmed;
        }
    },
    
    USRowDeaths : class {
        constructor(date, numDeaths) {
            this.date = date;
            this.numDeaths = numDeaths;
        }
    }

}