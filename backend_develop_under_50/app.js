var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const restaurantRouter = require('./routes/restaurant');
const authRouter = require('./routes/auth');
const dotenvPath = path.join(__dirname, 'config/.env');
require('dotenv').config({ path: dotenvPath });
require('./config/database');
const cors = require('cors');
var app = express();
const whitelist = ['http://localhost:3000', 'https://develop-under-50.web.app/'];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  console.log(req.header('Origin'));
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { credentials: true, origin: true, allowedHeaders: ['Origin', 'Accept', 'Content-Type', 'Authorization', 'X-Requested-With', 'Set-cookie'] }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurant', restaurantRouter);
app.use(authRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
