var express = require('express');
var router = express.Router();

// Renders search.html with passing any data
router.get('/', (req, res) => {
  res.render('WorldData/search.html')
});

router.get('/search', (req, res) => {
    console.log(req.query);
    // Get respective data using the query parameters
    res.render(
        'WorldDATA/search.html', 
        {
            TypeOfTable: req.query.TypeOfData,
            Country: req.query.Country,
            State: req.query.State,
            data: [
                {
                    date: "04/01/2020",
                    cases: 130
                },
                {
                    date: "04/02/2020",
                    cases: 133
                },
                {
                    date: "04/03/2020",
                    cases: 192
                }
            ],
        
        }
    );
});

module.exports = router;