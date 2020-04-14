var express = require('express');
var router = express.Router();

// Renders search.html with passing any data
router.get('/', (req, res) => {
  res.render('DataByGender/SelectFeature.html')
});

var parsedCSV = readCSV('../src/database/COVID19_line_list_data.csv');

for (var i = 0; i < parsedCSV.length; ++i){
    for (var j = 0; j < parsedCSV[0].length; ++j){
        console.log("Line " + i + ": Cell " + j + ": " + parsedCSV[i][j]);
    }
}

// Get request. query paraemeters contain data from form. render search.html passing data
router.get('/SelectFeature', (req, res) => {
    console.log(req.query);
    // Get respective data using the query parameters
    res.render(
        'DataByGender/SelectFeature.html', 
        {
            // response with dummy data
            TypeOfTable: req.query.TypeOfData,
            Gender: req.query.Gender,
            data: [
                {
                    date: '01/02/2020',
                    country: 'Japan',
                    confirmed: 4,
                    recovered: 4,
                    death: 1
                },
                {
                    date: '01/03/2020',
                    country: 'China',
                    confirmed: 5,
                    recovered: 4,
                    death: 0
                },
                {
                    date: '01/04/2020',
                    country: 'US',
                    confirmed: 6,
                    recovered: 4,
                    death: 10
                }
            ],
        
        }
    );
});

module.exports = router;

///////////////////// HELPER FUNCTION //////////////////////////////

function readCSV(fileName){
    const fs = require('fs') 
  
    var data = fs.readFileSync(fileName, 'utf8');

    var lines = data.split("\n");

    var parsedCSV = [];
    lines.forEach(line => splitLine(line));

    function splitLine (line){
        if (line.length == 0) return;

        var csvArray = [];
        var curPos = -1;
        while (curPos < line.length){
            if (line.charAt(curPos + 1) == '\"'){
                var endPos = curPos + 2;
                while (endPos < line.length && line.charAt(endPos) != '"') endPos ++;
                var cell = line.substring(curPos + 2, endPos);
                csvArray.push(cell);
                curPos = endPos + 1;
            } else {
                var endPos = curPos + 1;
                while (endPos < line.length && line.charAt(endPos) != ',') endPos ++;
                var cell = line.substring(curPos + 1, endPos);
                csvArray.push(cell);
                curPos = endPos;
            }  
        }
        parsedCSV.push(csvArray);
    }

    return parsedCSV;
}