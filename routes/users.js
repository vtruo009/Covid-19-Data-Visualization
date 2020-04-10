var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
  res.send('This is the users page. No template is loaded. Data is being sent from router');
});

module.exports = router;
