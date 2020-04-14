var express = require('express');
var router = express.Router();

// Renders search.html with passing any data
router.get('/', (req, res) => {
  res.render('DataByGender/SelectFeature.html')
});

const fs = require('fs') 
  
var data = '';

fs.readFile('../src/database/COVID19_line_list_data.csv', (err, data) => { 
    if (err) throw err; 
});

console.log(fs.data);
var lines = data.split("\n");
console.log(lines.length);

var cells = [];
lines.forEach(line => splitLine(line));

function splitLine (line){
    console.log(line);
    var curPos = 0;
    console.log(line.length);
    while (curPos < line.length){
        while (curPos < line.length && line[curPos] == ' ') curPos ++;

        if (line[curPos] == '\"'){
            var endPos = curPos + 1;
            while (endPos < line.length && endPos != '\"') endPos ++;
            var cell = line.substr(curPos, endPos);
            cells.push(cell);
            curPos = endPos + 2;
        } else {
            var endPos = curPos + 1;
            while (endPos < line.length && endPos != ',') endPos ++;
            var cell = line.substr(curPos, endPos);
            cells.push(cell);
            curPos = endPos + 2;
        }  
    }
}

for (var i = 0; i < 10; ++i){
    console.log(i + ":   " + cells[i]);
}
/*
    1. var array
For each character in the file:
    2. If I see quotation mark, I move to the end quotation mark (ignoring all commas between) 
        and push it onto the array.
    3. If I don't see quotation mark, I move to the next comma, and push it onto the array.
*/

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
