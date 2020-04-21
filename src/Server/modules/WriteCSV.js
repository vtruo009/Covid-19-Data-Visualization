const write = async () => {
    const classModule = require('../modules/DataClasses.js');
    const list = [
        new classModule.Case(["0", "", "1/20/2020", "",
            "First confirmed imported COVID-19 pneumonia patient in Shenzhen (from Wuhan): male, 66, shenzheng residence, visited relatives in Wuhan on 12/29/2019, symptoms onset on 01/03/2020, returned to Shenzhen and seek medical care on 01/04/2020, hospitalized on 01/11/2020, sample sent to China CDC for testing on 01/18/2020, confirmed on 01/19/2020. 8 others under medical observation, contact tracing ongoing.",
            "Shenzhen, Guangdong", "China", "male", "66", "01/03/20", "0", "01/11/20", "12/29/2019", "01/04/20", "1", "0", "0", "0"]),

        new classModule.Case(["0", "", "1/20/2020", "",
            "First confirmed imported COVID-19 pneumonia patient in Shenzhen (from Wuhan): male, 66, shenzheng residence, visited relatives in Wuhan on 12/29/2019, symptoms onset on 01/03/2020, returned to Shenzhen and seek medical care on 01/04/2020, hospitalized on 01/11/2020, sample sent to China CDC for testing on 01/18/2020, confirmed on 01/19/2020. 8 others under medical observation, contact tracing ongoing.",
            "Shenzhen, Guangdong", "China", "male", "66", "01/03/20", "0", "01/11/20", "12/29/2019", "01/04/20", "1", "0", "0", "0"])
    ];

    const ObjectsToCsv = require('objects-to-csv')
    const csv = new ObjectsToCsv(list)
    await csv.toDisk('./database/test.csv')
    console.log("File is created somewhere.");
}

module.exports = {
    write : write
};
