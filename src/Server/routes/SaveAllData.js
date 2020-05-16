const router = require('express').Router();
const ModUSPlacesManager = require('../modules/USPlacesManager.js');
router.post('/', (req, res) => {
	console.log('Client session was closed');
	// TO DO: Save all data in the respective csv files.
	res.send({
		success: ModUSPlacesManager.SaveRecords(),
	});
});

module.exports = router;
