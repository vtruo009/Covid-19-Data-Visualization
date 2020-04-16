module.exports = {
    stringToDate: function(str){
        // input: date in MM/DD/YYYY or MM/DD/YY format.
        // output: Date (Javascript object)
        // Assuming all input is 2000 or later.

        var dateValues = str.split("/");
        var month = parseInt(dateValues[0]);
        var date = parseInt(dateValues[1]);
        var year = parseInt(dateValues[2]);

        if (year < 2000) year += 2000;

        return new Date(year, month - 1, date);
    }       
}