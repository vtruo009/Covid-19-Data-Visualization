module.exports = {
    Case : class{
        constructor(line) {
            this.id = line[0];

            var dateValues = line[2].split("/");
            var year = dateValues[2];
            var month = dateValues[0];
            var date = dateValues[1];
            this.reportingDate = new Date(year + "-" + month + "-" + date);

            this.country = line[6];
            this.gender = line[7];
            this.age = line[8];

            this.dead = (line[16] == '1');
            this.recovered = (line[17] == '1');
        }
    }
}