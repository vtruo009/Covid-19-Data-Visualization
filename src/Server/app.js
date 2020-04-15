const express = require('express');
const createError = require('http-errors');
const path = require('path');
const app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

// Port to listen to
const port = 5000;

// Import routers
const USDataRouter = require('./routes/USData');
const WorldDataRouter = require('./routes/WorldData');
const AgeDataRouter = require('./routes/AgeData');
const GenderDataRouter = require('./routes/GenderData');

// Public assests set up
app.use(express.static(path.join(__dirname, 'public')));

// Used to recognize incoming requests as Json objects
app.use(express.json());

// Set up routes
app.use('/USData', USDataRouter);
app.use('/WorldData', WorldDataRouter);
app.use('/DataByAgeDistribution', AgeDataRouter);
app.use('/DataByGender', GenderDataRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Start listening
app.listen(port, () => {
  console.log(`Sever is running on port: ${port}`);
})

module.exports = app;