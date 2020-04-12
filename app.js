const express = require('express');
const swig = require('swig');
const createError = require('http-errors');
const app = express();
const path = require('path');

// Port to listen to
const port = 5000;

// Import routers
const indexRouter = require('./routes/index');
const USDataRouter = require('./routes/USData');

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Start listening
app.listen(port, () => {
  console.log(`Sever is running on port: ${port}`);
})

module.exports = app;