function DeleteUSData(county, state, date, USData, tod) {
    var result = false;
    if (tod == 1) {
        console.log(USData.length);
		for (var i = 0; i < USData.length; ++i) {
			if (county == USData[i].county && state == USData[i].state) {
				for (var key in USData[i].numConfirmed) {
					var temp = new Date(key);
					var d = temp.getMonth() + 1 +
					'/' +
					temp.getDate() +
					'/' +
					temp.getFullYear();
					if (d == date) {
						delete USData[i].numConfirmed[key];
                        result = true;
                        break;
					}
				}
			}
		}
    }

    const writeCSVModule = require('../modules/WriteCSV.js');
    writeCSVModule.RecordUSData(USData);
    // for (var i = 7; i < 10; ++i) {
    //     console.log("hihi");
    //     console.log(USData[i]);
    // }
    return true;
}

module.exports = {
    //Delete function
    DeleteUSData: DeleteUSData,

    // Argument: Array of WorldPlace.
    // EditCases: EditUSData,

    // // Argument: Array of USPlace.
    // AddCases: AddUSData,
};