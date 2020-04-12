var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/response', (req, res) => {
  console.log("Request received from client");
  // perform some logic
  res.render('home', { response: 'Hello From Server!'});
});

module.exports = router;
