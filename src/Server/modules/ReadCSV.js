module.exports = {
    readCSV: function(fileName) {
        const fs = require('fs') 
  
        var data = fs.readFileSync(fileName, 'utf8');

        var lines = data.split("\n");

        var parsedCSV = [];

        for (var i = 0; i < lines.length - 1; ++i){
            // We want to skip the last row because it is empty.
            splitLine(lines[i]);
        }

        function splitLine (line){
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
}