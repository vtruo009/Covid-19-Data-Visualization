var express = require('express');
var router = express.Router();


// Get request. query paraemeters contain data from form. render search.html passing data
router.get('/search', (req, res) => {
    console.log(req.query);
    // Get respective data using the query parameters
    res.send(
        {
            // response with dummy data
            TypeOfTable: req.query.TypeOfData,
            County: req.query.County,
            State: req.query.State,
            data: [
                {
                    date: '01/02/2020',
                    number: 30
                },
                {
                    date: '01/03/2020',
                    number: 14
                },
                {
                    date: '01/04/2020',
                    number: 30
                }
            ],
        
        }
    );
});

module.exports = router;
