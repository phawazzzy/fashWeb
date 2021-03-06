var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const flash = require('express-flash');
const dotenv = require('dotenv');
const methodOverride = require("method-override");

dotenv.config()


// const db_uri = 'mongodb://localhost:27017/phash';
const db_uri = process.env.DB_URI
mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true}).then(console.log('Database connected')).catch(err => console.log(err));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
require('./config/passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "mysecrect",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ uri: db_uri, collection: "app_sessions" }),
  cookie: { maxAge: 180 * 60 * 1000},
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//login availability to all routes
app.use(function(req, res,next){
  res.locals.authh = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('frontend/error');
});

module.exports = app;
