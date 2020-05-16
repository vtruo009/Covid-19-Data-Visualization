const router = require('express').Router();
const WorldPlace = require('../modules/WorldPlaceManager.js');

router.post('/', (req, res) => {
	console.log('Client session was closed');
	// TO DO: Save all data in the respective csv files.
	WorldPlace.SaveRecords();
});

module.exports = router;
