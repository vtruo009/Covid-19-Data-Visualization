var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'COVID-19 Website' });
});

module.exports = router;
