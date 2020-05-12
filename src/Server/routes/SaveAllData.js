const router = require('express').Router();

router.post('/', (req, res) => {
	console.log('Client session was closed');
	// TO DO: Save all data in the respective csv files.
});

module.exports = router;
