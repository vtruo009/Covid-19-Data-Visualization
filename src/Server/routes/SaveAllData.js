const router = require('express').Router();
const WorldPlace = require('../modules/WorldPlaceManager.js');
const CaseManager = require('../modules/CaseManager');

router.post('/', (req, res) => {
	console.log('Client session was closed');
	WorldPlace.SaveRecords();
	CaseManager.SaveRecords();
});

module.exports = router;
