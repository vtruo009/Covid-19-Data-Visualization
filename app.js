const express = require('express');
const swig = require('swig');
const createError = require('http-errors');
const app = express();
const path = require('path');
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

// Port to listen to
const port = 5000;

// Import routers
const indexRouter = require('./routes/index');
const USDataRouter = require('./routes/USData');
const WorldDataRouter = require('./routes/WorldData');

// Set up swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Public assests set up
app.use(express.static(path.join(__dirname, 'public')));


// Used to recognize incoming requests as Json objects
app.use(express.json());

// Set up routes
app.use('/', indexRouter);
app.use('/USData', USDataRouter);
app.use('/WorldData', WorldDataRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Start listening
app.listen(port, () => {
  console.log(`Sever is running on port: ${port}`);
})

module.exports = app;